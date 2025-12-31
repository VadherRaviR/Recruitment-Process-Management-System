import React, { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function ScheduleInterview() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const candidateId = params.get("candidateId");
  const [form, setForm] = useState({
    candidateId: candidateId || "",
    jobId: "",
    interviewerId: "",
    scheduledAt: "",
    mode: "Online",
    location: "",
    notes: ""
  });
  const [interviewers, setInterviewers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const [iRes, jRes] = await Promise.all([
          api.get("/users?role=Interviewer"), 
          api.get("/jobs") 
        ]);
        setInterviewers(iRes.data || []);
        setJobs(jRes.data || []);
      } catch (err) {
        console.error("Load interview data", err);
      }
    };
    load();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      
      await api.post("/hr/interviews/schedule", form);
      navigate("/hr/interviews");
    } catch (err) {
      console.error("Schedule error", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h2 className="text-2xl font-semibold mb-4">Schedule Interview</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
        <select name="candidateId" value={form.candidateId} onChange={handleChange} className="border p-2 rounded w-full" required>
          <option value="">Select Candidate</option>
          <option value={form.candidateId}>{form.candidateId && `Candidate #${form.candidateId}`}</option>
        </select>

        <select name="jobId" value={form.jobId} onChange={handleChange} className="border p-2 rounded w-full" required>
          <option value="">Select Job</option>
          {jobs.map(j => <option key={j.jobId || j.id} value={j.jobId || j.id}>{j.title}</option>)}
        </select>

        <select name="interviewerId" value={form.interviewerId} onChange={handleChange} className="border p-2 rounded w-full" required>
          <option value="">Select Interviewer</option>
          {interviewers.map(it => <option key={it.userId || it.id} value={it.userId || it.id}>{it.fullName || it.name}</option>)}
        </select>

        <input name="scheduledAt" value={form.scheduledAt} onChange={handleChange} type="datetime-local" className="border p-2 rounded w-full" required />

        <select name="mode" value={form.mode} onChange={handleChange} className="border p-2 rounded w-full">
          <option>Online</option>
          <option>Offline</option>
        </select>

        <input name="location" value={form.location} onChange={handleChange} placeholder="Location / Meeting Link" className="border p-2 rounded w-full" />

        <textarea name="notes" value={form.notes} onChange={handleChange} rows="3" placeholder="Notes" className="border p-2 rounded w-full" />

        <div className="flex justify-end">
          <button className="px-5 py-2 bg-indigo-600 text-white rounded" type="submit" disabled={saving}>
            {saving ? "Scheduling..." : "Schedule Interview"}
          </button>
        </div>
      </form>
    </div>
  );
}
