using Microsoft.EntityFrameworkCore;
using RMP_backend.Models.DTOs.Interviews;
using RMP_backend.Models.Entities;
using RMP_backend.Models.Enums;

namespace RMP_backend.Services
{
    public class InterviewFeedbackService : IInterviewFeedbackService
    {
        private readonly AppDbContext _context;

        public InterviewFeedbackService(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddFeedbackAsync(int interviewerId, AddInterviewFeedbackDto dto)
        {
            var interview = await _context.Interviews
                .Include(i => i.InterviewPanels)
                .FirstOrDefaultAsync(i => i.InterviewId == dto.InterviewId);

            if (interview == null)
                throw new Exception("Interview not found");

            var isPanelMember = interview.InterviewPanels
                .Any(ip => ip.InterviewerId == interviewerId);

            if (!isPanelMember)
                throw new UnauthorizedAccessException("You are not assigned to this interview");

            var alreadySubmitted = await _context.Feedbacks.AnyAsync(f =>
                f.InterviewId == dto.InterviewId &&
                f.InterviewerId == interviewerId);

            if (alreadySubmitted)
                throw new Exception("Feedback already submitted");

            var feedback = new Feedback
            {
                InterviewId = dto.InterviewId,
                InterviewerId = interviewerId,
                Recommendation = dto.Recommendation,
                Comments = dto.Comments
            };

            _context.Feedbacks.Add(feedback);
            await _context.SaveChangesAsync();
        }

public async Task<InterviewFeedbackSummaryDto> GetFeedbackSummaryAsync(int interviewId)
    {
        var interview = await _context.Interviews
            .Include(i => i.Candidate)
            .Include(i => i.Job)
            .Include(i => i.Feedbacks)
                .ThenInclude(f => f.Interviewer)
            .FirstOrDefaultAsync(i => i.InterviewId == interviewId);

        if (interview == null)
            throw new KeyNotFoundException("Interview not found");

        return new InterviewFeedbackSummaryDto
        {
            InterviewId = interview.InterviewId,
            CandidateName = interview.Candidate.FullName,
            JobTitle = interview.Job.Title,

            Feedbacks = interview.Feedbacks.Select(f => new FeedbackItemDto
            {
                FeedbackId = f.FeedbackId,
                InterviewerEmail = f.Interviewer.Email,
                Recommendation = f.Recommendation.ToString(),
                Comments = f.Comments,
            }).ToList()
        };
    }   
    }
}
