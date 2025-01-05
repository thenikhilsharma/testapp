import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Course from '@/model/Course';

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const { presents, totalClasses } = await req.json();
    await dbConnect();
    const { courseId } = await params;

    await Course.updateOne({courseId}, {$set:{presents, totalClasses}})

    return NextResponse.json({ message: 'Course Updated' }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}