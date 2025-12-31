using System.Collections.Generic;

namespace RMP_backend.Models.DTOs.Jobs
{
    public class JobCreateDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Department { get; set; }
        public int ExperienceRequired { get; set; }

        public List<SkillWithImportanceDto> RequiredSkills { get; set; } = new();
        public List<SkillWithImportanceDto> PreferredSkills { get; set; } = new();
    }
}
