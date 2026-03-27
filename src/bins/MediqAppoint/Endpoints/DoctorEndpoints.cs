using DbModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

public static class DoctorEndpoints
{
    public static void MapDoctorEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapPost("/doctors/services", async (CreateServiceRequest req,
            AppDbContext db, HttpContext http) =>
        {
            var doctorId = http.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(doctorId)) return Results.Unauthorized();

            var service = new Service
            {
                Name = req.Name,
                Description = req.Description,
                DurationMinutes = req.DurationMinutes,
                Price = req.Price,
                DoctorId = doctorId
            };

            db.Services.Add(service);
            await db.SaveChangesAsync();

            return Results.Created($"/services/{service.Id}", service);
        })
        .RequireAuthorization(new AuthorizeAttribute { Roles = "Doctor" });

        app.MapGet("/doctors/appointments", async (AppDbContext db, HttpContext http) =>
        {
            var doctorId = http.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(doctorId)) return Results.Unauthorized();

            var appointments = await db.Appointments
                .Where(a => a.DoctorId == doctorId)
                .Include(a => a.Patient)
                .Include(a => a.Service)
                .OrderByDescending(a => a.AppointmentDateTime)
                .ToListAsync();

            return Results.Ok(appointments);
        })
        .RequireAuthorization(new AuthorizeAttribute { Roles = "Doctor" });

        app.MapPatch("/doctors/appointments/{id:int}/status", async (int id,
            UpdateAppointmentStatusRequest req,
            AppDbContext db, HttpContext http) =>
        {
            var doctorId = http.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(doctorId)) return Results.Unauthorized();

            var appointment = await db.Appointments.FindAsync(id);
            if (appointment == null) return Results.NotFound();
            if (appointment.DoctorId != doctorId) return Results.Forbid();

            if (req.Status != "Accepted" && req.Status != "Rejected")
                return Results.BadRequest("Status must be Accepted or Rejected");

            appointment.Status = req.Status;
            await db.SaveChangesAsync();

            return Results.Ok(appointment);
        })
        .RequireAuthorization(new AuthorizeAttribute { Roles = "Doctor" });
    }
}
