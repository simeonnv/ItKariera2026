namespace DbModels;

public enum AppointmentStatus
{
    Pending,
    Accepted,
    Rejected,
    Completed
}

public class Appointment
{
    public int Id { get; init; }

    public string PatientId { get; init; } = string.Empty;
    public ApplicationUser Patient { get; set; } = null!;

    public string DoctorId { get; init; } = string.Empty;
    public ApplicationUser Doctor { get; set; } = null!;

    public int ServiceId { get; init; }
    public Service Service { get; init; } = null!;

    public DateTime AppointmentDateTime { get; init; }

    public AppointmentStatus Status { get; set; } = AppointmentStatus.Pending;
}
