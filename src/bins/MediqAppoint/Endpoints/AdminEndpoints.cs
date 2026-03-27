using DbModels;
using MediqAppoint.Helpers;
using MediqAppoint.Models;
using Microsoft.AspNetCore.Identity;

namespace MediqAppoint.Endpoints;

public static class AdminEndpoints
{
    public static void MapAdminEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapPost(
                "/admin/doctors",
                async (CreateDoctorRequest req,
                    UserManager<ApplicationUser> userManager) =>
                {
                    if (string.IsNullOrWhiteSpace(req.Email) || string.IsNullOrWhiteSpace(req.Password)) // TODO introduce actual validation maybe?
                        return Results.BadRequest("Email and password required!");

                    var existing = await userManager.FindByEmailAsync(req.Email);
                    if (existing != null) return Results.Conflict("Doctor already exists!");

                    var doctor = new ApplicationUser { UserName = req.Email, Email = req.Email, EmailConfirmed = true };
                    var result = await userManager.CreateAsync(doctor, req.Password);
                    if (!result.Succeeded) return Results.BadRequest(result.Errors);

                    await userManager.AddToRoleAsync(doctor, Roles.Doctor);

                    return Results.Created($"/doctors/{doctor.Id}", new { doctor.Id, doctor.Email });
                })
            .RequireAuthorization(Roles.Admin);
    }
}