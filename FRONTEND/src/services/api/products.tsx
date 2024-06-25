import axios from "axios";
import endPoints from "@/services/api";
import { ProductInterface } from "@/interfaces/ProductInterface";

/////funcion agregar producto
const addProduct = async (body: ProductInterface) => {
  const config = {
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axios.post(
      endPoints.products.addProduct,
      body,
      config
    );
    return response.data;
  } catch (err) {
    return console.error(err);
  }
};

/////add imagen

const addImagen = async (formData: any) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  try {
    const response = await axios.post(
      endPoints.files.addImage,
      formData,
      config
    );
    return response.data;
  } catch (err) {
    return console.error(err);
  }
};

/////funcion editar producto
const updateProduct = async (id: number, body: ProductInterface) => {
  const config = {
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axios.patch(
      endPoints.products.updateProducts(id),
      body,
      config
    );

    return response.data;
  } catch (err) {
    return console.error(err);
  }
};

/////funcion eliminar producto
const deleteP = async (id: number) => {
  try {
    const response = await axios.delete(endPoints.products.deleteProducts(id));
    return response.data;
  } catch (err) {
    return console.error(err);
  }
};

/////funcion GETALL
const getAllProduct = async () => {
  try {
    const response = await axios.get(endPoints.products.getProducts);
    return response.data;
  } catch (err) {
    return console.error(err);
  }
};

/////funcion ORDENAR POR PRECIO
const getAllProductOrderPrice = async (order: string) => {
  try {
    const response = await axios.get(
      endPoints.products.getOrderPriceProducts(order)
    );
    return response.data;
  } catch (err) {
    return console.error(err);
  }
};

const getProducts = async (id: number) => {
  try {
    const response = await axios.get(endPoints.products.getProduct(id));
    return response.data;
  } catch (err) {
    return console.error(err);
  }
};

export {
  addProduct,
  deleteP,
  updateProduct,
  getAllProduct,
  addImagen,
  getProducts,
  getAllProductOrderPrice,
};
