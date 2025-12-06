import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/LoginForm";
import Register from "./components/RegisterForm";
import Dashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HRDashboard from "./pages/HRDashboard";
import AddJob from "./pages/hr/AddJob";
import JobsList from "./pages/hr/JobsList";
import CandidateList from "./pages/hr/CandidateList";
import CandidateDetail from "./pages/hr/CandidateDetail";
import ScheduleInterview from "./pages/hr/ScheduleInterview";
import OfferManagement from "./pages/hr/OfferManagement";

import Home from "./pages/Home";
import CandidateDashboard from "./pages/CandidateDashboard";


function App() {
  return (
    <Router>
       <Navbar />
      <Routes>
                 <Route path="/" element={<Home />} />

        <Route path="/" element={<Navigate to="/login" replace />} />
       <Route path="/hr/dashboard" element={<ProtectedRoute allowedRoles={["HR"]}><HRDashboard /></ProtectedRoute>} />
<Route path="/hr/jobs/add" element={<ProtectedRoute allowedRoles={["HR"]}><AddJob /></ProtectedRoute>} />
<Route path="/hr/jobs" element={<ProtectedRoute allowedRoles={["HR"]}><JobsList /></ProtectedRoute>} />
<Route path="/hr/candidates" element={<ProtectedRoute allowedRoles={["HR"]}><CandidateList /></ProtectedRoute>} />
<Route path="/hr/candidates/:id" element={<ProtectedRoute allowedRoles={["HR"]}><CandidateDetail /></ProtectedRoute>} />
<Route path="/hr/interviews/schedule" element={<ProtectedRoute allowedRoles={["HR"]}><ScheduleInterview /></ProtectedRoute>} />
<Route path="/hr/hiring" element={<ProtectedRoute allowedRoles={["HR"]}><OfferManagement /></ProtectedRoute>} />

        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
           <Route
  path="/candidate/dashboard"
  element={
    <ProtectedRoute allowedRoles={["Candidate"]}>
      <CandidateDashboard />
    </ProtectedRoute>
  }
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
