"use client";
import { useAuth } from "@/hooks/useAuth";
import { useUser } from "@/hooks/useUser";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookie from "js-cookie";
import axios from "axios";
import endPoints from "@/services/api";
const Login = () => {
  const [username, setUsername] = React.useState("john@G22.co");
  const [password, setPassword] = React.useState("1SS234");
  //const { login } = useUser();
  const router = useRouter();
  const auth = useAuth();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    try {
      auth
        .signIn(username, password)
        .then(() => {
          return toast.success(`Welcome to the system, ${username}`);
        })
        .catch((error: any) => {
          return toast.error(`error password or email`);
        });

      setUsername("");
      setPassword("");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Comprueba si hay una cookie de sesión al cargar la página
    const authToken = Cookie.get("token");
    (async () => {
      try {
        const response = await axios.post(endPoints.auth.findUser, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (response.status === 201) {
          if (response.data.rol === "admin") router.push("/dashboardAdmin");
          if (response.data.rol === "customer") router.push("/dashboard");
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="hero min-h-screen bg-base-100">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left ">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-md shadow-2xl bg-slate-700 m-9">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label className="label">
                <Link href="/recoveryPassword">Forgot password?</Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
