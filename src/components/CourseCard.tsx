import React from "react";

interface CourseCardProps {
  courseName: string;
  Attendance: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ courseName, Attendance }) => {
  return (
    <div className="dashboard-container">
      <div className="attendance-box">
        <div className="attendance-content">
          <div className="attendance-progress">
            <p>{Attendance}%</p>
          </div>
          <div className="courseName">
            <p>{courseName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;