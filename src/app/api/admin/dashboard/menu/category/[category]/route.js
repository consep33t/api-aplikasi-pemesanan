import { NextResponse } from "next/server";
import { db } from "../../../../../../../../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { unstable_noStore } from "next/cache";

export async function GET(request, { params }) {
  unstable_noStore();
  const { category } = params;

  try {
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
