using AutoMapper;
using RMP_backend.Models.DTOs.Jobs;
using RMP_backend.Models.Entities;

namespace RMP_backend.Mappings
{
    public class JobProfile : Profile
    {
        public JobProfile()
        {
            CreateMap<JobRequiredSkill, SkillResponseDto>()
                .ForMember(d => d.SkillId, o => o.MapFrom(s => s.SkillId))
                .ForMember(d => d.SkillName, o => o.MapFrom(s => s.Skill.Name))
                .ForMember(d => d.Weightage, o => o.MapFrom(s => s.Weightage));

            CreateMap<JobPreferredSkill, SkillResponseDto>()
                .ForMember(d => d.SkillId, o => o.MapFrom(s => s.SkillId))
                .ForMember(d => d.SkillName, o => o.MapFrom(s => s.Skill.Name))
                .ForMember(d => d.Weightage, o => o.MapFrom(s => s.Weightage));

            CreateMap<Job, JobResponseDto>()
                .ForMember(d => d.RequiredSkills, o => o.MapFrom(s => s.RequiredSkills))
                .ForMember(d => d.PreferredSkills, o => o.MapFrom(s => s.PreferredSkills))
                .ForMember(d => d.CreatedByName, o => o.MapFrom(s => s.CreatedBy != null ? s.CreatedBy.FullName : string.Empty))
                .ForMember(d => d.CreatedById, o => o.MapFrom(s => s.CreatedById));
        }
    }
}
