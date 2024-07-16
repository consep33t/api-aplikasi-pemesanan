import { NextResponse } from "next/server";

export function middleware(req) {
  const response = NextResponse.next();
  const allowedOrigins = [
    "https://apllikasi-pemesanan.vercel.app",
    "http://localhost",
    "http://localhost:3000",
  ];

  const origin = req.headers.get("origin");

  if (allowedOrigins.includes(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  } else {
    response.headers.set(
      "Access-Control-Allow-Origin",
      "https://apllikasi-pemesanan.vercel.app"
    ); // default to your production domain
  }

  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  // Handle preflight requests (OPTIONS method)
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: response.headers });
  }

  return response;
}
