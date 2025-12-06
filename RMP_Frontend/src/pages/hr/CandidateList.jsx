import React, { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import CandidatesTable from "../../components/hr/CandidatesTable";

export default function CandidateList() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/hr/candidates"); // GET /hr/candidates
        setCandidates(res.data || []);
      } catch (err) {
        console.error("Load candidates error", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <p className="p-6">Loading candidates...</p>;

  return (
    <div className="max-w-6xl mx-auto py-8">
      <h2 className="text-2xl font-semibold mb-4">Candidates</h2>
      <div className="bg-white p-6 rounded shadow">
        <CandidatesTable items={candidates} />
      </div>
    </div>
  );
}
