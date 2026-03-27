using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace DbModels;

public class Service
{
    public int Id { get; set; }

    [Required]
    public string Name { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    [Range(15, 480)]
    public int DurationMinutes { get; set; }

    [Range(0, 10000)]
    public decimal Price { get; set; }

    public string DoctorId { get; set; } = string.Empty;
    public IdentityUser Doctor { get; set; } = null!;
}
