using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RMP_backend.Models.Entities
{
    public class Skill
    {
        [Key]
        public int SkillId { get; set; }

        [Required, MaxLength(100)]
        public string SkillName { get; set; }

        public ICollection<JobSkill> JobSkills { get; set; }
        public ICollection<CandidateSkill> CandidateSkills { get; set; }
        public ICollection<ReviewSkill> ReviewSkills { get; set; }
    }
}
