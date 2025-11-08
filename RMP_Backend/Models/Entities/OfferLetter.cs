using System;
using System.ComponentModel.DataAnnotations;
using RMP_backend.Models.Enums;

namespace RMP_backend.Models.Entities
{
    public class OfferLetter
    {
        [Key]
        public int OfferId { get; set; }

        public int CandidateId { get; set; }
        public Candidate Candidate { get; set; }

        public int JobId { get; set; }
        public Job Job { get; set; }

        public DateTime IssuedDate { get; set; } = DateTime.UtcNow;

        public DateTime? JoiningDate { get; set; }

        public decimal Salary { get; set; }

        public EntityStatus Status { get; set; } = EntityStatus.Draft;
    }
}
