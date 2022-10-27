import Cookies from "js-cookie";
import { createContext, useReducer, useState } from "react";

export const Store = createContext();

const initialState = {
  cart: Cookies.get("cart") ? JSON.parse(Cookies.get("cart")) : [],
  userInfo: Cookies.get("userInfo")
    ? JSON.parse(Cookies.get("userInfo"))
    : null,
  auth: Cookies.get("auth") ? JSON.parse(Cookies.get("auth")) : [],
};

function reducer(state, action) {
  switch (action.type) {
    case "CART_ADD_ITEM": {
      const cart = action.payload;
      // const existItem = state.cart.cartItems.find(
      //   (item) => item._key === newItem._key && item.size === newItem.size
      // );
      // const cartItems = existItem
      //   ? state.cart.cartItems.map((item) =>
      //       item._key === existItem._key && item.size === newItem.size
      //         ? newItem
      //         : item
      //     )
      //   : [...state.cart.cartItems, newItem];
      Cookies.set("cart", JSON.stringify(cart));
      return { ...state, cart };
    }
    case "CART_REMOVE_ITEM": {
      const cartItems = state.cart.cartItems.filter(
        (item) =>
          item._key !== action.payload._key && item.size !== newItem.size
      );
      Cookies.set("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case "CART_CLEAR":
      return {
        ...state,
        cart: { ...state.cart, cartItems: [], paymentMethod: [] },
      };

    case "USER_LOGIN":
      return { ...state, userInfo: action.payload };
    case "USER_LOGOUT":
      return {
        ...state,
        userInfo: null,
        cart: {
          cartItems: [],
          shippingAddress: {},
        },
      };
    case "SAVE_SHIPPING_ADDRESS":
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: action.payload,
        },
      };
    case "SAVE_PAYMENT_METHOD":
      return {
        ...state,
        cart: {
          ...state.cart,
          paymentMethod: action.payload,
        },
      };
    case "SAVE_AUTH":
      const auth = action.payload;

      Cookies.set("auth", JSON.stringify(auth));
      return {
        ...state,
        auth,
      };

    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [EventActual, setEventActual] = useState("")
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch,setEventActual,EventActual };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
