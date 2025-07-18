import { useState } from "react";
import axios from "../../services/axiosInstance";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout";

const Signup = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/signup", form);
      navigate("/login");
      alert("Sign Up successful");
    } catch {
      alert("Signup failed");
    }
  };

  return (
    <AuthLayout title="Create an Account">
      <button
        onClick={() => navigate("/")}
        className="text-sm text-blue-500 hover:underline mb-2"
      >
        ← Back to Home
      </button>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          required
          className="w-full p-2 border border-gray-300 rounded"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          required
          className="w-full p-2 border border-gray-300 rounded"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className="w-full p-2 border border-gray-300 rounded"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
        >
          Sign Up
        </button>
        <p className="text-sm text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Signup;
