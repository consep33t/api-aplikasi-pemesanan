import { NextResponse } from "next/server";
import { db } from "../../../../../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { unstable_noStore } from "next/cache";

export async function GET() {
  unstable_noStore();
  return new Promise((resolve, reject) => {
    try {
      const unsubscribe = onSnapshot(
        collection(db, "orders"),
        (querySnapshot) => {
          const ordersList = [];
          querySnapshot.forEach((doc) => {
            const orderData = { id: doc.id, ...doc.data() };
            if (orderData.status !== "Pesanan Selesai") {
              ordersList.push(orderData);
            }
          });
          resolve(
            NextResponse.json({
              status: 200,
              dataLength: ordersList.length,
              data: ordersList,
            })
          );
          unsubscribe();
        },
        (error) => {
          console.error("Error fetching orders:", error);
          reject(
            NextResponse.json({ status: 500, message: "Internal Server Error" })
          );
        }
      );
    } catch (error) {
      console.error("Error initializing onSnapshot:", error);
      reject(
        NextResponse.json({ status: 500, message: "Internal Server Error" })
      );
    }
  });
}
