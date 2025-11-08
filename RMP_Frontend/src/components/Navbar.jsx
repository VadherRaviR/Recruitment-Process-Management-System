import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-indigo-600 text-white flex justify-between px-6 py-3 shadow-md">
      <h1 className="font-semibold text-lg">RMP System</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:text-gray-200">Home</Link>
        {user ? (
          <>
            <Link to="/dashboard" className="hover:text-gray-200">Dashboard</Link>
            {user.role === "Admin" && (
              <Link to="/admin" className="hover:text-gray-200">Admin</Link>
            )}
            <button onClick={logout} className="bg-red-500 px-3 py-1 rounded-md hover:bg-red-600">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-gray-200">Login</Link>
            <Link to="/register" className="hover:text-gray-200">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
