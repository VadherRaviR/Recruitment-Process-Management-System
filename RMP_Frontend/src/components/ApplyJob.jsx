import { useState } from "react";
import api from "../../api/axiosInstance";

export default function ApplyJob({ jobId, onClose }) {
  const [resume, setResume] = useState(null);
  const [source, setSource] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume) {
      setError("Resume is required");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("source", source);

    try {
      setLoading(true);
      await api.post(`/jobs/${jobId}/apply`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setSuccess(true);
    } catch (err) {
      console.log(err);
      setError(err.response?.data || "Application failed");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="mt-4 bg-green-50 p-4 rounded">
        <h3 className="text-green-700 font-semibold">
          ✔ Application submitted successfully
        </h3>
        <button onClick={onClose} className="mt-2 text-indigo-600">
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="mt-4 bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-3">Apply for this job</h3>

      {error && <div className="text-red-600 mb-2">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setResume(e.target.files[0])}
          className="border p-2 w-full"
        />

        <input
          type="text"
          placeholder="Source (LinkedIn, Referral, etc)"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="border p-2 w-full"
        />

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 bg-indigo-600 text-white rounded"
          >
            {loading ? "Applying..." : "Submit Application"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 border rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
