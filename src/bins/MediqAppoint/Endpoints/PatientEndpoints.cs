using DbModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using MediqAppoint.Helpers;
using MediqAppoint.Models;

namespace MediqAppoint.Endpoints;

public static class PatientEndpoints
{
    public static void MapPatientEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet(
            "/doctors",
            async (UserManager<ApplicationUser> userManager) =>
            {
                var doctors = await userManager.GetUsersInRoleAsync(Roles.Doctor);
                return Results.Ok(doctors.Select(d => new { d.Id, d.Email }));
            });

        app.MapGet(
            "/doctors/{doctorId}/services",
            async (string doctorId,
                AppDbContext db) =>
            {
                var services = await db.Services.Where(s => s.DoctorId == doctorId).ToListAsync();
                return Results.Ok(services);
            });

        app.MapPost(
                "/appointments",
                async (CreateAppointmentRequest req,
                    ICurrentUser currentUser,
                    AppDbContext db) =>
                {
                    if (currentUser.Id is null) return Results.Unauthorized();

                    var service = await db.Services.FindAsync(req.ServiceId);
                    if (service == null || service.DoctorId != req.DoctorId)
                        return Results.BadRequest("Invalid service or doctor");

                    var appointment = new Appointment
                    {
                        PatientId = currentUser.Id,
                        DoctorId = req.DoctorId,
                        ServiceId = req.ServiceId,
                        AppointmentDateTime = req.AppointmentDateTime,
                        Status = AppointmentStatus.Pending
                    };

                    db.Appointments.Add(appointment);
                    await db.SaveChangesAsync();

                    return Results.Created($"/appointments/{appointment.Id}", appointment);
                })
            .RequireAuthorization();

        app.MapGet(
                "/appointments/me",
                async (ICurrentUser currentUser,
                    AppDbContext db) =>
                {
                    if (currentUser.Id is null) return Results.Unauthorized();

                    var appointments = await db.Appointments
                        .Where(a => a.PatientId == currentUser.Id)
                        .Include(a => a.Doctor)
                        .Include(a => a.Service)
                        .OrderByDescending(a => a.AppointmentDateTime)
                        .ToListAsync();

                    return Results.Ok(appointments);
                })
            .RequireAuthorization();
    }
}