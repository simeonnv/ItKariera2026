using Microsoft.EntityFrameworkCore;
namespace DbModels;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Example> Examples => Set<Example>();
}