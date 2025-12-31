using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RMP_backend.Models.DTOs.Skills;
using RMP_backend.Services;

namespace RMP_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SkillController : ControllerBase
    {
        private readonly ISkillService _service;

        public SkillController(ISkillService service)
        {
            _service = service;
        }

        // Create Skill (Recruiter / Admin)
        [HttpPost]
        [Authorize(Roles = "Recruiter,Admin")]
        public async Task<IActionResult> Create([FromBody] SkillCreateDto dto)
        {
            var skill = await _service.CreateAsync(dto);
            return Ok(skill);
        }

        // Update Skill
        [HttpPut("{id}")]
        [Authorize(Roles = "Recruiter,Admin")]
        public async Task<IActionResult> Update(int id, [FromBody] SkillUpdateDto dto)
        {
            var skill = await _service.UpdateAsync(id, dto);
            return Ok(skill);
        }

        // Delete Skill
        [HttpDelete("{id}")]
        [Authorize(Roles = "Recruiter,Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _service.DeleteAsync(id);
            return result ? NoContent() : NotFound();
        }

        // Get All Skills (used by Add Job UI)
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll()
        {
            var skills = await _service.GetAllAsync();
            return Ok(skills);
        }

        // Get Skill By Id
        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetById(int id)
        {
            var skill = await _service.GetByIdAsync(id);
            return skill == null ? NotFound() : Ok(skill);
        }
    }
}
