# R02 - ASP.NET Core / IIS / Negotiate basic implementation

Generated: 2026-06-13 05:43:48 UTC

Image uses: 11

```text
S-014, S-013, S-012, S-011, S-047, S-041, S-046, S-042, S-045, S-043, S-044
```

## Core implementation idea

ASP.NET Core needs two layers to line up:

```text
host/server layer:
IIS / IIS Express / Kestrel integration accepts Windows Authentication

application layer:
ASP.NET Core authentication and authorization middleware use the authenticated principal
```

If either layer is wrong, the app may not see the expected Windows user.

## IIS / IIS Express switches

For IIS or IIS Express, the basic switches are:

```text
Windows Authentication: enabled
Anonymous Authentication: often disabled for fully protected endpoints/apps
```

If Anonymous is enabled and the endpoint does not require authorization, the request may reach the app without a Windows identity.

If Windows Authentication is disabled, ASP.NET Core cannot magically create a Windows principal.

## ASP.NET Core Negotiate handler

In ASP.NET Core, a typical code shape is:

```csharp
builder.Services
    .AddAuthentication(NegotiateDefaults.AuthenticationScheme)
    .AddNegotiate();

builder.Services.AddAuthorization();

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
```

The key idea:

```text
AddAuthentication/AddNegotiate registers the handler.
UseAuthentication reads/sets HttpContext.User.
UseAuthorization enforces [Authorize] and policies.
```

Middleware order matters: authentication must run before authorization.

## Protecting endpoints

The basic endpoint-level control is:

```csharp
[Authorize]
```

or a global/fallback authorization policy.

Example meaning:

```text
only authenticated Windows users can call this endpoint
```

Without `[Authorize]` or a configured fallback policy, the authentication handler may be available, but the endpoint may not force a challenge.

## Reading the current user

Once authentication succeeds, the app can inspect:

```csharp
User.Identity?.Name
User.Identity?.IsAuthenticated
User.Claims
```

Common debugging endpoint shape:

```csharp
[Authorize]
[HttpGet("whoami")]
public IActionResult WhoAmI()
{
    return Ok(new
    {
        name = User.Identity?.Name,
        authenticated = User.Identity?.IsAuthenticated,
        claims = User.Claims.Select(c => new { c.Type, c.Value })
    });
}
```

This is useful during setup because it verifies what the app actually receives.

## Windows Auth and controllers/minimal APIs

Controllers:

```csharp
[Authorize]
[ApiController]
[Route("api/[controller]")]
public class EmployeesController : ControllerBase
{
}
```

Minimal APIs:

```csharp
app.MapGet("/whoami", (ClaimsPrincipal user) => user.Identity?.Name)
   .RequireAuthorization();
```

The concept is the same:

```text
authentication creates the user
authorization requires/checks the user
```

## Development vs production

IIS Express local development can behave differently from production IIS.

Common local settings live in launch profiles / IIS Express config / project settings. Production settings live in IIS site authentication configuration and sometimes app pool/domain configuration.

Do not assume that working locally means the production domain/Kerberos setup is complete.

## Common basic failures

Useful first checks:

```text
Is Windows Authentication enabled in IIS/IIS Express?
Is Anonymous Authentication disabled where needed?
Is AddNegotiate registered?
Are UseAuthentication and UseAuthorization in the right order?
Is the endpoint protected with [Authorize] or RequireAuthorization?
Does /whoami show the expected DOMAIN\user?
```

If these pass but users still get login prompts or NTLM fallback, that is usually no longer a basic app setup problem. It belongs to deployment/domain/SPN troubleshooting, covered later in R04.

## Boundary note

R02 is the basic implementation layer.

R03 covers applications that combine Windows Auth with cookie/client login. R04 covers company/domain deployment troubleshooting.
