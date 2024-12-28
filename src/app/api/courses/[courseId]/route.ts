import dbConnect from "@/lib/dbConnect";
import Course from "@/model/Course";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    await dbConnect();

    const {courseId} = await params;
    const course = await Course.find({ courseId: courseId });

    if (!course) {
      return Response.json({ error: "Course not found" }, { status: 404 });
    }

    return Response.json(course, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
