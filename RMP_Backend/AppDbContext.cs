using Microsoft.EntityFrameworkCore;
using RMP_backend.Models.Entities;

namespace RMP_backend
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(
                @"Server=.\SQLEXPRESS;Database=RMPDatabase;Trusted_Connection=True;TrustServerCertificate=True;"
            );
        }

        // ======================
        // DbSets
        // ======================
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }

        public DbSet<Job> Jobs { get; set; }
        public DbSet<Skill> Skills { get; set; }
        public DbSet<JobSkill> JobSkills { get; set; }

        public DbSet<Candidate> Candidates { get; set; }
        public DbSet<CandidateSkill> CandidateSkills { get; set; }
        public DbSet<CandidateJobLink> CandidateJobLinks { get; set; }

        public DbSet<Review> Reviews { get; set; }
        public DbSet<ReviewSkill> ReviewSkills { get; set; }

        public DbSet<Interview> Interviews { get; set; }
        public DbSet<InterviewPanel> InterviewPanels { get; set; }

        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<Document> Documents { get; set; }
        public DbSet<OfferLetter> OfferLetters { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<StatusHistory> StatusHistories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // ======================
            // Many-to-Many keys
            // ======================
            modelBuilder.Entity<UserRole>().HasKey(ur => new { ur.UserId, ur.RoleId });
            modelBuilder.Entity<JobSkill>().HasKey(js => new { js.JobId, js.SkillId });
            modelBuilder.Entity<CandidateSkill>().HasKey(cs => new { cs.CandidateId, cs.SkillId });
            modelBuilder.Entity<CandidateJobLink>().HasKey(cj => new { cj.CandidateId, cj.JobId });
            modelBuilder.Entity<ReviewSkill>().HasKey(rs => new { rs.ReviewId, rs.SkillId });
            modelBuilder.Entity<InterviewPanel>().HasKey(ip => new { ip.InterviewId, ip.InterviewerId });

            // ======================
            // Interview Relationships
            // ======================
            modelBuilder.Entity<Interview>()
                .HasOne(i => i.Candidate)
                .WithMany(c => c.Interviews)
                .HasForeignKey(i => i.CandidateId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Interview>()
                .HasOne(i => i.Job)
                .WithMany(j => j.Interviews)
                .HasForeignKey(i => i.JobId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Interview>()
                .HasOne(i => i.ScheduledBy)
                .WithMany()
                .HasForeignKey(i => i.ScheduledById)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<InterviewPanel>()
                .HasOne(ip => ip.Interview)
                .WithMany(i => i.InterviewPanels)
                .HasForeignKey(ip => ip.InterviewId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<InterviewPanel>()
                .HasOne(ip => ip.Interviewer)
                .WithMany()
                .HasForeignKey(ip => ip.InterviewerId)
                .OnDelete(DeleteBehavior.Restrict);

            // ======================
            // Review Relationships
            // ======================
            modelBuilder.Entity<Review>()
                .HasOne(r => r.Candidate)
                .WithMany(c => c.Reviews)
                .HasForeignKey(r => r.CandidateId)
                .OnDelete(DeleteBehavior.Cascade);

         

            modelBuilder.Entity<Review>()
                .HasOne(r => r.Reviewer)
                .WithMany()
                .HasForeignKey(r => r.ReviewerId)
                .OnDelete(DeleteBehavior.Restrict);

            // ======================
            // Feedback Relationships 
            // ======================
            modelBuilder.Entity<Feedback>()
                .HasOne(f => f.Interview)
                .WithMany(i => i.Feedbacks)
                .HasForeignKey(f => f.InterviewId)
                .OnDelete(DeleteBehavior.Cascade);

        
            modelBuilder.Entity<Feedback>()
                .HasOne(f => f.Interviewer)
                .WithMany()
                .HasForeignKey(f => f.InterviewerId)
                .OnDelete(DeleteBehavior.Restrict);

            // ======================
            // Document / Notification / History
            // ======================
            modelBuilder.Entity<Document>()
                .HasOne(d => d.VerifiedBy)
                .WithMany()
                .HasForeignKey(d => d.VerifiedById)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Notification>()
                .HasOne(n => n.User)
                .WithMany(u => u.Notifications)
                .HasForeignKey(n => n.UserId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<StatusHistory>()
                .HasOne(sh => sh.UpdatedBy)
                .WithMany()
                .HasForeignKey(sh => sh.UpdatedById)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Employee>()
                .HasOne(e => e.Candidate)
                .WithOne(c => c.EmployeeRecord)
                .HasForeignKey<Employee>(e => e.CandidateId);

            // ======================
            // Indexes
            // ======================
            modelBuilder.Entity<User>().HasIndex(u => u.Email).IsUnique();
            modelBuilder.Entity<Job>().HasIndex(j => j.Title);
            modelBuilder.Entity<Candidate>().HasIndex(c => c.Email);
        }
    }
}
