"use client";
import { useUser } from "@/hooks/useUser";

import { useFormik } from "formik";

import React from "react";

const RecoveryPassword = () => {
  const { sendRecoveryPassword } = useUser();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate: (values) => {
      let errors: any = {};
      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }

      return errors;
    },

    onSubmit: async (values, { resetForm }) => {
      sendRecoveryPassword(values);
    },
  });

  return (
    <div className="hero min-h-screen bg-base-100">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left ">
          <h1 className="text-5xl font-bold">RecoveryPassword now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-md shadow-2xl bg-slate-700 m-9">
          {formik.errors.email ? (
            <div className="alert alert-error">{formik.errors.email}</div>
          ) : null}
          <form
            className="card-body"
            method="POST"
            onSubmit={formik.handleSubmit}
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                className="input input-bordered"
                required
                onChange={formik.handleChange}
              />
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                ENVIAR LINK DE RECUPERACION
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RecoveryPassword;
