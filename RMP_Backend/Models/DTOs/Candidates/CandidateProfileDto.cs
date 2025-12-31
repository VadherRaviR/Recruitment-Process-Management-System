using System.Collections.Generic;

namespace RMP_backend.Models.DTOs.Candidates
{
    public class CandidateProfileDto
    {
        public int CandidateId { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string? Phone { get; set; }
        public double ExperienceYears { get; set; }
        public string? ResumePath { get; set; }

        public List<CandidateAppliedJobDto> AppliedJobs { get; set; } = new();
    }
}
