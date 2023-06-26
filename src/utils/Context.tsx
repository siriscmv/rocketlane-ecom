import { Dispatch, ReactNode, createContext, useReducer } from "react";
import { CardProps as Item } from "../components/Card";

export type ActionType =
  | "SET_ITEMS"
  | "SET_CART"
  | "ADD_TO_CART"
  | "INC_ITEM"
  | "DEC_ITEM"
  | "REMOVE_FROM_CART";

export interface Cart {
  id: number;
  quantity: number;
}

export interface State {
  items: Item[];
  cart: Cart[];
}

type Payload = number | Item[] | Cart[];

export interface Action {
  type: ActionType;
  payload: Payload;
}

export const initialState: State = {
  items: [],
  cart: [],
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
      };
    case "ADD_TO_CART": //Single ID
      return {
        ...state,
        cart: [...state.cart, { id: action.payload as number, quantity: 1 }],
      };
    case "INC_ITEM": //Single ID
      const cartItemsInc = [...state.cart];
      cartItemsInc.find((i) => i.id === action.payload)!.quantity++;

      return {
        ...state,
        cart: cartItemsInc,
      };
    case "DEC_ITEM": //Single ID
      const cartItemsDec = [...state.cart];
      cartItemsDec.find((i) => i.id === action.payload)!.quantity--;

      return {
        ...state,
        cart: cartItemsDec,
      };
    case "REMOVE_FROM_CART": //Single ID
      return {
        ...state,
        cart: state.cart.filter((i) => i.id !== action.payload),
      };
  }

  return state;
};

type SnakeToCamelCase<S extends string> = S extends `${infer T}_${infer U}`
  ? `${Lowercase<T>}${Capitalize<SnakeToCamelCase<U>>}`
  : Lowercase<S>;

export type Actions = {
  [K in ActionType as `${SnakeToCamelCase<K>}`]: (payload: Payload) => void;
};

export const Context = createContext<{
  state: State;
  actions: Actions;
  dispatch: Dispatch<Action>;
} | null>(null);

export const Provider = (props: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions: Actions = {
    setItems: (payload: Payload) => {
      dispatch({ type: "SET_ITEMS", payload });
    },
    setCart: (payload: Payload) => {
      dispatch({ type: "SET_CART", payload });
    },
    addToCart: (payload: Payload) => {
      dispatch({ type: "ADD_TO_CART", payload });
    },
    incItem: (payload: Payload) => {
      dispatch({ type: "INC_ITEM", payload });
    },
    decItem: (payload: Payload) => {
      dispatch({ type: "DEC_ITEM", payload });
    },
    removeFromCart: (payload: Payload) => {
      dispatch({ type: "REMOVE_FROM_CART", payload });
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
