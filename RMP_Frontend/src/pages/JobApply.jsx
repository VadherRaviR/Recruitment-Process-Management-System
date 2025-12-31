import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";

export default function JobApply() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [resume, setResume] = useState(null);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    experienceYears: "",
    source: "Website"
  });

  useEffect(() => {
    api.get("/candidates/profile")
      .then(res => {
        setForm(prev => ({
          ...prev,
          fullName: res.data.fullName,
          email: res.data.email,
          phone: res.data.phone ?? "",
          experienceYears: res.data.experienceYears ?? ""
        }));
      })
      .catch(() => {
        alert("Please login as candidate");
        navigate("/login");
      });
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitApplication = async (e) => {
    e.preventDefault();

    if (!resume) {
      alert("Please upload resume");
      return;
    }

    const data = new FormData();

    data.append("jobId", id);
    data.append("fullName", form.fullName);
    data.append("email", form.email);
    data.append("phone", form.phone);
    data.append("experienceYears", form.experienceYears);
    data.append("source", form.source);
    data.append("resume", resume);

    try {
      setLoading(true);

      await api.post("/candidates/apply", data);

      alert("Application submitted successfully!");
      navigate("/candidate/profile");
    } catch (err) {
      console.log(err);
      
      console.error(err.response.data || err);
      alert("Failed to apply");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">
        Job Application
      </h2>

      <form
        onSubmit={submitApplication}
        className="bg-white p-6 rounded shadow space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <input
              value={form.fullName}
              disabled
              className="w-full border p-2 rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              value={form.email}
              disabled
              className="w-full border p-2 rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Experience (Years)</label>
            <input
              name="experienceYears"
              type="number"
              value={form.experienceYears}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">
            How did you hear about this job?
          </label>
          <select
            name="source"
            value={form.source}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option>Website</option>
            <option>LinkedIn</option>
            <option>Referral</option>
            <option>Recruiter</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">
            Upload Resume (PDF / DOC)
          </label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setResume(e.target.files[0])}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </form>
    </div>
  );
}
