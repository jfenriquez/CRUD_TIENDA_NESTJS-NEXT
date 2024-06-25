import { ProductInterface } from "@/interfaces/ProductInterface";
import { useFormik } from "formik";
import React, { use, useEffect, useState } from "react";
import * as Yup from "yup";

import { useProduct } from "@/hooks/useProduct";
import Image from "next/image";
import axios from "axios";
import { useCategory } from "@/hooks/useCategory";
import { getAllCategory } from "@/services/api/categories";
import { CategoryInterface } from "@/interfaces/CategoryInterface";

const FormsProduct = ({ data, onChange }: any) => {
  const { updateProducts, createProduct } = useProduct();
  const [selectedFile, setSelectedFile] = useState(null);
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  useEffect(() => {
    (async () => {
      const resp = await getAllCategory();
      setCategories(resp);
    })();
  }, []);

  ////closemodal button
  const handlClick = async () => {
    onChange(false);
  };

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const formik = useFormik({
    initialValues: initialValues(data),
    validationSchema: Yup.object(validationSchema()),

    onSubmit: async (formData) => {
      const imageData = new FormData();
      console.log("imagedata", formData);

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
        const productData = { ...formData, imagen: urlImg };
        data
          ? await updateProducts(data.id, productData)
          : await createProduct(productData);

        handlClick();
      } else {
        data
          ? await updateProducts(data.id, formData)
          : await createProduct(formData);

        handlClick();
      }
    },
  });

  //////CONVERTIR EN INT EL SELECT
  const handleSelectChange = (event: any) => {
    const value = event.target.value;
    const numericValue = value ? parseInt(value, 10) : ""; // Convierte a número si hay un valor
    formik.setFieldValue("categoriaId", numericValue); // Actualiza el valor en Formik
  };

  return (
    <>
      <dialog id="my_modal_2" className={"modal modal-open"}>
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn btn-sm btn-circle absolute right-2 top-2 bg-zinc-100"
              onClick={() => handlClick()}
            >
              X
            </button>
          </form>
          <center>
            <h1 className="text-2xl font-bold">
              {data ? "Actualizar" : "Crear"} Producto
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
                placeholder="descripcion"
                defaultValue={data?.descripcion}
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

              <input
                type="number"
                name="precio"
                id="precio"
                /* error={formik.errors.title} */
                defaultValue={data?.precio}
                onChange={formik.handleChange}
                placeholder="precio"
                className="input input-bordered input-primary w-full max-w-xs m-2"
              />
              <br></br>

              <input
                type="number"
                name="stock"
                id="stock"
                /* error={formik.errors.title} */
                defaultValue={data?.stock}
                onChange={formik.handleChange}
                placeholder="stock"
                className="input input-bordered input-primary w-full max-w-xs m-2"
              />
              <br></br>

              <select
                className="input input-bordered input-primary w-full max-w-xs m-2"
                name="categoriaId"
                id="categoriaId"
                /* error={formik.errors.title} */
                onChange={handleSelectChange}
                defaultValue={data?.categoria.id}
              >
                <option disabled selected>
                  {data?.categoria.nombre
                    ? data?.categoria.nombre
                    : "selecione uno"}
                </option>

                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.nombre}
                  </option>
                ))}
              </select>

              <br></br>
              <input
                type="text"
                name="marca"
                id="marca"
                placeholder="marca"
                defaultValue={data?.marca}
                onChange={formik.handleChange}
                className="input input-bordered input-primary w-full max-w-xs m-2"
              />
              <br></br>
              <button type="submit" className="btn btn-active btn-primary">
                {data ? "Actualizar" : "Crear"}
              </button>
            </form>
          </center>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button onClick={() => handlClick()}>close</button>
        </form>
      </dialog>
    </>
  );
};

export default FormsProduct;

async function initialValues(data: ProductInterface) {
  if (data) {
    const { nombre, descripcion, imagen, precio, stock, categoriaId, marca } =
      data;
    return {
      nombre: nombre || "",
      descripcion: descripcion || "",
      imagen: imagen || "",
      precio: precio || 0,
      stock: stock || 0,
      categoriaId: categoriaId || 0,
      marca: marca || 0,
    };
  }
}

function validationSchema() {
  return {
    nombre: Yup.string(),
    descripcion: Yup.string(),

    precio: Yup.number(),
    stock: Yup.number(),
    categoriaId: Yup.number(),
    marca: Yup.string(),
  };
}
