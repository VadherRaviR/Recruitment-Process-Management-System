using System.Threading.Tasks;
using RMP_backend.Models.DTOs.Interviews;

namespace RMP_backend.Services
{
    public interface IInterviewService
    {
        Task ScheduleInterviewAsync(int recruiterId, ScheduleInterviewDto dto);
        Task CompleteInterviewAsync(int recruiterId, CompleteInterviewDto dto);
        Task MakeDecisionAsync(int recruiterId, InterviewDecisionDto dto);
                Task<InterviewDetailsDto> GetInterviewAsync(int interviewId);

    }
}
