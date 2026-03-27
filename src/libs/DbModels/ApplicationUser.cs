using Microsoft.AspNetCore.Identity;
namespace DbModels;

public class ApplicationUser : IdentityUser
{
    public ICollection<Service> Services { get; set; } = new List<Service>();

    public ICollection<Appointment> AppointmentsAsPatient { get; set; } = new List<Appointment>();
    public ICollection<Appointment> AppointmentsAsDoctor { get; set; } = new List<Appointment>();
}