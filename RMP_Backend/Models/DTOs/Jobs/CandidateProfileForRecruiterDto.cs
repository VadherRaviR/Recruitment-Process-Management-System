namespace RMP_backend.Models.DTOs.Jobs
{
    public class CandidateProfileForRecruiterDto
    {
        public int CandidateId { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string? Phone { get; set; }
        public double ExperienceYears { get; set; }
        public string? ResumePath { get; set; }

        public string ApplicationStatus { get; set; }

        public List<StatusHistoryDto> Timeline { get; set; } = new();
        public List<InterviewSummaryDto> Interviews { get; set; } = new();
        public List<string> Skills { get; set; } = new();
    }

    public class StatusHistoryDto
    {
        public string OldStatus { get; set; }
        public string NewStatus { get; set; }
        public DateTime UpdatedDate { get; set; }
        public string UpdatedBy { get; set; }
    }

    public class InterviewSummaryDto
    {
        public int InterviewId { get; set; }
        public string RoundType { get; set; }
        public string Mode { get; set; }
        public DateTime ScheduledAt { get; set; }
        public string Status { get; set; }
        public string? Location { get; set; }
        public List<string> PanelMembers { get; set; } = new();
    }
}
