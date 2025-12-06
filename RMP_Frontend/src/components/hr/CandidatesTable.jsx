import React from "react";

export default function CandidatesTable({ items = [], compact = false }) {
  if (!items || items.length === 0) return <p className="text-gray-500 mt-4">No candidates to show.</p>;

  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full text-left">
        <thead className="text-xs text-gray-500 uppercase">
          <tr>
            <th className="py-2 px-3">Name</th>
            <th className="py-2 px-3">Email</th>
            {!compact && <th className="py-2 px-3">Phone</th>}
            <th className="py-2 px-3">Experience</th>
            <th className="py-2 px-3">Applied Job</th>
            <th className="py-2 px-3">Status</th>
            <th className="py-2 px-3">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {items.map((c) => (
            <tr key={c.candidateId || c.id} className="border-t">
              <td className="py-3 px-3 font-medium">{c.fullName || c.name}</td>
              <td className="py-3 px-3 text-gray-600">{c.email}</td>
              {!compact && <td className="py-3 px-3 text-gray-600">{c.phone || "-"}</td>}
              <td className="py-3 px-3 text-gray-600">{c.experienceYears ?? "-"}</td>
              <td className="py-3 px-3 text-gray-600">{c.appliedJob ?? c.jobTitle ?? "-"}</td>
              <td className="py-3 px-3">
                <span className={`px-2 py-1 rounded text-xs ${c.status === "Shortlisted" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-700"}`}>
                  {c.status ?? "Applied"}
                </span>
              </td>
              <td className="py-3 px-3">
                <div className="flex gap-2">
                  <a href={`/hr/candidates/${c.candidateId || c.id}`} className="text-indigo-600 text-sm">View</a>
                  <a href={`/hr/interviews/schedule?candidateId=${c.candidateId || c.id}`} className="text-indigo-600 text-sm">Schedule</a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
