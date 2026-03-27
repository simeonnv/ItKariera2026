using DbModels;
using Microsoft.EntityFrameworkCore;
using MediqAppoint.Helpers;
using MediqAppoint.Models;

namespace MediqAppoint.Endpoints;

public static class DoctorEndpoints
{
    public static void MapDoctorEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapPost(
                "/doctors/services",
                async (CreateServiceRequest req,
                    ICurrentUser currentUser,
                    AppDbContext db) =>
                {
                    if (currentUser.Id is null) return Results.Unauthorized();

                    var service = new Service
                    {
                        Name = req.Name,
                        Description = req.Description,
                        DurationMinutes = req.DurationMinutes,
                        Price = req.Price,
                        DoctorId = currentUser.Id
                    };

                    db.Services.Add(service);
                    await db.SaveChangesAsync();

                    return Results.Created($"/services/{service.Id}", service);
                })
            .RequireAuthorization(Roles.Doctor);

        app.MapGet(
                "/doctors/appointments",
                async (ICurrentUser currentUser,
                    AppDbContext db) =>
                {
                    if (currentUser.Id is null) return Results.Unauthorized();

                    var appointments = await db.Appointments
                        .Where(a => a.DoctorId == currentUser.Id)
                        .Include(a => a.Patient)
                        .Include(a => a.Service)
                        .OrderByDescending(a => a.AppointmentDateTime)
                        .ToListAsync();

                    return Results.Ok(appointments);
                })
            .RequireAuthorization(Roles.Doctor);

        app.MapPatch(
                "/doctors/appointments/{id:int}/status",
                async (int id,
                    UpdateAppointmentStatusRequest req,
                    ICurrentUser currentUser,
                    AppDbContext db) =>
                {
                    if (currentUser.Id is null) return Results.Unauthorized();

                    var appointment = await db.Appointments.FindAsync(id);
                    if (appointment == null) return Results.NotFound();
                    if (appointment.DoctorId != currentUser.Id) return Results.Forbid();

                    if (req.Status != AppointmentStatus.Accepted && req.Status != AppointmentStatus.Rejected)
                        return Results.BadRequest("Status must be \"Accepted\" or \"Rejected\"!");

                    appointment.Status = req.Status;
                    await db.SaveChangesAsync();

                    return Results.Ok(appointment);
                })
            .RequireAuthorization(Roles.Doctor);
    }
}