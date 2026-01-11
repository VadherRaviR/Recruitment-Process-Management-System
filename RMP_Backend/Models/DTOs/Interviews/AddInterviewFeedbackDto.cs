using System.ComponentModel.DataAnnotations;
using RMP_backend.Models.Enums;

namespace RMP_backend.Models.DTOs.Interviews
{
    public class AddInterviewFeedbackDto
    {
        [Required]
        public int InterviewId { get; set; }

        [Required]
        public Recommendation Recommendation { get; set; }

        [MaxLength(1000)]
        public string? Comments { get; set; }
    }
}