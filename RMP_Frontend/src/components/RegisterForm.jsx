import React, { useState } from "react";
import api from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

console.log("API BASE URL =", import.meta.env.VITE_API_BASE_URL);
console.log("API OBJ =", api);

export default function RegisterForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    roleName: "Admin"   // ✅ auto-assign role
  });

  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("auth/register", form);
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        {error && <p className="text-red-500 mb-3">{error}</p>}

        <input
          name="fullName"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
        />

        <input
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
        />

        {/* Optional: Role input */}
        <select
          name="roleName"
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
        >
          <option value="Admin">Admin</option>
          <option value="HR">HR</option>
          <option value="Interviewer">Interviewer</option>
          <option value="Candidate">Candidate</option>
        </select>

        <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
          Register
        </button>
      </form>
    </div>
  );
}
