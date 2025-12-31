import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import api from "../api/axiosInstance";
import HRSidebar from "../components/hr/HRSidebar";
import HRTopbar from "../components/hr/HRTopbar";
import HRQuickCards from "../components/hr/HRQuickCards";
import CandidatesTable from "../components/hr/CandidatesTable";
import InterviewList from "../components/hr/InterviewList";

export default function HRDashboard() {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({});
  const [recentCandidates, setRecentCandidates] = useState([]);
  const [recentInterviews, setRecentInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
       
        const [sRes, cRes, iRes] = await Promise.all([
          api.get("/hr/dashboard/stats"),
          api.get("/hr/candidates/recent"),
          api.get("/hr/interviews/recent"),
        ]);

        setStats(sRes.data || {});
        setRecentCandidates(cRes.data || []);
        setRecentInterviews(iRes.data || []);
      } catch (err) {
        console.error("Load HR dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) load();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-12 gap-6">
        <aside className="col-span-12 lg:col-span-3">
          <HRSidebar />
        </aside>

        <main className="col-span-12 lg:col-span-9 space-y-6">
          <HRTopbar />

          <HRQuickCards stats={stats} loading={loading} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <section className="bg-white p-6 rounded shadow">
              <h3 className="text-lg font-medium">Recent Candidates</h3>
              <p className="text-sm text-gray-500 mt-1">Latest applications</p>
              <CandidatesTable items={recentCandidates} compact />
            </section>

            <section className="bg-white p-6 rounded shadow">
              <h3 className="text-lg font-medium">Upcoming Interviews</h3>
              <p className="text-sm text-gray-500 mt-1">Next interviews</p>
              <InterviewList items={recentInterviews} />
            </section>
          </div>

          <section className="bg-white p-6 rounded shadow">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Manage Candidates</h3>
              <div className="flex gap-2">
                <a className="text-sm px-3 py-1 border rounded text-indigo-600 border-indigo-600" href="/hr/job-applications">View All</a>
                <a className="text-sm px-3 py-1 bg-indigo-600 text-white rounded" href="/hr/interviews/schedule">Schedule Interview</a>
              </div>
            </div>

            <div className="mt-4">
              <CandidatesTable items={recentCandidates} />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
