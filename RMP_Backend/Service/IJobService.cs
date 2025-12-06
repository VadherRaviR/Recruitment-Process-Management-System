using RMP_backend.Models.DTOs.Jobs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RMP_backend.Services
{
    public interface IJobService
    {
        Task<IEnumerable<JobResponseDto>> GetAllAsync();
        Task<JobResponseDto> GetByIdAsync(int id);
        Task<JobResponseDto> CreateAsync(JobCreateDto dto, int? createdById = null);
        Task<bool> UpdateAsync(int id, JobUpdateDto dto);
        Task<bool> DeleteAsync(int id);
    }
}
