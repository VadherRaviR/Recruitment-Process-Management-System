import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axiosInstance";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import StatusBadge from "../../components/recruiter/StatusBadge";

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
    <div className="p-6 max-w-7xl mx-auto space-y-6">

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">{data.fullName}</h2>
          <p className="text-gray-500">{data.email}</p>
        </div>
        <StatusBadge status={data.applicationStatus} />
      </div>

      <div className="grid grid-cols-12 gap-6">

        <div className="col-span-4 space-y-4">

          <div className="bg-white rounded shadow p-4 space-y-2">
            <div className="text-sm text-gray-500">Candidate Details</div>

            <div>
              <span className="text-xs text-gray-500">Phone</span>
              <div className="font-medium">{data.phone || "-"}</div>
            </div>

            <div>
              <span className="text-xs text-gray-500">Experience</span>
              <div className="font-medium">{data.experienceYears} years</div>
            </div>

            {data.resumePath && (
              <a
                href={`$http://localhost:5266/api/${data.resumePath}`}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-3 text-indigo-600 text-sm underline"
              >
                View Resume
              </a>
            )}
          </div>

       
          <div className="bg-white rounded shadow p-4">
            <div className="text-sm text-gray-500 mb-2">Skills</div>

            {data.skills?.length === 0 ? (
              <div className="text-sm text-gray-400">No skills recorded</div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-sm rounded bg-gray-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="col-span-8 space-y-4">

          <div className="bg-white rounded shadow p-4">
            <div className="text-sm text-gray-500 mb-3">Interview History</div>

            {data.interviews?.length === 0 ? (
              <div className="text-sm text-gray-400">
                No interviews scheduled yet
              </div>
            ) : (
              <div className="space-y-3">
                {data.interviews.map(i => (
                  <div
                    key={i.interviewId}
                    className="border rounded p-3 flex justify-between"
                  >
                    <div>
                      <div className="font-medium">
                        {i.roundType} ({i.mode})
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(i.scheduledAt).toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        Panel: {i.panelMembers.join(", ")}
                      </div>
                    </div>

                    <StatusBadge status={i.status} />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded shadow p-4">
            <div className="text-sm text-gray-500 mb-3">
              Application Timeline
            </div>

            {data.timeline?.length === 0 ? (
              <div className="text-sm text-gray-400">
                No status updates yet
              </div>
            ) : (
              <ul className="space-y-3">
                {data.timeline.map((t, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="w-2 h-2 mt-2 bg-indigo-500 rounded-full" />
                    <div>
                      <div className="text-sm font-medium">
                        {t.oldStatus} → {t.newStatus}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(t.updatedDate).toLocaleString()} by {t.updatedBy}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
