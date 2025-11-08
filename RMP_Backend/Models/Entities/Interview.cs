using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using RMP_backend.Models.Enums;

namespace RMP_backend.Models.Entities
{
    public class Interview
    {
        [Key]
        public int InterviewId { get; set; }

        public int CandidateId { get; set; }
        public Candidate Candidate { get; set; }

        public int JobId { get; set; }
        public Job Job { get; set; }

        public int ScheduledById { get; set; }
        public User ScheduledBy { get; set; }

        public DateTime ScheduledAt { get; set; }

        [MaxLength(100)]
        public string RoundType { get; set; }

        public InterviewMode Mode { get; set; } = InterviewMode.Online;

        [MaxLength(250)]
        public string Location { get; set; }

        public EntityStatus Status { get; set; } = EntityStatus.Open;

        public ICollection<InterviewPanel> InterviewPanels { get; set; }
        public ICollection<Feedback> Feedbacks { get; set; }
    }

    
}
