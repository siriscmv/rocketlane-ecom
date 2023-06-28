import { Dispatch, ReactNode, createContext, useReducer } from "react";
import { CardProps as Item } from "./Card";
import fetch from "../utils/fetch";

export type ActionType =
  | "SET_ITEMS"
  | "SET_CART"
  | "ADD_TO_CART"
  | "CHANGE_QTY"
  | "REMOVE_FROM_CART"
  | "INITIAL_SYNC";

export interface Cart {
  id: number;
  quantity: number;
}

export interface State {
  items: Item[];
  cart: Cart[];
  initialSynced: boolean;
}

type Payload =
  | undefined
  | number
  | Item[]
  | Cart[]
  | { cart: Cart[]; items: Item[] }
  | { id: number; quantity: number };

export interface Action {
  type: ActionType;
  payload?: Payload;
}

export const initialState: State = {
  items: [],
  cart: [],
  initialSynced: false,
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_ITEMS": //List of full items
      return {
        ...state,
        items: action.payload as Item[],
      };
    case "SET_CART": //List of full items
      return {
        ...state,
        cart: action.payload as Cart[],
        items:
          state.items.length === 0
            ? (action.payload as any[]).map((c) => c.productItem)
            : state.items,
      };
    case "ADD_TO_CART": //Single ID
      return {
        ...state,
        cart: [...state.cart, { id: action.payload as number, quantity: 1 }],
      };
    case "CHANGE_QTY": //{id, quantity}
      const cartItemsInc = [...state.cart];
      cartItemsInc.find(
        (i) => i.id === (action.payload as { id: number; quantity: number }).id
      )!.quantity = (
        action.payload as { id: number; quantity: number }
      ).quantity;

      return {
        ...state,
        cart: cartItemsInc,
      };
    case "REMOVE_FROM_CART": //Single ID
      return {
        ...state,
        cart: state.cart.filter((i) => i.id !== action.payload),
      };
    case "INITIAL_SYNC": // Both cart and items
      return {
        ...state,
        cart: (action.payload as { cart: Cart[]; items: Item[] }).cart,
        items: (action.payload as { cart: Cart[]; items: Item[] }).items,
        initialSynced: true,
      };
  }
};

export const backendActions = [
  "getAllItems",
  "getAllCartItems",
  "addItemToCart",
  "changeQtyCartItem",
  "removeItemFromCart",
  "syncWithBackend",
] as const;

export type Actions = {
  [K in (typeof backendActions)[number]]: (payload?: Payload) => void;
};

export const Context = createContext<{
  state: State;
  actions: Actions;
  dispatch: Dispatch<Action>;
} | null>(null);

export const Provider = (props: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  //TODO: Show loading states for action buttons / cards, etc.
  //TODO: Impl optimisitic updates
  const actions: Actions = {
    getAllItems: () => {
      fetch("/product-items").then((body) => {
        if (body) dispatch({ type: "SET_ITEMS", payload: body });
      });
    },
    getAllCartItems: () => {
      fetch("/cart-items").then((body) => {
        if (body) dispatch({ type: "SET_CART", payload: body });
      });
    },
    addItemToCart: (id: Payload) => {
      fetch(`/cart-item/${id}`, "POST").then((body) => {
        if (body) dispatch({ type: "ADD_TO_CART", payload: id });
      });
    },
    changeQtyCartItem: (payload: Payload) => {
      fetch(
        `/cart-item/${(payload as { id: number; quantity: number }).id}`,
        "PATCH",
        {
          quantity: (payload as { id: number; quantity: number }).quantity,
        }
      ).then((body) => {
        if (body)
          dispatch({
            type: "CHANGE_QTY",
            payload: payload as { id: number; quantity: number },
          });
      });
    },
    removeItemFromCart: (id: Payload) => {
      fetch(`/cart-item/${id}`, "DELETE").then((body) => {
        if (body) dispatch({ type: "REMOVE_FROM_CART", payload: id });
      });
    },
    syncWithBackend: () => {
      Promise.all([fetch("/product-items"), fetch(`/cart-items`)]).then(
        (result) => {
          if (result)
            dispatch({
              type: "INITIAL_SYNC",
              payload: { items: result[0], cart: result[1] },
            });
        }
      );
    },
  };

  return (
    <Context.Provider
      value={{
        state,
        actions,
        dispatch,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
