using Microsoft.AspNetCore.Identity;

namespace DbModels;

public class Appointment
{
    public int Id { get; set; }

    public string PatientId { get; set; } = string.Empty;
    public IdentityUser Patient { get; set; } = null!;

    public string DoctorId { get; set; } = string.Empty;
    public IdentityUser Doctor { get; set; } = null!;

    public int ServiceId { get; set; }
    public Service Service { get; set; } = null!;

    public DateTime AppointmentDateTime { get; set; }

    public string Status { get; set; } = "Pending"; // Pending, Accepted, Rejected, Completed
}
