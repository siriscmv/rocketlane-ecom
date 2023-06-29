import { ReactNode, useReducer } from "react";
import { Actions, BackendActions, Context, initialState } from ".";
import fetch from "../../utils/fetch";
import { CartItem, Item } from "../interfaces";
import reducer from "./reducer";

export default function Provider(props: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions: Actions = {
    getAllItems: async () => {
      const payload: Item[] | null = await fetch("/product-items");
      if (payload) dispatch({ type: "SET_ITEMS", payload });
    },
    getAllCartItems: async () => {
      const payload: CartItem[] | null = await fetch("/cart-items");
      if (payload) dispatch({ type: "SET_CART", payload });
    },
    addItemToCart: async (item: Item) => {
      dispatch({ type: "FETCH_START", payload: BackendActions.AddItemToCart });
      const done = await fetch(`/cart-item/${item.id}`, "POST");

      if (done) dispatch({ type: "ADD_TO_CART", payload: item });
      dispatch({ type: "FETCH_DONE", payload: BackendActions.AddItemToCart });
    },
    changeQtyCartItem: async (id: number, quantity: number) => {
      dispatch({
        type: "FETCH_START",
        payload: BackendActions.ChangeQtyCartItem,
      });
      const done = await fetch(`/cart-item/${id}`, "PATCH", {
        quantity,
      });
      if (done)
        dispatch({
          type: "CHANGE_QTY",
          payload: { id, quantity },
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
    placeOrder: async (details: {
      name: string;
      phone: string;
      address: string;
    }) => {
      if (!state.cart?.length) throw new Error("Cart is empty");

      dispatch({
        type: "FETCH_START",
        payload: BackendActions.PlaceOrder,
      });
      await fetch(`/order`, "POST", {
        //TODO: Use correct URL above
        details,
        items: state.cart!.map((c) => ({ id: c.id, quantity: c.quantity })),
      });
      dispatch({
        type: "FETCH_DONE",
        payload: BackendActions.PlaceOrder,
      });
    },
    clearCart: async () => {
      dispatch({
        type: "FETCH_START",
        payload: BackendActions.ClearCart,
      });
      await fetch(`/cart-items`, "DELETE");
      dispatch({
        type: "FETCH_DONE",
        payload: BackendActions.ClearCart,
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
