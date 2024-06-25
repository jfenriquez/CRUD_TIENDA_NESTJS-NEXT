import { useEffect, useMemo, useRef, useState } from "react";
import {
  addCategory,
  deleteCategory,
  getAllCategory,
  updateCategory,
} from "@/services/api/categories";

import { toast } from "react-toastify";

export const useCategory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);

  // Utilizamos useMemo para memoizar la función que realiza la solicitud Axios
  // Utilizamos useMemo para memoizar la función que realiza la solicitud Axios
  const fetchData = useMemo(
    () => async () => {
      try {
        const response = await getAllCategory();
        if (response) {
          return setData(response);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  ///update
  const updateCategories = async (id: number, body: any) => {
    try {
      const response = await updateCategory(id, body);
      if (!response) {
        toast.warning("ERROR AL ACTUALIZAR CATEGORIA");
      } else {
        console.log("correcto");
        toast.success("SE ACTUALIZO EL CATEGORIA CORRECTAMENTE");
      }
      await fetchData();
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  /////createProduct
  const createCategories = async (body: any) => {
    try {
      const res = await addCategory(body);
      await fetchData();
      if (!res) {
        toast.warning("ERROR AL GUARDAR CATEGORIA");
      } else {
        console.log("correcto");
        toast.success("SE AGREGO EL CATEGORIA CORRECTAMENTE");
      }
      await fetchData();
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  ////delete
  const deleteCategories = async (id: number) => {
    try {
      const response = await deleteCategory(id);

      if (!response) {
        toast.warning(
          "ERROR AL ELIMINAR CATEGORIA, VERIFICA QUE NO ESTA SIENDO UTILIZADA POR ALGUN PRODUCTO"
        );
      } else {
        console.log("correcto", response);
        setData(response);
        await toast.success("SE ELIMINO CORRECTAMENTE " + id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    setModal,
    modal,
    data,
    loading,
    setLoading,
    fetchData,
    deleteCategories,
    updateCategories,
    createCategories,
  };
};
