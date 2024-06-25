import { update } from "lodash";
import { deleteCategory } from "./categories";

const API = process.env.NEXT_PUBLIC_API_URL;
const VERSION = process.env.NEXT_PUBLIC_API_VERSION;

const endPoints = {
  auth: {
    login: `${API}/${VERSION}/auth/`,
    profile: `${API}/${VERSION}/auth/find`,
    register: `${API}/${VERSION}/users/`, ////create
    updateUser: (id: number) => `${API}/${VERSION}/users/${id}`, ////update
    GetUser: (id: number) => `${API}/${VERSION}/users/${id}`, ////get
    recoveryPassword: `${API}/${VERSION}/auth/recovery/`, ////recovery
    changePassword: `${API}/${VERSION}/auth/change-password/`, ////change
    findUser: `${API}/${VERSION}/auth/find`,
  },
  products: {
    getProduct: (id: number) => `${API}/${VERSION}/productos/${id}`, ////publico
    //allProducts: `${API}/${VERSION}/productos/`,////
    getProducts: `${API}/${VERSION}/productos/`,////publico
    getOrderPriceProducts: (order:string) => `${API}/${VERSION}/productos/filtro/${order}`,////publico
    addProduct: `${API}/${VERSION}/productos`,
    updateProducts: (id: number) => `${API}/${VERSION}/productos/${id}`,
    deleteProducts: (id: number) => `${API}/${VERSION}/productos/${id}`,
  },
  categories: {
    getCategoriesList: `${API}/${VERSION}/categorias/`,////publico
    addCategory: `${API}/${VERSION}/categorias/`,
    //getCategoryItems: (id: number) =>`${API}/${VERSION}/categorias/${id}/products/`,////
    updateCategory: (id: number) => `${API}/${VERSION}/categorias/${id}/`,
    deleteCategory: (id: number) => `${API}/${VERSION}/categorias/${id}`,
  },

  /* order: {
    addOrder: `${API}/${VERSION}/files/upload/`,
    getProducts: (limit: number, offset: number) =>
      `${API}/${VERSION}/productos?limit=${limit}&offset=${offset}`,
  }, */
  files: {
    addImage: `${API}/${VERSION}/images/`,
    addImages: `${API}/${VERSION}/images/masive`
  }, 
};
export default endPoints;
