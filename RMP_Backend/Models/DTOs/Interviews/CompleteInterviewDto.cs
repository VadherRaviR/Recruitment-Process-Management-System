using System.ComponentModel.DataAnnotations;

namespace RMP_backend.Models.DTOs.Interviews
{
    public class CompleteInterviewDto
    {
        [Required]
        public int InterviewId { get; set; }
    }
}
