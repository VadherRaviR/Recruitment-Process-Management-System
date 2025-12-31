using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using RMP_backend.Models.Enums;

namespace RMP_backend.Models.Entities
{
    public class Job
    {
        [Key]
        public int JobId { get; set; }

        [Required, MaxLength(250)]
        public string Title { get; set; }

        public string Description { get; set; }

        [MaxLength(100)]
        public string Department { get; set; }

        public int ExperienceRequired { get; set; }

        public EntityStatus Status { get; set; } = EntityStatus.Open;

        public int CreatedById { get; set; }
        public User CreatedBy { get; set; }

        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

    
        public ICollection<JobRequiredSkill> RequiredSkills { get; set; }

        
        public ICollection<JobPreferredSkill> PreferredSkills { get; set; }

        public ICollection<CandidateJobLink> CandidateJobLinks { get; set; }
        public ICollection<Interview> Interviews { get; set; }
        public ICollection<OfferLetter> OfferLetters { get; set; }
    }

   

  
}
