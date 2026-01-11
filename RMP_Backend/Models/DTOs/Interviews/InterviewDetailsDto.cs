using System;
using System.Collections.Generic;

namespace RMP_backend.Models.DTOs.Interviews
{
    public class InterviewDetailsDto
    {
        public int InterviewId { get; set; }

        public int JobId { get; set; }
        public string JobTitle { get; set; }

        public int CandidateId { get; set; }
        public string CandidateName { get; set; }
        public string CandidateEmail { get; set; }

        public DateTime ScheduledAt { get; set; }
        public string RoundType { get; set; }
        public string Mode { get; set; }

        public string? MeetLink { get; set; }
        public string? Location { get; set; }

        public string Status { get; set; }

        public List<string> Interviewers { get; set; } = new();

        public int FeedbackCount { get; set; }
    }
}
