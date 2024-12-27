import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Course from '@/model/Course';

export async function GET(req: NextRequest, { params }: { params: { courseId: string } }) {
  const { courseId } = await params;

  try {
    await dbConnect();
    const course = await Course.find({courseId: courseId});

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    return NextResponse.json(course, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}