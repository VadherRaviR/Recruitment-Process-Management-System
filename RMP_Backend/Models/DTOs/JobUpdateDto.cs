using System.ComponentModel.DataAnnotations;
using RMP_backend.Models.Enums;

namespace RMP_backend.Models.DTOs.Jobs
{
    public class JobUpdateDto
    {
        [Required, MaxLength(250)]
        public string Title { get; set; }

        public string Description { get; set; }

        [MaxLength(100)]
        public string Department { get; set; }

        public int ExperienceRequired { get; set; }

        public string Skills { get; set; }

        public EntityStatus Status { get; set; } = EntityStatus.Open;
    }
}
