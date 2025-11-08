using System.ComponentModel.DataAnnotations.Schema;

namespace RMP_backend.Models.Entities
{
    public class InterviewPanel
    {
        public int InterviewId { get; set; }   // FK + PK part
        public int InterviewerId { get; set; } // FK + PK part

        
        public Interview Interview { get; set; }
        public User Interviewer { get; set; }
    }
}
