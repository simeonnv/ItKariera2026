using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.InMemory;
using Xunit;

namespace DbModels.Tests;

public class DbContextTests
{
    private AppDbContext GetDbContext()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;
        return new AppDbContext(options);
    }

    [Fact]
    public async Task Can_Add_And_Retrieve_Service()
    {
        // Arrange
        await using var context = GetDbContext();
        var doctor = new ApplicationUser { Id = "doctor1", UserName = "doctor@example.com" };
        var service = new Service
        {
            Name = "Checkup",
            DurationMinutes = 30,
            Price = 50.00m,
            Doctor = doctor
        };

        // Act
        context.Services.Add(service);
        await context.SaveChangesAsync();

        // Assert
        var savedService = await context.Services.FirstOrDefaultAsync(s => s.Name == "Checkup");
        Assert.NotNull(savedService);
        Assert.Equal(50.00m, savedService.Price);
        Assert.Equal("doctor1", savedService.DoctorId);
    }

    [Fact]
    public async Task Can_Add_And_Retrieve_Appointment()
    {
        // Arrange
        await using var context = GetDbContext();
        var doctor = new ApplicationUser { Id = "doctor1", UserName = "doctor@example.com" };
        var patient = new ApplicationUser { Id = "patient1", UserName = "patient@example.com" };
        var service = new Service { Name = "Consultation", Doctor = doctor, DurationMinutes = 15, Price = 20 };
        
        var appointment = new Appointment
        {
            Doctor = doctor,
            Patient = patient,
            Service = service,
            AppointmentDateTime = DateTime.UtcNow.AddDays(1),
            Status = AppointmentStatus.Pending
        };

        // Act
        context.Appointments.Add(appointment);
        await context.SaveChangesAsync();

        // Assert
        var savedAppointment = await context.Appointments
            .Include(a => a.Doctor)
            .Include(a => a.Patient)
            .Include(a => a.Service)
            .FirstOrDefaultAsync();

        Assert.NotNull(savedAppointment);
        Assert.Equal("doctor1", savedAppointment.DoctorId);
        Assert.Equal("patient1", savedAppointment.PatientId);
        Assert.Equal(AppointmentStatus.Pending, savedAppointment.Status);
    }
}
