import React, { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import JobCard from "../../components/recruiter/JobCard";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import { Link } from "react-router-dom";

export default function JobList() {
  const [jobs, setJobs] = useState(null);

  useEffect(() => {
    api.get("/jobs")
      .then(res => setJobs(res.data || []))
      .catch(() => setJobs([]));
  }, []);

  if (jobs === null) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Job Openings
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage and track all positions
          </p>
        </div>

        <Link
          to="/recruiter/jobs/add"
          className="px-5 py-2.5 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700"
        >
          + Add Job
        </Link>
      </div>

      {jobs.length === 0 ? (
        <div className="bg-white p-10 rounded-lg shadow text-center">
          <p className="text-gray-600 mb-4">
            No jobs created yet.
          </p>
          <Link
            to="/recruiter/jobs/add"
            className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-md"
          >
            Create your first job
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map(job => (
            <JobCard key={job.jobId} job={job} />
          ))}
        </div>
      )}

    </div>
  );
}
