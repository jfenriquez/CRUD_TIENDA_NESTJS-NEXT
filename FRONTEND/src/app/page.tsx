"use client";
//import '../../public/sw.js';

import Search from "@/components/Search";
import ShoppingCart from "@/components/ShoppingCart";

import { useAppContext } from "@/context/Index";
import { useCart } from "@/hooks/useCart";
import { useProduct } from "@/hooks/useProduct";
import Image from "next/image";
import { useEffect, useState } from "react";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { IoIosAlert } from "react-icons/io";

export default function Home() {
  const { fetchData, data, loading } = useProduct();
  const { car, setCar, total, contadorProduct, addProductCar } =
    useAppContext();

  const [term, setTerm] = useState(""); /////buscador state
  const [res, setRes] = useState<any[]>([]); // reponse de buscador

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  //////add product state
  const addCar = async (item: any) => {
    try {
      const existingProduct = car.find(
        (product: any) => product.id === item.id
      );

      if (existingProduct) {
        return toast.error("Product already in cart");
      }

      item.quantity = 1;
      const updatedCar = [...car, item];

      setCar(updatedCar); // Actualiza el estado del carrito

      const updatedItems = JSON.stringify(updatedCar);
      await localStorage.setItem("car", updatedItems);

      return toast.success("Product added to cart");
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Error adding product to cart");
    }
  };

  return (
    <>
      {/* <ToastContainer /> */}
      {/* search */}
      <Search
        onDebounce={(value) => setTerm(value)}
        onRes={(value) => setRes(value)}
      />
      {/* menu horizontal  */}
      <div className="flex flex-wrap justify-center">
        {loading && (
          <div className="container flex justify-center">
            <span className="loading loading-bars loading-xs text-primary"></span>
            <span className="loading loading-bars loading-sm text-primary"></span>
            <span className="loading loading-bars loading-md text-primary"></span>
            <span className="loading loading-bars loading-lg text-primary"></span>
          </div>
        )}

        {res[0]?.response?.status === 404 ? (
          <div
            role="alert"
            className="alert alert-warning ml-44 mr-44 alert-dismissible"
          >
            <IoIosAlert style={{ height: "2rem", width: "2rem" }} />
            <span>no se encontro ningun producto</span>
          </div>
        ) : res.length > 0 ? (
          res &&
          Array.isArray(res) &&
          res?.map((item, index) => (
            <div className="card w-96 bg-base-100 shadow-xl m-4" key={index}>
              <figure>
                <Image
                  src={
                    item?.imagen?.length > 0
                      ? item.imagen
                      : "https://res.cloudinary.com/ds1n3ewwk/image/upload/v1706720188/play_store-1706720186222-537153358.jpg.jpg"
                  }
                  alt="Shoes"
                  layout="responsive"
                  width={600}
                  height={600}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {item.nombre}
                  <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>{item.descripcion}</p>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline">{item.precio}</div>
                  <div className="badge badge-outline">
                    category:{item.categoriaId}
                  </div>
                  <button
                    className="btn btn-outline btn-accent"
                    onClick={() => addCar(item)}
                  >
                    <HiOutlineShoppingCart
                      style={{ height: "2rem", width: "2rem" }}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : data! ? (
          data?.map((item:any, index) => (
            <div className="card w-96 bg-base-100 shadow-xl m-4" key={index}>
              <figure>
                <Image
                  src={
                    item.imagen.length > 0
                      ? item.imagen
                      : "https://res.cloudinary.com/ds1n3ewwk/image/upload/v1706720188/play_store-1706720186222-537153358.jpg.jpg"
                  }
                  alt="Shoes"
                  layout="responsive"
                  width={600}
                  height={600}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {item.nombre}
                  <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>{item.descripcion}</p>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline">${item.precio}</div>
                  <div className="badge badge-outline">
                    category:{item.categoriaId}
                  </div>
                  <button
                    className="btn btn-outline btn-accent"
                    onClick={() => addCar(item)}
                  >
                    <HiOutlineShoppingCart
                      style={{ height: "2rem", width: "2rem" }}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>sin productos</p>
        )}
      </div>
    </>
  );
}
