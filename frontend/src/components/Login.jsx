import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [mode, setMode] = useState("login");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login");
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const username = e.target.username.value;
    const password = e.target.password.value;

    const endpoint =
      mode === "login"
        ? "http://127.0.0.1:8000/login"
        : "http://127.0.0.1:8000/signup";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Something went wrong");
        return;
      }

      // Store user
      if (mode === "login") {
        localStorage.setItem("user", JSON.stringify(data));

        // Redirect AFTER login
        navigate("/");
      } else {
        alert("Signup successful! Please log in.");
        setMode("login");
      }
    } catch (err) {
      setError("Server error: " + err.message);
    }
  };

  return (
    <div className="flex justify-center items-center text-white font-[Quantico] mt-25">
      <div className="w-[400px] bg-[#0c1b2c] p-8 rounded-xl shadow-lg border border-white/10">
        <h1 className="text-3xl mb-6 text-center font-bold">
          {mode === "login" ? "Log In" : "Sign Up"}
        </h1>

        {error && <p className="text-red-400 mb-3 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-300">Username</label>
            <input
              type="text"
              name="username"
              required
              className="px-3 py-2 bg-transparent border border-gray-500 rounded text-white focus:outline-none focus:border-white"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              required
              className="px-3 py-2 bg-transparent border border-gray-500 rounded text-white focus:outline-none focus:border-white"
            />
          </div>

          <button
            type="submit"
            className="mt-4 py-2 bg-white text-black rounded hover:bg-gray-300 transition"
          >
            {mode === "login" ? "Log In" : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-400">
          {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={toggleMode}
            className="text-white underline cursor-pointer hover:text-gray-300"
          >
            {mode === "login" ? "Sign Up" : "Log In"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
