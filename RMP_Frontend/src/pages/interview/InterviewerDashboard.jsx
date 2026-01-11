import { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import StatusBadge from "../../components/recruiter/StatusBadge";
import { Link } from "react-router-dom";

export default function InterviewerDashboard() {
  const [list, setList] = useState(null);

  useEffect(() => {
    api.get("/interviews/my")
      .then(res => setList(res.data))
      .catch(() => setList([]));
  }, []);

  if (list === null) return <LoadingSpinner />;

  const today = new Date().toDateString();

  const todayInterviews = list.filter(i =>
    new Date(i.scheduledAt).toDateString() === today
  );

  const pendingFeedback = list.filter(
    i => i.status === "Completed" && !i.feedbackSubmitted
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">Interviewer Dashboard</h1>
        <p className="text-sm text-gray-500">
          Your scheduled interviews & feedback
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Today's Interviews" value={todayInterviews.length} />
        <StatCard label="Upcoming Interviews" value={list.length} />
        <StatCard label="Pending Feedback" value={pendingFeedback.length} />
      </div>

      <Section title="Today's Interviews">
        {todayInterviews.length === 0 ? (
          <Empty text="No interviews scheduled today" />
        ) : (
          todayInterviews.map(i => <InterviewRow key={i.interviewId} data={i} />)
        )}
      </Section>

      <Section title="All Interviews">
        {list.length === 0 ? (
          <Empty text="No interviews assigned" />
        ) : (
          list.map(i => <InterviewRow key={i.interviewId} data={i} />)
        )}
      </Section>

    </div>
  );
}


function StatCard({ label, value }) {
  return (
    <div className="bg-white rounded shadow p-4">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-2xl font-semibold">{value}</div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-white rounded shadow">
      <div className="px-4 py-3 border-b font-medium">{title}</div>
      <div className="divide-y">{children}</div>
    </div>
  );
}

function InterviewRow({ data }) {
  return (
    <div className="p-4 flex justify-between items-center">
      <div>
        <div className="font-medium">
          {data.candidateName} — {data.jobTitle}
        </div>
        <div className="text-xs text-gray-500">
          {data.roundType} | {data.mode} |{" "}
          {new Date(data.scheduledAt).toLocaleString()}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <StatusBadge status={data.status} />

        {data.meetLink && (
          <a
            href={data.meetLink}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-indigo-600 underline"
          >
            Join
          </a>
        )}

        <Link
          to={`/interviewer/interviews/${data.interviewId}`}
          className="text-sm px-3 py-1 border rounded"
        >
          View
        </Link>

        {!data.feedbackSubmitted && data.status === "Completed" && (
          <Link
            to={`/interviewer/interviews/${data.interviewId}/feedback`}
            className="text-sm px-3 py-1 bg-indigo-600 text-white rounded"
          >
            Give Feedback
          </Link>
        )}
      </div>
    </div>
  );
}

function Empty({ text }) {
  return (
    <div className="p-4 text-sm text-gray-500">{text}</div>
  );
}
