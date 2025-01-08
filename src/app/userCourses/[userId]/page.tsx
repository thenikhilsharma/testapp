"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import "./style.css";
import CourseCard from "@/components/CourseCard";
import Loading from "@/components/Loading";
import { useRouter, usePathname } from "next/navigation";

const CourseHome = () => {
  interface Course {
    courseId: string;
    presents: number;
    totalClasses: number;
  }

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const pathname = usePathname();
  const pathId = pathname.split("/").pop();
  // console.log(pathId);
  const router = useRouter();

  // Fetch courses by ID
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/userCourses/${pathId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data = await response.json();
        setCourses(await data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [pathId]);

  // Verify token
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/signin");
        return;
      }

      try {
        const response = await fetch("/api/auth/verifyToken", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Token verification failed");
        }

        const data = await response.json();
        setUser(data.user);

        // Redirect admin users
        if (data.user.username?.startsWith("admin")) {
          router.push("/admin");
        }
      } catch (err) {
        console.error(err);
        setError("Token verification failed.");
        router.push("/signin");
      }
    };
    verifyToken();
  }, [router]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="course-title flex justify-center mt-8">
            <h1>All Courses</h1>
          </div>
          <div className="courses-container">
            <div className="courses-grid">
              {courses.map((course) => (
                <Link
                  href={`/course/${course.courseId}`}
                  key={course.courseId}
                  passHref
                >
                  <div className="text-white course shadow">
                    <CourseCard
                      courseName={course.courseId.split("_")[1]}
                      Attendance={Math.floor(
                        (course.presents / course.totalClasses) * 100
                      )}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex item-center justify-center">
            <Link href="/addCourse" passHref>
              <div className="addCoursebtn mt-10 p-3 bg-green-700 rounded-lg cursor-pointer shadow">
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
