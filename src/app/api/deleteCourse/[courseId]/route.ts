import dbConnect from "@/lib/dbConnect";
import Course from "@/model/Course";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  
  
  try {
    await dbConnect();
    const { courseId } = await params;
    const course = await Course.findOne({courseId});

    if (!course) {
      return console.error("Course not found");
    }

    await course.deleteOne({ courseId });

    return Response.json({ message: "Course deleted successfully" });
  } catch (error) {
    return Response.json(error);
  }
}