using System;
using System.Collections.Generic;

namespace RMP_backend.Models.DTOs.Jobs
{
    public class JobResponseDto
    {
        public int JobId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Department { get; set; }
        public int ExperienceRequired { get; set; }
        public string Status { get; set; }
        public string CreatedByName { get; set; }
        public int CreatedById { get; set; }
        public DateTime CreatedDate { get; set; }

        public List<SkillResponseDto> RequiredSkills { get; set; } = new();
        public List<SkillResponseDto> PreferredSkills { get; set; } = new();
    }
}
