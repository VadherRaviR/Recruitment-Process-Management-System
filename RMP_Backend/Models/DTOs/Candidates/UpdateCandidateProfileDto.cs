using System.ComponentModel.DataAnnotations;

namespace RMP_backend.Models.DTOs.Candidates
{
    public class UpdateCandidateProfileDto
    {
        [Required, MaxLength(200)]
        public string FullName { get; set; }

        [MaxLength(20)]
        public string? Phone { get; set; }

        [Range(0, 50)]
        public double ExperienceYears { get; set; }
    }
}
