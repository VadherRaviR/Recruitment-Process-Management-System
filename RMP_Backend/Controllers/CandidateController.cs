using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RMP_backend.Models.DTOs.Candidates;
using RMP_backend.Services;
using System.Security.Claims;

namespace RMP_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CandidatesController : ControllerBase
    {
        private readonly ICandidateService _service;

        public CandidatesController(ICandidateService service)
        {
            _service = service;
        }

        // ================= APPLY JOB =================
        [HttpPost("apply")]
        [Authorize(Roles = "Candidate")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Apply([FromForm] ApplyJobDto dto)
        {
            await _service.ApplyForJobAsync(dto);
            return Ok(new { message = "Application submitted successfully" });
        }

        // ================= GET PROFILE =================
        [HttpGet("profile")]
        [Authorize(Roles = "Candidate")]
        public async Task<IActionResult> GetProfile()
        {
            var email = User.FindFirstValue(ClaimTypes.Email);

            if (string.IsNullOrWhiteSpace(email))
                return Unauthorized("Email claim missing in token");

            var profile = await _service.GetProfileAsync(email);
            return Ok(profile);
        }

        // ================= UPDATE PROFILE =================
        [HttpPut("profile")]
        [Authorize(Roles = "Candidate")]
        public async Task<IActionResult> UpdateProfile(
            [FromBody] UpdateCandidateProfileDto dto)
        {
            var email = User.FindFirstValue(ClaimTypes.Email);

            if (string.IsNullOrWhiteSpace(email))
                return Unauthorized("Email claim missing in token");

            await _service.UpdateProfileAsync(email, dto);
            return Ok(new { message = "Profile updated successfully" });
        }

        //bullk upload
        [HttpPost("bulk-upload-job")]
        [Authorize(Roles = "Recruiter,HR,Admin")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> BulkUploadForJob(
           [FromForm] BulkUploadJobRequestDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _service.BulkUploadForJobAsync(
                dto.Excel,
                dto.Resumes ?? new List<IFormFile>(),
                dto.JobId
            );

            return Ok(result);
        }
    }
}
