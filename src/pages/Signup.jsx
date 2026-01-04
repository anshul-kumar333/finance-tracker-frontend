import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiAlertCircle } from "react-icons/fi";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  async function handleSignup() {
    setMsg("");
    setError("");

    if (!name || !email || !password) {
      setError("All fields are required ❌");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email ❌");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters ❌");
      return;
    }

    try {
      await signup(name, email, password);

      setMsg("Account created successfully ✅ Redirecting to login...");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setError("Signup failed. Email may already exist ❌");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-slate-100">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">
        <div className="flex justify-center mb-4 text-indigo-600">
          <FiUser size={40} />
        </div>

        <h2 className="text-2xl font-bold text-center">Create Account</h2>
        <p className="text-sm text-gray-500 text-center">
          Sign up to start tracking your finances
        </p>

        {/* ERROR */}
        {error && (
          <div className="mt-4 flex items-center gap-2 bg-red-100 text-red-700 p-2 rounded text-sm">
            <FiAlertCircle />
            {error}
          </div>
        )}

        {/* SUCCESS */}
        {msg && (
          <div className="mt-4 bg-green-100 text-green-700 p-2 rounded text-sm text-center">
            {msg}
          </div>
        )}

        {/* NAME */}
        <div className="relative mt-4">
          <FiUser className="absolute left-3 top-3 text-gray-400" />
          <input
            className="w-full pl-10 p-2 border rounded"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* EMAIL */}
        <div className="relative mt-3">
          <FiMail className="absolute left-3 top-3 text-gray-400" />
          <input
            className="w-full pl-10 p-2 border rounded"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* PASSWORD */}
        <div className="relative mt-3">
          <FiLock className="absolute left-3 top-3 text-gray-400" />
          <input
            type="password"
            className="w-full pl-10 p-2 border rounded"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleSignup}
          className="w-full mt-5 bg-black text-white py-2 rounded-lg"
        >
          Sign Up
        </button>

        {/* BACK TO LOGIN */}
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-indigo-600 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
