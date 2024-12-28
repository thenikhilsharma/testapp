"use client";

import { useState } from "react";
import Success from "@/components/Success";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    courseId: "",
    courseName: "",
    Attendance: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [validationErrors, setValidationErrors] = useState({
    courseId: "",
    courseName: "",
    Attendance: "",
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Reset validation errors
    setValidationErrors({
    courseId: "",
    courseName: "",
    Attendance: "",
    });

    console.log("Submitting form data:", formData); // Debugging step

    try {
      const response = await fetch("/api/addCourse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        const data = await response.json();
        console.log("User registered:", data);
        setIsSubmitted(true);
      } else if (response.status === 400) {
        const data = await response.json();
        console.log("Error data from server:", data); // Log the server error response
        if (data.errors) {
          setValidationErrors(data.errors);
        } else {
          // Handle unexpected error structure
          console.error("Unexpected error structure:", data);
        }
      } else {
        console.error("Registration failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isSubmitted ? (
        <Success />
      ) : (
        <>
          <div className="m-[auto] max-w-xs mt-10">
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
              {/* Course ID */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Course ID:
                  <input
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      validationErrors.courseId ? "border-red-500" : ""
                    }`}
                    type="text"
                    name="courseId"
                    placeholder="Course Name"
                    value={formData.courseId}
                    onChange={handleChange}
                    required
                  />
                </label>
                {validationErrors.courseId && (
                  <p className="text-red-500 text-xs italic">
                    {validationErrors.courseId}
                  </p>
                )}
              </div>

              {/* Course Name */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Course Name:
                  <input
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      validationErrors.courseName ? "border-red-500" : ""
                    }`}
                    type="text"
                    name="courseName"
                    placeholder="Course Name"
                    value={formData.courseName}
                    onChange={handleChange}
                    required
                  />
                </label>
                {validationErrors.courseName && (
                  <p className="text-red-500 text-xs italic">
                    {validationErrors.courseName}
                  </p>
                )}
              </div>

              {/* Attendance */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Attendance:
                  <input
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      validationErrors.Attendance ? "border-red-500" : ""
                    }`}
                    type="text"
                    name="Attendance"
                    placeholder="Attendance"
                    value={formData.Attendance}
                    onChange={handleChange}
                    required
                  />
                </label>
                {validationErrors.Attendance && (
                  <p className="text-red-500 text-xs italic">
                    {validationErrors.Attendance}
                  </p>
                )}
              </div>

              <button
                className={`shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin inline-block h-4 w-4 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm6 9a8 8 0 010-16V0h4a8 8 0 000 16h-4v-4zm10-"
                      />
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Register"
                )}
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}