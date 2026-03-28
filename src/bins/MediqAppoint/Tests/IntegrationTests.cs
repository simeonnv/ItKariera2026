using System.Net;
using System.Net.Http.Json;
using DbModels;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Identity;
using Xunit;
using MediqAppoint.Helpers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;

namespace MediqAppoint.Tests;

public class IntegrationTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly WebApplicationFactory<Program> _factory;

    public IntegrationTests(WebApplicationFactory<Program> factory)
    {
        _factory = factory.WithWebHostBuilder(builder =>
        {
            
            var projectDir = Path.GetFullPath(Path.Combine(AppContext.BaseDirectory, "../../../.."));
            builder.UseContentRoot(projectDir);

            builder.UseEnvironment("Testing");
            builder.ConfigureServices(services =>
            {
                var descriptor = services.SingleOrDefault(
                    d => d.ServiceType == typeof(DbContextOptions<AppDbContext>));

                if (descriptor != null)
                {
                    services.Remove(descriptor);
                }

                services.AddDbContext<AppDbContext>(options =>
                {
                    options.UseInMemoryDatabase("TestingDb");
                });
            });
        });
    }

    [Fact]
    public async Task GetIdentity_WithoutAuth_ReturnsUnauthorized()
    {
        // Arrange
        var client = _factory.CreateClient();

        // Act
        var response = await client.GetAsync("/manage/info");

        // Assert
        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }

    [Fact]
    public async Task Can_Register_User()
    {
        // Arrange
        var client = _factory.CreateClient();
        var registerData = new
        {
            email = "testuser@example.com",
            password = "Password123!"
        };

        // Act
        var response = await client.PostAsJsonAsync("/register", registerData);

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        
        using var scope = _factory.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var user = await context.Users.FirstOrDefaultAsync(u => u.Email == "testuser@example.com");
        Assert.NotNull(user);
    }
}
