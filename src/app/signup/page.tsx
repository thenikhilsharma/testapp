// app/signin/page.js
"use client";

import { useState } from "react";
import "./signup.css";
import SignUpSuccess from "@/components/signUpSuccess";
import Loading from "@/components/Loading";

export default function SignIn() {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    courseId: "",
    courseName: "",
    Attendance: "",
  });
  console.log("validationErrors", validationErrors);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    setValidationErrors({
      courseId: "",
      courseName: "",
      Attendance: "",
    });

    try {
      setIsLoading(true);
      const response = await fetch("/api/auth/signUp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
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
    } catch (err) {
      console.error(err);
      setError("Sign-Up failed. Please check your credentials and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isSubmitted ? (
        <SignUpSuccess />
      ) : isLoading ? (
        <Loading />
      ) : (
        <div className="signupContainer">
          <div className="signupDiv">
            <div>
              <h1 className="signupLabel">Sign UP</h1>
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ padding: "10px", fontSize: "16px" }}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ padding: "10px", fontSize: "16px" }}
              />
              <button
                type="submit"
                style={{
                  padding: "10px",
                  fontSize: "16px",
                  backgroundColor: "#237D8B",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
