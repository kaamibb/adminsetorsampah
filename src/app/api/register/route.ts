import Admin from "@/models/Admin";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
  const { email, password } = await request.json();

  await connect();

  const existingadmin = await Admin.findOne({ email });

  if (existingadmin) {
    return new NextResponse("Email is already in use", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 5);
  const newadmin = new Admin({
    email,
    password: hashedPassword,
  });

  try {
    await newadmin.save();
    return new NextResponse("admin is registered", { status: 200 });
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }
};
