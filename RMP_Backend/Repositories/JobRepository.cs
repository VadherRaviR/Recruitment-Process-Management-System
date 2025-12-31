using Microsoft.EntityFrameworkCore;
using RMP_backend.Models.Entities;

namespace RMP_backend.Repositories
{
    public class JobRepository : IJobRepository
    {
        private readonly AppDbContext _context;
        public JobRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Job> AddAsync(Job job)
        {
            _context.Jobs.Add(job);
            await _context.SaveChangesAsync();
            return job;
        }

        public async Task<Job> GetByIdWithSkillsAsync(int id)
        {
            return await _context.Jobs
                .Include(j => j.RequiredSkills).ThenInclude(rs => rs.Skill)
                .Include(j => j.PreferredSkills).ThenInclude(ps => ps.Skill)
                .FirstOrDefaultAsync(j => j.JobId == id);
        }

        public async Task<IEnumerable<Job>> GetAllAsync()
        {
            return await _context.Jobs
                .Include(j => j.RequiredSkills).ThenInclude(rs => rs.Skill)
                .Include(j => j.PreferredSkills).ThenInclude(ps => ps.Skill)
                .ToListAsync();
        }

        public async Task UpdateAsync(Job job)
        {
            _context.Jobs.Update(job);
            await _context.SaveChangesAsync();
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
