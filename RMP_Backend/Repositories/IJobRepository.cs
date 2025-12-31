using RMP_backend.Models.Entities;

namespace RMP_backend.Repositories
{
    public interface IJobRepository
    {
        Task<Job> AddAsync(Job job);
        Task<Job> GetByIdWithSkillsAsync(int id);
        Task<IEnumerable<Job>> GetAllAsync();
        Task UpdateAsync(Job job);
        Task SaveChangesAsync();
    }
}
