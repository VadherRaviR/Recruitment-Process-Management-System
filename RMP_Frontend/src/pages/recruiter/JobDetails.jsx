import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axiosInstance";
import StatusBadge from "../../components/recruiter/StatusBadge";

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [nextStatus, setNextStatus] = useState("");
  const [reason, setReason] = useState("");
  const [filled, setFilled] = useState(false);
  const [closedCandidateId, setClosedCandidateId] = useState("");

  useEffect(() => {
    api.get(`/jobs/${id}`)
      .then(res => setJob(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!job) return <div className="p-6">Job not found</div>;

  const openModal = (status) => {
    setNextStatus(status);
    setReason("");
    setFilled(false);
    setClosedCandidateId("");
    setShowModal(true);
  };

  const submit = async () => {
    const payload = { status: nextStatus };
    if (nextStatus === "OnHold") payload.reason = reason;
    if (nextStatus === "Closed") {
      payload.filled = filled;
      filled
        ? payload.closedCandidateId = Number(closedCandidateId)
        : payload.reason = reason;
    }

    await api.put(`/jobs/${id}/status`, payload);
    setJob({ ...job, status: nextStatus });
    setShowModal(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">

{/* ===== HEADER ===== */}
<div className="space-y-2">
  <div className="flex items-center gap-3">
    <h1 className="text-2xl font-semibold text-gray-900">
      {job.title}
    </h1>
    <StatusBadge status={job.status} />
  </div>

  <div className="text-sm text-gray-500 flex flex-wrap gap-x-4">
    <span>Department: {job.department}</span>
    <span>
      Created on: {new Date(job.createdDate).toLocaleDateString()}
    </span>
    {job.createdByName && (
      <span>Created by: {job.createdByName}</span>
    )}
  </div>
</div>

      {/* ===== ACTION BAR ===== */}
      <div className="flex flex-wrap gap-3 border-b pb-4">
        <button
          onClick={() => navigate(`/recruiter/jobs/edit/${id}`)}
          className="px-3 py-1.5 text-sm border rounded hover:bg-gray-50"
        >
          Edit
        </button>

        {job.status === "Open" && (
          <>
            <button
              onClick={() => openModal("OnHold")}
              className="px-3 py-1.5 text-sm border rounded hover:bg-gray-50"
            >
              Put on hold
            </button>

            <button
              onClick={() => openModal("Closed")}
              className="px-3 py-1.5 text-sm text-red-600 border border-red-300 rounded hover:bg-red-50"
            >
              Close job
            </button>
          </>
        )}

        {job.status === "OnHold" && (
          <>
            <button
              onClick={() => openModal("Open")}
              className="px-3 py-1.5 text-sm text-green-700 border border-green-300 rounded hover:bg-green-50"
            >
              Re-open job
            </button>

            <button
              onClick={() => openModal("Closed")}
              className="px-3 py-1.5 text-sm text-red-600 border border-red-300 rounded hover:bg-red-50"
            >
              Close job
            </button>
          </>
        )}
      </div>

      {/* ===== STATUS INFO ===== */}
{job.status !== "Open" && (
  <div className="border-l-4 p-4 bg-gray-50 text-sm"
       style={{
         borderColor:
           job.status === "Closed" ? "#dc2626" : "#f59e0b"
       }}>
    {job.status === "OnHold" && (
      <>
        <div className="font-medium text-gray-800">
          This job is currently on hold
        </div>
        {job.holdReason && (
          <div className="text-gray-600 mt-1">
            Reason: {job.holdReason}
          </div>
        )}
      </>
    )}

    {job.status === "Closed" && (
      <>
        <div className="font-medium text-gray-800">
          This job has been closed
        </div>

        {job.closedCandidateId ? (
          <div className="text-gray-600 mt-1">
            Position filled by candidate ID:{" "}
            <b>{job.closedCandidateId}</b>
          </div>
        ) : (
          <div className="text-gray-600 mt-1">
            Closed without filling the position
          </div>
        )}

        {job.closedReason && (
          <div className="text-gray-600 mt-1">
            Reason: {job.closedReason}
          </div>
        )}
      </>
    )}
  </div>
)}


      {/* ===== DESCRIPTION ===== */}
      <section className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-900 uppercase">
          Description
        </h3>
        <p className="text-gray-700 leading-relaxed">
          {job.description}
        </p>
      </section>

      {/* ===== SKILLS ===== */}
      <section className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 uppercase">
            Required skills
          </h3>
          <ul className="list-disc pl-5 text-gray-700 text-sm">
            {job.requiredSkills?.map(s => (
              <li key={s.skillId}>{s.skillName}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-900 uppercase">
            Preferred skills
          </h3>
          <ul className="list-disc pl-5 text-gray-700 text-sm">
            {job.preferredSkills?.map(s => (
              <li key={s.skillId}>{s.skillName}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== MODAL ===== */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white w-96 rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-medium">
              Change status → {nextStatus}
            </h3>

            <textarea
              value={reason}
              onChange={e => setReason(e.target.value)}
              placeholder="Reason (required)"
              className="w-full border rounded p-2 text-sm"
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
                    placeholder="Candidate ID"
                    value={closedCandidateId}
                    onChange={e => setClosedCandidateId(e.target.value)}
                    className="w-full border rounded p-2 text-sm"
                  />
                )}
              </>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-1.5 text-sm border rounded"
              >
                Cancel
              </button>
              <button
                onClick={submit}
                className="px-4 py-1.5 text-sm bg-indigo-600 text-white rounded"
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
