import React, { useEffect, useState } from "react";
import api from "../../api/axiosInstance";

export default function ManageSkills() {
  const [skills, setSkills] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = () => api.get("/skill").then(res=>setSkills(res.data||[])).catch(()=>setSkills([]));

  const add = async () => {
    if (!name) return alert("Enter name");
    try {
      await api.post("/skill", { name, description: desc });
      setName(""); setDesc("");
      load();
    } catch (err) {
      console.error(err);
      alert("Failed to add");
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete skill?")) return;
    try {
      await api.delete(`/skill/${id}`);
      load();
    } catch {
      alert("Failed to delete");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl mb-4">Manage Skills</h2>

      <div className="bg-white p-4 rounded shadow space-y-3">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Skill name" className="border p-2 rounded w-full" />
        <input value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Description (optional)" className="border p-2 rounded w-full" />
        <div className="flex justify-end">
          <button onClick={add} className="px-4 py-2 bg-indigo-600 text-white rounded">Add Skill</button>
        </div>
      </div>

      <div className="mt-6">
        {skills.length === 0 ? <div className="text-gray-600">No skills.</div> :
        <ul className="space-y-2">
          {skills.map(s => (
            <li key={s.skillId} className="flex justify-between items-center border rounded p-3">
              <div>
                <div className="font-medium">{s.name}</div>
                <div className="text-xs text-gray-500">{s.description}</div>
              </div>
              <div>
                <button className="px-3 py-1 text-red-600" onClick={()=>remove(s.skillId)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>}
      </div>
    </div>
  );
}
