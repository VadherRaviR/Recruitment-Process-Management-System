using System.ComponentModel.DataAnnotations;

namespace RMP_backend.Models.Entities
{
    public class JobRequiredSkill
    {
        public int JobId { get; set; }
        public Job Job { get; set; }

        public int SkillId { get; set; }
        public Skill Skill { get; set; }

        public int Weightage { get; set; }
    }
}
