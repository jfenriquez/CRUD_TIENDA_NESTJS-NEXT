import React, { use, useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useProduct } from "@/hooks/useProduct";
import { count } from "console";

ChartJS.register(ArcElement, Tooltip, Legend);

export function ChartDoughnut() {
  const { fetchData, data } = useProduct();
  const [productsLabels, setProductsLabels] = useState<any[]>([]);
  const [productsCount, setProductsCount] = useState<any[]>([]);
  ///console.log(data);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetchData();
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const categoryName = data.map((item: any) => item.categoria.nombre);
      const countProductXCategory = categoryName.reduce(
        (acc: any, curr: any) => {
          const count = data.filter(
            (item: any) => item.categoria.nombre === curr
          ).length;
          acc[curr] = count;
          return acc;
        },
        {}
      );
      /////////SETTING DATA TO STATE
      setProductsLabels(Object.keys(countProductXCategory));
      setProductsCount(Object.values(countProductXCategory));
      ///setProductsCount(count);
      //console.log(Object.values(countProductXCategory),);
    }
  }, [data]);

  const data2 = {
    labels: productsLabels,
    datasets: [
      {
        label: "# of products",
        data: productsCount,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: "30%", height: "30%" }}>
      <Doughnut data={data2} />
    </div>
  );
}
