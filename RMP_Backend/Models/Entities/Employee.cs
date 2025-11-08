using System;
using System.ComponentModel.DataAnnotations;

namespace RMP_backend.Models.Entities
{
    public class Employee
    {
        [Key]
        public int EmployeeId { get; set; }

        public int CandidateId { get; set; }
        public Candidate Candidate { get; set; }

        public int JobId { get; set; }
        public Job Job { get; set; }

        public DateTime JoiningDate { get; set; }

        [MaxLength(50)]
        public string EmpCode { get; set; }
    }
}
