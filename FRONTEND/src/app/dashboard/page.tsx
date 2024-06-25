"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { FaRegEdit } from "react-icons/fa";
import FormUser from "@/components/forms/FormUser";
//import { useRouter } from "next/router";
import Cookie from "js-cookie";
import axios from "axios";
import endPoints from "@/services/api";
import { useRouter } from "next/navigation";
const Page = () => {
  const router = useRouter();

  return (
    <>
      <div className="bg-base-300 p-8 rounded shadow-md w-full justify-end">
        <div className="flex items-center justify-center">
          <button className="btn btn-circle bg-current justify-center">
            <FaRegEdit
              style={{
                color: "red",
                width: 20,
                height: 20,
              }}
            />
          </button>
          <Image
            src="/autu.png"
            alt="avatar"
            width={150}
            height={150}
            className="rounded-full"
          />
        </div>
        <div className="mt-4 text-center">
          <h1 className="text-2xl font-bold">Nombre de Usuario</h1>
          <p>nombre</p>
          <p>apellido</p>
          <p>Correo electrónico: usuario@example.com</p>
          <p>Celular:155</p>
          <p>Cambiar password</p>
        </div>
      </div>

      <div className="flex flex-col w-full ">
        <div className="divider divider-primary">Actualizar Datos</div>
      </div>
      <center>
        <div className="flex flex-col w-2/5 ">
          <FormUser />
        </div>
      </center>
    </>
  );
};

export default Page;
