using System.ComponentModel.DataAnnotations;

namespace RMP_backend.Models.DTOs.Jobs
{
   public class CreateJobDto
{
    public string Title { get; set; }
    public string Description { get; set; }
    public string Department { get; set; }
    public int ExperienceRequired { get; set; }
    public string Skills { get; set; } // <-- STRING!
}

}
