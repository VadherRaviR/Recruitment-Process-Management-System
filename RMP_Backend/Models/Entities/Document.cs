using System;
using System.ComponentModel.DataAnnotations;

namespace RMP_backend.Models.Entities
{
    public class Document
    {
        [Key]
        public int DocumentId { get; set; }

        public int CandidateId { get; set; }
        public Candidate Candidate { get; set; }

        public string FilePath { get; set; }

        [MaxLength(50)]
        public string DocType { get; set; }

        public int? VerifiedById { get; set; }
        public User VerifiedBy { get; set; }

        public DateTime? VerifiedDate { get; set; }

        public bool IsVerified { get; set; } = false;
    }
}
