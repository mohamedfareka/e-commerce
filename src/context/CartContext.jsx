import axios from "axios";
import { createContext } from "react";

export let cartContext = createContext("");

export const CartContextProvider = (props) => {
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  function getLoggedUserCart() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  function addToCart(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId: productId,
        },
        {
          headers: headers,
        }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  function removeItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers: headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  function updateItemCount(productId, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count,
        },
        {
          headers: headers,
        }
      )
      .then((res) => res)
      .catch((err) => err);
  }
  return (
    <cartContext.Provider value={{ addToCart, getLoggedUserCart, removeItem , updateItemCount}}>
      {props.children}
    </cartContext.Provider>
  );
};
