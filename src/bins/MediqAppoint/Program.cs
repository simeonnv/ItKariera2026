using DbModels;
using Microsoft.EntityFrameworkCore;
using DotNetEnv;


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

builder.Services.AddOpenApi();

using var app = builder.Build();

if (app.Environment.IsDevelopment()) app.MapOpenApi();

app.UseHttpsRedirection();

app.MapGet("/ping", () => new Message("pong"))
    .WithName("GetPingMessage");
    
app.MapGet("/health", () => new Message("healthy"))
    .WithName("GethealthMessage");

app.MapGet("/env_value",
    (IConfiguration config) => new Message(config["ENV_VALUE"] ?? "ENV_VALUE is not set!"));

app.MapGet("/examples", async (AppDbContext db) => await db.Examples.ToListAsync());

app.Run();

internal record Message(string Text);
