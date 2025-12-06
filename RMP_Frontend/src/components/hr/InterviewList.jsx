import React from "react";

export default function InterviewList({ items = [] }) {
  if (!items || items.length === 0) return <p className="text-gray-500 mt-4">No upcoming interviews.</p>;

  return (
    <div className="mt-4 space-y-3">
      {items.map((it) => (
        <div key={it.interviewId || it.id} className="p-3 border rounded flex items-center justify-between">
          <div>
            <div className="font-medium">{it.candidateName}</div>
            <div className="text-sm text-gray-500">{it.jobTitle} • {it.interviewerName}</div>
            <div className="text-xs text-gray-400 mt-1">{new Date(it.scheduledAt).toLocaleString()}</div>
          </div>

          <div className="text-right">
            <div>
              <span className={`px-2 py-1 rounded text-xs ${it.status === "Pending" ? "bg-yellow-100 text-yellow-800" : it.status === "Completed" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-700"}`}>
                {it.status}
              </span>
            </div>
            <div className="mt-2">
              <a href={`/hr/interviews/${it.interviewId}`} className="text-indigo-600 text-sm">Details</a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
