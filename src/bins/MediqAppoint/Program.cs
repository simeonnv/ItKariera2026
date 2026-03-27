using Microsoft.AspNetCore.Identity;
using DotNetEnv;
using Microsoft.EntityFrameworkCore;

Env.Load("../../../.env.dev");

var builder = WebApplication.CreateBuilder(args);

var host = Environment.GetEnvironmentVariable("DB_DNS") ?? "localhost";
var port = Environment.GetEnvironmentVariable("DB_PORT") ?? "3306";
var database = Environment.GetEnvironmentVariable("MYSQL_DATABASE") ?? "root";
var password = Environment.GetEnvironmentVariable("MYSQL_ROOT_PASSWORD") ?? "root";

var serverConnectionString = $"Server={host};Port={port};Database={database};Uid=root;Pwd={password};";

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(serverConnectionString, new MySqlServerVersion(new Version(8, 0, 45))));

builder.Services.AddIdentityApiEndpoints<IdentityUser>()
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<AppDbContext>();

builder.Services.AddAuthentication();
builder.Services.AddAuthorization();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var userManager = services.GetRequiredService<UserManager<IdentityUser>>();
    var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();

    foreach (var roleName in new[] { "Admin", "Doctor", "Patient" })
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
            var newAdmin = new IdentityUser { UserName = adminEmail, Email = adminEmail, EmailConfirmed = true };
            var result = await userManager.CreateAsync(newAdmin, adminPassword);
            if (result.Succeeded)
                await userManager.AddToRoleAsync(newAdmin, "Admin");
        }
    }
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapIdentityApi<IdentityUser>();

app.MapAdminEndpoints();
app.MapDoctorEndpoints();
app.MapPatientEndpoints();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.Run();
