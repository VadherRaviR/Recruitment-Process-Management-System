import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/LoginForm";
import Register from "./components/RegisterForm";
import Dashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HRDashboard from "./pages/HRDashboard";
// import AddJob from "./pages/hr/AddJob";
// import JobsList from "./pages/hr/JobsList";
import CandidateList from "./pages/hr/CandidateList";
import CandidateDetail from "./pages/hr/CandidateDetail";
import ScheduleInterview from "./pages/hr/ScheduleInterview";
import OfferManagement from "./pages/hr/OfferManagement";
import JobApply from "./pages/JobApply";
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import JobList from "./pages/recruiter/JobList";
import AddJob from "./pages/recruiter/AddJob";
import EditJob from "./pages/recruiter/EditJob";
import JobDetails from "./pages/recruiter/JobDetails";
import ManageSkills from "./pages/recruiter/ManageSkills";
import Home from "./pages/Home";
import CandidateDashboard from "./pages/CandidateDashboard";
import OpenJobsList from "./pages/OpenJobList";
import CandidateProfile from "./pages/candidate/CandidateProfile";
import JobApplicants from "./pages/recruiter/JobApplicant";
import CandidateProfileForRecruiter from "./pages/recruiter/CandidateProfileForRecruiter";




function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/hr/dashboard" element={<ProtectedRoute allowedRoles={["HR"]}><HRDashboard /></ProtectedRoute>} />
        <Route path="/hr/jobs/add" element={<ProtectedRoute allowedRoles={["HR"]}><AddJob /></ProtectedRoute>} />
        {/* <</Router>Route path="/hr/jobs" element={<ProtectedRoute allowedRoles={["HR"]}><JobsList /></ProtectedRoute>} /> */}
        <Route path="/hr/candidates" element={<ProtectedRoute allowedRoles={["HR"]}><CandidateList /></ProtectedRoute>} />
        <Route path="/hr/candidates/:id" element={<ProtectedRoute allowedRoles={["HR"]}><CandidateDetail /></ProtectedRoute>} />
        <Route path="/hr/interviews/schedule" element={<ProtectedRoute allowedRoles={["HR"]}><ScheduleInterview /></ProtectedRoute>} />
        <Route path="/hr/hiring" element={<ProtectedRoute allowedRoles={["HR"]}><OfferManagement /></ProtectedRoute>} />
        <Route path="/jobs" element={<OpenJobsList />} />
        <Route path="/jobs/:id/apply" element={<JobApply />} />

        <Route path="/recruiter/dashboard" element={<ProtectedRoute><RecruiterDashboard /></ProtectedRoute>} />
        <Route path="/recruiter/jobs" element={<ProtectedRoute><JobList /></ProtectedRoute>} />
        <Route path="/recruiter/jobs/add" element={<ProtectedRoute roles={["Recruiter", "Admin"]}><AddJob /></ProtectedRoute>} />
        <Route path="/recruiter/jobs/edit/:id" element={<ProtectedRoute roles={["Recruiter", "Admin"]}><EditJob /></ProtectedRoute>} />
        <Route path="/recruiter/jobs/:id" element={<ProtectedRoute><JobDetails /></ProtectedRoute>} />
        <Route path="/recruiter/skills" element={<ProtectedRoute roles={["Recruiter", "Admin"]}><ManageSkills /></ProtectedRoute>} />
        <Route path="/candidate/profile" element={<CandidateProfile />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recruiter/jobs/:jobId/applications" element={<JobApplicants />} />
        <Route
          path="/recruiter/jobs/:jobId/applications/:candidateId"
          element={<CandidateProfileForRecruiter />}
        />


        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
