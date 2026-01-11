import React, { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import SkillSelector from "../../components/recruiter/SkillSelector";
import { useNavigate, useParams } from "react-router-dom";

export default function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(null);

  useEffect(() => {
    Promise.all([
      api.get(`/jobs/${id}`),
      api.get("/skill")
    ])
      .then(([jobRes, skillsRes]) => {
        const job = jobRes.data;
        setForm({
          title: job.title,
          department: job.department,
          description: job.description,
          experienceRequired: job.experienceRequired,
          requiredSkills: job.requiredSkills || [],
          preferredSkills: job.preferredSkills || []
        });
        setSkills(skillsRes.data || []);
      })
      .catch(err => {
        console.error(err);
        alert("Failed to load");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!form) return <div className="p-6">Job not found</div>;

  const addRequired = (skillId, weightage) =>
    setForm(s => ({
      ...s,
      requiredSkills: [...s.requiredSkills, { skillId, weightage }]
    }));

  const removeRequired = idx =>
    setForm(s => ({
      ...s,
      requiredSkills: s.requiredSkills.filter((_, i) => i !== idx)
    }));

  const addPreferred = (skillId, weightage) =>
    setForm(s => ({
      ...s,
      preferredSkills: [...s.preferredSkills, { skillId, weightage }]
    }));

  const removePreferred = idx =>
    setForm(s => ({
      ...s,
      preferredSkills: s.preferredSkills.filter((_, i) => i !== idx)
    }));

  const handleChange = e =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSave = async e => {
    e.preventDefault();
    try {
      await api.put(`/jobs/${id}`, {
        title: form.title,
        description: form.description,
        department: form.department,
        experienceRequired: Number(form.experienceRequired),
        requiredSkills: form.requiredSkills,
        preferredSkills: form.preferredSkills
      });
      alert("Job updated");
      navigate("/recruiter/jobs");
    } catch (err) {
      console.error(err);
      alert("Failed to update");
    }
  };

  const inputClass =
    "w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500";

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Edit Job
        </h2>

        <form
          onSubmit={handleSave}
          className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 space-y-6"
        >
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Job Title"
            required
            className={inputClass}
          />

          <input
            name="department"
            value={form.department}
            onChange={handleChange}
            placeholder="Department"
            className={inputClass}
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Job Description"
            rows={4}
            className={inputClass}
          />

          <input
            name="experienceRequired"
            type="number"
            value={form.experienceRequired}
            onChange={handleChange}
            placeholder="Experience Required (years)"
            className={inputClass}
          />

          <div className="border border-gray-200 rounded-md p-4">
            <h3 className="font-medium text-gray-700 mb-3">
              Required Skills
            </h3>
            <SkillSelector
              skills={skills}
              selected={form.requiredSkills}
              onAdd={addRequired}
              onRemove={removeRequired}
            />
          </div>

          <div className="border border-gray-200 rounded-md p-4">
            <h3 className="font-medium text-gray-700 mb-3">
              Preferred Skills
            </h3>
            <SkillSelector
              skills={skills}
              selected={form.preferredSkills}
              onAdd={addPreferred}
              onRemove={removePreferred}
            />
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-200">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
