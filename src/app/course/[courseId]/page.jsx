"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import "./courseSpecific.css";
import Loading from "../../../components/Loading";
import { useRouter } from "next/navigation";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const Subject = () => {
  const [subject, setSubject] = useState();
  const [presents, setPresents] = useState(0);
  const [totalClasses, setTotalClasses] = useState(0);
  const [attendance, setAttendance] = useState(null);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const pathId = pathname.split("/").pop();
  const router = useRouter();

  useEffect(() => {
    // to fetch GET data from database
    async function getCourseById(id) {
      try {
        const response = await fetch(`/api/courses/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch course data");
        }
        const data = await response.json();
        setSubject(data);
        setPresents(data[0].presents); // Initialize state with fetched data
        setTotalClasses(data[0].totalClasses);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    }
    getCourseById(pathId);
  }, [pathId]);

  useEffect(() => {
    // to calculate attendance and verify if >55%
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
        if (confirm("Do you want to delete this course:")){
          const data = await response.json();
          router.push(`/userCourses/${pathId.split('_')[0]}`)
        }
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

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/markit/${pathId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ presents, totalClasses }),
      });
      if (!response.ok) {
        throw new Error("Failed to update attendance");
      }
      // const data = await response.json();
      // setPresents(data.presents);
      // setTotalClasses(data.totalClasses);
    } catch (error) {
      console.error("Error updating attendance:", error);
    } finally {
      setLoading(false);
      // router.push(`/course/${courseId}`);
    }
  };

  const handleChange = async (d) => {
    if (d === "p1") {
      setPresents((prev) => prev + 1);
      setTotalClasses((prev) => prev + 1);
    } else if (d === "p0") {
      setPresents((prev) => prev - 1);
      setTotalClasses((prev) => prev - 1);
    } else if (d === "a1") {
      setTotalClasses((prev) => prev + 1);
    } else if (d === "a0") {
      setTotalClasses((prev) => prev - 1);
    }
  };

  const handleBack = async() => {
    router.push(`/userCourses/${pathId.split('_')[0]}`);
  }

  return (
    <div className="dashboard-container">
      <div className="course-title">
        <button onClick={() => {handleBack()}}>
          <KeyboardBackspaceIcon />
        </button>
        <div className="course-title-title">
        <h1 className="ml-5 mr-5">{subject[0].courseName}</h1>
        </div>
        <button className='hidden-back' onClick={() => {handleBack()}}>
          <KeyboardBackspaceIcon />
        </button>
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
            <p>present: {presents}</p>
            <p>absent: {totalClasses - presents}</p>
            <p>total: {totalClasses}</p>
          </div>
        </div>
      </div>
      <div className="miss-box">
        <div className="miss-heading">
          {/* <h2>lectures left: 17</h2> */}
          <h2 style={{ color: attendance ? attendance.color : "white" }}>
            {attendance ? attendance.status : "Calculating..."}{" "}
            {attendance ? attendance.message : "Calculating..."}
          </h2>
        </div>
      </div>
      <div className="update-box miss-box">
        {/*===============================================*/}

          <div className="text-lg">
            <div className="presents mb-2">
              <h1 className="mr-5">Present:</h1>
              <div className="presents-btn">
                <button
                  onClick={() => handleChange("p1")}
                  aria-label="Mark Present"
                  className="mark">
                  mark
                </button>
                <button
                  onClick={() => handleChange("p0")}
                  aria-label="Unmark Present"
                  className="unmark">
                  unmark
                </button>
              </div>
            </div>
            <div className="absents mb-2">
              <h1>Absent</h1>
              <div className="absents-btn">
                <div className="mark">
                  <button
                    onClick={() => handleChange("a1")}
                    aria-label="Mark Absent">
                    mark
                  </button>
                </div>
                <button
                  onClick={() => handleChange("a0")}
                  aria-label="Unmark Absent"
                  className="unmark">
                  unmark
                </button>
              </div>
            </div>
          </div>
          <div className="submit">
            <form onSubmit={handleSubmit}>
              <button type="submit">update attendance</button>
            </form>
          </div>

          {/*===============================================*/}
      </div>
      <div className="score-box">
        <div className="score-heading">
          <h2>scores (coming soon)</h2>
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