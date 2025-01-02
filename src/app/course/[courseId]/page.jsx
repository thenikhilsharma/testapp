"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import "./courseSpecific.css";
import Loading from "../../../components/Loading";
import Router from "next/router";

const Subject = () => {
  const [subject, setSubject] = useState();
  const [attendance, setAttendance] = useState(null);
  const pathname = usePathname();
  const pathId = pathname.split("/").pop();
  const router = Router;

  useEffect(() => {
    async function getCourseById(id) {
      const data = await fetch(`/api/courses/${id}`);
      setSubject(await data.json());
    }
    getCourseById(pathId);
  }, [pathId]);

  useEffect(() => {
    if (subject) {
      const calculateAttendance = (
        totalClasses,
        presents,
        requiredPercentage = 75
      ) => {
        const currentPercentage = (presents / totalClasses) * 100;

        if (currentPercentage >= requiredPercentage) {
          let additionalMissable = 0;
          while (
            (presents / (totalClasses + additionalMissable)) * 100 >=
            requiredPercentage
          ) {
            additionalMissable++;
          }
          return {
            color: "green",
            status: "You can miss: ",
            message: `${additionalMissable - 1} more classes.`,
          };
        } else {
          let additionalRequired = 0;
          while (
            ((presents + additionalRequired) /
              (totalClasses + additionalRequired)) *
              100 <
            requiredPercentage
          ) {
            additionalRequired++;
          }
          return {
            color: "red",
            status: "attend ",
            message: `${additionalRequired} more classes.`,
          };
        }
      };

      const attendanceResult = calculateAttendance(
        subject[0].totalClasses,
        subject[0].presents,
        75
      );
      setAttendance(attendanceResult);
    }
  }, [subject]);
  
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/deleteCourse/${pathId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const data = await response.json();
      } else {
        const errorData = await response.json();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!subject) {
    return <Loading />;
  }

  return (
    <div className="dashboard-container">
      <div className="course-title">
        <h1>{subject[0].courseName}</h1>
      </div>
      <div className="attendance-box">
        <div className="attendance-heading">
          <h2>attendance</h2>
        </div>
        <div className="attendance-content">
          <div className="attendance-progress">
            <p>
              {Math.floor(
                (subject[0].presents / subject[0].totalClasses) * 100
              )}
              %
            </p>
          </div>
          <div className="attendance-data">
            <p>present: {subject[0].presents}</p>
            <p>absent: {subject[0].totalClasses - subject[0].presents}</p>
            <p>total: {subject[0].totalClasses}</p>
          </div>
        </div>
      </div>
      <div className="miss-box">
        <div className="miss-heading">
          <h2>lectures left: 17</h2>
          <h2 style={{ color: attendance ? attendance.color : "white" }}>
            {attendance ? attendance.status : "Calculating..."}{" "}
            {attendance ? attendance.message : "Calculating..."}
          </h2>
        </div>
      </div>
      <div className="score-box">
        <div className="score-heading">
          <h2>scores</h2>
        </div>
        <div className="score-content">
          <div className="course-scores">
            <p>mid-sem: 8/30</p>
            <p>class test: 4/10</p>
            <p>assignment: 5/10</p>
            <p>end-sem: 17/50</p>
          </div>
          <div className="total-score">
            <p>34/100</p>
          </div>
        </div>
      </div>
      <div className="deleteCourse">
        <button className="deleteCoursebtn" onClick={handleDelete}>
          Delete Course
        </button>
      </div>
    </div>
  );
};

export default Subject;
