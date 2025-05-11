import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cartContext } from "../../context/CartContext";
import toast from "react-hot-toast";

export default function FeaturedProducts() {

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  let { addToCart , setNumberOfCartItems } = useContext(cartContext);

  async function addProduct(productId) {
    let response = await addToCart(productId);
    if (response?.data?.status === "success") {
      setNumberOfCartItems(response.data.numOfCartItems)
      toast.success(response.data.message, {
        duration: 2000,
      });
    } else {
      toast.error(response.data.message)
    }
  }

  const getProducts = async () => {
    try {
      const req = await fetch(
        `https://ecommerce.routemisr.com/api/v1/products`,
        { method: "GET" }
      );
      const response = await req.json();
      const { data } = response;
      return data;
    } catch (error) {
      console.error("failed to fetch : ", error);
      throw error;
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await getProducts();
        setProducts(response);
      } catch (error) {
        console.error("failed to get data : ", error);
      }
    })();
  }, []);
  const navigateToProductDetails = (productId) => {
    navigate(`/ProductDetails/${productId}`);
  };
  return (
    <>
      <div className="row g-4 mt-2">
        {products.map((product) => {
          return (
            <div className="col-md-2" key={product.id}>
              <div className="product cursor-pointer p-2 rounded-2">
                <div
                  onClick={() => {
                    navigateToProductDetails(product.id);
                  }}
                >
                  <img src={product.imageCover} className="w-100" />
                  <span className="text-main fw-bold font-sm">
                    {product.category.name}
                  </span>
                  <h3 className="h6 fw-bolder">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h3>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">{product.price} EGP</span>
                    <span className="text-muted">
                      <i className="fas fa-star rating-color"></i>
                      {product.ratingsAverage}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    addProduct(product._id);
                  }}
                  className="btn bg-main text-white w-100 x"
                >
                  + Add
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
