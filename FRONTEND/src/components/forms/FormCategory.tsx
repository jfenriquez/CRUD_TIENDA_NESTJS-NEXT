import React, { useState } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useCategory } from "@/hooks/useCategory";
import axios from "axios";

const FormCategory = ({ data, onChange }: any) => {
  ////USECATEGORY
  const { updateCategories, createCategories } = useCategory();
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    onChange(false);
  };

  /////manejador de file
  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const formik = useFormik({
    initialValues: initialValues(data), ///data
    validationSchema: Yup.object(validationSchema()), //validacion
    onSubmit: async (formData) => {
      setLoading(true);
      const imageData = new FormData();
      console.log("imagedata", imageData);
      if (selectedFile !== null) {
        imageData.append("image", selectedFile);
        console.log("formData______", selectedFile);
        const uploadResponse = await axios.post(
          "http://localhost:3001/v1/images/",
          imageData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const urlImg = uploadResponse.data.secure_url;
        const categoryData = { ...formData, imagen: urlImg };
        data
          ? await updateCategories(data.id, categoryData)
          : await createCategories(categoryData);
        handleClick();
        setLoading(false);
      } else {
        data
          ? await updateCategories(data.id, formData)
          : await createCategories(formData);
        handleClick();
        setLoading(false);
      }
    },
  });

  return (
    <>
      {/* <ToastContainer /> */}
      <dialog id="my_modal_2" className={"modal modal-open"}>
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn btn-sm btn-circle absolute right-2 top-2 bg-zinc-100"
              onClick={() => handleClick()}
            >
              X
            </button>
          </form>
          <center>
            <h1 className="text-2xl font-bold">
              {data ? "Actualizar" : "Crear"} Categoria
            </h1>
            <form
              method="POST"
              onSubmit={formik.handleSubmit}
              className="items-center"
            >
              <input
                type="text"
                name="nombre"
                id="nombre"
                placeholder="nombre"
                /*error={formik.errors.title} */
                defaultValue={data?.nombre}
                onChange={formik.handleChange}
                className="input input-bordered input-primary w-full max-w-xs m-2"
              />
              <br></br>
              <input
                type="text"
                name="descripcion"
                id="descripcion"
                defaultValue={data?.descripcion}
                placeholder="descripcion"
                /* error={formik.errors.title} */
                onChange={formik.handleChange}
                className="input input-bordered input-primary w-full max-w-xs m-2"
              />
              <br></br>
              <input
                type="file"
                className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                name="image"
                id="image"
                onChange={handleFileChange}
              />
              <br></br>

              <select
                className="input input-bordered input-primary w-full max-w-xs m-2"
                name="estado"
                id="estado"
                /* error={formik.errors.title} */
                value={data?.estado}
                onChange={formik.handleChange}
              >
                <option disabled selected>
                  seleccione
                </option>
                <option value="true">true</option>
                <option value="false">false</option>
              </select>

              <br></br>
              <br></br>
              <button type="submit" className="btn btn-active btn-primary">
                {data ? "Actualizar" : "Crear"}
                {loading && (
                  <span className="loading loading-spinner loading-xs"></span>
                )}
              </button>
            </form>
          </center>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button onClick={() => handleClick()}>close</button>
        </form>
      </dialog>
    </>
  );
};

export default FormCategory;

////initialValues
async function initialValues(data: any) {
  if (data) {
    const { nombre, descripcion, imagen, estado } = data;
    return {
      nombre: nombre || "",
      descripcion: descripcion || "",
      imagen: imagen || "",
      estado: estado || "",
    };
  }
}
const validationSchema = () => {
  return {
    nombre: Yup.string(),
    descripcion: Yup.string(),
    imagen: Yup.string(),
    estado: Yup.string(),
  };
};
