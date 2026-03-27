using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;
using DotNetEnv;
using MediqAppoint.Endpoints;
using Microsoft.EntityFrameworkCore;
using DbModels;
using MediqAppoint.Helpers;

Env.Load("../../../.env.dev");

var builder = WebApplication.CreateBuilder(args);

var host = Environment.GetEnvironmentVariable("DB_DNS") ?? "localhost";
var port = Environment.GetEnvironmentVariable("DB_PORT") ?? "3306";
var database = Environment.GetEnvironmentVariable("MYSQL_DATABASE") ?? "root";
var password = Environment.GetEnvironmentVariable("MYSQL_ROOT_PASSWORD") ?? "root";

var serverConnectionString = $"Server={host};Port={port};Database={database};Uid=root;Pwd={password};";

builder.Services.ConfigureHttpJsonOptions(options =>
    options.SerializerOptions.Converters.Add(new JsonStringEnumConverter()));

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(serverConnectionString, new MySqlServerVersion(new Version(8, 0, 45))));

builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<ICurrentUser, CurrentUser>();

builder.Services.AddIdentityApiEndpoints<ApplicationUser>()
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<AppDbContext>();

builder.Services.AddAuthentication();
builder.Services.AddAuthorizationBuilder()
    .AddPolicy(Roles.Admin, policy => policy.RequireRole(Roles.Admin))
    .AddPolicy(Roles.Doctor, policy => policy.RequireRole(Roles.Doctor));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();
    var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();

    foreach (var roleName in new[] { Roles.Admin, Roles.Doctor, Roles.Patient })
    {
        if (!await roleManager.RoleExistsAsync(roleName))
            await roleManager.CreateAsync(new IdentityRole(roleName));
    }

    var adminEmail = Environment.GetEnvironmentVariable("ADMIN_EMAIL");
    var adminPassword = Environment.GetEnvironmentVariable("ADMIN_PASSWORD");

    if (!string.IsNullOrEmpty(adminEmail) && !string.IsNullOrEmpty(adminPassword))
    {
        var adminUser = await userManager.FindByEmailAsync(adminEmail);
        if (adminUser == null)
        {
            var newAdmin = new ApplicationUser { UserName = adminEmail, Email = adminEmail, EmailConfirmed = true };
            var result = await userManager.CreateAsync(newAdmin, adminPassword);
            if (result.Succeeded)
                await userManager.AddToRoleAsync(newAdmin, Roles.Admin);
        }
    }
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapIdentityApi<ApplicationUser>();

app.MapAdminEndpoints();
app.MapDoctorEndpoints();
app.MapPatientEndpoints();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.Run();