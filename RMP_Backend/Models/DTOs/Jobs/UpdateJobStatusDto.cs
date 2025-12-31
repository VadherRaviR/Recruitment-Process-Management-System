namespace RMP_backend.Models.DTOs.Jobs
{
    public class UpdateJobStatusDto
    {
        public string Status { get; set; } 
        public bool? Filled { get; set; } 
        public int? ClosedCandidateId { get; set; } 
        public string Reason { get; set; } 
    }
}
