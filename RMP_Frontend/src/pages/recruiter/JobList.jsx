import React, { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import JobCard from "../../components/recruiter/JobCard";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import { Link } from "react-router-dom";

export default function JobList() {
  const [jobs, setJobs] = useState(null);

  useEffect(() => {
    api.get("/jobs").then(res=>setJobs(res.data)).catch(()=>setJobs([]));
  }, []);

  if (jobs === null) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Jobs</h2>
        <Link to="/recruiter/jobs/add" className="px-3 py-1 bg-green-600 text-white rounded">Add Job</Link>
      </div>

      {jobs.length === 0 ? (
        <div className="text-gray-600">No jobs yet. Add one.</div>
      ) : (
        <div className="grid gap-4">
          {jobs.map(j => <JobCard key={j.jobId} job={j} />)}
        </div>
      )}
    </div>
  );
}

