"use client";

import { useState, useEffect } from "react";
import './styles.css';
import Link from 'next/link';
import { useRouter } from "next/navigation";

export default function RegistrationForm() {

// username fetching from token
  interface User {
      username: string;
      // add other properties if needed
  }
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState('');
  const router = useRouter();
  const [formData, setFormData] = useState({
    courseId: "",
    courseName: "",
    presents: "",
    totalClasses: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [validationErrors, setValidationErrors] = useState({
    courseId: "",
    courseName: "",
    presents: "",
    totalClasses: "",
  });

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      // console.log('Token:', token);

      if (!token) {
        router.push('/signin'); // Redirect to sign-in if no token is found
        console.log('No token found');
      }

      try {
        const response = await fetch('/api/auth/verifyToken', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        // console.log('Response:', response);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUser(data.user);
      } catch (err) {
        console.error(err);
        setError('Token verification failed.');
        router.push('/signin'); // Redirect to sign-in if token verification fails
      }
    };

    verifyToken();
  }, [router]);

  if (user?.username && user.username.split('_')[0] === "admin") {
    router.push('/admin');
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    return <p>Loading...</p>;
  }
// username fetching done

// Form submission
  
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
    presents: "",
    totalClasses: "",
    });

    // console.log("Submitting form data:", formData); // Debugging step

    // username modification + courseId modification
    const username = await user.username.split('_')[0];
    const modifiedCourseId = `${username}_${formData.courseId}`;
    const modifiedFormData = {
      ...formData,
      courseId: modifiedCourseId,
    };

    try {
      const response = await fetch("/api/addCourse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(modifiedFormData),
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
        <div className='flex flex-col items-center justify-center mt-60'>
      <h1 className="text-white">Course is Successfully Added</h1>
      <div>
        <Link href={`/userCourses/${user.username}`}>
          <div className="text-white bg-teal-800 p-3 m-2 rounded-md cursor-pointer w-40 text-center">
            Check Courses
          </div>
        </Link>
      </div>
    </div>
      ) : (
        <>
          <div className="m-[auto] max-w-xs mt-10">
            <form
              onSubmit={handleSubmit}
              className="form shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
              {/* Course ID */}
              <div className="mb-4">
                <label className="text-white text-lg mb-2">
                  Course ID:
                  <input
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline ${
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
                <label className="text-white text-lg mb-2">
                  Course Name:
                  <input
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline ${
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

              {/* Presents */}
              <div className="mb-4">
                <label className="text-white text-lg mb-2">
                  Presents:
                  <input
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline ${
                      validationErrors.presents ? "border-red-500" : ""
                    }`}
                    type="text"
                    name="presents"
                    placeholder="Presents"
                    value={formData.presents}
                    onChange={handleChange}
                    required
                  />
                </label>
                {validationErrors.presents && (
                  <p className="text-red-500 text-xs italic">
                    {validationErrors.presents}
                  </p>
                )}
              </div>

              {/* Total Classes */}
              <div className="mb-4">
                <label className="text-white text-lg mb-2">
                  Total Classes:
                  <input
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline ${
                      validationErrors.totalClasses ? "border-red-500" : ""
                    }`}
                    type="text"
                    name="totalClasses"
                    placeholder="Total Classes"
                    value={formData.totalClasses}
                    onChange={handleChange}
                    required
                  />
                </label>
                {validationErrors.totalClasses && (
                  <p className="text-red-500 text-xs italic">
                    {validationErrors.totalClasses}
                  </p>
                )}
              </div>

              <button
                className={`shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline text-lg mt-2 focus:outline-none text-white py-2 px-4 rounded ${
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
                        // d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm6 9a8 8 0 010-16V0h4a8 8 0 000 16h-4v-4zm10-"
                      />
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Add Course"
                )}
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}