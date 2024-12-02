import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (password !== verifyPassword) {
      setError("Passwords do not match");
      return;
    }

    // Replace with your server's API endpoint
    const signupUrl = "/api/signup";

    try {
      const response = await fetch(signupUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Signup failed");
        return;
      }

      // If signup is successful, redirect to the profile page
      navigate("/Kanbas/Account/Profile");
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div id="wd-signup-screen">
      <h3>Sign up</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSignup}>
        <input
          placeholder="username"
          className="form-control mb-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="password"
          type="password"
          className="form-control mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          placeholder="verify password"
          type="password"
          className="form-control mb-2"
          value={verifyPassword}
          onChange={(e) => setVerifyPassword(e.target.value)}
        />
        <button type="submit" className="btn btn-primary w-100">
          Sign up
        </button>
      </form>
    </div>
  );
}