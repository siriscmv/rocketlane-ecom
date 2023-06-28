import { Dispatch, ReactNode, createContext, useReducer } from "react";
import { CardProps as Item } from "./Card";
import fetch from "../utils/fetch";

export type ActionType =
  | "SET_ITEMS"
  | "SET_CART"
  | "ADD_TO_CART"
  | "CHANGE_QTY"
  | "REMOVE_FROM_CART"
  | "INITIAL_SYNC"
  | "FETCH_START"
  | "FETCH_DONE"
  | "FETCH_ERROR";

export interface Cart {
  id: number;
  quantity: number;
  productItem: Item;
}

type BackendAction = (typeof BackendActions)[keyof typeof BackendActions];

export interface State {
  items: Item[];
  cart: Cart[];
  initialSynced: boolean;
  fetching: BackendAction[];
}

type Payload =
  | undefined
  | number
  | string
  | Item[]
  | Item
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
  fetching: [],
};

/* 
  Assuming each "Action" is atomic in the sense that
  only 1 action of the same type can happen at any
  point of time. All others should be blocked.
  Although "BackendAction" refers to all possible actions,
  this principle applies only to actions invoked as a 
  result of explicit user interaction, like pressing a button.
*/

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
        cart: [
          ...state.cart,
          {
            id: (action.payload as Item).id as number,
            productItem: action.payload! as Item,
            quantity: 1,
          },
        ],
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
    case "FETCH_START":
      return {
        ...state,
        fetching: [...state.fetching, action.payload as BackendAction],
      };
    case "FETCH_DONE":
      return {
        ...state,
        fetching: state.fetching.filter(
          (a) => a !== (action.payload as BackendAction)
        ),
      };
    case "FETCH_ERROR": // Do smth with this?
      return {
        ...state,
        fetching: state.fetching.filter(
          (a) => a !== (action.payload as BackendAction)
        ),
      };
  }
};

export enum BackendActions {
  GetAllItems = "getAllItems",
  GetAllCartItems = "getAllCartItems",
  AddItemToCart = "addItemToCart",
  ChangeQtyCartItem = "changeQtyCartItem",
  RemoveItemFromCart = "removeItemFromCart",
  SyncWithBackend = "syncWithBackend",
}

export type Actions = {
  [K in BackendActions]: (payload?: Payload) => void;
};

export const Context = createContext<{
  state: State;
  actions: Actions;
  dispatch: Dispatch<Action>;
} | null>(null);

export const Provider = (props: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

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
    addItemToCart: (payload: Payload) => {
      dispatch({ type: "FETCH_START", payload: BackendActions.AddItemToCart });
      fetch(`/cart-item/${(payload as Item).id}`, "POST").then((body) => {
        if (body) dispatch({ type: "ADD_TO_CART", payload });
        dispatch({ type: "FETCH_DONE", payload: BackendActions.AddItemToCart });
      });
    },
    changeQtyCartItem: (payload: Payload) => {
      dispatch({
        type: "FETCH_START",
        payload: BackendActions.ChangeQtyCartItem,
      });
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
        dispatch({
          type: "FETCH_DONE",
          payload: BackendActions.ChangeQtyCartItem,
        });
      });
    },
    removeItemFromCart: (id: Payload) => {
      dispatch({
        type: "FETCH_START",
        payload: BackendActions.RemoveItemFromCart,
      });
      fetch(`/cart-item/${id}`, "DELETE").then((body) => {
        if (body) dispatch({ type: "REMOVE_FROM_CART", payload: id });
        dispatch({
          type: "FETCH_DONE",
          payload: BackendActions.RemoveItemFromCart,
        });
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
