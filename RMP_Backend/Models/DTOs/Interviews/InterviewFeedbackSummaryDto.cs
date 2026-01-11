namespace RMP_backend.Models.DTOs.Interviews
{
    public class InterviewFeedbackSummaryDto
    {
        public int InterviewId { get; set; }
        public string CandidateName { get; set; }
        public string JobTitle { get; set; }

        public List<FeedbackItemDto> Feedbacks { get; set; } = new();
    }

    public class FeedbackItemDto
    {
        public int FeedbackId { get; set; }
        public string InterviewerEmail { get; set; }
        public string Recommendation { get; set; }
        public string Comments { get; set; }
        public DateTime SubmittedAt { get; set; }
    }
}
