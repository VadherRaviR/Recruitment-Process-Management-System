export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-br from-indigo-500 to-indigo-700 text-white">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to RMPS — Recruitment Process Management System
        </h1>
        <p className="text-lg max-w-2xl mx-auto">
          Manage your company hiring process easily. Streamline job postings,
          candidate management, interviews, and selections — all in one place.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <a
            href="/jobs"
            className="px-6 py-3 bg-white text-indigo-700 rounded shadow hover:bg-gray-100 font-semibold"
          >
            View Open Positions
          </a>
          <a
            href="/register"
            className="px-6 py-3 bg-yellow-400 text-black rounded shadow hover:bg-yellow-500 font-semibold"
          >
            Join as Recruiter
          </a>
        </div>
      </section>

      {/* Open Positions Preview */}
      <section className="py-16 max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center mb-10 text-indigo-700">
          Current Job Openings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Demo Job Cards */}
          <div className="bg-white p-6 rounded shadow hover:shadow-lg">
            <h3 className="text-xl font-bold">Software Developer</h3>
            <p className="text-gray-600 mt-2">Experience: 1–3 years</p>
            <p className="text-gray-500 mt-1">Backend + API Development</p>
          </div>

          <div className="bg-white p-6 rounded shadow hover:shadow-lg">
            <h3 className="text-xl font-bold">HR Recruiter</h3>
            <p className="text-gray-600 mt-2">Experience: 0–2 years</p>
            <p className="text-gray-500 mt-1">Hiring & Screening</p>
          </div>

          <div className="bg-white p-6 rounded shadow hover:shadow-lg">
            <h3 className="text-xl font-bold">UI/UX Designer</h3>
            <p className="text-gray-600 mt-2">Experience: 1–4 years</p>
            <p className="text-gray-500 mt-1">Figma / Wireframes</p>
          </div>
        </div>

        <div className="text-center mt-10">
          <a
            href="/jobs"
            className="px-6 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            View All Jobs
          </a>
        </div>
      </section>
    </div>
  );
}
