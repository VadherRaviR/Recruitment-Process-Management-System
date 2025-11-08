namespace RMP_backend.Models.Enums
{
    public enum EntityStatus
    {
        Open = 0,
        OnHold = 1,
        Closed = 2,
        Draft = 3
    }

    public enum CandidateStatus
    {
        Applied = 0,
        Screening = 1,
        Shortlisted = 2,
        InterviewScheduled = 3,
        OfferMade = 4,
        Joined = 5,
        Rejected = 6
    }

    public enum InterviewMode
    {
        Online = 0,
        Offline = 1,
        Phone = 2
    }

    public enum Recommendation
    {
        Select = 0,
        Reject = 1,
        Hold = 2
    }
}
