# Recruitment Process Management System (RMPS)

A web-based Recruitment Process Management System built to manage job postings, candidate applications, recruitment workflows, and hiring lifecycle.

This project is designed with clean architecture, role-based access control, and scalable data models similar to real-world ATS (Applicant Tracking Systems).

---

## Tech Stack

### Backend
- ASP.NET Core Web API 
- Entity Framework Core
- SQL Server
- JWT Authentication
- Role-Based Authorization (RBAC)

### Frontend
- React + Vite
- Tailwind CSS
- Axios (JWT interceptor)
- React Router

---

## User Roles

- **Admin** – Full system access
- **Recruiter** – Job management, candidate screening, hiring
- **Candidate** – View jobs, apply, manage profile
- **Interviewer / Reviewer** – Interview feedback & screening (planned)
- **Viewer** – Read-only access (planned)

---

## Authentication & Authorization

- JWT-based authentication
- Roles stored in `Users`, `Roles`, `UserRoles`
- JWT Claims:
  - UserId
  - Role
  - Name
- Role-based access using `[Authorize(Roles = "...")]`

---

##  Core Features (Implemented)

### Job Management
- Create, update, and manage jobs
- Job statuses:
  - Open
  - On Hold
  - Closed
  - Re-open from On Hold
- Required & Preferred skills linked separately
- Close job with:
  - Selected candidate **or**
  - Closure reason

### Candidate Flow
- Candidate registration & login
- Apply to job with resume upload
- Resume stored on server (file system, not DB)
- Duplicate application prevention
- Candidate job status tracking:
  - Applied → Screening → Shortlisted → Interview → Offer → Joined / Rejected

### Recruiter Features
- View all jobs
- View applicants per job
- View candidate profile
- Update candidate status
- Close job with hired candidate

### Status Tracking
- Entity status history recorded
- Candidate-job status managed per application

---

## Architecture

Controllers → Services → Repositories → DbContext

- DTO-based API communication
- Business logic inside services
- EF Core for data access
- Clean separation of concerns

---

##  Resume Upload

- Supported formats: PDF, DOC
- Stored under:
/Uploads/Resumes/
---

##  Frontend Structure

### Public Pages
- Home
- Job listing
- Job details

### Candidate
- Profile
- Applied jobs
- Resume re-upload

### Recruiter
- Dashboard
- Job list
- Job details
- Applicants list
- Candidate profile view

---

## API Overview

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Jobs
- `POST /api/jobs`
- `PUT /api/jobs/{id}`
- `PUT /api/jobs/{id}/status`
- `GET /api/jobs`
- `GET /api/jobs/{id}`

### Candidates
- `POST /api/candidates/apply`
- `GET /api/candidates/profile`

### Recruiter
- `GET /api/jobs/{id}/applications`
- `GET /api/jobs/{jobId}/applications/{candidateId}`
- `PUT /api/jobs/{jobId}/applications/{candidateId}/status`

---

## 🔄 Current Project Status

Completed:
- Core hiring workflow
- Job lifecycle
- Candidate applications
- Recruiter screening

Next planned modules:
- Reporting & dashboards
- Interview scheduling
- Candidate talent pool
- Offer & employee onboarding

---

## Future Enhancements

- Interview rounds & panels
- Email notifications
- Analytics & reports
- Bulk candidate upload (Excel)
- Automated skill matching
- Employee records module
