import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  courseId: { type: String, required: true },
  courseName: { type: String, required: true },
  Attendance: { type: Number, required: true },
});

export default mongoose.models.Course || mongoose.model('Course', courseSchema);
