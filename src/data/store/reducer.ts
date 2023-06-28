import { State, Action, BackendAction } from ".";
import { Item, Cart } from "../interfaces";

export default function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_ITEMS": //List of full items
      return {
        ...state,
        items: action.payload as Item[],
      };
    case "SET_CART": //List of full items
      return {
        ...state,
        cart:
          state.cart === null
            ? (action.payload as Cart[])
            : [...(action.payload as Cart[]), ...state.cart],
      };
    case "ADD_TO_CART": //Single ID
      return {
        ...state,
        cart: [
          ...(state.cart ?? []),
          {
            id: (action.payload as Item).id as number,
            productItem: action.payload! as Item,
            quantity: 1,
          },
        ],
      };
    case "CHANGE_QTY": //{id, quantity}
      if (!state.cart) throw new Error("Cart is not yet initialized");

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
      if (!state.cart) throw new Error("Cart is not yet initialized");

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
}
