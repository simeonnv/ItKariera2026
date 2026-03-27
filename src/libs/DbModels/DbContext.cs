using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DbModels;

public class AppDbContext(DbContextOptions<AppDbContext> options) 
    : IdentityDbContext<IdentityUser>(options)
{
    public DbSet<Example> Examples => Set<Example>();
}
