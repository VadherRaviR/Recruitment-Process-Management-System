using System.Collections.Generic;

using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RMP_backend.Models.Entities
{
    public class Skill
    {
        [Key]
        public int SkillId { get; set; }

        [Required, MaxLength(150)]
        public string Name { get; set; }

        public string Description { get; set; }

         public ICollection<CandidateSkill> CandidateSkills { get; set; }
        public ICollection<ReviewSkill> ReviewSkills { get; set; }
        public ICollection<JobRequiredSkill> JobRequiredSkills { get; set; } = new List<JobRequiredSkill>();
        public ICollection<JobPreferredSkill> JobPreferredSkills { get; set; } = new List<JobPreferredSkill>();
    }
}
