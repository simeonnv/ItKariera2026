using DbModels;
using Microsoft.EntityFrameworkCore;
using DotNetEnv;
using Microsoft.AspNetCore.Identity;

// bundle this in some object
Env.Load("../../../.env.dev");
var builder = WebApplication.CreateBuilder(args);

var host = Environment.GetEnvironmentVariable("DB_DNS") ?? "localhost";
var port = Environment.GetEnvironmentVariable("DB_PORT") ?? "3306";
var database = Environment.GetEnvironmentVariable("MYSQL_DATABASE") ?? "root";
var password = Environment.GetEnvironmentVariable("MYSQL_ROOT_PASSWORD") ?? "root";
var serverConnectionString = $"Server={host};Port={port};Database={database};Uid=root;Pwd={password};";

if (serverConnectionString is null) throw new InvalidOperationException("Connection string is not configured!");

builder.Services.AddDbContext<AppDbContext>(dbOptions =>
    dbOptions.UseMySql(
        serverConnectionString,
        new MySqlServerVersion(new Version(8, 0, 45))
    )
);

builder.Services.AddIdentityApiEndpoints<IdentityUser>()
    .AddRoles<IdentityRole>() 
    .AddEntityFrameworkStores<AppDbContext>();

builder.Services.AddAuthentication();
builder.Services.AddAuthorization();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

using var app = builder.Build();

// creating a static admin account depending on ENV
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var userManager = services.GetRequiredService<UserManager<IdentityUser>>();
    var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();

    string roleName = "Admin";
    if (!await roleManager.RoleExistsAsync(roleName))
    {
        await roleManager.CreateAsync(new IdentityRole(roleName));
    }

    var adminEmail = Environment.GetEnvironmentVariable("ADMIN_EMAIL");
    var adminPassword = Environment.GetEnvironmentVariable("ADMIN_PASSWORD");

    if (!string.IsNullOrEmpty(adminEmail) && !string.IsNullOrEmpty(adminPassword))
    {
        var adminUser = await userManager.FindByEmailAsync(adminEmail);

        if (adminUser == null)
        {
            var newAdmin = new IdentityUser 
            { 
                UserName = adminEmail, 
                Email = adminEmail,
                EmailConfirmed = true 
            };

            var createResult = await userManager.CreateAsync(newAdmin, adminPassword);
    
            if (createResult.Succeeded)
            {
                await userManager.AddToRoleAsync(newAdmin, roleName);
                Console.WriteLine($"Admin user {adminEmail} created successfully.");
            } else {
                foreach (var error in createResult.Errors)
                {
                    Console.WriteLine($"Error creating admin: {error.Description}");
                }
            }
        }
        else 
        {
            var passwordCheck = await userManager.CheckPasswordAsync(adminUser, adminPassword);
            if (!passwordCheck)
            {
                var token = await userManager.GeneratePasswordResetTokenAsync(adminUser);
                await userManager.ResetPasswordAsync(adminUser, token, adminPassword);
                Console.WriteLine($"Admin password updated to match .env file.");
            }
        }
    }
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapGet("/ping", () => new Message("pong"))
    .WithName("GetPingMessage");
    
app.MapGet("/health", () => new Message("healthy"))
    .WithName("GethealthMessage");

app.MapGet("/env_value",
    (IConfiguration config) => new Message(config["ENV_VALUE"] ?? "ENV_VALUE is not set!"));

app.MapGet("/examples", async (AppDbContext db) => await db.Examples.ToListAsync());

app.MapIdentityApi<IdentityUser>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();   
    app.UseSwaggerUI(); 
}

app.Run();

internal record Message(string Text);
