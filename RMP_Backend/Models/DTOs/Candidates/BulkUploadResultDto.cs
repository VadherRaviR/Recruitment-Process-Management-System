using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace RMP_backend.Models.DTOs.Candidates
{
    public class BulkUploadResultDto
    {
        public int TotalRows { get; set; }
        public int Created { get; set; }
        public int Updated { get; set; }
        public int Skipped { get; set; }
        public int Failed { get; set; }
        public List<BulkUploadErrorDto> Errors { get; set; } = new();
    }
    public class BulkUploadJobRequestDto
{
    [Required]
    public IFormFile Excel { get; set; }

    public List<IFormFile>? Resumes { get; set; }

    [Required]
    public int JobId { get; set; }
}

    public class BulkUploadErrorDto
    {
        public int Row { get; set; }
        public string? Email { get; set; }
        public string Error { get; set; }
    }
}