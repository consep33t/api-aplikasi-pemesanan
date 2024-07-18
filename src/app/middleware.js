// app/middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  const response = NextResponse.next();

  response.headers.set("Access-Control-Allow-Origin", "http://localhost:3000");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin":
          "http://localhost:3000" || "https://apllikasi-pemesanan.vercel.app",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  return response;
}
