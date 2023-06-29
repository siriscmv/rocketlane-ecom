import { Action, State } from ".";

export default function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_ITEMS": //List of product items
      return {
        ...state,
        items: action.payload,
      };
    case "SET_CART": //List of cart items
      return {
        ...state,
        cart:
          state.cart === null
            ? action.payload
            : [...action.payload, ...state.cart],
      };
    case "ADD_TO_CART": //Id + qty, and full item in inner payload
      return {
        ...state,
        cart: [
          ...(state.cart ?? []),
          {
            id: action.payload.id,
            productItem: action.payload,
            quantity: 1,
          },
        ],
      };
    case "CHANGE_QTY": //{id, quantity}
      if (!state.cart) throw new Error("Cart is not yet initialized");

      const cartItemsInc = [...state.cart];
      cartItemsInc.find((i) => i.id === action.payload.id)!.quantity =
        action.payload.quantity;

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
    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };
    case "FETCH_START":
      return {
        ...state,
        fetching: [...state.fetching, action.payload],
      };
    case "FETCH_DONE":
      return {
        ...state,
        fetching: state.fetching.filter((a) => a !== action.payload),
      };
    case "FETCH_ERROR": // Do smth with this?
      return {
        ...state,
        fetching: state.fetching.filter((a) => a !== action.payload),
      };
  }
}
