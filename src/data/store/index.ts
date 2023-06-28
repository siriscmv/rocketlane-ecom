import { Dispatch, ReactNode, createContext } from "react";
import { Cart, Item } from "../interfaces";

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

export type BackendAction =
  (typeof BackendActions)[keyof typeof BackendActions];

export interface State {
  items: Item[] | null;
  cart: Cart[] | null;
  initialSynced: boolean;
  fetching: BackendAction[];
}

export type Payload =
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
  items: null,
  cart: null,
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
