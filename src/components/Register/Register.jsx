import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
// import styles from './Register.module.css';

export default function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [msgError, setmsgError] = useState("");

  const handleRegister = async (values) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signup`,
        values
      );
      if (data.message === "success") {
        navigate("/login");
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error.response.data.message);
      setmsgError(error.response.data.message);
      setIsLoading(false);
      throw error;
    }
  };
  const validationSchema = yup.object({
    name: yup
      .string()
      .required("name is required")
      .min(3, "name minimum length must be 3")
      .max(10, "name maximum length must be 10"),
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
    rePassword: yup
      .string()
      .required("rePassword is required")
      .oneOf([yup.ref("password")], "password and rePassword does not match"),
    phone: yup
      .string()
      .required("rePassword is required")
      .matches(/^01[0125][0-9]{8}$/, "phone must be an egyption number"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: handleRegister,
  });
  return (
    <>
      <div className="w-75 mx-auto py-4">
        <h3>Register now : </h3>

        {msgError.length > 0 ? (
          <div className="alert alert-danger">{msgError}</div>
        ) : null}

        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">Name :</label>
          <input
            onBlur={formik.handleBlur}
            className="form-control mb-2"
            onChange={formik.handleChange}
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
          />
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

          <label htmlFor="rePassword">rePassword :</label>
          <input
            onBlur={formik.handleBlur}
            className="form-control mb-2"
            onChange={formik.handleChange}
            type="password"
            id="rePassword"
            name="rePassword"
            value={formik.values.rePassword}
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert alert-danger">{formik.errors.rePassword}</div>
          ) : null}

          <label htmlFor="phone">phone :</label>
          <input
            onBlur={formik.handleBlur}
            className="form-control mb-2"
            onChange={formik.handleChange}
            type="tel"
            id="phone"
            name="phone"
            value={formik.values.phone}
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger">{formik.errors.phone}</div>
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
              Register
            </button>
          )}
        </form>
      </div>
    </>
  );
}
