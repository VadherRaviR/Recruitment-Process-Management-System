import React, { useEffect, useState } from "react";
import api from "../../api/axiosInstance";

export default function OfferManagement() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/hr/offers"); 
        setOffers(res.data || []);
      } catch (err) {
        console.error("Load offers error", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <p className="p-6">Loading offers...</p>;

  return (
    <div className="max-w-6xl mx-auto py-8">
      <h2 className="text-2xl font-semibold mb-4">Offer Letters & Hiring</h2>

      <div className="bg-white p-6 rounded shadow">
        <table className="w-full">
          <thead className="text-xs text-gray-500 uppercase">
            <tr>
              <th className="py-2 px-3">Candidate</th>
              <th className="py-2 px-3">Job</th>
              <th className="py-2 px-3">Offer Status</th>
              <th className="py-2 px-3">Joining Date</th>
              <th className="py-2 px-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {offers.map(o => (
              <tr key={o.offerId || o.id} className="border-t">
                <td className="py-3 px-3">{o.candidateName}</td>
                <td className="py-3 px-3">{o.jobTitle}</td>
                <td className="py-3 px-3">{o.status}</td>
                <td className="py-3 px-3">{o.joiningDate || "-"}</td>
                <td className="py-3 px-3">
                  <a href={`/hr/offer/${o.offerId || o.id}`} className="text-indigo-600">View</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
