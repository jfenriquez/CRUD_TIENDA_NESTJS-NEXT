"use client";
import { useAppContext } from "@/context/Index";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";

import React, { useState } from "react";
import { FaArrowAltCircleLeft, FaArrowLeft, FaTrashAlt } from "react-icons/fa";
import MercadoPago, { PaymentMethod } from "mercadopago";

//import { Separator } from "@/components/ui/separator"

const ShoppingCart = () => {
  const { car, removeCar, total } = useAppContext();

  const [preferenceId, setPreferenceId] = useState(null);
  //const urlAPI = process.env.REACT_APP_SERVER_BACKEND;
  initMercadoPago(`${process.env.NEXT_PUBLIC_MERCADOPAGO_KEY}`, {
    locale: "es-CO",
  });

  ////createPreference();
  const createPreference = async () => {
    try {
      const response = await axios.post(`http://localhost:3001/v1/PAYMENT`, {
        title: "Pedido de name",
        description: localStorage.getItem("car"),
        quantity: 1,
        currency_id: "COP",
        unit_price: parseInt(total),
      });

      const { id } = response.data;
      return id;
    } catch (error) {
      console.error(error);
    }
  };

  const handlePayment = async () => {
    try {
      const id = await createPreference();
      console.log(id, "___________________");
      if (id) {
        setPreferenceId(id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6">
      <div className="flex items-center mb-4">
        <button
          onClick={() => window.history.back()}
          className="btn btn-ghost btn-sm"
        >
          <FaArrowAltCircleLeft style={{ fontSize: "2em" }} />
        </button>
      </div>
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      <div className="border rounded-lg overflow-hidden">
        <table className="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th className="w-[32px]" />
            </tr>
          </thead>
          <tbody>
            {car.map((item: any) => (
              <tr key={item.id}>
                <td className="font-medium">{item.nombre}</td>
                <td>${item.precio}</td>
                <td>
                  <input
                    id="quantity"
                    className="w-20"
                    defaultValue="1"
                    type="number"
                  />
                </td>
                <td>${item.precio}</td>
                <td>
                  <button onClick={() => removeCar(item.id)}>
                    <FaTrashAlt className="h-5 w-5" />
                    <span className="sr-only">Remove</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6">
        <div className="card w-96 badge-primary ">
          <div className="card-body">
            <h2 className="card-title">RESUMEN TOTAL</h2>

            <div className="card-actions justify-end">
              <div>Subtotal: </div>
              <div className="ml-0 ">${total}</div>
              <div className="flex items-center ml-auto">
                <div>Shipping: </div>
                <div className="ml-auto">$5</div>
              </div>
              <br></br>
              <div className="flex flex-col w-full">
                <div className="divider divider-neutral">Resumen pedido</div>
              </div>
              <div className="flex items-center font-medium mr-20 ">
                <div>Total: </div>
                <div className="m-auto">${total + 5}</div>
              </div>
              <button className="btn" onClick={handlePayment}>
                Buy Now
              </button>
              {/* ///////WALLLET */}
              {preferenceId && (
                <Wallet
                  initialization={{ preferenceId: preferenceId }}
                  //customization={{ texts: { valueProp: "smart_option" } }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
