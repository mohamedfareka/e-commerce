import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../../context/CartContext";

export default function NavBar({ userData }) {
  const { numberOfCartItems } = useContext(cartContext);
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-light bg-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="">
            <img src="./images/freshcart-logo.svg" alt="/" />
          </Link>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            {!userData ? (
              <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="products">
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="categories">
                    Categories
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="brands">
                    Brands
                  </Link>
                </li>
              </ul>
            ) : null}
            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
              <li className="nav-item d-flex align-items-center">
                <i className="fab mx-2 fa-facebook"></i>
                <i className="fab mx-2 fa-twitter"></i>
                <i className="fab mx-2 fa-instagram"></i>
                <i className="fab mx-2 fa-tiktok"></i>
                <i className="fab mx-2 fa-linkedin"></i>
                <i className="fab mx-2 fa-youtube"></i>
              </li>
              {userData ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="register">
                      Register
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link">Logout</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="cart">
                      Cart 
                      <span className="badge bg-main text-white ms-1">
                        {numberOfCartItems}
                      </span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
