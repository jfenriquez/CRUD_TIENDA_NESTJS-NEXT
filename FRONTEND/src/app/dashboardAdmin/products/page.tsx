//"use strict";
"use client";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnResizeDirection,
  ColumnResizeMode,
} from "@tanstack/react-table";
import { TiPlus } from "react-icons/ti";
import Image from "next/image";

import { useState, useEffect, useReducer, memo, useMemo } from "react";

import { ProductInterface } from "../../../interfaces/ProductInterface";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

import FormsProduct from "@/components/forms/FormsProduct";
import { useProduct } from "@/hooks/useProduct";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SiMicrosoftexcel } from "react-icons/si";
import { RiFileDownloadFill } from "react-icons/ri";
//const defaultData: ProductInterface = [...data];
import { useExcel } from "@/hooks/useExcel";

const columnHelper = createColumnHelper<ProductInterface>();

const Product = () => {
  const { setModal, deleteProduct, fetchData, modal, loading, data } =
    useProduct();
  const { generateExcel } = useExcel();
  //const rerender = useReducer(() => ({}), {})[1];
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<any>([]);

  const [dataUpdate, setDataUptate] = useState<ProductInterface>();

  const handleModal = () => {
    setModal(false);
    setDataUptate(undefined);
  };

  /////columnas
  const columns = [
    columnHelper.accessor("id", {
      header: () => "id",
      cell: (info) => (
        <i key={info.column.id} style={{ width: 10, backgroundColor: "red" }}>
          {info.getValue()}
        </i>
      ),
      footer: (info) => info.column.id,
      size: 1,
      enableResizing: false,
    }),

    columnHelper.accessor((row) => row.nombre, {
      id: "name",
      cell: (info) => <i key={info.column.id}>{info.getValue()}</i>,
      header: () => <span>Name</span>,
      footer: (info) => info.column.id,
    }),

    columnHelper.accessor("descripcion", {
      header: () => "DESCRIPCION",
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("precio", {
      header: () => "PRECIO",
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("imagen", {
      header: () => <span>IMAGEN</span>,
      cell: (info) => (
        <Image
          key={info.column.id}
          src={
            info.getValue().startsWith("https://") ||
            info.getValue().startsWith("http://")
              ? info.getValue()
              : "https://res.cloudinary.com/ds1n3ewwk/image/upload/v1706720188/play_store-1706720186222-537153358.jpg.jpg"
          }
          alt="imagen"
          className="w-24 rounded-full"
          width={50}
          height={50}
        />
      ),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("stock", {
      header: "Status",
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("categoria.nombre", {
      header: "categoria",
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor(`id`, {
      header: "actions",
      ///btn update and delete
      cell: (info) => (
        <p key={info.column.id}>
          <button
            className="btn btn-circle btn-error m-1"
            onClick={async () => {
              await deleteProduct(info.row.original.id);
            }}
          >
            <MdDeleteForever className="h-6 w-6 " />
          </button>
          <button
            className="btn btn-circle btn-success m-1"
            onClick={async () => {
              await setModal(true);
              await setDataUptate(info.row.original);
            }}
          >
            <FaEdit className="h-6 w-6" />
          </button>
        </p>
      ),

      footer: (info) => info.column.id,
    }),
  ];

  ////////data
  useEffect(() => {
    fetchData();
  }, [fetchData, modal]);

  /////table
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div className="overflow-x-auto ml-10 mr-10">
      {/* <ToastContainer /> */}
      {loading ? (
        <div className="container flex justify-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : (
        <>
          {/* ADD PRODUCT */}
          <button
            className="btn btn-circle btn-success m-1"
            onClick={() => {
              setModal(true);
              setDataUptate(undefined);
            }}
          >
            <TiPlus className="h-7 w-7" />
          </button>
          {/* iconos paraa cargar y descargar datos*/}

          {/* generar excel */}
          <button
            className="btn btn-circle btn-success m-1"
            onClick={
              async () => await generateExcel(data)
              //generateExcel(data);
            }
          >
            <SiMicrosoftexcel className="h-7 w-7" />
          </button>

          {/* FORMULARIO PRODUCT */}
          {modal === true ? (
            <div>
              <FormsProduct data={dataUpdate} onChange={handleModal} />
            </div>
          ) : null}

          {/* TABLE */}
          <div>
            <DebouncedInput
              value={globalFilter ?? ""}
              onChange={(value) => setGlobalFilter(String(value))}
              className="p-2 font-lg shadow border border-block"
              placeholder="Search all columns..."
            />
          </div>
          <div>
            <table className="table">
              {/* head */}
              <thead>
                {table.getHeaderGroups().map((headerGroup, index) => (
                  <tr key={index}>
                    {headerGroup.headers.map((header, index) => (
                      <th
                        key={index}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        {header.column.getIsSorted() ? "▲" : "▼"}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {/* row 1 */}
                {table.getRowModel().rows.map((row, index) => (
                  <tr key={index}>
                    {row.getVisibleCells().map((cell, index) => (
                      <td key={index}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>

              {/* pagination */}
              {/* botones de paginacion */}
              <button
                onClick={() => table.setPageIndex(0)}
                className="btn btn-sm m-8"
              >
                primera pagina
              </button>

              <div className="join">
                <button
                  onClick={() => table.previousPage()}
                  className="join-item btn"
                >
                  « anterior
                </button>
                <button className="join-item btn">
                  Page {table.getState().pagination.pageIndex + 1} of{" "}
                  {table.getPageCount()}
                </button>
                <button
                  onClick={() => table.nextPage()}
                  className={`${
                    table.getState().pagination.pageIndex + 1 ===
                    table.getPageCount()
                      ? "join-item btn btn-disabled"
                      : "join-item btn"
                  }`}
                >
                  siguente »
                </button>
              </div>

              <button
                className="btn btn-sm m-8 "
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              >
                Ultima pagina
              </button>

              <center>
                {/* numero de paginas */}
                <span className="items-center gap-1 m-10">
                  Go to page:
                  <input
                    type="number"
                    onChange={(e) => {
                      const page = e.target.value
                        ? Number(e.target.value) - 1
                        : 0;
                      table.setPageIndex(page);
                    }}
                    className="border p-1 rounded w-16"
                    value={table.getState().pagination.pageIndex + 1}
                  />
                </span>

                {/* numero filas a mostrar */}
                <select
                  value={table.getState().pagination.pageSize}
                  onChange={(e) => {
                    table.setPageSize(Number(e.target.value));
                  }}
                >
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      Show {pageSize}
                    </option>
                  ))}
                </select>
              </center>
            </table>
          </div>
        </>
      )}
    </div>
  );
};
export default memo(Product);

//////COMPONETES

// A debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value, debounce, onChange]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
