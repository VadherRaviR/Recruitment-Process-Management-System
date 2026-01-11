import React, { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import { Link } from "react-router-dom";

export default function RecruiterDashboard() {
  const [stats, setStats] = useState(null);
  const [recentJobs, setRecentJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/jobs").then(res => {
      const jobs = res.data || [];

      setStats({
        total: jobs.length,
        open: jobs.filter(j => j.status === "Open").length,
        closed: jobs.filter(j => j.status === "Closed").length
      });

      setRecentJobs(jobs.slice(0, 5));
    }).finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto space-y-8">

      {/* ================= HEADER BAR ================= */}
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Recruiter Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage jobs, candidates and interviews
          </p>
        </div>

        <Link
          to="/recruiter/jobs/add"
          className="px-5 py-2.5 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700"
        >
          + Add Job
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard label="Total Jobs" value={stats.total} />
        <StatCard label="Open Positions" value={stats.open} />
        <StatCard label="Closed Positions" value={stats.closed} />
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            Recently Created Jobs
          </h2>
          <Link
            to="/recruiter/jobs"
            className="text-sm text-indigo-600 hover:underline"
          >
            View all
          </Link>
        </div>

        {recentJobs.length === 0 ? (
          <div className="p-6 text-gray-500">
            No jobs created yet.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="text-gray-600">
                <th className="px-6 py-3 text-left">Job Title</th>
                <th className="text-center">Status</th>
                <th className="text-center">Created On</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {recentJobs.map(job => (
                <tr key={job.jobId} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-3 font-medium text-gray-800">
                    {job.title}
                  </td>
                  <td className="text-center">
                    <span className="px-2 py-1 rounded text-xs bg-gray-100">
                      {job.status}
                    </span>
                  </td>
                  <td className="text-center text-gray-600">
                    {new Date(job.createdDate).toLocaleDateString()}
                  </td>
                  <td className="text-right px-6">
                    <Link
                      to={`/recruiter/jobs/${job.jobId}`}
                      className="text-indigo-600 hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-3xl font-bold text-gray-900 mt-2">
        {value}
      </div>
    </div>
  );
}
