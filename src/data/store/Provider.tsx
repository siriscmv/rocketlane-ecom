import { ReactNode, useReducer } from "react";
import { Actions, BackendActions, Context, initialState } from ".";
import fetcher from "../../utils/fetcher";
import { CartItem, Item, Order } from "../interfaces";
import reducer from "./reducer";

export default function Provider(props: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions: Actions = {
    getAllItems: async () => {
      const payload: Item[] | null = await fetcher("/product-items");
      if (payload) dispatch({ type: "SET_ITEMS", payload });
    },
    getAllCartItems: async () => {
      const payload: CartItem[] | null = await fetcher("/cart-items");
      if (payload) dispatch({ type: "SET_CART", payload });
    },
    getAllOrders: async () => {
      const payload: Order[] | null = await fetcher("/orders");
      if (payload) dispatch({ type: "SET_ORDERS", payload });
    },
    addItemToCart: async (item: Item) => {
      dispatch({ type: "FETCH_START", payload: BackendActions.AddItemToCart });
      const done = await fetcher(`/cart-item/${item.id}`, "POST");

      if (done) dispatch({ type: "ADD_TO_CART", payload: item });
      dispatch({ type: "FETCH_DONE", payload: BackendActions.AddItemToCart });
    },
    changeQtyCartItem: async (id: number, quantity: number) => {
      dispatch({
        type: "FETCH_START",
        payload: BackendActions.ChangeQtyCartItem,
      });
      const done = await fetcher(`/cart-item/${id}`, "PATCH", {
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
      const done = await fetcher(`/cart-item/${id}`, "DELETE");
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
      await fetcher(`/order`, "POST", {
        ...details,
        products: state.cart!.map((c) => ({
          productId: c.id,
          quantity: c.quantity,
        })),
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
      await fetcher(`/cart-items`, "DELETE");
      dispatch({
        type: "FETCH_DONE",
        payload: BackendActions.ClearCart,
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
