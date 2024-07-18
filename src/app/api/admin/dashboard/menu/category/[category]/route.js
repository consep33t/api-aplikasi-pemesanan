import { NextResponse } from "next/server";
import { db } from "../../../../../../../../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { middleware } from "../../../../../../../../midleware";

export async function GET(request, { params }) {
  const corsResponse = middleware(request);
  if (corsResponse) return corsResponse;

  const { category } = params;

  try {
    // Membuat query untuk mencari dokumen berdasarkan kategori
    const q = query(collection(db, "menu"), where("category", "==", category));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const items = querySnapshot.docs.map((doc) => doc.data());
      return NextResponse.json({
        status: 200,
        dataLength: items.length,
        data: items,
      });
    } else {
      return NextResponse.json({ status: 404, message: "Menu not found" });
    }
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
