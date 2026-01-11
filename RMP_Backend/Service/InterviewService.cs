using Microsoft.EntityFrameworkCore;
using RMP_backend.Models.DTOs.Interviews;
using RMP_backend.Models.Entities;
using RMP_backend.Models.Enums;

namespace RMP_backend.Services
{
    public class InterviewService : IInterviewService
    {
        private readonly AppDbContext _context;

        public InterviewService(AppDbContext context)
        {
            _context = context;
        }

        public async Task ScheduleInterviewAsync(int recruiterId, ScheduleInterviewDto dto)
        {
            var application = await _context.CandidateJobLinks
                .FirstOrDefaultAsync(cj =>
                    cj.JobId == dto.JobId &&
                    cj.CandidateId == dto.CandidateId);

            if (application == null)
                throw new Exception("Candidate not applied to this job");

            if (application.Status != CandidateStatus.Shortlisted)
                throw new Exception("Candidate must be shortlisted first");

            if (dto.Mode == InterviewMode.Online && string.IsNullOrWhiteSpace(dto.MeetLink))
                throw new Exception("Meet link required for online interview");

            if (dto.Mode == InterviewMode.Offline && string.IsNullOrWhiteSpace(dto.Location))
                throw new Exception("Location required for offline interview");

            var interview = new Interview
            {
                JobId = dto.JobId,
                CandidateId = dto.CandidateId,
                ScheduledById = recruiterId,
                ScheduledAt = dto.ScheduledAt,
                RoundType = dto.RoundType,
                Mode = dto.Mode,
                MeetLink = dto.MeetLink,
                Location = dto.Location
            };

            _context.Interviews.Add(interview);
            await _context.SaveChangesAsync();

            
            if (dto.InterviewerIds != null)
            {
                foreach (var interviewerId in dto.InterviewerIds)
                {
                    _context.InterviewPanels.Add(new InterviewPanel
                    {
                        InterviewId = interview.InterviewId,
                        InterviewerId = interviewerId
                    });
                }
            }

            application.Status = CandidateStatus.InterviewScheduled;

            await _context.SaveChangesAsync();
        }

        // ================= COMPLETE INTERVIEW =================
        public async Task CompleteInterviewAsync(int recruiterId, CompleteInterviewDto dto)
        {
            var interview = await _context.Interviews
                .Include(i => i.Feedbacks)
                .FirstOrDefaultAsync(i => i.InterviewId == dto.InterviewId);

            if (interview == null)
                throw new Exception("Interview not found");

            if (!interview.Feedbacks.Any())
                throw new Exception("Interview cannot be completed without feedback");

            interview.Status = EntityStatus.Closed;

            await _context.SaveChangesAsync();
        }

        // ================= FINAL DECISION =================
        public async Task MakeDecisionAsync(int recruiterId, InterviewDecisionDto dto)
        {
            var application = await _context.CandidateJobLinks
                .FirstOrDefaultAsync(cj =>
                    cj.JobId == dto.JobId &&
                    cj.CandidateId == dto.CandidateId);

            if (application == null)
                throw new Exception("Candidate application not found");

            if (dto.Decision == CandidateStatus.Rejected &&
                string.IsNullOrWhiteSpace(dto.Reason))
                throw new Exception("Rejection reason required");

            var oldStatus = application.Status;

            application.Status = dto.Decision;

            _context.StatusHistories.Add(new StatusHistory
            {
                EntityType = "CandidateJob",
                EntityId = dto.JobId,
                OldStatus = oldStatus.ToString(),
                NewStatus = dto.Decision.ToString(),
                UpdatedById = recruiterId
            });

            await _context.SaveChangesAsync();
        }

                public async Task<InterviewDetailsDto> GetInterviewAsync(int interviewId)
        {
            var interview = await _context.Interviews
                .Include(i => i.Job)
                .Include(i => i.Candidate)
                .Include(i => i.InterviewPanels)
                    .ThenInclude(ip => ip.Interviewer)
                .Include(i => i.Feedbacks)
                .FirstOrDefaultAsync(i => i.InterviewId == interviewId);

            if (interview == null)
                throw new Exception("Interview not found");

            return new InterviewDetailsDto
            {
                InterviewId = interview.InterviewId,
                JobId = interview.JobId,
                JobTitle = interview.Job.Title,

                CandidateId = interview.CandidateId,
                CandidateName = interview.Candidate.FullName,
                CandidateEmail = interview.Candidate.Email,

                ScheduledAt = interview.ScheduledAt,
                RoundType = interview.RoundType,
                Mode = interview.Mode.ToString(),

                MeetLink = interview.MeetLink,
                Location = interview.Location,

                Status = interview.Status.ToString(),

                Interviewers = interview.InterviewPanels
                    .Select(p => p.Interviewer.FullName)
                    .ToList(),

                FeedbackCount = interview.Feedbacks.Count
            };
        }

    }
}
