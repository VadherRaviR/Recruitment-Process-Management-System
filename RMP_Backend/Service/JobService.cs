using AutoMapper;
using RMP_backend.Models.DTOs.Jobs;
using RMP_backend.Models.Entities;
using RMP_backend.Repositories;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RMP_backend.Services
{
    public class JobService : IJobService
    {
        private readonly IJobRepository _repo;
        private readonly IMapper _mapper;

        public JobService(IJobRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<IEnumerable<JobResponseDto>> GetAllAsync()
        {
            var jobs = await _repo.GetAllAsync();
            var dtos = _mapper.Map<IEnumerable<JobResponseDto>>(jobs).ToList();

            // populate applicants count
            foreach (var dto in dtos)
            {
                dto.ApplicantsCount = await _repo.GetApplicantsCountAsync(dto.JobId);
            }

            return dtos;
        }

        public async Task<JobResponseDto> GetByIdAsync(int id)
        {
            var job = await _repo.GetByIdAsync(id);
            if (job == null) return null;

            var dto = _mapper.Map<JobResponseDto>(job);
            dto.ApplicantsCount = await _repo.GetApplicantsCountAsync(id);
            return dto;
        }

        public async Task<JobResponseDto> CreateAsync(JobCreateDto dto, int? createdById = null)
        {
            var job = _mapper.Map<Job>(dto);

            if (createdById.HasValue)
                job.CreatedById = createdById.Value;

            await _repo.AddAsync(job);
            await _repo.SaveChangesAsync();

            var response = _mapper.Map<JobResponseDto>(job);
            response.ApplicantsCount = 0;
            return response;
        }

        public async Task<bool> UpdateAsync(int id, JobUpdateDto dto)
        {
            var job = await _repo.GetByIdAsync(id);
            if (job == null) return false;

            _mapper.Map(dto, job);
            _repo.Update(job);
            return await _repo.SaveChangesAsync();
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var job = await _repo.GetByIdAsync(id);
            if (job == null) return false;

            _repo.Remove(job);
            return await _repo.SaveChangesAsync();
        }
    }
}
