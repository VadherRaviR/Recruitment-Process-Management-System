using RMP_backend.Models.DTOs.Jobs;

namespace RMP_backend.Services
{
    public interface IJobService
    {
        Task<JobResponseDto> CreateJobAsync(int userId, JobCreateDto dto);
        Task<JobResponseDto> UpdateJobAsync(int userId, int jobId, JobUpdateDto dto);
        Task<JobResponseDto> ChangeStatusAsync(int userId, int jobId, UpdateJobStatusDto dto);
        Task<JobResponseDto> GetByIdAsync(int jobId);
        Task<IEnumerable<JobResponseDto>> GetAllAsync();
         Task<IEnumerable<JobApplicantDto>> GetApplicantsAsync(int recruiterId, int jobId);


    Task<CandidateProfileForRecruiterDto> GetApplicantProfileAsync(
        int recruiterId,
        int jobId,
        int candidateId);

    Task UpdateCandidateStatusAsync(
        int recruiterId,
        int jobId,
        int candidateId,
        UpdateCandidateStatusDto dto);
}
}
