using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RMP_backend.Models.DTOs.Jobs;
using RMP_backend.Services;
using System.Security.Claims;

namespace RMP_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JobsController : ControllerBase
    {
        private readonly IJobService _svc;
        public JobsController(IJobService svc)
        {
            _svc = svc;
        }

        // Create job
        [HttpPost]
        [Authorize(Roles = "Recruiter,Admin")]
        public async Task<IActionResult> Create([FromBody] JobCreateDto dto)
        {
            var userId = int.Parse(User.FindFirst("id").Value);
            var created = await _svc.CreateJobAsync(userId, dto);
            return CreatedAtAction(nameof(GetById), new { id = created.JobId }, created);
        }

        // Update job
        [HttpPut("{id}")]
        [Authorize(Roles = "Recruiter,Admin")]
        public async Task<IActionResult> Update(int id, [FromBody] JobUpdateDto dto)
        {
            var userId = int.Parse(User.FindFirst("id").Value);
            var updated = await _svc.UpdateJobAsync(userId, id, dto);
            return Ok(updated);
        }

        // Change status
        [HttpPut("{id}/status")]
        [Authorize(Roles = "Recruiter,Admin")]
        public async Task<IActionResult> ChangeStatus(int id, [FromBody] UpdateJobStatusDto dto)
        {
            var userId = int.Parse(User.FindFirst("id").Value);
            var updated = await _svc.ChangeStatusAsync(userId, id, dto);
            return Ok(updated);
        }

        // Get all
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll()
        {
            var list = await _svc.GetAllAsync();
            return Ok(list);
        }

        // Get by id
        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetById(int id)
        {
            var job = await _svc.GetByIdAsync(id);
            if (job == null) return NotFound();
            return Ok(job);
        }

        // ================= RECRUITER: VIEW APPLICANTS =================
        [HttpGet("{id}/applications")]
        [Authorize(Roles = "Recruiter,Admin")]
        public async Task<IActionResult> GetApplicants(int id)
        {
            var recruiterId = int.Parse(User.FindFirst("id").Value);
            var result = await _svc.GetApplicantsAsync(recruiterId, id);
            return Ok(result);
        }

        // ================= RECRUITER: VIEW CANDIDATE PROFILE =================
        [HttpGet("{jobId}/applications/{candidateId}")]
        [Authorize(Roles = "Recruiter,Admin")]
        public async Task<IActionResult> GetApplicantProfile(int jobId, int candidateId)
        {
            var recruiterId = int.Parse(User.FindFirst("id").Value);
            var result = await _svc.GetApplicantProfileAsync(
                recruiterId, jobId, candidateId);
            return Ok(result);
        }

        [HttpPut("{jobId}/applications/{candidateId}/status")]
[Authorize(Roles = "Recruiter,Admin")]
public async Task<IActionResult> UpdateCandidateStatus(
    int jobId,
    int candidateId,
    [FromBody] UpdateCandidateStatusDto dto)
{
    try
    {
        var recruiterId = int.Parse(User.FindFirst("id").Value);

        await _svc.UpdateCandidateStatusAsync(
            recruiterId,
            jobId,
            candidateId,
            dto);

        return Ok(new { message = "Candidate status updated successfully" });
    }
    catch (ArgumentException ex)
    {
        return BadRequest(new { message = ex.Message });
    }
    catch (UnauthorizedAccessException ex)
    {
        return Forbid();
    }
    catch (KeyNotFoundException ex)
    {
        return NotFound(new { message = ex.Message });
    }
    catch (Exception ex)
    {
        // 👇 THIS WILL TELL US THE REAL ERROR
        return StatusCode(500, new
        {
            message = "Internal server error",
            error = ex.Message,
            stack = ex.StackTrace
        });
    }
}


    }
}
