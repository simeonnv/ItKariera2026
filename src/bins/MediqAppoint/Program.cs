using DbModels;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var serverConnectionString = builder.Configuration.GetConnectionString("Default");

if (serverConnectionString is null) throw new InvalidOperationException("Connection string is not configured!");

builder.Services.AddDbContext<AppDbContext>(dbOptions =>
    dbOptions.UseMySql(
        serverConnectionString,
        ServerVersion.AutoDetect(serverConnectionString)
    )
);

builder.Services.AddOpenApi();

using var app = builder.Build();

if (app.Environment.IsDevelopment()) app.MapOpenApi();

app.UseHttpsRedirection();

app.MapGet("/hello", () => new Message("Hi there!"))
    .WithName("GetHelloMessage");

app.MapGet("/env_value",
    (IConfiguration config) => new Message(config["ENV_VALUE"] ?? "ENV_VALUE is not set in .env.app!"));

app.MapGet("/examples", async (AppDbContext db) => await db.Examples.ToListAsync());

app.Run();

internal record Message(string Text);