import axios from "axios";
import { useMemo, useRef, useState } from "react";
import {
  updateProduct,
  deleteP,
  addProduct,
  getAllProduct,
  addImagen,
  getProducts,
  getAllProductOrderPrice,
} from "@/services/api/products";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const useProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [dataDebouncer, setDataDebouncer] = useState([]);
  // Utilizamos useMemo para memoizar la función que realiza la solicitud Axios
  const fetchData = useMemo(
    () => async () => {
      try {
        const response = await getAllProduct();
        return setData(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Utilizamos useMemo para memoizar la función que realiza la solicitud Axios
  const fetchDataOrderPrice = async (order: string) => {
    try {
      const response = await getAllProductOrderPrice(order);
      return response;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  ///update
  const updateProducts = async (id: number, body: any) => {
    try {
      const response = await updateProduct(id, body);
      if (!response) {
        toast.warning("ERROR AL ACTUALIZAR PRODUCTO");
      } else {
        await toast.success("SE ACTUALIZO EL PRODUCTO CORRECTAMENTE");
      }
    } catch (error) {
      console.log(error);
    }
  };

  /////createProduct

  const createProduct = async (body: any) => {
    try {
      const res = await addProduct(body);
      await fetchData();
      if (!res) {
        await toast.warning("ERROR AL GUARDAR PRODUCTO");
      } else {
        await fetchData();
        console.log("correcto");
        await toast.success("SE AGREGO EL PRODUCTO CORRECTAMENTE");
      }
    } catch (error) {
      console.log(error);
    }
  };

  ////delete
  const deleteProduct = async (id: number) => {
    try {
      const res = await deleteP(id);
      await fetchData();
      await toast.success("SE ELIMINO CORRECTAMENTE");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    setModal,
    modal,
    data,
    setData,
    loading,
    fetchData,
    dataDebouncer,
    deleteProduct,
    updateProducts,
    createProduct,
    fetchDataOrderPrice,
  };
};
