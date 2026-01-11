using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RMP_backend.Models.DTOs.Interviews;
using RMP_backend.Services;
using System.Security.Claims;

namespace RMP_backend.Controllers
{
    [ApiController]
    [Route("api/interviews/feedback")]
    [Authorize(Roles = "Interviewer,Recruiter,HR")]
    public class InterviewFeedbackController : ControllerBase
    {
        private readonly IInterviewFeedbackService _service;

        public InterviewFeedbackController(IInterviewFeedbackService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> AddFeedback(
            [FromBody] AddInterviewFeedbackDto dto)
        {
            var interviewerId = int.Parse(User.FindFirst("id")!.Value);

            await _service.AddFeedbackAsync(interviewerId, dto);

            return Ok(new { message = "Feedback submitted successfully" });
        }

         // ================= FEEDBACK SUMMARY =================
    [HttpGet("{id}/feedback")]
    [Authorize(Roles = "Recruiter,Admin")]
    public async Task<IActionResult> GetFeedbackSummary(int id)
    {
        var result = await _service.GetFeedbackSummaryAsync(id);
        return Ok(result);
    }
    }
}
