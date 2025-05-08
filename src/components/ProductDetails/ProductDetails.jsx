import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";

export default function ProductDetails() {
  const [isloading, setIsLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    const fetchProduct = async (id) => {
      try {
        const req = await fetch(
          `https://ecommerce.routemisr.com/api/v1/products/${id}`,
          { method: "GET" }
        );
        const response = await req.json();
        setProduct(response.data);
        setIsLoading(true);
      } catch (error) {
        console.error("error fetching product details", error);
        throw error;
      }
    };

    fetchProduct(id);
  }, [id]);

  return (
    <>
      {isloading ? (
        <div className="container py-5">
          <div className="row">
            <div className="col-md-6 text-center">
              <Slider {...settings}>
                {product.images.map(img => <img src={img} className="w-50"/>)}
              </Slider>
            </div>
            <div className="col-md-6">
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <p className="text-main fw-bold">Price: {product.price} EGP</p>
              <p>
                <i className="fas fa-star rating-color me-1"></i>
                {product.ratingsAverage} ({product.ratingsQuantity} reviews)
              </p>
              <button className="btn bg-main text-white">Add to Cart</button>
            </div>
          </div>
        </div>
      ) : <div className="d-flex justify-content-center align-items-center vh-100"><i className="fas fa-spinner fa-spin text-main fa-4x"></i></div>}
    </>
  );
}
