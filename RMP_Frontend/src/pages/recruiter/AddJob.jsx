import React, { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import SkillSelector from "../../components/recruiter/SkillSelector";
import { useNavigate } from "react-router-dom";

export default function AddJob() {
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [loadingSkills, setLoadingSkills] = useState(true);

  const [form, setForm] = useState({
    title: "",
    department: "",
    description: "",
    experienceRequired: 0,
    requiredSkills: [],
    preferredSkills: []
  });

  useEffect(() => {
    api.get("/skill").then(res => setSkills(res.data || [])).catch(() => { }).finally(() => setLoadingSkills(false));
  }, []);

  const addRequired = (skillId, weightage) => {
    setForm(s => ({ ...s, requiredSkills: [...s.requiredSkills, { skillId, weightage }] }));
  };
  const removeRequired = (idx) => setForm(s => ({ ...s, requiredSkills: s.requiredSkills.filter((_, i) => i !== idx) }));

  const addPreferred = (skillId, weightage) => {
    setForm(s => ({ ...s, preferredSkills: [...s.preferredSkills, { skillId, weightage }] }));
  };
  const removePreferred = (idx) => setForm(s => ({ ...s, preferredSkills: s.preferredSkills.filter((_, i) => i !== idx) }));

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // payload must match JobCreateDto
      await api.post("/jobs", {
        title: form.title,
        description: form.description,
        department: form.department,
        experienceRequired: Number(form.experienceRequired),
        requiredSkills: form.requiredSkills,
        preferredSkills: form.preferredSkills
      });
      alert("Job created");
      navigate("/recruiter/jobs");
    } catch (err) {
      console.error(err);
      alert("Failed to create job");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl mb-4">Create New Job</h2>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Job Title" className="border p-2 rounded w-full" required />
        <input name="department" value={form.department} onChange={handleChange} placeholder="Department" className="border p-2 rounded w-full" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" rows={4} className="border p-2 rounded w-full" />

        <input name="experienceRequired" type="number" value={form.experienceRequired} onChange={handleChange} placeholder="Experience (years)" className="border p-2 rounded w-full" />

        <div>
          <h3 className="font-semibold">Required Skills</h3>
          {loadingSkills ? <div className="text-sm text-gray-500">Loading skills...</div> :
            <SkillSelector skills={skills} selected={form.requiredSkills} onAdd={addRequired} onRemove={removeRequired} />}
        </div>

        <div>
          <h3 className="font-semibold">Preferred Skills</h3>
          {loadingSkills ? <div className="text-sm text-gray-500">Loading skills...</div> :
            <SkillSelector skills={skills} selected={form.preferredSkills} onAdd={addPreferred} onRemove={removePreferred} />}
        </div>

        <div className="flex justify-end">
          <button className="px-6 py-2 bg-indigo-600 text-white rounded" type="submit">Create Job</button>
        </div>
      </form>
    </div>
  );
}
