import React from "react";
import { Form, useFormik } from "formik";

import * as Yup from "yup";

import FormUser from "./forms/FormUser";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Register = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <ToastContainer></ToastContainer>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-slate-700 m-9">
          <FormUser></FormUser>
        </div>
      </div>
    </div>
  );
};

export default Register;
