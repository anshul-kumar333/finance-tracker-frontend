import { useState } from "react";
import { FiMail, FiLock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin() {
    if (!email || !password) {
      setError("All fields required ❌");
      return;
    }

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials ❌");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eef3ff]">
      <div className="bg-white p-8 rounded-xl w-full max-w-md shadow">
        <div className="text-center mb-6">
          <div className="text-4xl text-indigo-600 mb-2">👛</div>
          <h2 className="text-2xl font-bold">Welcome Back</h2>
          <p className="text-gray-500">Sign in to your finance tracker</p>
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div className="space-y-4 mt-4">
          <div className="flex items-center border rounded px-3">
            <FiMail className="text-gray-400" />
            <input
              className="w-full p-2 outline-none"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex items-center border rounded px-3">
            <FiLock className="text-gray-400" />
            <input
              type="password"
              className="w-full p-2 outline-none"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-black text-white py-2 rounded-lg"
          >
            Sign In
          </button>

          <p className="text-center text-sm">
            Need an account?{" "}
            <Link to="/signup" className="text-indigo-600 font-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
