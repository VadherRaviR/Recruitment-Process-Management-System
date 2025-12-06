import React, { useEffect, useState } from "react";
import api from "../../api/axiosInstance";

export default function JobsList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/jobs"); // GET /jobs
        setJobs(res.data || []);
      } catch (err) {
        console.error("Load jobs error", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto py-8">
      <h2 className="text-2xl font-semibold mb-4">All Jobs</h2>
      <div className="bg-white p-6 rounded shadow">
        <table className="w-full text-left">
          <thead className="text-xs text-gray-500 uppercase">
            <tr>
              <th className="py-2 px-3">Title</th>
              <th className="py-2 px-3">Department</th>
              <th className="py-2 px-3">Location</th>
              <th className="py-2 px-3">Applicants</th>
              <th className="py-2 px-3">Status</th>
              <th className="py-2 px-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map(j => (
              <tr key={j.jobId || j.id} className="border-t">
                <td className="py-3 px-3 font-medium">{j.title}</td>
                <td className="py-3 px-3">{j.department || "-"}</td>
                <td className="py-3 px-3">{j.location || "-"}</td>
                <td className="py-3 px-3">{j.applicantsCount ?? 0}</td>
                <td className="py-3 px-3">{j.status || "Open"}</td>
                <td className="py-3 px-3">
                  <a href={`/hr/jobs/${j.jobId || j.id}/candidates`} className="text-indigo-600">View applicants</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
