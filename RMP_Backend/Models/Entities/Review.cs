using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RMP_backend.Models.Entities
{
    public class Review
    {
        [Key]
        public int ReviewId { get; set; }

        public int CandidateId { get; set; }
        public Candidate Candidate { get; set; }

        public int JobId { get; set; }
        public Job Job { get; set; }

        public int ReviewerId { get; set; }
        public User Reviewer { get; set; }

        public DateTime ReviewDate { get; set; } = DateTime.UtcNow;

        public string Comments { get; set; }

        public bool Shortlisted { get; set; } = false;

        public ICollection<ReviewSkill> ReviewSkills { get; set; }
    }

    public class ReviewSkill
    {
        public int ReviewId { get; set; }
        public Review Review { get; set; }

        public int SkillId { get; set; }
        public Skill Skill { get; set; }

        public int Rating { get; set; }
        public double VerifiedYears { get; set; }
    }
}
