import { useFormik } from "formik";
import React, { useContext } from "react";
import { cartContext } from "../../context/CartContext";

export default function Checkout() {
  let { onlinePayment , cartId} = useContext(cartContext);
  const handleSubmit = async (values) => {
    let res = await onlinePayment(cartId, values);
    if (res?.data?.status === "success") {
      console.log(res.data.session.url);
      window.location.href = res.data.session.url;
    }

    console.log(values);
  };
  let formik = useFormik({
    initialValues: {
      details: "",
      city: "",
      phone: "",
    },
    onSubmit: handleSubmit,
  });
  return (
    <>
      <div className="w-50 py-5 mx-auto">
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="details">details</label>
          <input
            type="text"
            id="details"
            name="details"
            className="form-control"
            value={formik.values.details}
            onChange={formik.handleChange}
          />

          <label htmlFor="phone">phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="form-control"
            value={formik.values.phone}
            onChange={formik.handleChange}
          />

          <label htmlFor="city">city</label>
          <input
            type="text"
            id="city"
            name="city"
            className="form-control"
            value={formik.values.city}
            onChange={formik.handleChange}
          />

          <button type="submit" className="btn border-main w-100 mt-3">
            Pay
          </button>
        </form>
      </div>
    </>
  );
}
