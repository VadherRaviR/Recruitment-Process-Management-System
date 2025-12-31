using Microsoft.EntityFrameworkCore;
using RMP_backend.Models.DTOs.Skills;
using RMP_backend.Models.Entities;

namespace RMP_backend.Services
{
    public class SkillService : ISkillService
    {
        private readonly AppDbContext _context;

        public SkillService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<SkillResponseDto> CreateAsync(SkillCreateDto dto)
        {
            if (await _context.Skills.AnyAsync(s => s.Name == dto.Name))
                throw new Exception("Skill already exists");

            var skill = new Skill
            {
                Name = dto.Name,
                Description = dto.Description
            };

            _context.Skills.Add(skill);
            await _context.SaveChangesAsync();

            return Map(skill);
        }

        public async Task<SkillResponseDto> UpdateAsync(int id, SkillUpdateDto dto)
        {
            var skill = await _context.Skills.FindAsync(id);
            if (skill == null) throw new Exception("Skill not found");

            skill.Name = dto.Name;
            skill.Description = dto.Description;

            await _context.SaveChangesAsync();
            return Map(skill);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var skill = await _context.Skills
                .Include(s => s.JobRequiredSkills)
                .Include(s => s.JobPreferredSkills)
                .FirstOrDefaultAsync(s => s.SkillId == id);

            if (skill == null) return false;

            // Prevent deleting skills used by jobs
            if (skill.JobRequiredSkills.Any() || skill.JobPreferredSkills.Any())
                throw new Exception("Skill is used in jobs and cannot be deleted");

            _context.Skills.Remove(skill);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<SkillResponseDto>> GetAllAsync()
        {
            return await _context.Skills
                .OrderBy(s => s.Name)
                .Select(s => Map(s))
                .ToListAsync();
        }

        public async Task<SkillResponseDto?> GetByIdAsync(int id)
        {
            var skill = await _context.Skills.FindAsync(id);
            return skill == null ? null : Map(skill);
        }

        private static SkillResponseDto Map(Skill s) =>
            new SkillResponseDto
            {
                SkillId = s.SkillId,
                Name = s.Name,
                Description = s.Description
            };
    }
}
