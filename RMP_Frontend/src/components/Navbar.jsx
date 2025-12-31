import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link to="/" className="flex items-center gap-2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Logo"
            className="w-10 h-10"
          />
          <h1 className="text-xl font-bold text-indigo-700">RMPS</h1>
        </Link>

        <div className="flex gap-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-indigo-600">Home</Link>
          <Link to="/jobs" className="hover:text-indigo-600">Open Positions</Link>
          <Link to="/about" className="hover:text-indigo-600">About</Link>
          <Link to="/contact" className="hover:text-indigo-600">Contact</Link>
        </div>

        {!user ? (
          <div className="flex gap-4">
            <Link
              to="/login"
              className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-600 hover:text-white"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Sign Up
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <span className="text-gray-700 font-medium">
              Hi, {user["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]}
            </span>

            <Link
              to={
                user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === "Candidate"
                  ? "/candidate/profile"
                  : "/recruiter/dashboard"
              }
              className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-600 hover:text-white"
            >
              Profile
            </Link>

            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
