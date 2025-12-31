import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import api from "../api/axiosInstance";
import { Link } from "react-router-dom";

export default function CandidateDashboard() {
  const { user } = useContext(AuthContext);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/candidate/${user.id}/applied-jobs`);
        setAppliedJobs(res.data);
      } catch (err) {
        console.log("Error loading applied jobs", err);
      }

      try {
        const res2 = await api.get(`/candidate/${user.id}/recommended-jobs`);
        setRecommendedJobs(res2.data);
      } catch (err) {
        console.log("Error loading recommended jobs", err);
      }
    };

    if (user) fetchData();
  }, [user]);

  if (!user)
    return <p className="text-center mt-20 text-xl">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <div className="bg-indigo-600 text-white p-8 rounded-xl shadow">
        <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
        <p className="mt-2 text-lg">Your candidate dashboard overview</p>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Profile</h2>
          <p className="mt-2 text-gray-600">Email: {user.sub}</p>
          <Link
            to="/candidate/profile"
            className="mt-4 inline-block text-indigo-600 font-semibold hover:underline"
          >
            Update Profile →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Applied Jobs</h2>
          <p className="text-gray-600 mt-2">{appliedJobs.length} applications</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Recommended Jobs</h2>
          <p className="text-gray-600 mt-2">{recommendedJobs.length} suggestions</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-14 mb-4 text-indigo-700">Your Applied Jobs</h2>

      {appliedJobs.length === 0 ? (
        <p className="text-gray-600">You haven’t applied to any jobs yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {appliedJobs.map((job) => (
            <div key={job.jobId} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold">{job.title}</h3>
              <p className="text-gray-600 mt-1">Status: {job.status}</p>
              <p className="text-gray-500 mt-2">{job.description}</p>
            </div>
          ))}
        </div>
      )}

      <h2 className="text-2xl font-bold mt-14 mb-4 text-indigo-700">Recommended for You</h2>

      {recommendedJobs.length === 0 ? (
        <p className="text-gray-600">No recommendations available yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendedJobs.map((job) => (
            <div key={job.jobId} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold">{job.title}</h3>
              <p className="text-gray-500 mt-2">{job.description}</p>
              <Link
                to={`/jobs/${job.jobId}`}
                className="text-indigo-600 mt-3 inline-block hover:underline"
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-10">
        <Link
          to="/jobs"
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Browse More Jobs
        </Link>
      </div>
    </div>
  );
}
