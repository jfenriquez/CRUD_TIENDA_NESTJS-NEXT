"use client";
import React, { memo, useEffect, useState } from "react";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { CategoryInterface } from "@/interfaces/CategoryInterface";
import { MdDeleteForever } from "react-icons/md";
import { FaCloudUploadAlt, FaEdit } from "react-icons/fa";
import { getAllCategory } from "@/services/api/categories";
import { TiPlus } from "react-icons/ti";
import FormCategory from "@/components/forms/FormCategory";
import { useCategory } from "@/hooks/useCategory";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

import { useRef } from "react";
import axios from "axios";

const Categories = () => {
  const {
    modal,
    setModal,
    deleteCategories,
    updateCategories,
    createCategories,
    loading,
    data,
    fetchData,
    setLoading,
  } = useCategory();
  //const [data, setData] = useState([]); //data total
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<any>([]);

  /////formdatos a actualizar
  const [dataUpdate, setDataUptate] = useState<CategoryInterface>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef(null);

  const handleModal = () => {
    setModal(false);
    setDataUptate(undefined);
  };

  ////////COLUMNAS TABLA
  const columnHelper = createColumnHelper<CategoryInterface>();

  const columns = [
    columnHelper.accessor((row) => row.id, {
      id: "id",
      cell: (info) => <i style={{ width: "50px" }}>{info.getValue()}</i>,
      header: () => <span style={{ width: "50px" }}>id</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.nombre, {
      id: "name",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>name</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("descripcion", {
      header: () => "descripcion",
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("imagen", {
      header: () => <span>IMAGE</span>,
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
    columnHelper.accessor("estado", {
      header: "Status",
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("fecha_creacion", {
      header: "fecha_creacion",
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
              await deleteCategories(info.row.original.id);
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

  ///data
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

  const validateFile = (file: File) => {
    const validTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    if (!validTypes.includes(file.type)) {
      return false;
    }
    return true;
  };
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const fileInput = event.target.files;
    if (fileInput && fileInput.length > 0) {
      const file = fileInput[0];
      if (validateFile(file)) {
        setSelectedFile(file);
      } else {
        toast.error("Invalid file type");
      }

      if (!selectedFile) {
        console.warn("No file selected");
        return; // Handle no file selection gracefully (optional)
      }
    }
  };
  const uploadCategory = async () => {
    if (!selectedFile) {
      toast.error("No file selected");
      return; // Handle no file selection gracefully (optional)
    }
    const formData = new FormData();
    formData.append("file", selectedFile);
    console.log("formData______", selectedFile);

    // Maneja los archivos seleccionados
    try {
      if (!selectedFile || !validateFile) return;

      const uploadResponse = await axios.post(
        "http://localhost:3001/v1/categorias/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (uploadResponse.data.status === 400) {
        toast.error(uploadResponse.data.message);
        return;
      }
      toast.success(uploadResponse.data.message);
      await fetchData();
    } catch (error) {
      console.error("Upload failed:", error);
      // Handle upload errors gracefully (e.g., display error message to user)
    }
  };

  return (
    <div className="overflow-x-auto ml-10 mr-10">
      <ToastContainer></ToastContainer>
      {loading ? (
        <div className="container flex justify-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : (
        <>
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* ADD CATEGOTEGORY*/}
            <button
              className="btn btn-circle btn-success m-1"
              onClick={() => {
                setModal(true);
                setDataUptate(undefined);
              }}
            >
              <TiPlus className="h-7 w-7 " />
            </button>

            {/* ADD XLSX*/}
            <input
              accept=".xlsx"
              type="file"
              className="file-input file-input-bordered file-input-primary w-full max-w-xs m-1 mt-0 h-10.5"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <button
              onClick={uploadCategory}
              className="btn btn-circle btn-outline"
              disabled={!selectedFile}
            >
              <FaCloudUploadAlt style={{ fontSize: 25 }} />
            </button>
          </div>
          {/*MODAL FORMULARIO CATEGORY */}
          {modal === true ? (
            <div>
              <FormCategory data={dataUpdate} onChange={handleModal} />
            </div>
          ) : null}

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

export default Categories;

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
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
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
