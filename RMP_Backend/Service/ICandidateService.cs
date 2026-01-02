using RMP_backend.Models.DTOs.Candidates;

namespace RMP_backend.Services
{
    public interface ICandidateService
    {
        Task ApplyForJobAsync(ApplyJobDto dto);

        Task<CandidateProfileDto> GetProfileAsync(string email);

        Task UpdateProfileAsync(string email, UpdateCandidateProfileDto dto);
        Task<BulkUploadResultDto> BulkUploadForJobAsync(IFormFile excel,List<IFormFile> resumes, int jobId
        );
    }
}
