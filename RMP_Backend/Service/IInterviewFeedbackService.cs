using System.Threading.Tasks;
using RMP_backend.Models.DTOs.Interviews;

namespace RMP_backend.Services
{
    public interface IInterviewFeedbackService
    {
        Task AddFeedbackAsync(int interviewerId, AddInterviewFeedbackDto dto);
            Task<InterviewFeedbackSummaryDto> GetFeedbackSummaryAsync(int interviewId);

    }
}
