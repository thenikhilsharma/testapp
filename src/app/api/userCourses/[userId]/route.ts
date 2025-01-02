import dbConnect from "@/lib/dbConnect";
import Course from "@/model/Course";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    await dbConnect();

    const { userId } = await params; // Extract userId from params
    if (!userId) {
      return Response.json({ error: "UserId is required" }, { status: 400 });
    }

    // Use a regex to match courseId that starts with userId and is followed by "_<suffix>"
    const course = await Course.find({
      courseId: { $regex: `^${userId}_`, $options: "i" }, // Case-insensitive
    });

    if (!course || course.length === 0) {
      return Response.json({ error: "No courses found for the given userId" }, { status: 404 });
    }

    return Response.json(course, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}