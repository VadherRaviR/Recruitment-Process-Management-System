import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axiosInstance";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/jobs")
      .then(res => {
        const openJobs = res.data.filter(j => j.status === "Open");
        setJobs(openJobs.slice(0, 3)); 
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">

      <section className="text-center py-20 bg-gradient-to-br from-indigo-500 to-indigo-700 text-white">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Recruitment Process Management System
        </h1>
        <p className="text-lg max-w-2xl mx-auto">
          Manage your hiring journey easily. Browse open jobs, apply,
          and track your recruitment process in one place.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/jobs"
            className="px-6 py-3 bg-white text-indigo-700 rounded shadow hover:bg-gray-100 font-semibold"
          >
            View Open Positions
          </Link>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center mb-10 text-indigo-700">
          Current Job Openings
        </h2>

        {loading && (
          <p className="text-center text-gray-600">Loading jobs...</p>
        )}

        {!loading && jobs.length === 0 && (
          <p className="text-center text-gray-600">
            No open positions available.
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {jobs.map(job => (
            <div
              key={job.jobId}
              className="bg-white p-6 rounded shadow hover:shadow-lg"
            >
              <h3 className="text-xl font-bold">{job.title}</h3>
              <p className="text-gray-600 mt-2">
                Experience: {job.experienceRequired}+ years
              </p>
              <p className="text-gray-500 mt-1">{job.department}</p>

              <Link
                to={`/jobs/${job.jobId}`}
                className="inline-block mt-4 text-indigo-600 font-semibold hover:underline"
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/jobs"
            className="px-6 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            View All Jobs
          </Link>
        </div>
      </section>
    </div>
  );
}
