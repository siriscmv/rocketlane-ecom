import { Dispatch, createContext } from "react";
import { CartItem, Item, ShallowCartItem } from "../interfaces";

export type BackendAction =
  (typeof BackendActions)[keyof typeof BackendActions];

export interface State {
  items: Item[] | null;
  cart: CartItem[] | null;
  initialSynced: boolean;
  fetching: BackendAction[];
}

// Do not call dispatch() directly. Use actions instead.

export type Action =
  | { type: "SET_ITEMS"; payload: Item[] }
  | { type: "SET_CART"; payload: CartItem[] }
  | { type: "ADD_TO_CART"; payload: Item }
  | { type: "CHANGE_QTY"; payload: { id: number; quantity: number } }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: "PLACE_ORDER"; payload: ShallowCartItem[] }
  | { type: "INITIAL_SYNC"; payload: { cart: CartItem[]; items: Item[] } }
  | { type: "FETCH_START"; payload: BackendAction }
  | { type: "FETCH_DONE"; payload: BackendAction }
  | { type: "FETCH_ERROR"; payload: BackendAction };

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
  PlaceOrder = "placeOrder",
  SyncWithBackend = "syncWithBackend",
}

export type Actions = {
  [BackendActions.GetAllItems]: () => void;
  [BackendActions.GetAllCartItems]: () => void;
  [BackendActions.AddItemToCart]: (item: Item) => void;
  [BackendActions.ChangeQtyCartItem]: (id: number, quantity: number) => void;
  [BackendActions.RemoveItemFromCart]: (id: number) => void;
  [BackendActions.PlaceOrder]: (details: {
    name: string;
    phone: string;
    address: string;
  }) => void;
  [BackendActions.SyncWithBackend]: () => void;
};

export const Context = createContext<{
  state: State;
  actions: Actions;
  dispatch: Dispatch<Action>;
} | null>(null);
