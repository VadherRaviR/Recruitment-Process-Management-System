using System.ComponentModel.DataAnnotations;
using RMP_backend.Models.Enums;

namespace RMP_backend.Models.DTOs.Interviews
{
    public class InterviewDecisionDto
    {
        [Required]
        public int JobId { get; set; }

        [Required]
        public int CandidateId { get; set; }

        [Required]
        public CandidateStatus Decision { get; set; } // OfferMade / Rejected / Hold

        public string? Reason { get; set; }
    }
}