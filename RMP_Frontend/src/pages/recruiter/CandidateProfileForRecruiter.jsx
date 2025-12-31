import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axiosInstance";
import LoadingSpinner from "../../components/shared/LoadingSpinner";

export default function CandidateProfileForRecruiter() {
  const { jobId, candidateId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    api
      .get(`/jobs/${jobId}/applications/${candidateId}`)
      .then(res => setData(res.data))
      .catch(() => setData(null));
  }, [jobId, candidateId]);

  if (!data) return <LoadingSpinner />;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-semibold">Candidate Profile</h2>

      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold">{data.fullName}</h3>
        <p className="text-gray-600">{data.email}</p>
        <p className="text-gray-600">{data.phone}</p>
        <p className="mt-2">
          Experience: <b>{data.experienceYears}</b> years
        </p>

        <p className="mt-2">
          Status:{" "}
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
            {data.applicationStatus}
          </span>
        </p>

        {data.resumePath && (
          <a
            href={`${import.meta.env.VITE_API_BASE_URL}/${data.resumePath}`}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-3 text-indigo-600 underline"
          >
            View Resume
          </a>
        )}
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h4 className="font-semibold mb-2">Skills</h4>
        {data.skills.length === 0 ? (
          <p className="text-gray-500">No skills added</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {data.skills.map((s, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded bg-gray-100 text-sm"
              >
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
