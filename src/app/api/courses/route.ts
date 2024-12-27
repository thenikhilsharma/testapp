import dbConnect from "@/lib/dbConnect";
import Course from "@/model/Course";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const courses = await Course.find();
  return NextResponse.json({ courses });
}