import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function HRSidebar() {
  const loc = useLocation();
  const isActive = (p) => loc.pathname.startsWith(p);

  return (
    <div className="sticky top-20 bg-white p-4 rounded shadow">
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-600">HR Menu</h3>
      </div>
      <nav className="flex flex-col gap-2">
        <Link className={`px-3 py-2 rounded ${isActive("/hr/dashboard") ? "bg-indigo-50 text-indigo-700" : "text-gray-700 hover:bg-gray-50"}`} to="/hr/dashboard">Dashboard</Link>
        <Link className={`px-3 py-2 rounded ${isActive("/hr/jobs") ? "bg-indigo-50 text-indigo-700" : "text-gray-700 hover:bg-gray-50"}`} to="/hr/jobs">Jobs</Link>
        <Link className={`px-3 py-2 rounded ${isActive("/hr/jobs/add") ? "bg-indigo-50 text-indigo-700" : "text-gray-700 hover:bg-gray-50"}`} to="/hr/jobs/add">Add Job</Link>
        <Link className={`px-3 py-2 rounded ${isActive("/hr/candidates") ? "bg-indigo-50 text-indigo-700" : "text-gray-700 hover:bg-gray-50"}`} to="/hr/candidates">Candidates</Link>
        <Link className={`px-3 py-2 rounded ${isActive("/hr/interviews") ? "bg-indigo-50 text-indigo-700" : "text-gray-700 hover:bg-gray-50"}`} to="/hr/interviews">Interviews</Link>
        <Link className={`px-3 py-2 rounded ${isActive("/hr/hiring") ? "bg-indigo-50 text-indigo-700" : "text-gray-700 hover:bg-gray-50"}`} to="/hr/hiring">Offers / Hiring</Link>
      </nav>

      <div className="mt-6 text-xs text-gray-500">
        <a href="/docs" className="hover:underline">Docs</a> • <a href="/reports" className="hover:underline">Reports</a>
      </div>
    </div>
  );
}
