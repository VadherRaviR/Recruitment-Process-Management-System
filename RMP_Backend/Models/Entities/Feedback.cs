using System;
using System.ComponentModel.DataAnnotations;
using RMP_backend.Models.Enums;

namespace RMP_backend.Models.Entities
{
    public class Feedback
    {
        [Key]
        public int FeedbackId { get; set; }

        public int InterviewId { get; set; }
        public Interview Interview { get; set; }

        public int InterviewerId { get; set; }
        public User Interviewer { get; set; }

        public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;

        public int OverallRating { get; set; }

        public string Comments { get; set; }

        public Recommendation Recommendation { get; set; } = Recommendation.Hold;
    }
}
