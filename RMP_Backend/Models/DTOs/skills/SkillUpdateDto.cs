using System.ComponentModel.DataAnnotations;

namespace RMP_backend.Models.DTOs.Skills
{
    public class SkillUpdateDto
    {
        [Required, MaxLength(150)]
        public string Name { get; set; }

        public string Description { get; set; }
    }
}
