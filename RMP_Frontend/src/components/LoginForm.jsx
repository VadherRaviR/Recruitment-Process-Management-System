import React, { useState, useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import api from "../api/axiosInstance";
import { useNavigate } from "react-router-dom"; 
import { jwtDecode } from "jwt-decode";


export default function LoginForm() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      login(res.data.token);
      const decoded = jwtDecode(res.data.token);
      console.log(decoded);
      if ( decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]=== "Candidate") {
      navigate("/candidate/dashboard");
   } 
   else if ( decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]=== "HR") {
      navigate("/hr/dashboard");
   }else if ( decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]=== "Admin") {
      navigate("/recruiter/dashboard");
   }
    } catch {
      setError("Invalid email or password");
    }
  };
 
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        {error && <p className="text-red-500 mb-3">{error}</p>}
        <input
          name="email"
          type="email"
          placeholder="Email"
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
        <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
          Login
        </button>
      </form>
    </div>
  );
}
