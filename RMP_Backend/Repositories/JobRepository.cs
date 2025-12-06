using Microsoft.EntityFrameworkCore;
using RMP_backend.Models.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RMP_backend.Repositories
{
    public class JobRepository : IJobRepository
    {
        private readonly AppDbContext _db;

        public JobRepository(AppDbContext db)
        {
            _db = db;
        }

        public async Task<IEnumerable<Job>> GetAllAsync()
        {
            return await _db.Jobs
                .Include(j => j.CreatedBy)
                .OrderByDescending(j => j.CreatedDate)
                .ToListAsync();
        }

        public async Task<Job> GetByIdAsync(int id)
        {
            return await _db.Jobs
                .Include(j => j.CreatedBy)
                .Include(j => j.CandidateJobLinks)
                .FirstOrDefaultAsync(j => j.JobId == id);
        }

        public async Task AddAsync(Job job)
        {
            await _db.Jobs.AddAsync(job);
        }

        public void Update(Job job)
        {
            _db.Jobs.Update(job);
        }

        public void Remove(Job job)
        {
            _db.Jobs.Remove(job);
        }

        public async Task<int> GetApplicantsCountAsync(int jobId)
        {
            return await _db.CandidateJobLinks.CountAsync(cj => cj.JobId == jobId);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _db.SaveChangesAsync()) > 0;
        }
    }
}
