import { useNavigate } from "react-router-dom";

function CollapsedCard({ job, onExpand }) {
  return (
    <>
      <h3 className="text-lg font-semibold text-indigo-700">
        {job.title}
      </h3>

      <p className="text-sm text-gray-500">{job.department}</p>

      <p className="text-sm text-gray-600 mt-3 line-clamp-3">
        {job.description}
      </p>

      <div className="mt-4 flex justify-between items-center">
        <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700">
          {job.status}
        </span>

        <button
          onClick={onExpand}
          className="text-indigo-600 text-sm font-medium hover:underline"
        >
          View Details →
        </button>
      </div>
    </>
  );
}

function ExpandedCard({ job, onCollapse, onApply }) {
  return (
    <>
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold text-indigo-700">
            {job.title}
          </h2>
          <p className="text-gray-500 mt-1">{job.department}</p>
        </div>

        <button
          onClick={onCollapse}
          className="text-gray-400 hover:text-gray-700 text-2xl"
        >
          ✕
        </button>
      </div>

      <section className="mt-6">
        <h4 className="font-semibold mb-2">Job Description</h4>
        <p className="text-gray-700">{job.description}</p>
      </section>

      <section className="mt-6">
        <span className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded inline-block">
          Experience Required: {job.experienceRequired}+ years
        </span>
      </section>

      <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold mb-2">Required Skills</h4>
          <ul className="text-sm space-y-1">
            {(job.requiredSkills || []).map(rs => (
              <li key={rs.skillId}>
                • {rs.skillName} ({rs.weightage})
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Preferred Skills</h4>
          <ul className="text-sm space-y-1">
            {(job.preferredSkills || []).map(ps => (
              <li key={ps.skillId}>
                • {ps.skillName} ({ps.weightage})
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mt-10 flex justify-end gap-4">
        <button
          onClick={onCollapse}
          className="px-5 py-2 border rounded"
        >
          Back
        </button>

        <button
          onClick={onApply}
          className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Apply Now
        </button>
      </div>
    </>
  );
}

export default function JobCard({
  job,
  expanded,
  dimmed,
  onExpand,
  onCollapse
}) {
  const navigate = useNavigate();

  const goToApply = () => {
    navigate(`/jobs/${job.jobId}/apply`);
  };

  if (dimmed) {
    return (
      <div className="opacity-30 blur-sm pointer-events-none">
        <CollapsedCard job={job} />
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-xl shadow transition-all duration-300 ${
        expanded
          ? "p-8 max-w-4xl ring-1 ring-indigo-200"
          : "p-5 hover:shadow-lg"
      }`}
    >
      {!expanded ? (
        <CollapsedCard job={job} onExpand={onExpand} />
      ) : (
        <ExpandedCard
          job={job}
          onCollapse={onCollapse}
          onApply={goToApply}
        />
      )}
    </div>
  );
}
