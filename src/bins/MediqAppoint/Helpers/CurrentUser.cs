using System.Security.Claims;

namespace MediqAppoint.Helpers;

internal interface ICurrentUser
{
    string? Id { get; }
}

public class CurrentUser(IHttpContextAccessor accessor) : ICurrentUser
{
    public string? Id => accessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
}