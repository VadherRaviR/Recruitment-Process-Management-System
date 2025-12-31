using System.ComponentModel.DataAnnotations.Schema;

namespace RMP_backend.Models.Entities
{
    public class InterviewPanel
{
    public int InterviewId { get; set; }   // PK + FK
    public Interview Interview { get; set; }

    public int InterviewerId { get; set; } // PK + FK
    public User Interviewer { get; set; }
}
}
