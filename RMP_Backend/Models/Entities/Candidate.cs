using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using RMP_backend.Models.Enums;

namespace RMP_backend.Models.Entities
{
    public class Candidate
    {
        [Key]
        public int CandidateId { get; set; }

        [Required, MaxLength(200)]
        public string FullName { get; set; } = string.Empty;

        [Required, MaxLength(150)]
        public string Email { get; set; } = string.Empty;

        [MaxLength(20)]
        public string? Phone { get; set; } = null;

        public string? ResumePath { get; set; } = null;

        public double ExperienceYears { get; set; }

        public CandidateStatus Status { get; set; } = CandidateStatus.Applied;

        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

        public ICollection<CandidateSkill> CandidateSkills { get; set; } = new List<CandidateSkill>();
        public ICollection<CandidateJobLink> CandidateJobLinks { get; set; } = new List<CandidateJobLink>();
        public ICollection<Review> Reviews { get; set; } = new List<Review>();
        public ICollection<Document> Documents { get; set; } = new List<Document>();
        public ICollection<OfferLetter> OfferLetters { get; set; } = new List<OfferLetter>();

        
        public ICollection<Interview> Interviews { get; set; } = new List<Interview>();

        
        public Employee? EmployeeRecord { get; set; } = null;
    }

    public class CandidateSkill
    {
        public int CandidateId { get; set; }
        public Candidate? Candidate { get; set; }

        public int SkillId { get; set; }
        public Skill? Skill { get; set; }

        public double Years { get; set; }
    }

    public class CandidateJobLink
    {
        public int CandidateId { get; set; }
        public Candidate? Candidate { get; set; }

        public int JobId { get; set; }
        public Job? Job { get; set; }

        public DateTime AppliedDate { get; set; } = DateTime.UtcNow;

        [MaxLength(100)]
        public string? Source { get; set; }

        public CandidateStatus Status { get; set; } = CandidateStatus.Applied;
    }
}
