import { Dispatch, ReactNode, createContext, useReducer } from "react";
import fetch from "../utils/fetch";
import { Cart, Item } from "./interfaces";

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
    getAllItems: async () => {
      const payload = await fetch("/product-items");
      if (payload) dispatch({ type: "SET_ITEMS", payload });
    },
    getAllCartItems: async () => {
      const payload = await fetch("/cart-items");
      if (payload) dispatch({ type: "SET_CART", payload });
    },
    addItemToCart: async (payload: Payload) => {
      dispatch({ type: "FETCH_START", payload: BackendActions.AddItemToCart });
      const done = await fetch(`/cart-item/${(payload as Item).id}`, "POST");

      if (done) dispatch({ type: "ADD_TO_CART", payload });
      dispatch({ type: "FETCH_DONE", payload: BackendActions.AddItemToCart });
    },
    changeQtyCartItem: async (payload: Payload) => {
      dispatch({
        type: "FETCH_START",
        payload: BackendActions.ChangeQtyCartItem,
      });
      const done = await fetch(
        `/cart-item/${(payload as { id: number; quantity: number }).id}`,
        "PATCH",
        {
          quantity: (payload as { id: number; quantity: number }).quantity,
        }
      );
      if (done)
        dispatch({
          type: "CHANGE_QTY",
          payload: payload as { id: number; quantity: number },
        });
      dispatch({
        type: "FETCH_DONE",
        payload: BackendActions.ChangeQtyCartItem,
      });
    },
    removeItemFromCart: async (id: Payload) => {
      dispatch({
        type: "FETCH_START",
        payload: BackendActions.RemoveItemFromCart,
      });
      const done = await fetch(`/cart-item/${id}`, "DELETE");
      if (done) dispatch({ type: "REMOVE_FROM_CART", payload: id });
      dispatch({
        type: "FETCH_DONE",
        payload: BackendActions.RemoveItemFromCart,
      });
    },
    syncWithBackend: async () => {
      const result = await Promise.all([
        fetch("/product-items"),
        fetch(`/cart-items`),
      ]);
      dispatch({
        type: "INITIAL_SYNC",
        payload: { items: result[0], cart: result[1] },
      });
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
