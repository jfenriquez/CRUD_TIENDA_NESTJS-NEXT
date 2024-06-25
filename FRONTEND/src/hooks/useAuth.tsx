"use client";
import React, { useState, useContext, createContext } from "react";
import Cookie from "js-cookie";
import axios from "axios";
import endPoints from "@/services/api/";
import { useRouter } from "next/navigation";

const AuthContext = createContext<any>(null);

///////Provider
export function ProviderAuth({ children }: any) {
  const auth = useProviderAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

////login
function useProviderAuth() {
  const [user, setUser] = useState([]);
  const router = useRouter();

  const signIn = async (email: string, password: string) => {
    const options = {
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      endPoints.auth.login,
      { email, password },
      options
    );

    ///////TOKEN
    if (response.data.access_token) {
      const token = response.data.access_token;
      Cookie.set("token", token, { expires: 5, path: "/" }); ////httpOnly: true
      axios.defaults.headers.Authorization = `Bearer ${token}`;

      const { data: user } = await axios.post(endPoints.auth.profile);
      setUser(user);
      // redirihir
      if (user?.rol === "admin") {
        router.push("/dashboardAdmin");
      } else if (user?.rol === "customer") {
        router.push("/dashboard");
      }
    }
  };

  const signOut = () => {
    Cookie.remove("token");
    setUser([]);
    router.push("/");
  };

  const verificarToken = async () => {
    const authToken = Cookie.get("token");
    try {
      if (Cookie.get("token")) {
        axios.defaults.headers.Authorization = `Bearer ${Cookie.get("token")}`;
        const { data: user } = await axios.post(endPoints.auth.profile);
        setUser(user);
      }
    } catch (error) {
      console.log(error)
      Cookie.remove("token")
    }
  };

  return {
    user,
    signIn,
    signOut,
    verificarToken,
  };
}
