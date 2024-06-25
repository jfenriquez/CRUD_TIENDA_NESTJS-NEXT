"use client";

import React, { useState } from "react";
import { useFormik } from "formik";

import * as Yup from "yup";
import { useUser } from "@/hooks/useUser";
import axios from "axios";
import { UserInterface } from "@/interfaces/UserInterface";
const FormUser = ({ data }: any) => {
  const { CreateUser, updateUser } = useUser();
  const [selectedFile, setSelectedFile] = useState(null);

  ///manejadir de img
  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  ////formik
  const formik = useFormik({
    initialValues: initialValues(data), ///data
    validationSchema: Yup.object(validationSchema()), //validacion
    onSubmit: async (formData) => {
      try {
        const data: UserInterface|any = { rol: "customer", ...formData };
        const imageData = new FormData();
        console.log("imagedata", imageData);
        if (selectedFile !== null) {
          imageData.append("image", selectedFile);
          console.log("formData______", selectedFile);
          const uploadResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/v1/images/`,
            imageData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          const urlImg = uploadResponse.data.secure_url;
          const userData = { ...formData, imagen: urlImg };
          data.id && (await updateUser(data.id, userData));
        }
        await CreateUser(formData);
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <form className="card-body" method="POST" onSubmit={formik.handleSubmit}>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Nombre</span>
        </label>
        <input
          defaultValue={data?.nombre}
          type="text"
          name="nombre"
          id="nombre"
          placeholder="nombre"
          className="input input-bordered"
          onChange={formik.handleChange}
          required
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">apellido</span>
        </label>
        <input
          defaultValue={data?.apellido}
          id="apellido"
          name="apellido"
          onChange={formik.handleChange}
          type="text"
          placeholder="apellido"
          className="input input-bordered"
          required
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          defaultValue={data?.email}
          id="email"
          name="email"
          onChange={formik.handleChange}
          type="email"
          placeholder="email"
          className="input input-bordered"
          required
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">phone</span>
        </label>
        <input
          defaultValue={data?.phone}
          id="phone"
          name="phone"
          onChange={formik.handleChange}
          type="text"
          placeholder="phone"
          className="input input-bordered"
          required
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          defaultValue={data?.password}
          id="password"
          name="password"
          onChange={formik.handleChange}
          type="password"
          placeholder="password"
          className="input input-bordered"
          required
        />
      </div>

      <div className="form-control mt-6">
        <button type="submit" className="btn btn-primary">
          Registrar
        </button>
      </div>
    </form>
  );
};

export default FormUser;

const validationSchema = () => {
  return {
    nombre: Yup.string().required("El nombre es requerido"),
    apellido: Yup.string().required("El apellido es requerido"),
    email: Yup.string().required("El email es requerido"),
    phone: Yup.string().required("El celular es requerido"),
    password: Yup.string().required("El password es requerido"),
  };
};

async function initialValues(data: any) {
  if (data) {
    const { nombre, apellido, email, phone, password } = data;
    return {
      nombre: nombre || "",
      apellido: apellido || "",
      email: email || "",
      phone: phone || "",
      password: password || "",
    };
  }
}
