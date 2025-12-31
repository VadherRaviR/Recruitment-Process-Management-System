import StatusBadge from "./StatusBadge";
import { Link } from "react-router-dom";

export default function JobCard({ job }) {
  return (
    <div className="border rounded p-4 shadow-sm bg-white">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{job.title}</h3>
          <p className="text-sm text-gray-600">{job.department}</p>
          <p className="text-sm text-gray-500 mt-2">
            {job.description?.slice(0, 120)}
            {job.description?.length > 120 ? "..." : ""}
          </p>
        </div>
        <div className="text-right space-y-2">
          <StatusBadge status={job.status} />
          <div className="text-xs text-gray-500">
            Created: {new Date(job.createdDate).toLocaleDateString()}
          </div>
        </div>
      </div>

      <div className="mt-3 flex gap-2 flex-wrap">
        <Link
          to={`/recruiter/jobs/${job.jobId}`}
          className="text-sm px-3 py-1 border rounded"
        >
          View
        </Link>

        <Link
          to={`/recruiter/jobs/edit/${job.jobId}`}
          className="text-sm px-3 py-1 border rounded"
        >
          Edit
        </Link>

        <Link
          to={`/recruiter/jobs/${job.jobId}/applications`}
          className="text-sm px-3 py-1 border rounded bg-indigo-50"
        >
          Applicants
        </Link>
      </div>
    </div>
  );
}
