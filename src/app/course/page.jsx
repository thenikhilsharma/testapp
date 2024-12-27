"use client";

import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";
import "./course.css";
import CourseCard from "../../components/CourseCard";

const CourseHome = () => {
  const [courses, setCourses] = useState([]);
  // console.log("courses: ", courses);

  useEffect(() => {
    async function fetchCourses() {
      const data = await fetch("/api/courses");
      setCourses(await data.json());
    }
    fetchCourses();
  }, []);

  return (
    <>
      <div className="course-title flex justify-center mt-5">
        <h1>SEM 4 - Courses</h1>
      </div>
      {courses &&
        courses.courses &&
        courses.courses.map((course) => (
          <Link href={`/course/${course.courseId}`} key={course.courseId}>
            <div className="text-white">
              <CourseCard
                courseName={course.courseName}
                Attendance={course.Attendance}
              />
            </div>
          </Link>
        ))}
    </>
  );
};

export default CourseHome;
