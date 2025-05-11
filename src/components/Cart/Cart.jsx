import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../context/CartContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Cart() {
  let { getLoggedUserCart, removeItem, updateItemCount } =
    useContext(cartContext);
  let [cartDetails, setCartDetails] = useState(null);

  async function removeProduct(productId) {
    const res = await removeItem(productId);
    setCartDetails(res.data.data);
    if (res?.data?.status === "success") {
      toast.success("product successfully removed");
    }
  }
  async function updateProductCount(productId, count) {
    const res = await updateItemCount(productId, count);
    setCartDetails(res?.data?.data);
    if (res?.data?.status === "success") {
      toast.success("product Quantity updated");
    }
  }

  useEffect(() => {
    async function getCart() {
      const res = await getLoggedUserCart();
      if (res?.data?.status === "success") {
        setCartDetails(res.data.data);
      }
    }
    getCart();
  }, []);
  return (
    <>
      <Helmet>
        <title>cart</title>
      </Helmet>
      {cartDetails !== null ? (
        <div className="bg-main-light p-4 my-4 mt-5">
          <h3>shop cart : </h3>
          <h6 className="text-main">
            total cart price : {cartDetails?.totalCartPrice} EGP
          </h6>
          {cartDetails.products.map((product) => {
            return (
              <div
                className="row py-2 border-bottom my-2 align-items-center"
                key={product._id}
              >
                <div className="col-md-1">
                  <img
                    src={product.product.imageCover}
                    className="w-100"
                    alt=""
                  />
                </div>
                <div className="col-md-11 d-flex justify-content-between">
                  <div>
                    <h6>{product.product.title}</h6>
                    <h6 className="text-main">price : {product.price}</h6>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => {
                        removeProduct(product.product._id);
                      }}
                    >
                      <i className="fa-solid fa-trash me-2"></i>Remove item
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        updateProductCount(
                          product.product._id,
                          product.count + 1
                        );
                      }}
                      className="btn border-main btn-sm"
                    >
                      +
                    </button>
                    <span className="p-2">{product.count}</span>
                    <button
                      onClick={() => {
                        updateProductCount(
                          product.product._id,
                          product.count - 1
                        );
                      }}
                      className="btn border-main btn-sm"
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          <button className="btn bg-main">
            <Link to="/checkout" className="text-white text-decoration-none">
              check out
            </Link>
          </button>
        </div>
      ) : null}
    </>
  );
}
