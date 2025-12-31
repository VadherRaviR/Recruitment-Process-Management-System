using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RMP_backend.Repositories;
using RMP_backend.Models.DTOs.Jobs;
using RMP_backend.Models.Entities;
using RMP_backend.Models.Enums;



namespace RMP_backend.Services
{
    public class JobService : IJobService
    {
        private readonly IJobRepository _repo;
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public JobService(IJobRepository repo, AppDbContext context, IMapper mapper)
        {
            _repo = repo;
            _context = context;
            _mapper = mapper;
        }

        public async Task<JobResponseDto> CreateJobAsync(int userId, JobCreateDto dto)
        {
            using var tx = await _context.Database.BeginTransactionAsync();

            var job = new Job
            {
                Title = dto.Title,
                Description = dto.Description,
                Department = dto.Department,
                ExperienceRequired = dto.ExperienceRequired,
                CreatedById = userId,
                CreatedDate = DateTime.UtcNow
            };

            await _repo.AddAsync(job);

            // handle required skills (ensure skill exists)
            foreach (var s in dto.RequiredSkills ?? Enumerable.Empty<SkillWithImportanceDto>())
            {
                var skill = await EnsureSkillExistsAsync(s.SkillId);
                _context.JobRequiredSkills.Add(new JobRequiredSkill
                {
                    JobId = job.JobId,
                    SkillId = skill.SkillId,
                    Weightage = s.Weightage
                });
            }

            // handle preferred skills
            foreach (var s in dto.PreferredSkills ?? Enumerable.Empty<SkillWithImportanceDto>())
            {
                var skill = await EnsureSkillExistsAsync(s.SkillId);
                _context.JobPreferredSkills.Add(new JobPreferredSkill
                {
                    JobId = job.JobId,
                    SkillId = skill.SkillId,
                    Weightage = s.Weightage
                });
            }

            await _context.SaveChangesAsync();
            await tx.CommitAsync();

            var loaded = await _repo.GetByIdWithSkillsAsync(job.JobId);
            return _mapper.Map<JobResponseDto>(loaded);
        }

        public async Task<JobResponseDto> UpdateJobAsync(int userId, int jobId, JobUpdateDto dto)
        {
            var job = await _repo.GetByIdWithSkillsAsync(jobId);
            if (job == null) throw new KeyNotFoundException("Job not found");

            job.Title = dto.Title ?? job.Title;
            job.Description = dto.Description ?? job.Description;
            job.Department = dto.Department ?? job.Department;
            job.ExperienceRequired = dto.ExperienceRequired;

            _context.JobRequiredSkills.RemoveRange(job.RequiredSkills);
            _context.JobPreferredSkills.RemoveRange(job.PreferredSkills);
            await _context.SaveChangesAsync();

            foreach (var s in dto.RequiredSkills ?? Enumerable.Empty<SkillWithImportanceDto>())
            {
                var skill = await EnsureSkillExistsAsync(s.SkillId);
                _context.JobRequiredSkills.Add(new JobRequiredSkill
                {
                    JobId = job.JobId,
                    SkillId = skill.SkillId,
                    Weightage = s.Weightage
                });
            }

            foreach (var s in dto.PreferredSkills ?? Enumerable.Empty<SkillWithImportanceDto>())
            {
                var skill = await EnsureSkillExistsAsync(s.SkillId);
                _context.JobPreferredSkills.Add(new JobPreferredSkill
                {
                    JobId = job.JobId,
                    SkillId = skill.SkillId,
                    Weightage = s.Weightage
                });
            }

            await _context.SaveChangesAsync();
            job = await _repo.GetByIdWithSkillsAsync(jobId);
            return _mapper.Map<JobResponseDto>(job);
        }

        public async Task<JobResponseDto> ChangeStatusAsync(int userId, int jobId, UpdateJobStatusDto dto)
        {
            var job = await _repo.GetByIdWithSkillsAsync(jobId);
            if (job == null) throw new KeyNotFoundException("Job not found");

            // parse status
            if (!Enum.TryParse<RMP_backend.Models.Enums.EntityStatus>(dto.Status, true, out var newStatus))
                throw new ArgumentException("Invalid status provided");

            
            if (newStatus == RMP_backend.Models.Enums.EntityStatus.OnHold)
            {
                if (string.IsNullOrWhiteSpace(dto.Reason))
                    throw new ArgumentException("Reason is required when putting job on hold");
            }

            if (newStatus == RMP_backend.Models.Enums.EntityStatus.Closed)
            {
                if (dto.Filled == true)
                {
                    if (dto.ClosedCandidateId == null)
                        throw new ArgumentException("closedCandidateId required when filled=true");

                    job.Status = newStatus;
              //  job.ClosedCandidateId = dto.ClosedCandidateId.Value;
                }
                else
                {
                    if (string.IsNullOrWhiteSpace(dto.Reason))
                        throw new ArgumentException("Close reason is required when closing without fill");
                    job.Status = newStatus;
                }
            }
            else
            {
                job.Status = newStatus;
            }

            await _repo.UpdateAsync(job);
            var updated = await _repo.GetByIdWithSkillsAsync(jobId);
            return _mapper.Map<JobResponseDto>(updated);
        }

        public async Task<JobResponseDto> GetByIdAsync(int jobId)
        {
            var job = await _repo.GetByIdWithSkillsAsync(jobId);
            if (job == null) return null;
            return _mapper.Map<JobResponseDto>(job);
        }

        public async Task<IEnumerable<JobResponseDto>> GetAllAsync()
        {
            var jobs = await _repo.GetAllAsync();
            return jobs.Select(j => _mapper.Map<JobResponseDto>(j));
        }

        private async Task<Skill> EnsureSkillExistsAsync(int skillId)
        {
            var skill = await _context.Skills.FindAsync(skillId);
            if (skill == null) throw new KeyNotFoundException($"Skill with id {skillId} not found");
            return skill;
        }


        public async Task<IEnumerable<JobApplicantDto>> GetApplicantsAsync(int recruiterId, int jobId)
        {
            var job = await _context.Jobs
                .AsNoTracking()
                .FirstOrDefaultAsync(j => j.JobId == jobId);

            if (job == null)
                throw new KeyNotFoundException("Job not found");

            // if (job.CreatedById != recruiterId)
            //     throw new UnauthorizedAccessException("Not allowed to view applicants");

            return await _context.CandidateJobLinks
                .Where(cj => cj.JobId == jobId)
                .Include(cj => cj.Candidate)
                .OrderByDescending(cj => cj.AppliedDate)
                .Select(cj => new JobApplicantDto
                {
                    CandidateId = cj.CandidateId,
                    FullName = cj.Candidate.FullName,
                    Email = cj.Candidate.Email,
                    Phone = cj.Candidate.Phone,
                    ExperienceYears = cj.Candidate.ExperienceYears,
                    ResumePath = cj.Candidate.ResumePath,
                    ApplicationStatus = cj.Status.ToString(),
                    AppliedDate = cj.AppliedDate
                })
                .ToListAsync();
        }


        public async Task<CandidateProfileForRecruiterDto> GetApplicantProfileAsync(
            int recruiterId,
            int jobId,
            int candidateId)
        {
            var job = await _context.Jobs
                .AsNoTracking()
                .FirstOrDefaultAsync(j => j.JobId == jobId);

            if (job == null)
                throw new KeyNotFoundException("Job not found");

            // if (job.CreatedById != recruiterId)
            //     throw new UnauthorizedAccessException("Not allowed");

            var application = await _context.CandidateJobLinks
                .Include(cj => cj.Candidate)
                    .ThenInclude(c => c.CandidateSkills)
                        .ThenInclude(cs => cs.Skill)
                .FirstOrDefaultAsync(cj =>
                    cj.JobId == jobId &&
                    cj.CandidateId == candidateId);

            if (application == null)
                throw new KeyNotFoundException("Application not found");

            return new CandidateProfileForRecruiterDto
            {
                CandidateId = application.CandidateId,
                FullName = application.Candidate.FullName,
                Email = application.Candidate.Email,
                Phone = application.Candidate.Phone,
                ExperienceYears = application.Candidate.ExperienceYears,
                ResumePath = application.Candidate.ResumePath,
                ApplicationStatus = application.Status.ToString(),
                Skills = application.Candidate.CandidateSkills
                    .Select(cs => cs.Skill.Name)
                    .ToList()
            };
        }

        public async Task UpdateCandidateStatusAsync(
            int recruiterId,
            int jobId,
            int candidateId,
            UpdateCandidateStatusDto dto)
        {
            //  Validate Job
            var job = await _context.Jobs
                .AsNoTracking()
                .FirstOrDefaultAsync(j => j.JobId == jobId);

            if (job == null)
                throw new KeyNotFoundException("Job not found");

            // if (job.CreatedById != recruiterId)
            //     throw new UnauthorizedAccessException("You are not allowed to modify this job");

            // Validate Application
            var application = await _context.CandidateJobLinks
                .FirstOrDefaultAsync(cj =>
                    cj.JobId == jobId &&
                    cj.CandidateId == candidateId);

            if (application == null)
                throw new KeyNotFoundException("Candidate application not found");

            //  Parse & Validate Status
            if (!Enum.TryParse<CandidateStatus>(
                    dto.Status,
                    ignoreCase: true,
                    out var newStatus))
            {
                throw new ArgumentException("Invalid candidate status");
            }

            // Rejection requires reason
            if (newStatus == CandidateStatus.Rejected &&
                string.IsNullOrWhiteSpace(dto.Reason))
            {
                throw new ArgumentException("Reason is required when rejecting a candidate");
            }

            var oldStatus = application.Status;

            if (oldStatus == newStatus)
                return;

            // Update Status
            application.Status = newStatus;

            //  Status History
            _context.StatusHistories.Add(new StatusHistory
            {
                EntityType = "CandidateJob",
                EntityId = jobId, 
                OldStatus = oldStatus.ToString(),
                NewStatus = newStatus.ToString(),
                UpdatedById = recruiterId,
                UpdatedDate = DateTime.UtcNow
            });

            await _context.SaveChangesAsync();
        }



    }


}
