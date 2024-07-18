import { NextResponse } from "next/server";
import { db } from "../../../../../../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";

export async function GET(req) {
  return new Promise((resolve, reject) => {
    try {
      // Set CORS headers
      const headers = new Headers({
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      });

      // Handle preflight requests
      if (req.method === "OPTIONS") {
        resolve(
          new NextResponse(null, {
            headers,
          })
        );
        return;
      }

      const unsubscribe = onSnapshot(
        collection(db, "orders"),
        (querySnapshot) => {
          const ordersList = [];
          querySnapshot.forEach((doc) => {
            const orderData = { id: doc.id, ...doc.data() };
            if (
              orderData.status ===
              "Pesanan Sudah Diambil, dan Sudah Melakukan Pembayaran"
            ) {
              ordersList.push(orderData);
            }
          });
          resolve(
            new NextResponse(
              JSON.stringify({
                status: 200,
                dataLength: ordersList.length,
                data: ordersList,
              }),
              { headers }
            )
          );
        }
      );
    } catch (error) {
      console.error("Error fetching orders:", error);
      reject(
        new NextResponse(
          JSON.stringify({
            status: 500,
            message: "Internal Server Error",
          }),
          { headers }
        )
      );
    }
  });
}
