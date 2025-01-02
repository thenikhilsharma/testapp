import dbConnect from "@/lib/dbConnect";
import Course from "@/model/Course";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { courseId, courseName, presents, totalClasses } = await request.json();
  await dbConnect();
  await Course.create({ courseId,courseName, presents, totalClasses });
  return NextResponse.json({ message: "Course Added" }, { status: 201 });
}

export async function GET() {
  await dbConnect();
  const courses = await Course.find();
  return NextResponse.json({ courses });
}