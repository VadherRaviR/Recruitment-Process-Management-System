import React from "react";

function Card({ title, value, href }) {
  return (
    <div className="bg-white p-5 rounded shadow flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
      </div>
      {href && (
        <a href={href} className="text-sm px-3 py-1 border rounded text-indigo-600 border-indigo-600 hover:bg-indigo-50">View</a>
      )}
    </div>
  );
}

export default function HRQuickCards({ stats = {}, loading }) {
  if (loading) {
    return <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <Card title="Total Candidates" value={stats.totalCandidates ?? 0} href="/hr/candidates" />
      <Card title="Applications" value={stats.applied ?? 0} href="/hr/job-applications" />
      <Card title="Shortlisted" value={stats.shortlisted ?? 0} href="/hr/shortlisted" />
      <Card title="Pending Interviews" value={stats.pendingInterviews ?? 0} href="/hr/interviews" />
      <Card title="Open Jobs" value={stats.openJobs ?? 0} href="/hr/jobs" />
      <Card title="Hired" value={stats.hired ?? 0} href="/hr/hiring" />
    </div>
  );
}
