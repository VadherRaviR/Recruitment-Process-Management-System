using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using RMP_backend.Models.Enums;

namespace RMP_backend.Models.DTOs.Interviews
{
    public class ScheduleInterviewDto
    {
        [Required]
        public int JobId { get; set; }

        [Required]
        public int CandidateId { get; set; }

        [Required]
        public DateTime ScheduledAt { get; set; }

        [Required]
        public string RoundType { get; set; }

        [Required]
        public InterviewMode Mode { get; set; }

        public string? MeetLink { get; set; }
        public string? Location { get; set; }

        public List<int>? InterviewerIds { get; set; }
    }
}
