import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Course from '@/model/Course';

export async function GET(req: NextRequest, context: { params: { courseId: string } }) {
  const { params } = context; // Access the `params` object first
  const courseId = params.courseId; // Then access `courseId`

  try {
    await dbConnect();
    const course = await Course.findOne({ courseId });

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    return NextResponse.json(course, { status: 200 });
  } catch (error) {
    console.error('Database connection or query error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}