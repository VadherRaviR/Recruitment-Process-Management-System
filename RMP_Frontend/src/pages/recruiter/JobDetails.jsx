import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axiosInstance";
import StatusBadge from "../../components/recruiter/StatusBadge";

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showStatusModal, setShowStatusModal] = useState(false);
  const [nextStatus, setNextStatus] = useState("");
  const [reason, setReason] = useState("");
  const [filled, setFilled] = useState(false);
  const [closedCandidateId, setClosedCandidateId] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api
      .get(`/jobs/${id}`)
      .then(res => setJob(res.data))
      .catch(() => setJob(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!job) return <div className="p-6">Job not found</div>;

  const openStatusModal = (status) => {
    setNextStatus(status);
    setReason("");
    setFilled(false);
    setClosedCandidateId("");
    setShowStatusModal(true);
  };

 const submitStatusChange = async () => {
  try {
    setSubmitting(true);

    const payload = { status: nextStatus };

    if (nextStatus === "OnHold") {
      payload.reason = reason;
    }

    if (nextStatus === "Closed") {
      payload.filled = filled;
      if (filled) {
        payload.closedCandidateId = Number(closedCandidateId);
      } else {
        payload.reason = reason;
      }
    }

    await api.put(`/jobs/${id}/status`, payload);

    alert("Job status updated");
    setJob({ ...job, status: nextStatus });
    setShowStatusModal(false);
  } catch (err) {
    alert(err.response?.data?.message || "Failed to update job status");
  } finally {
    setSubmitting(false);
  }
};


  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">

      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-semibold">{job.title}</h2>
          <p className="text-gray-600">{job.department}</p>
        </div>
        <StatusBadge status={job.status} />
      </div>

\      {job.status !== "Open" && (
        <div className="p-4 rounded border bg-yellow-50">
          <div className="font-medium mb-1">
            Job is currently <b>{job.status}</b>
          </div>

          {job.status === "Closed" && (
            <div className="text-sm text-gray-700">
              This position is closed.
              <br />
              {job.closedCandidateId
                ? `Filled by candidate ID: ${job.closedCandidateId}`
                : "Closed without filling the position."}
            </div>
          )}

          {job.status === "OnHold" && (
            <div className="text-sm text-gray-700">
              This job is temporarily on hold.
            </div>
          )}
        </div>
      )}

      <div className="bg-white p-6 rounded shadow space-y-4">
        <div>
          <h4 className="font-semibold">Description</h4>
          <p className="text-gray-700 mt-1">{job.description}</p>
        </div>

        <div>
          <h4 className="font-semibold">Required Skills</h4>
          <ul className="list-disc pl-6 text-sm">
            {(job.requiredSkills || []).map(rs => (
              <li key={rs.skillId}>{rs.skillName}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold">Preferred Skills</h4>
          <ul className="list-disc pl-6 text-sm">
            {(job.preferredSkills || []).map(ps => (
              <li key={ps.skillId}>{ps.skillName}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex gap-3 pt-4 flex-wrap">
  <button
    onClick={() => navigate(`/recruiter/jobs/edit/${id}`)}
    className="px-4 py-2 border rounded"
  >
    Edit
  </button>

  {job.status === "Open" && (
    <>
      <button
        onClick={() => openStatusModal("OnHold")}
        className="px-4 py-2 border rounded"
      >
        Put On Hold
      </button>

      <button
        onClick={() => openStatusModal("Closed")}
        className="px-4 py-2 bg-red-600 text-white rounded"
      >
        Close Job
      </button>
    </>
  )}

  {job.status === "OnHold" && (
    <>
      <button
        onClick={() => openStatusModal("Open")}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Re-Open Job
      </button>

      <button
        onClick={() => openStatusModal("Closed")}
        className="px-4 py-2 bg-red-600 text-white rounded"
      >
        Close Job
      </button>
    </>
  )}
</div>


      {showStatusModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-96 space-y-4">
            <h3 className="text-lg font-semibold">
              Change Job Status → {nextStatus}
            </h3>

            <textarea
              placeholder="Enter reason"
              value={reason}
              onChange={e => setReason(e.target.value)}
              className="w-full border rounded p-2"
            />

            {nextStatus === "Closed" && (
              <>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={filled}
                    onChange={e => setFilled(e.target.checked)}
                  />
                  Position filled
                </label>

                {filled && (
                  <input
                    type="number"
                    placeholder="Closed Candidate ID"
                    value={closedCandidateId}
                    onChange={e => setClosedCandidateId(e.target.value)}
                    className="w-full border rounded p-2"
                  />
                )}
              </>
            )}

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowStatusModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                disabled={submitting}
                onClick={submitStatusChange}
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
