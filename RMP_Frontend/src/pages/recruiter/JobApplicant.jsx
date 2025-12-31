import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../api/axiosInstance";
import LoadingSpinner from "../../components/shared/LoadingSpinner";

export const candidateStatusOptions = [
  { value: "Screening", label: "Screening" },
  { value: "Shortlisted", label: "Shortlisted" },
  { value: "InterviewScheduled", label: "Interview Scheduled" },
  { value: "OfferMade", label: "Offer Made" },
  { value: "Joined", label: "Joined" },
  { value: "Rejected", label: "Rejected" }
];

export default function JobApplicants() {
  const { jobId } = useParams();

  const [list, setList] = useState(null);
  const [selected, setSelected] = useState(null);
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api
      .get(`/jobs/${jobId}/applications`)
      .then(res => setList(res.data))
      .catch(() => setList([]));
  }, [jobId]);

  if (list === null) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">
        Applicants for Job #{jobId}
      </h2>

      {list.length === 0 ? (
        <div className="text-gray-600">No applications yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Candidate</th>
                <th className="px-4 py-2">Experience</th>
                <th className="px-4 py-2">Change Status</th>
                <th className="px-4 py-2">Resume</th>
                <th className="px-4 py-2">Profile</th>
              </tr>
            </thead>
            <tbody>
              {list.map(a => (
                <tr key={a.candidateId} className="border-t">
                  <td className="px-4 py-2">
                    <div className="font-medium">{a.fullName}</div>
                    <div className="text-xs text-gray-500">{a.email}</div>
                  </td>

                  <td className="px-4 py-2 text-center">
                    {a.experienceYears} yrs
                  </td>

                  <td className="px-4 py-2 text-center">
                    <select
                      className="border rounded px-2 py-1 text-sm"
                      defaultValue=""
                      onChange={(e) => {
                        if (!e.target.value) return;
                        setSelected({
                          candidateId: a.candidateId,
                          status: e.target.value
                        });
                      }}
                    >
                      <option value="">Change Status</option>
                      {candidateStatusOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* ===== RESUME ===== */}
                  <td className="px-4 py-2 text-center">
                    {a.resumePath ? (
                      <a
                        href={`${import.meta.env.VITE_API_BASE_URL}/${a.resumePath}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-600 underline"
                      >
                        View
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td className="px-4 py-2 text-center">
                    <Link
                      to={`/recruiter/jobs/${jobId}/applications/${a.candidateId}`}
                      className="text-sm text-indigo-600 underline"
                    >
                      View Profile
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-96">
            <h3 className="text-lg font-semibold mb-3">
              Change Candidate Status
            </h3>

            <div className="text-sm text-gray-600 mb-3">
              New status: <b>{selected.status}</b>
            </div>

            {selected.status === "Rejected" && (
              <textarea
                placeholder="Enter rejection reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full border rounded p-2 mb-3"
              />
            )}

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setSelected(null);
                  setReason("");
                }}
                className="px-4 py-2 border rounded"
                disabled={submitting}
              >
                Cancel
              </button>

              <button
                disabled={submitting}
                onClick={async () => {
                  try {
                    setSubmitting(true);
                    await api.put(
                      `/jobs/${jobId}/applications/${selected.candidateId}/status`,
                      {
                        status: selected.status,
                        reason
                      }
                    );
                    alert("Status updated successfully");
                    window.location.reload();
                  } catch (err) {
                    alert(
                      err.response?.data?.message ||
                      "Failed to update status"
                    );
                  } finally {
                    setSubmitting(false);
                  }
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
