// app/signin/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./signin.css";
import Loading from "@/components/Loading";

export default function SignIn() {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const response = await fetch("/api/auth/signIn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      const token = data.token;
      console.log("Token:", token);

      // Save the token (for simplicity, we use localStorage here)
      if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
      }

      // Redirect to the dashboard or any other protected page
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Sign-in failed. Please check your credentials and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="loginContainer">
          <div className="loginDiv">
            <div>
              <h1 className="signInLabel">Sign In</h1>
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
                Sign In
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
