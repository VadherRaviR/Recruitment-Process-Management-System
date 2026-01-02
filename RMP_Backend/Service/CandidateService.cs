using Microsoft.EntityFrameworkCore;
using RMP_backend.Models.DTOs.Candidates;
using RMP_backend.Models.Entities;
using RMP_backend.Models.Enums;
using ClosedXML.Excel;


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


        public async Task<BulkUploadResultDto> BulkUploadForJobAsync(
    IFormFile excel,
    List<IFormFile> resumes,
    int jobId)
{
    var result = new BulkUploadResultDto();

    // 1️⃣ Validate Job
    var job = await _context.Jobs.FindAsync(jobId);
    if (job == null)
        throw new Exception("Job not found");

    if (job.Status != EntityStatus.Open)
        throw new Exception("Job is not open");

    // 2️⃣ Resume map
    var resumeMap = resumes.ToDictionary(
        r => r.FileName,
        r => r,
        StringComparer.OrdinalIgnoreCase);

    // 3️⃣ Read Excel
    using var stream = excel.OpenReadStream();
    using var workbook = new XLWorkbook(stream);
    var sheet = workbook.Worksheet("Candidates");

    var rows = sheet.RangeUsed().RowsUsed().Skip(1);
    result.TotalRows = rows.Count();

    foreach (var row in rows)
    {
        try
        {
            var fullName = row.Cell(1).GetString().Trim();
            var email = row.Cell(2).GetString().Trim();
            var phone = row.Cell(3).GetString().Trim();
            double.TryParse(row.Cell(4).GetString(), out var experience);
            var resumeName = row.Cell(5).GetString().Trim();
            var source = row.Cell(6).GetString().Trim();

            if (string.IsNullOrWhiteSpace(email))
            {
                result.Skipped++;
                continue;
            }

            // 4️⃣ Find or Create Candidate
            var candidate = await _context.Candidates
                .FirstOrDefaultAsync(c => c.Email == email);

            var isNew = false;

            if (candidate == null)
            {
                candidate = new Candidate
                {
                    FullName = fullName,
                    Email = email,
                    Phone = phone,
                    ExperienceYears = experience,
                    Status = CandidateStatus.Screening
                };

                _context.Candidates.Add(candidate);
                await _context.SaveChangesAsync(); // get CandidateId
                isNew = true;
            }
            else
            {
                candidate.FullName = fullName;
                candidate.Phone = phone;
                candidate.ExperienceYears = experience;
            }

            // 5️⃣ Save Resume
            if (!string.IsNullOrWhiteSpace(resumeName) &&
                resumeMap.TryGetValue(resumeName, out var resumeFile))
            {
                candidate.ResumePath =
                    await SaveResumeAsync(resumeFile, candidate.CandidateId);
            }

            await _context.SaveChangesAsync();

            // 6️⃣ Link Candidate to Job
            var alreadyApplied = await _context.CandidateJobLinks.AnyAsync(cj =>
                cj.JobId == jobId &&
                cj.CandidateId == candidate.CandidateId);

            if (!alreadyApplied)
            {
                _context.CandidateJobLinks.Add(new CandidateJobLink
                {
                    JobId = jobId,
                    CandidateId = candidate.CandidateId,
                    Status = CandidateStatus.Screening,
                    Source = source
                });

                await _context.SaveChangesAsync();
            }
            else
            {
                result.Skipped++;
                continue;
            }

            if (isNew) result.Created++;
            else result.Updated++;
        }
        catch (Exception ex)
        {
            result.Failed++;
            result.Errors.Add(new BulkUploadErrorDto
            {
                Row = row.RowNumber(),
                Email = row.Cell(2).GetString(),
                Error = ex.Message
            });
        }
    }

    return result;
}
    }
}
