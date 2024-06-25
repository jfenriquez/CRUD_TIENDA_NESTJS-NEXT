"use client";

import { isInteger, set } from "lodash";
import { useEffect, useMemo, useRef, useState } from "react";

import { toast } from "react-toastify";

export const useCart = () => {
  const [car, setCar] = useState([]);
  const [total, setTotal] = useState(0);
  const [contadorProduct, setContadorProduct] = useState(0);

  /* agregar carrito al local storage */
  ////storage local
  const addProductCar = async (car: any) => {
    /////calcular total
    const total = car.reduce(
      (acc: number, car: { precio: string }) => acc + parseInt(car.precio),
      0
    );
    setTotal(total);
    console.log(total);
    ////guardar el carrito en localstorage
    localStorage.setItem("car", JSON.stringify(car));
    countItemsInLocalStorage();

    const carItemsString: any = localStorage.getItem("car");
    const carItems = JSON.parse(carItemsString);
    setCar(carItems);
  };

  ////remover producto del carrito
  const removeCar = (productId: any) => {
    const updatedCart = car.filter((item: any) => item.id !== productId);
    localStorage.setItem("car", JSON.stringify(updatedCart));
    setCar(updatedCart);
    countItemsInLocalStorage();
  };

  //////contar productos en el carrito
  const countItemsInLocalStorage = async () => {
    try {
      const items = await localStorage.getItem("car");
      // Calculate the total price, handling potential errors
      let totalPrice = 0;
      if (items) {
        setContadorProduct(JSON.parse(items).length);
        const parsedItems = JSON.parse(items);
        totalPrice = parsedItems.reduce((acc: number, item: any) => {
          // Ensure price is a number before adding
          const price = parseFloat(item.precio); // Assuming 'price' is a property within each item object
          if (!isNaN(price)) {
            acc += price;
          }
          return acc;
        }, 0);
      }
      setTotal(totalPrice);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    car,
    setCar,
    removeCar,
    contadorProduct,
    total,
    setTotal,
    addProductCar,
    countItemsInLocalStorage,
  };
};
