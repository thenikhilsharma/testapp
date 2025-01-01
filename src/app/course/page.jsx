"use client";

import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";
import "./course.css";
import CourseCard from "../../components/CourseCard";
import Loading from "../../components/Loading";

const CourseHome = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  // console.log("courses: ", courses);

  useEffect(() => {
    async function fetchCourses() {
      try {
        setLoading(true);
        console.log(loading);
        const data = await fetch("/api/courses");
        setCourses(await data.json());
      } catch (err) {
        console.error("Error fetching courses: ", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="course-title flex justify-center mt-8">
            <h1>SEM 4 - Courses</h1>
          </div>
          <div className="courses-container">
            <div className="courses-grid">
              {courses &&
                courses.courses &&
                courses.courses.map((course) => (
                  <Link
                    href={`/course/${course.courseId}`}
                    key={course.courseId}
                  >
                    <div className="text-white course">
                      <CourseCard
                        courseName={course.courseName.slice(0, 3)}
                        Attendance={course.Attendance}
                      />
                    </div>
                  </Link>
                ))}
            </div>
          </div>
          <div className="flex item-center justify-center">
            <Link href="/addCourse">
              <div className="addCoursebtn mt-6 p-5 bg-cyan-900 rounded-full cursor-pointer">
                <p>Add Course</p>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseHome;
