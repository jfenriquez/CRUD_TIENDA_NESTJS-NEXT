"use client";
import React, { useState } from "react";

import Image from "next/image";
import { FaRegEdit } from "react-icons/fa";
import { IoIosArrowBack, IoIosList } from "react-icons/io";
import Link from "next/link";

const Drawer = ({ children }: any) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <div className={isOpen ? `drawer lg:drawer-open` : `drawer lg:drawer`}>
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}

          {/* Open drawer */}
          {isOpen ? (
            <button
              className="bg-slate-300 bg-opacity-50 drawer-button rounded-tr-xl rounded-br-xl"
              onClick={() => setIsOpen(!isOpen)}
            >
              <IoIosArrowBack style={{ width: 25, height: 25 }} />
            </button>
          ) : (
            <button
              className="btn bg-inherit drawer-button"
              onClick={() => setIsOpen(!isOpen)}
            >
              <IoIosList style={{ width: 25, height: 25 }} />
            </button>
          )}
          {children}
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            {/* componentes children */}

            <li>
              <Link href="/dashboardAdmin/products">PRODUCTOS</Link>
            </li>

            <li>
              <Link href="/dashboardAdmin/categories">CATEGORIAS </Link>
            </li>
            <li>
              <Link href="/dashboardAdmin/ImagesMasive">CARGAR IMAGENES</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Drawer;
