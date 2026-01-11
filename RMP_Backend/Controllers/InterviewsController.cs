using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RMP_backend.Models.DTOs.Interviews;
using RMP_backend.Services;
using System.Security.Claims;

namespace RMP_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Recruiter,Admin,Interviewer")]
    public class InterviewsController : ControllerBase
    {
        private readonly IInterviewService _service;

        public InterviewsController(IInterviewService service)
        {
            _service = service;
        }

        [HttpPost("schedule")]
        public async Task<IActionResult> Schedule([FromBody] ScheduleInterviewDto dto)
        {
            var recruiterId = int.Parse(User.FindFirst("id")!.Value);

            await _service.ScheduleInterviewAsync(recruiterId, dto);

            return Ok(new { message = "Interview scheduled successfully" });
        }

         //  Complete Interview
        [HttpPut("complete")]
        public async Task<IActionResult> CompleteInterview(
            [FromBody] CompleteInterviewDto dto)
        {
            var recruiterId = int.Parse(User.FindFirst("id")!.Value);
            await _service.CompleteInterviewAsync(recruiterId, dto);
            return Ok(new { message = "Interview marked as completed" });
        }

        //  Final Decision
        [HttpPut("decision")]
        public async Task<IActionResult> MakeDecision(
            [FromBody] InterviewDecisionDto dto)
        {
            var recruiterId = int.Parse(User.FindFirst("id")!.Value);
            await _service.MakeDecisionAsync(recruiterId, dto);
            return Ok(new { message = "Candidate decision updated" });
        }

        [HttpGet("{id}")]
[Authorize(Roles = "Recruiter,Admin,Interviewer")]
public async Task<IActionResult> GetInterview(int id)
{
    var interview = await _service.GetInterviewAsync(id);
    return Ok(interview);
}
    }
}
