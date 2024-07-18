// app/api/admin/orders/history/[orderId]/route.js
import { db } from "../../../../../../../firebaseConfig";
import { NextResponse } from "next/server";
import { deleteDoc, doc } from "firebase/firestore";

export async function DELETE(request, { params }) {
  const { orderId } = params;

  try {
    const orderRef = doc(db, "orders", orderId);
    await deleteDoc(orderRef);

    return NextResponse.json({
      status: 200,
      message: "Order status updated successfully",
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
