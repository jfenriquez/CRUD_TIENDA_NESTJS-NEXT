import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Cookie from "js-cookie";

import endPoints from "@/services/api";
import jwt from "jsonwebtoken";

export async function middleware(request: NextRequest) {
  // Obtener el token
  const authToken = request.cookies.get("token");
  // Si no hay token, redirige al login
  console.log(authToken, "____________________________");
  // Continuar con la solicitud si está autenticado
  if (!authToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const decodedToken = jwt.decode(authToken.value);

  try {
    const { role }: any = decodedToken;

    const response = await fetch(endPoints.auth.findUser, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const url = new URL(request.url);
    const path = url.pathname;

    if (path.startsWith("/dashboardAdmin") && role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (response.status === 201) {
      if (role === "admin") {
        return NextResponse.redirect(new URL("/dashboardAdmin"));
      } else if (role === "customer") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      } else {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// Configuración del middleware para que se ejecute en todas las rutas protegidas
export const config = {
  matcher: [
    "/dashboardAdmin/:path*",
    "/dashboard/:path*",
    "/excelreport/:path*",
  ],
};
