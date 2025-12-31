import React, { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();


  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Admin Dashboard
        </h1>

        <div className="text-center mb-4">
          <p className="text-gray-700 text-lg">
            Welcome, <span className="font-semibold">{user?.FullName || "Admin"}</span> 👋
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Email: {user?.Email}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Role: <span className="font-medium">{user?.role || "Admin"}</span>
          </p>
        </div>

        <div className="mt-8 space-y-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 transition"
          >
            Go to User Dashboard
          </button>

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 px-4 rounded-xl hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
