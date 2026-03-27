using DbModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

public static class PatientEndpoints
{
    public static void MapPatientEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/doctors", async (UserManager<IdentityUser> userManager) =>
        {
            var doctors = await userManager.GetUsersInRoleAsync("Doctor");
            return Results.Ok(doctors.Select(d => new { d.Id, d.Email }));
        });

        app.MapGet("/doctors/{doctorId}/services", async (string doctorId, AppDbContext db) =>
        {
            var services = await db.Services.Where(s => s.DoctorId == doctorId).ToListAsync();
            return Results.Ok(services);
        });

        app.MapPost("/appointments", async (CreateAppointmentRequest req,
            AppDbContext db, HttpContext http) =>
        {
            var patientId = http.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(patientId)) return Results.Unauthorized();

            var service = await db.Services.FindAsync(req.ServiceId);
            if (service == null || service.DoctorId != req.DoctorId)
                return Results.BadRequest("Invalid service or doctor");

            var appointment = new Appointment
            {
                PatientId = patientId,
                DoctorId = req.DoctorId,
                ServiceId = req.ServiceId,
                AppointmentDateTime = req.AppointmentDateTime,
                Status = "Pending"
            };

            db.Appointments.Add(appointment);
            await db.SaveChangesAsync();

            return Results.Created($"/appointments/{appointment.Id}", appointment);
        })
        .RequireAuthorization();

        app.MapGet("/appointments/me", async (AppDbContext db, HttpContext http) =>
        {
            var patientId = http.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(patientId)) return Results.Unauthorized();

            var appointments = await db.Appointments
                .Where(a => a.PatientId == patientId)
                .Include(a => a.Doctor)
                .Include(a => a.Service)
                .OrderByDescending(a => a.AppointmentDateTime)
                .ToListAsync();

            return Results.Ok(appointments);
        })
        .RequireAuthorization();
    }
}
