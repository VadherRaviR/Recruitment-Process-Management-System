using System;

namespace RMP_backend.Models.DTOs.Candidates
{
    public class CandidateAppliedJobDto
    {
        public int JobId { get; set; }
        public string JobTitle { get; set; }
        public string ApplicationStatus { get; set; }
        public string JobStatus { get; set; }
        public DateTime AppliedDate { get; set; }
    }
}
