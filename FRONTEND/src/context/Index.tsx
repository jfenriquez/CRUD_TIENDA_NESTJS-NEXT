"use client";
import { useCart } from "@/hooks/useCart";
import { Children, createContext, useContext, useState } from "react";

type Context = {
  hello: string;
};

const AppContext = createContext<any>(null);

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const cart = useCart();
  //console.log(contadorProduct + "--" + total);
  //const [name, setName] = useState("2222");

  return <AppContext.Provider value={cart}>{children}</AppContext.Provider>;
}
///// 
export function useAppContext() {
  return useContext(AppContext);
}
