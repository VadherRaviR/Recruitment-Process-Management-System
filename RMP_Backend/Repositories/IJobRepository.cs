using RMP_backend.Models.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RMP_backend.Repositories
{
    public interface IJobRepository
    {
        Task<IEnumerable<Job>> GetAllAsync();
        Task<Job> GetByIdAsync(int id);
        Task AddAsync(Job job);
        void Update(Job job);
        void Remove(Job job);
        Task<int> GetApplicantsCountAsync(int jobId);
        Task<bool> SaveChangesAsync();
    }
}
