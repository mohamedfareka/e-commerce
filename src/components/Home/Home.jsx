import React from "react";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import CategorySlider from "../CategorySlider/CategorySlider";
// import styles from './Home.module.css';

export default function Home() {
  return (
    <>
      <div className="container">
        <CategorySlider/>
        <FeaturedProducts />
      </div>
    </>
  );
}
