import { ReactNode, useReducer } from "react";
import { initialState, Actions, BackendActions, Context, Payload } from ".";
import { Item, Cart } from "../interfaces";
import fetch from "../../utils/fetch";
import reducer from "./reducer";

export default function Provider(props: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions: Actions = {
    getAllItems: async () => {
      const payload: Item[] | null = await fetch("/product-items");
      if (payload) dispatch({ type: "SET_ITEMS", payload });
    },
    getAllCartItems: async () => {
      const payload: Cart[] | null = await fetch("/cart-items");
      if (payload) dispatch({ type: "SET_CART", payload });
    },
    addItemToCart: async (payload: Item) => {
      dispatch({ type: "FETCH_START", payload: BackendActions.AddItemToCart });
      const done = await fetch(`/cart-item/${payload.id}`, "POST");

      if (done) dispatch({ type: "ADD_TO_CART", payload });
      dispatch({ type: "FETCH_DONE", payload: BackendActions.AddItemToCart });
    },
    changeQtyCartItem: async (payload: { id: number; quantity: number }) => {
      dispatch({
        type: "FETCH_START",
        payload: BackendActions.ChangeQtyCartItem,
      });
      const done = await fetch(`/cart-item/${payload.id}`, "PATCH", {
        quantity: payload.quantity,
      });
      if (done)
        dispatch({
          type: "CHANGE_QTY",
          payload,
        });
      dispatch({
        type: "FETCH_DONE",
        payload: BackendActions.ChangeQtyCartItem,
      });
    },
    removeItemFromCart: async (id: number) => {
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
}
