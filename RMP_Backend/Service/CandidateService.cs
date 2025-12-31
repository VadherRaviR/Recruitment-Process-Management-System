using Microsoft.EntityFrameworkCore;
using RMP_backend.Models.DTOs.Candidates;
using RMP_backend.Models.Entities;
using RMP_backend.Models.Enums;

namespace RMP_backend.Services
{
    public class CandidateService : ICandidateService
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _env;

        public CandidateService(AppDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        // ================= APPLY FOR JOB =================
        public async Task ApplyForJobAsync(ApplyJobDto dto)
        {
            var job = await _context.Jobs.FindAsync(dto.JobId);
            if (job == null)
                throw new Exception("Job not found");

            if (job.Status != EntityStatus.Open)
                throw new Exception("Job is not open");

            var candidate = await _context.Candidates
                .FirstOrDefaultAsync(c => c.Email == dto.Email);

            if (candidate == null)
            {
                candidate = new Candidate
                {
                    FullName = dto.FullName,
                    Email = dto.Email,
                    Phone = dto.Phone,
                    ExperienceYears = dto.ExperienceYears,
                    Status = CandidateStatus.Applied
                };

                _context.Candidates.Add(candidate);
                await _context.SaveChangesAsync();
            }

            var alreadyApplied = await _context.CandidateJobLinks
                .AnyAsync(cj => cj.JobId == dto.JobId && cj.CandidateId == candidate.CandidateId);

            if (alreadyApplied)
                throw new Exception("Already applied for this job");

            if (dto.Resume != null)
            {
                var resumePath = await SaveResumeAsync(dto.Resume, candidate.CandidateId);
                candidate.ResumePath = resumePath;
            }

            var link = new CandidateJobLink
            {
                CandidateId = candidate.CandidateId,
                JobId = dto.JobId,
                AppliedDate = DateTime.UtcNow,
                Status = CandidateStatus.Applied,
                Source = dto.Source
            };

            _context.CandidateJobLinks.Add(link);
            await _context.SaveChangesAsync();
        }

        // ================= GET CANDIDATE PROFILE =================
        public async Task<CandidateProfileDto> GetProfileAsync(string email)
        {
            var candidate = await _context.Candidates
                .Include(c => c.CandidateJobLinks)
                    .ThenInclude(cj => cj.Job)
                .AsNoTracking()
                .FirstOrDefaultAsync(c => c.Email == email);

            if (candidate == null)
                throw new Exception("Candidate profile not found");

            return new CandidateProfileDto
            {
                CandidateId = candidate.CandidateId,
                FullName = candidate.FullName,
                Email = candidate.Email,
                Phone = candidate.Phone,
                ExperienceYears = candidate.ExperienceYears,
                ResumePath = candidate.ResumePath,

                AppliedJobs = candidate.CandidateJobLinks
                    .OrderByDescending(cj => cj.AppliedDate)
                    .Select(cj => new CandidateAppliedJobDto
                    {
                        JobId = cj.JobId,
                        JobTitle = cj.Job.Title,
                        ApplicationStatus = cj.Status.ToString(),
                        JobStatus = cj.Job.Status.ToString(),
                        AppliedDate = cj.AppliedDate
                    })
                    .ToList()
            };
        }

        // ================= UPDATE PROFILE =================
        public async Task UpdateProfileAsync(string email, UpdateCandidateProfileDto dto)
        {
            var candidate = await _context.Candidates
                .FirstOrDefaultAsync(c => c.Email == email);

            if (candidate == null)
                throw new Exception("Candidate profile not found");

            candidate.FullName = dto.FullName;
            candidate.Phone = dto.Phone;
            candidate.ExperienceYears = dto.ExperienceYears;

            await _context.SaveChangesAsync();
        }

        // ================= RESUME UPLOAD =================
        private async Task<string> SaveResumeAsync(IFormFile file, int candidateId)
        {
            var uploadsDir = Path.Combine(_env.ContentRootPath, "Uploads", "Resumes");

            if (!Directory.Exists(uploadsDir))
                Directory.CreateDirectory(uploadsDir);

            var ext = Path.GetExtension(file.FileName);
            var fileName = $"candidate_{candidateId}_{Guid.NewGuid()}{ext}";
            var fullPath = Path.Combine(uploadsDir, fileName);

            using var stream = new FileStream(fullPath, FileMode.Create);
            await file.CopyToAsync(stream);

            return $"Uploads/Resumes/{fileName}";
        }
    }
}
