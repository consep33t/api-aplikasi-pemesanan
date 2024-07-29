import { db } from "../../../../../../../firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  const { orderId, action } = params;

  let newStatus;
  if (action === "complete") {
    newStatus = "Pesanan Di Proses";
  } else if (action === "pickup") {
    newStatus = "Pesanan Selesai";
  } else {
    return NextResponse.json({ status: 400, message: "Invalid action" });
  }

  try {
    const orderRef = doc(db, "orders", orderId);
    await updateDoc(orderRef, { status: newStatus });
    return NextResponse.json({
      status: 200,
      message: "Order status updated successfully",
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
