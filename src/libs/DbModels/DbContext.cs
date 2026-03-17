using Microsoft.EntityFrameworkCore;
namespace DbModels;


public class AppDbContext : DbContext {
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    
    public DbSet<Example> Examples => Set<Example>();
}
