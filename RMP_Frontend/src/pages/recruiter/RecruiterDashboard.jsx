import React, { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import { Link } from "react-router-dom";

export default function RecruiterDashboard() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/jobs").then(res=>{
      const jobs = res.data || [];
      const total = jobs.length;
      const open = jobs.filter(j=>j.status==="Open").length;
      const closed = jobs.filter(j=>j.status==="Closed").length;
      setSummary({ total, open, closed });
    }).catch(()=>{}).finally(()=>setLoading(false));
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Recruiter Dashboard</h1>
        <div>
          <Link to="/recruiter/jobs/add" className="px-4 py-2 bg-green-600 text-white rounded">Add Job</Link>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Total Jobs</div>
          <div className="text-2xl font-semibold">{summary?.total ?? 0}</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Open Jobs</div>
          <div className="text-2xl font-semibold">{summary?.open ?? 0}</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Closed Jobs</div>
          <div className="text-2xl font-semibold">{summary?.closed ?? 0}</div>
        </div>
      </div>

      <div className="mt-6">
        <Link to="/recruiter/jobs" className="text-indigo-600">View all jobs →</Link>
      </div>
    </div>
  );
}
