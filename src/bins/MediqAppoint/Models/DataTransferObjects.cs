using DbModels;

namespace MediqAppoint.Models;

internal record CreateDoctorRequest(string Email, string Password);

internal record CreateServiceRequest(string Name, string Description, int DurationMinutes, decimal Price);

internal record CreateAppointmentRequest(string DoctorId, int ServiceId, DateTime AppointmentDateTime);

internal record UpdateAppointmentStatusRequest(AppointmentStatus Status);