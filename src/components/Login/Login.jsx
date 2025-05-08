import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

export default function Login({ saveUserData }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [msgError, setmsgError] = useState("");

  const handleLogin = async (values) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signin`,
        values
      );
      if (data.message === "success") {
        localStorage.setItem("userToken", data.token);
        setIsLoading(false);
        saveUserData();
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      setmsgError(error.response.data.message);
      setIsLoading(false);
      throw error;
    }
  };
  const validationSchema = yup.object({
    email: yup
      .string()
      .required("email is required")
      .email("enter a valid email"),
    password: yup
      .string()
      .required("password is required")
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "password must start with a capital letter and maximum length is 11"
      ),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });
  return (
    <>
      <div className="w-75 mx-auto py-4">
        <h3>Login now : </h3>

        {msgError.length > 0 ? (
          <div className="alert alert-danger">{msgError}</div>
        ) : null}

        <form onSubmit={formik.handleSubmit}>
          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger">{formik.errors.name}</div>
          ) : null}

          <label htmlFor="email">Email</label>
          <input
            onBlur={formik.handleBlur}
            className="form-control mb-2"
            onChange={formik.handleChange}
            type="text"
            id="email"
            name="email"
            value={formik.values.email}
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger">{formik.errors.email}</div>
          ) : null}

          <label htmlFor="password">password :</label>
          <input
            onBlur={formik.handleBlur}
            className="form-control mb-2"
            onChange={formik.handleChange}
            type="password"
            id="password"
            name="password"
            value={formik.values.password}
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger">{formik.errors.password}</div>
          ) : null}
          {isLoading ? (
            <button type="button" className="btn bg-main text-white ">
              <i className="fas fa-spinner fa-spin"></i>
            </button>
          ) : (
            <button
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              className="btn bg-main text-white "
            >
              Login
            </button>
          )}
        </form>
      </div>
    </>
  );
}
