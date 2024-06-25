"use client";
import React from "react";
import { useFormik } from "formik";

import { useSearchParams } from "next/navigation";
import { useUser } from "@/hooks/useUser";

const FormResetPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const { changeRecoveryPassword } = useUser();
  ////formik
  const formik = useFormik({
    initialValues: {
      password: "",
      repeatPassword: "",
    },
    validate: (values) => {
      let errors: any = {};
      if (!values.password) {
        errors.password = "Required";
      } else if (values.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
      } else {
        if (!values.repeatPassword) {
          errors.repeatPassword = "repita password";
        } else if (values.repeatPassword !== values.password) {
          errors.repeatPassword = "las contraselas deben ser iguales";
        }
      }
      return errors;
    },

    onSubmit: async (values, { resetForm }) => {
      if (token !== null) {
        await changeRecoveryPassword({ newPassword: values.password }, token);
      }
      resetForm();
    },
  });

  return (
    <div>
      <div className="hero min-h-screen bg-base-100">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left ">
            <h1 className="text-5xl font-bold">CHANGE PASSOWRD</h1>
          </div>
          <div className="card shrink-0 w-full max-w-md shadow-2xl bg-slate-700 m-9">
            {formik.errors.password || formik.errors.repeatPassword ? (
              <div className="alert alert-error">
                {formik.errors.password && <p>{formik.errors.password}</p>}
                {formik.errors.repeatPassword && (
                  <p>{formik.errors.repeatPassword}</p>
                )}
              </div>
            ) : null}

            <form className="card-body" onSubmit={formik.handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formik.values.password}
                  placeholder="password"
                  className="input input-bordered"
                  onChange={formik.handleChange}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Repetir Password</span>
                </label>
                <input
                  type="password"
                  value={formik.values.repeatPassword}
                  placeholder="repetir password"
                  name="repeatPassword"
                  className="input input-bordered"
                  onChange={formik.handleChange}
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormResetPassword;
