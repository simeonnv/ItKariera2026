using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting; 
using DbModels;

var builder = Host.CreateApplicationBuilder(args);
var serverVersion = new MariaDbServerVersion(new Version(11, 0, 0)); 

var connectionString = "server=127.0.0.1;port=3306;database=ItKariera;user=root;password=root";
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString, serverVersion));

using var host = builder.Build();

Console.WriteLine("Hello, World!");
