using System;
using System.ComponentModel.DataAnnotations;

namespace RMP_backend.Models.Entities
{
    public class Notification
    {
        [Key]
        public int NotificationId { get; set; }

        public int? UserId { get; set; }
        public User User { get; set; }

        public string Message { get; set; }

        [MaxLength(50)]
        public string Type { get; set; }

        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

        public bool IsRead { get; set; } = false;
    }
}
