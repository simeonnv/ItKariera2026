using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DbModels;

public class AppDbContext(DbContextOptions<AppDbContext> options) : IdentityDbContext<ApplicationUser>(options)
{
    public DbSet<Service> Services => Set<Service>();
    public DbSet<Appointment> Appointments => Set<Appointment>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Service>()
            .HasOne(s => s.Doctor)
            .WithMany(d => d.Services)
            .HasForeignKey(s => s.DoctorId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Appointment>()
            .HasOne(a => a.Patient)
            .WithMany(u => u.AppointmentsAsPatient)
            .HasForeignKey(a => a.PatientId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Appointment>()
            .HasOne(a => a.Doctor)
            .WithMany(u => u.AppointmentsAsDoctor)
            .HasForeignKey(a => a.DoctorId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Appointment>()
            .HasOne(a => a.Service)
            .WithMany()
            .HasForeignKey(a => a.ServiceId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Appointment>()
            .Property(a => a.Status)
            .HasConversion<string>();
    }
}
