"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import '././course.css';

const Subject = () => {

  const [subject, setSubject] = useState();
  const pathname = usePathname();
  const pathId = pathname.split("/").pop()

  useEffect(() => {
    async function getCourseById(id) {
      const data = await fetch(`http://localhost:3000/api/courses/${id}`);
      setSubject(await data.json());
    }
    getCourseById(pathId);

  }, [pathId]);

  if (!subject){
    return <h1>Loading...</h1>
  }

  return (
        <div className='dashboard-container'>
            <div className="course-title">
                <h1>{subject[0].courseName}</h1>
            </div>
            <div className="attendance-box">
                <div className="attendance-heading">
                    <h2>attendance</h2>
                </div>
                <div className="attendance-content">
                    <div className="attendance-progress">
                        <p>{subject[0].Attendance}%</p>
                    </div>
                    <div className="attendance-data">
                        <p>present: 10</p>
                        <p>absent: 2</p>
                        <p>total: 12</p>
                    </div>
                </div>
            </div>
            <div className="miss-box">
                <div className="miss-heading">
                    <h2>lectures left: 17</h2>
                    <h2>you can miss: 3 more classes</h2>
                </div>
            </div>
            <div className="score-box">
                <div className="score-heading">
                    <h2>scores</h2>
                </div>
                <div className="course-scores">
                    <p>mid-sem: 8/30</p>
                    <p>class test: 4/10</p>
                    <p>assignment: 5/10</p>
                    <p>end-sem: 17/50</p>
                </div>
            </div>
        </div>
    );
};

export default Subject;
