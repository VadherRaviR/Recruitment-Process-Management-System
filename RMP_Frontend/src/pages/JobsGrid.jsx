import JobCard from "./JobCard";
import ExpandedJobCard from "./ExpandedJobCard";

export default function JobGrid({ jobs, activeJobId, onSelect }) {
  return (
    <div className="space-y-6">
      {jobs.map((job) => {
        const isActive = activeJobId === job.jobId;

        return (
          <div
            key={job.jobId}
            className="grid grid-cols-3 gap-6 items-start"
          >
            <JobCard
              job={job}
              blurred={isActive}
              onClick={() => onSelect(job.jobId)}
            />

            {isActive ? (
              <ExpandedJobCard job={job} />
            ) : (
              <div />
            )}

            <JobCard
              job={job}
              blurred={isActive}
              onClick={() => onSelect(job.jobId)}
            />
          </div>
        );
      })}
    </div>
  );
}
