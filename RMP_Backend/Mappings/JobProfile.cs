using AutoMapper;
using RMP_backend.Models.DTOs.Jobs;
using RMP_backend.Models.Entities;

namespace RMP_backend.Mappings
{
    public class JobProfile : Profile
    {
        public JobProfile()
        {
            CreateMap<JobCreateDto, Job>()
                .ForMember(dest => dest.CreatedDate, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedBy, opt => opt.Ignore())
                .ForMember(dest => dest.JobSkills, opt => opt.Ignore())
                .ForMember(dest => dest.CandidateJobLinks, opt => opt.Ignore())
                .ForMember(dest => dest.Interviews, opt => opt.Ignore())
                .ForMember(dest => dest.OfferLetters, opt => opt.Ignore());

            CreateMap<JobUpdateDto, Job>()
                .ForMember(dest => dest.JobId, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedById, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedDate, opt => opt.Ignore())
                .ForMember(dest => dest.JobSkills, opt => opt.Ignore());

            CreateMap<Job, JobResponseDto>()
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status.ToString()))
                .ForMember(dest => dest.CreatedByName, opt => opt.MapFrom(src => src.CreatedBy != null ? src.CreatedBy.FullName : string.Empty))
                .ForMember(dest => dest.ApplicantsCount, opt => opt.Ignore()); // we'll set it in service
        }
    }
}
