// @next/app-component-path
"use client";
import React, { use, useEffect, useState } from "react";
import Theme from "./Theme";
import Image from "next/image";

import Search from "./Search";
import Link from "next/link";
import { PiSignInFill } from "react-icons/pi";
import ICONO_3D from "./img_3d/ICONO_3D";
import { useAppContext } from "@/context/Index";
import { useAuth } from "@/hooks/useAuth";
import Cookie from "js-cookie";
import { useCart } from "../hooks/useCart";

const Header = (props: any) => {
  const {
    total,
    contadorProduct,
    setTotal,
    setCar,
    car,
    countItemsInLocalStorage,
  } = useAppContext();
  const auth = useAuth();

  useEffect(() => {
    /////calcular total
    /* const total = car.reduce((acc, car) => acc + parseInt(car.precio), 0);
    setTotal(total);
    console.log(total);
    ////guardar el carrito en localstorage
    const carItemsString = localStorage.getItem("car");
    /// Comprueba si hay algún valor almacenado
    if (carItemsString) {
      const carItems = JSON.parse(carItemsString);
      setCar(carItems);
    } else {
      setCar([cart]);
    } */
    countItemsInLocalStorage();
  }, [car]);

  const userData = {
    nombre: auth?.user.nombre,
    apellido: auth?.user.apellido,
    email: auth?.user.email,
    imagen: `https://ui-avatars.com/api/?name=${auth?.user.nombre}&background=random`,
    phone: auth?.user.phone,
  };
  const [login, setLogin] = useState(false);

  // Obtener el token de la cookie
  const authToken = Cookie.get("token");

  useEffect(() => {
    if (authToken) {
      auth.verificarToken();
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, [authToken]);

  return (
    <div className="navbar bg-base-100 shadow-xl p-4 rounded-xl bg-gradient-to-r from-transparent via-blue-200 to-transparent h-20 w-full">
      <div className="flex-1">
        <ICONO_3D />
      </div>
      {/* THEME */}

      <Theme />

      {/* dropdown card*/}
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">
                {contadorProduct}
              </span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div className="card-body">
              <span className="font-bold text-lg">{contadorProduct} Items</span>
              <span className="text-info">Subtotal: {total}</span>
              <div className="card-actions">
                <Link href="/cart">
                  <button className="btn btn-primary btn-block">
                    View cart
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* dropdown profile */}
        {login === true ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <Image
                  width={45}
                  height={45}
                  alt="CSS Navbar component"
                  src={userData.imagen}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <Link
                className="btn btn-ghost btn-sm rounded-btn"
                href="/dashboard"
              >
                <li>Profile</li>
              </Link>

              {/* DASHBOARD */}
              {auth.user.rol === "admin" && (
                <Link
                  className="btn btn-ghost btn-sm rounded-btn"
                  href="/dashboardAdmin"
                >
                  <li>dashboardAdmin</li>
                </Link>
              )}

              <li className="btn btn-ghost btn-sm rounded-btn">
                <a onClick={auth.signOut}>Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="rounded-t-lg">
                <PiSignInFill className="w-10 h-auto " />
              </div>
              <span className="badge badge-sm indicator-item">
                login-signup
              </span>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {/* register */}
              <li className="nav-item">
                <Link
                  className="btn btn-ghost btn-sm rounded-btn"
                  href="/register"
                >
                  Registrarse
                </Link>
              </li>
              {/* iniciar session */}
              <li className="nav-item">
                <Link
                  className="btn btn-ghost btn-sm rounded-btn"
                  href="/login"
                >
                  Iniciar Session
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
