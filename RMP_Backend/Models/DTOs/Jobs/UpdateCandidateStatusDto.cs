using System.ComponentModel.DataAnnotations;

namespace RMP_backend.Models.DTOs.Jobs
{
    public class UpdateCandidateStatusDto
    {
        [Required]
        public string Status { get; set; } 

        public string? Reason { get; set; }
    }
}
