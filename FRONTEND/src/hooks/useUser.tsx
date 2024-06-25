import { useEffect, useMemo, useRef, useState } from "react";
import {
  addUser,
  addImagenUser,
  //deleteUser,
  updateUs,
  getUser,
  recoveryPassword,
  changePassword,
} from "@/services/api/users";

import { toast } from "react-toastify";

import { useRouter } from "next/navigation";

export const useUser = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const router = useRouter();

  const fetchData = async (id: number) => {
    try {
      const response = await getUser(id);
      setData(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  ///update
  const updateUser = async (id: number, body: any) => {
    try {
      const response = await updateUs(id, body);
      if (!response) {
        toast.warning("ERROR AL ACTUALIZAR USER");
      } else {
        console.log("correcto");
        toast.success("SE ACTUALIZO EL USER CORRECTAMENTE");
      }
      fetchData(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  /////createProduct
  const CreateUser = async (body: any) => {
    try {
      const res = await addUser(body);
      if (!res) {
        toast.warning(
          "ERROR AL GUARDAR USER , EMAIL O TELEFONO YA ESTA REGISTRADO"
        );
      } else {
        console.log("correcto");
        toast.success("SE REGISTRO EL USER CORRECTAMENTE");
        router.push("/login");
      }

      return res;
    } catch (error) {
      console.log(error);
    }
  };

  /////////PASSWORD
  const sendRecoveryPassword = async (body: any) => {
    try {
      const response = await recoveryPassword(body);
      if (!response) {
        toast.warning("ERROR");
        console.log("error");
      } else {
        console.log("correcto");
        toast.success("SE ENVIO CORRECTAMENTE TOKEN DE RECUPERACION");
      }
      console.log("response", response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  ///CHAGE PASSWORD
  const changeRecoveryPassword = async (body: any, token: string) => {
    try {
      const response = await changePassword(body, token);
      if (!response) {
        toast.warning("ERROR LINK EXPIRADO O INVALIDO");
        console.log("error");
      } else {
        console.log("correcto");
        toast.success("SE CAMBIO CORRECTAMENTE LA CONTRASEÑA");
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      }
      console.log("response", response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  ////delete
  /* const deleteUs = async (id: number) => {
    try {
      const response = await deleteUser(id);

      if (!response) {
        toast.warning("ERROR AL ELIMINAR USER");
      } else {
        console.log("correcto", response);
        setData(response);
        await toast.success("SE ELIMINO CORRECTAMENTE " + id);
      }
    } catch (error) {
      console.log(error);
    }
}//*/

  return {
    setModal,
    modal,
    data,
    loading,
    setLoading,
    fetchData,
    updateUser,
    CreateUser,
    sendRecoveryPassword,

    changeRecoveryPassword,
  };
};
