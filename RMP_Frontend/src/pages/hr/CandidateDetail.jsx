import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axiosInstance";

export default function CandidateDetail() {
  const { id } = useParams();
  const [candidate, setCandidate] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/hr/candidates/${id}`); // GET /hr/candidates/:id
        setCandidate(res.data);
      } catch (err) {
        console.error("Load candidate detail", err);
      }
    };
    load();
  }, [id]);

  if (!candidate) return <p className="p-6">Loading profile...</p>;

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold">{candidate.fullName}</h2>
        <p className="text-gray-600">{candidate.email} • {candidate.phone}</p>

        <div className="mt-4">
          <h3 className="text-lg font-medium">Resume</h3>
          {candidate.resumePath ? (
            <a href={candidate.resumePath} className="text-indigo-600 hover:underline">Download Resume</a>
          ) : <p className="text-gray-500">No resume uploaded</p>}
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-medium">Applications</h3>
          <ul className="list-disc ml-6">
            {candidate.applications?.map(a => (
              <li key={a.applicationId}>{a.jobTitle} — {a.status}</li>
            )) ?? <li>No applications</li>}
          </ul>
        </div>
      </div>
    </div>
  );
}
