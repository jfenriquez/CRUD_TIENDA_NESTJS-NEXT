import axios from "axios";
import endPoints from "@/services/api";
import { CategoryInterface } from "@/interfaces/CategoryInterface";

/////funcion agregar Categorieo
const addCategory = async (body: CategoryInterface) => {
  const config = {
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axios.post(
      endPoints.categories.addCategory,
      body,
      config
    );
    return response.data;
  } catch (err) {
    return console.error(err);
  }
};

/////funcion editar Categorieo
const updateCategory = async (id: number, body: CategoryInterface) => {
  const config = {
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axios.patch(
      endPoints.categories.updateCategory(id),
      body,
      config
    );
    return response;
  } catch (err) {
    return alert(err);
  }
};

/////funcion eliminar Categorieo
const deleteCategory = async (id: number) => {
  try {
    const response = await axios.delete(
      endPoints.categories.deleteCategory(id)
    );
    if (response.status === 200) {
      return getAllCategory();
    }
  } catch (err) {
    return console.error(err);
  }
};
const getAllCategory = async () => {
  try {
    const response = await axios.get(endPoints.categories.getCategoriesList);
    return response.data;
  } catch (err) {
    return console.error(err);
  }
};

export { addCategory, deleteCategory, updateCategory, getAllCategory };
