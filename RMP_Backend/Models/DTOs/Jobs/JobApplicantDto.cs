using System;

namespace RMP_backend.Models.DTOs.Jobs
{
    public class JobApplicantDto
    {
        public int CandidateId { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string? Phone { get; set; }
        public double ExperienceYears { get; set; }
        public string? ResumePath { get; set; }

        public string ApplicationStatus { get; set; }
        public DateTime AppliedDate { get; set; }
    }
}
