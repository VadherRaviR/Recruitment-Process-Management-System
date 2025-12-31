import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import JobCard from "./JobCard";

export default function OpenJobsList() {
  const [jobs, setJobs] = useState([]);
  const [activeJobId, setActiveJobId] = useState(null);

  useEffect(() => {
    api.get("/jobs")
      .then(res => {
        setJobs(res.data.filter(j => j.status === "Open"));
      })
      .catch(console.error);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-3xl font-bold text-indigo-700 mb-6">
          Open Positions
        </h1>

        <div
          className={`grid gap-6 transition-all ${
            activeJobId ? "grid-cols-1" : "grid-cols-1 md:grid-cols-3"
          }`}
        >
          {jobs.map(job => (
            <JobCard
              key={job.jobId}
              job={job}
              expanded={activeJobId === job.jobId}
              dimmed={activeJobId && activeJobId !== job.jobId}
              onExpand={() => setActiveJobId(job.jobId)}
              onCollapse={() => setActiveJobId(null)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
