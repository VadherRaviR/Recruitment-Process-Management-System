import React, { useState } from "react";
import api from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function AddJob() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    department: "",
    experienceRequired: "",
    skills: "" // Comma separated: JS, React, SQL
  });

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);

      const skillList = form.skills
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      // Backend DTO structure
      const payload = {
        title: form.title,
        description: form.description,
        department: form.department,
        experienceRequired: parseInt(form.experienceRequired),
        createdById: decoded.id,
        skills: skillList
      };

      await api.post("/jobs", payload);

      navigate("/hr/jobs");
    } catch (err) {
      console.error("Add job error", err);
      setError("Could not add job. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-2xl font-semibold mb-4">Add New Job Posting</h2>

      {error && <div className="text-red-600 mb-3">{error}</div>}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Job Title"
          className="border p-2 rounded w-full"
          required
        />

        <input
          name="department"
          value={form.department}
          onChange={handleChange}
          placeholder="Department (e.g., IT, HR, Finance)"
          className="border p-2 rounded w-full"
        />

        <input
          name="experienceRequired"
          value={form.experienceRequired}
          onChange={handleChange}
          placeholder="Experience Required (years)"
          className="border p-2 rounded w-full"
          type="number"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows="6"
          placeholder="Job Description"
          className="border p-2 rounded w-full"
        ></textarea>

        <input
          name="skills"
          value={form.skills}
          onChange={handleChange}
          placeholder="Skills (comma separated: React, .NET, SQL)"
          className="border p-2 rounded w-full"
        />

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-5 py-2 bg-indigo-600 text-white rounded"
            disabled={saving}
          >
            {saving ? "Saving..." : "Create Job"}
          </button>
        </div>
      </form>
    </div>
  );
}
