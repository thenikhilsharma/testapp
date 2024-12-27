"use client";

import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";

const CourseHome = () => {
  const [courses, setCourses] = useState([]);
  console.log("courses: ", courses);

  useEffect(() => {
    async function fetchCourses() {
      const data = await fetch("https://dummyjson.com/users");
      setCourses(await data.json());
    }
    fetchCourses();
  }, []);

  return (
    <div>
      <h1 className="text-white size-3 m-3">Users</h1>
      {courses &&
        courses.users &&
        courses.users.map((course) => (
            <Link href={`/course/${course.id}`} key={course.id}>
              <div className="text-white">
                {course.firstName}
              </div>
            </Link>
        ))}
    </div>
  );
};

export default CourseHome;
