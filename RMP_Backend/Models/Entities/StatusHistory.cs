using System;
using System.ComponentModel.DataAnnotations;

namespace RMP_backend.Models.Entities
{
    public class StatusHistory
    {
        [Key]
        public int HistoryId { get; set; }

        [MaxLength(50)]
        public string EntityType { get; set; }

        public int EntityId { get; set; }

        [MaxLength(50)]
        public string OldStatus { get; set; }

        [MaxLength(50)]
        public string NewStatus { get; set; }

        public int UpdatedById { get; set; }
        public User UpdatedBy { get; set; }

        public DateTime UpdatedDate { get; set; } = DateTime.UtcNow;
    }
}
