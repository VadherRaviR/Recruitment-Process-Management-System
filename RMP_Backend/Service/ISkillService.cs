using RMP_backend.Models.DTOs.Skills;

namespace RMP_backend.Services
{
    public interface ISkillService
    {
        Task<SkillResponseDto> CreateAsync(SkillCreateDto dto);
        Task<SkillResponseDto> UpdateAsync(int id, SkillUpdateDto dto);
        Task<bool> DeleteAsync(int id);
        Task<List<SkillResponseDto>> GetAllAsync();
        Task<SkillResponseDto?> GetByIdAsync(int id);
    }
}
