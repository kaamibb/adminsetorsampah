// api/data/index.js
import connect from "../../../utils/db";
import DataUser from "../../../models/DataUser"; // Ubah import model
import { NextResponse } from "next/server";

export async function POST(request) {
  const {
    name,
    email,
    lokasigunung,
    kertas,
    plastik,
    kaleng,
    tanggalNaik,
    tanggalTurun,
    totalPoin,
  } = await request.json();
  await connect();
  await DataUser.create({ // Ubah model yang digunakan
    name,
    email,
    lokasigunung,
    kertas,
    plastik,
    kaleng,
    tanggalNaik,
    tanggalTurun,
    totalPoin,
  });
  return NextResponse.json({ message: "Data Created" }, { status: 201 });
}

export async function GET() {
  await connect();

  try {
    const data = await DataUser.find(); // Ubah model yang digunakan

    if (!data || data.length === 0) {
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

export async function DELETE(request) {
  const email = request.nextUrl.searchParams.get("email");
  await connect();
  await DataUser.findOneAndDelete({ email }); // Ubah model yang digunakan
  return NextResponse.json({ message: "Data deleted" }, { status: 200 });
}
