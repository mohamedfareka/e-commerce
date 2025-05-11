import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let cartContext = createContext("");

export const CartContextProvider = (props) => {
  const [cartId , setCartId] = useState(null);
  const [numberOfCartItems , setNumberOfCartItems] = useState(0);

  useEffect(() => {
    async function getCart() {
      let res = await getLoggedUserCart();
      if(res?.data?.status === 'success') {
        setNumberOfCartItems(res.data.numOfCartItems);
        setCartId(res.data.data._id);
      }
      console.log(res);
    }

    getCart();
  }, []);


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

  function onlinePayment(cartId, shippingAddress) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
        {
          shippingAddress,
        },
        {
          headers: headers,
        }
      )
      .then((res) => res)
      .catch((err) => err);
  }
  return (
    <cartContext.Provider
      value={{
        addToCart,
        getLoggedUserCart,
        removeItem,
        updateItemCount,
        onlinePayment,
        setNumberOfCartItems,
        numberOfCartItems,
        cartId,
      }}
    >
      {props.children}
    </cartContext.Provider>
  );
};
