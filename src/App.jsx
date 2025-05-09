import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Categories from "./components/Categories/Categories";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import About from "./components/About/About";
import NotFound from "./components/NotFound/NotFound";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { CartContextProvider } from "./context/CartContext";

function App() {
  const [userData, setUserData] = useState("");

  const saveUserData = () => {
    const encodededToken = localStorage.getItem("userToken");
    if (encodededToken.length > 0) {
      const decodedToken = jwtDecode(encodededToken);
      setUserData(decodedToken);
    }
  };
  const routes = createBrowserRouter([
    {
      path: "",
      element: <Layout userData={userData} />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "about",
          element: (
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          ),
        },
        {
          path: "productDetails/:id",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },

        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        { path: "login", element: <Login saveUserData={saveUserData} /> },
        { path: "register", element: <Register /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <>
      <CartContextProvider>
        <Toaster />
        <RouterProvider router={routes} />
      </CartContextProvider>
    </>
  );
}

export default App;
