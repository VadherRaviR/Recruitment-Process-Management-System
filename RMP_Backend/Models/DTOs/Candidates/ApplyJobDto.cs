using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace RMP_backend.Models.DTOs.Candidates
{
    public class ApplyJobDto
    {
        [Required]
        public int JobId { get; set; }

        [Required]
        public string FullName { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; }

        public string? Phone { get; set; }

        public double ExperienceYears { get; set; }

        [Required]
        public IFormFile Resume { get; set; }

        public string? Source { get; set; }
    }
}
