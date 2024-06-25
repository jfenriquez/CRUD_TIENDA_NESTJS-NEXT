// pages/exportExcel.js
"use client";
import React from "react";
import ExcelJS from "exceljs";

export const useExcel = () => {
  const generateExcel = async (props: any) => {
    // Datos de ejemplo (sustitúyelos con tu JSON)
    //console.log(JSON.stringify(props), "::::::::::::");
    console.log(props, "::::::::::::");
    try {
      const jsonData = [...props];

      // Crear un nuevo libro de Excel
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Datos");

      // Agregar encabezados de columna
      const headers = Object.keys(jsonData[0]);
      worksheet.addRow(headers);

      // Agregar datos al archivo Excel
      jsonData.forEach((data: any) => {
        const rowValues = headers.map((header) => data[header]);
        worksheet.addRow(rowValues);
      });

      // Guardar el libro de Excel
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Crear un enlace de descarga y simular un clic
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "datos_excel.xlsx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    generateExcel,
  };
};
