// api/data/[id].js
import connect from "@/utils/db";
import DataUser from "@/models/DataUser"; // Ubah import model
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
  await connect();

  try {
    // Ganti 'id' dengan field yang sesuai sebagai referensi
    const data = await DataUser.findOne({ email: id }); // Ubah model yang digunakan

    if (!data) {
      return NextResponse.json(
        { message: "Data not found" },
        { status: 404, headers: { "Content-Type": "application/json; charset=utf-8" } }
      );
    }

    return NextResponse.json(
      { data, status: 200, headers: { "Content-Type": "application/json; charset=utf-8" } }
    );
  } catch (error) {
    return NextResponse.error(new Error("Failed to retrieve data"), { status: 500 });
  }
}
