import React, { useEffect, useState } from "react";
import Slider from "react-slick";

export default function CategorySlider() {
  const [categories, setCategories] = useState([]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,  // Show only one slide at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    centerMode: true,
    centerPadding: "0",
    focusOnSelect: true
  };
  const getCategories = async () => {
    try {
      const req = await fetch(
        `https://ecommerce.routemisr.com/api/v1/categories`,
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
        const response = await getCategories();
        setCategories(response);
      } catch (error) {
        console.error("failed to get data : ", error);
      }
    })();
  }, []);
  return (
    <>
      <h2 className="m-4 h4">Shop by Category : </h2>
       <Slider {...settings}>
        {categories.map((category) => (
          <div key={category._id} className="px-2 mt-4 d-flex justify-content-center">
            <div className="category-card text-center">
              <img 
                src={category.image} 
                alt={category.name}
                className="img-fluid rounded"
                style={{ height: "350px", objectFit: "cover" }}
              />
              <h3 className="h5 mt-3">{category.name}</h3>
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
}
