import React from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
// import styles from './Layout.module.css';

export default function Layout({userData}) {
  return (
    <>
      <NavBar userData={userData}/>
      <div className="container">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
