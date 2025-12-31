export default function ExpandedJobCard({ job }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-xl border border-indigo-200">
      <h2 className="text-xl font-bold">{job.title}</h2>
      <p className="text-sm text-gray-600">{job.department}</p>

      <div className="mt-4">
        <h4 className="font-semibold mb-1">Description</h4>
        <p className="text-sm text-gray-700">{job.description}</p>
      </div>

      <div className="mt-4">
        <h4 className="font-semibold mb-1">Required Skills</h4>
        <ul className="list-disc pl-5 text-sm">
          {(job.requiredSkills || []).map(rs => (
            <li key={rs.skillId}>
              {rs.skill?.name} (Weightage: {rs.weightage})
            </li>
          ))}
        </ul>
      </div>

      <button className="mt-6 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
        Apply Now
      </button>
    </div>
  );
}
