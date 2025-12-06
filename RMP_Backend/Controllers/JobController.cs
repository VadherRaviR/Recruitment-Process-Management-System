using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RMP_backend.Models.DTOs.Jobs;
using RMP_backend.Services;
using System.Threading.Tasks;

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

        // GET: api/jobs
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var jobs = await _svc.GetAllAsync();
            return Ok(jobs);
        }

        // GET: api/jobs/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var job = await _svc.GetByIdAsync(id);
            if (job == null) return NotFound();
            return Ok(job);
        }

        // POST: api/jobs
        // require HR or Admin role
        [HttpPost]
        [Authorize(Roles = "HR,Admin")]
        public async Task<IActionResult> Create([FromBody] JobCreateDto dto)
        {
            // optional: read createdBy from token
            var createdById = int.TryParse(User.FindFirst("id")?.Value, out var uid) ? uid : (int?)null;

            var created = await _svc.CreateAsync(dto, createdById);
            return CreatedAtAction(nameof(Get), new { id = created.JobId }, created);
        }

        // PUT: api/jobs/5
        [HttpPut("{id}")]
        [Authorize(Roles = "HR,Admin")]
        public async Task<IActionResult> Update(int id, [FromBody] JobUpdateDto dto)
        {
            var ok = await _svc.UpdateAsync(id, dto);
            if (!ok) return NotFound();
            return NoContent();
        }

        // DELETE: api/jobs/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "HR,Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            var ok = await _svc.DeleteAsync(id);
            if (!ok) return NotFound();
            return NoContent();
        }
    }
}

