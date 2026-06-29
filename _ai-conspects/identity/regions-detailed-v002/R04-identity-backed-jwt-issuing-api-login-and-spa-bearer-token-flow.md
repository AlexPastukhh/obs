# R04 — Identity-backed JWT issuing, API login and SPA bearer-token flow

## Coverage

```text
source screenshots: 15 / 15
SVG text nodes assigned to this region: 79 / 79
remaining: 0
```

Covered source IDs: `S-026, S-029, S-031, S-033, S-034, S-035, S-038, S-041, S-043, S-045, S-048, S-051, S-054, S-057, S-059`.

## Two common SPA/API patterns

The source presents two broad patterns.

### Pattern A — Identity stores users; the application issues its own JWT

Identity remains responsible for:

- users;
- password hashes;
- user claims;
- roles;
- role claims;
- lockout and sign-in checks.

The API validates submitted credentials through `UserManager` and `SignInManager`, gathers the current Identity data, creates a JWT, and returns it to the client.

This pattern is recommended for many teams when they need a conventional custom bearer-token API but still want Identity's user-management infrastructure.

### Pattern B — built-in Identity API endpoints

Modern ASP.NET Core versions can map prebuilt Identity endpoints for API-oriented account flows. That alternative is described at the end of this region and in R05.

## Program setup for Identity and JWT bearer authentication

The screenshots show the relevant namespaces:

```csharp
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Text;
```

Register the DbContext and Identity Core:

```csharp
builder.Services.AddDbContext<AppDbContext>(options =>
{
    // Configure provider.
});

builder.Services
    .AddIdentityCore<IdentityUser>(options =>
    {
        options.User.RequireUniqueEmail = true;
    })
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<AppDbContext>()
    .AddSignInManager()
    .AddDefaultTokenProviders();
```

`AddIdentityCore` registers the core user services without automatically choosing the traditional full cookie/UI setup.

`AddRoles` adds role management.

`AddSignInManager` is required when the API wants `SignInManager` methods such as password checks and lockout handling.

## Authentication scheme

```csharp
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme =
        JwtBearerDefaults.AuthenticationScheme;

    options.DefaultChallengeScheme =
        JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters =
        new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,

            ValidIssuer =
                builder.Configuration["Jwt:Issuer"],

            ValidAudience =
                builder.Configuration["Jwt:Audience"],

            IssuerSigningKey =
                new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(
                        builder.Configuration[
                            "Jwt:Key"]!))
        };
});
```

The token validator checks:

- that the token has the configured issuer;
- that it targets the configured audience;
- that it is not expired and is not used before its valid time;
- that its signature can be verified with the configured signing key.

The application also registers authorization and controllers:

```csharp
builder.Services.AddAuthorization();
builder.Services.AddControllers();
```

Pipeline:

```csharp
var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
```

## JWT options

The source defines a configuration object:

```csharp
public sealed class JwtOptions
{
    public string Issuer { get; init; } = "";
    public string Audience { get; init; } = "";

    // Store the real key in secrets.
    public string SigningKey { get; init; } = "";

    public int ExpMinutes { get; init; } = 60;
}
```

Representative configuration:

```json
{
  "Jwt": {
    "Issuer": "your-api",
    "Audience": "your-spa",
    "Key": "a-very-long-random-secret-key-at-least-32-chars"
  }
}
```

The signing key must not be committed as a production secret. It belongs in a secure secret store or environment-specific secret configuration.

## Identity-aware token service

The exact source code defines:

```csharp
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

public sealed class JwtTokenService<TUser>
    where TUser : IdentityUser
{
    private readonly UserManager<TUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly JwtOptions _jwt;

    public JwtTokenService(
        UserManager<TUser> userManager,
        RoleManager<IdentityRole> roleManager,
        IOptions<JwtOptions> jwtOptions)
    {
        _userManager = userManager;
        _roleManager = roleManager;
        _jwt = jwtOptions.Value;
    }
```

The service deliberately depends on Identity managers. It does not read `AspNetUsers`, `AspNetUserClaims`, `AspNetUserRoles`, or `AspNetRoleClaims` with custom SQL.

## Base token claims

```csharp
public async Task<string> CreateTokenAsync(
    TUser user,
    CancellationToken ct = default)
{
    var claims = new List<Claim>
    {
        new(
            JwtRegisteredClaimNames.Sub,
            user.Id),

        new(
            JwtRegisteredClaimNames.UniqueName,
            user.UserName ?? ""),

        new(
            JwtRegisteredClaimNames.Jti,
            Guid.NewGuid().ToString())
    };
```

The base claims are:

- `sub` — the local Identity user ID;
- `unique_name` — the username when available;
- `jti` — a fresh token identifier.

## Direct user claims

```csharp
IList<Claim> userClaims =
    await _userManager.GetClaimsAsync(user);

claims.AddRange(userClaims);
```

`GetClaimsAsync(user)` reads claims associated directly with the user, normally from `AspNetUserClaims`.

## Roles and role claims

```csharp
IList<string> roles =
    await _userManager.GetRolesAsync(user);

foreach (string roleName in roles)
{
    claims.Add(
        new Claim(
            ClaimTypes.Role,
            roleName));

    IdentityRole? role =
        await _roleManager
            .FindByNameAsync(roleName);

    if (role is not null)
    {
        IList<Claim> roleClaims =
            await _roleManager
                .GetClaimsAsync(role);

        claims.AddRange(roleClaims);
    }
}
```

The source explicitly adds a `ClaimTypes.Role` claim for every role so role-based authorization such as:

```csharp
[Authorize(Roles = "Admin")]
```

can recognize the roles in the resulting principal.

It then loads claims attached to each role from `AspNetRoleClaims` and includes them too.

This is the “Identity way” because:

- `GetClaimsAsync(user)` reads `AspNetUserClaims`;
- `GetRolesAsync(user)` reads the user's role associations;
- `RoleManager.GetClaimsAsync(role)` reads `AspNetRoleClaims`.

The SVG notes that a user can have role-related claims, so a custom token creator may need to fetch claims for every role the user has.

## Removing duplicate claims

Direct user claims and role claims can overlap. The source removes exact duplicates by claim type and value:

```csharp
claims = claims
    .GroupBy(c => new
    {
        c.Type,
        c.Value
    })
    .Select(group => group.First())
    .ToList();
```

This preserves one copy of every distinct `(Type, Value)` pair.

## Signing and serializing the JWT

```csharp
var key =
    new SymmetricSecurityKey(
        Encoding.UTF8.GetBytes(
            _jwt.SigningKey));

var credentials =
    new SigningCredentials(
        key,
        SecurityAlgorithms.HmacSha256);

var token = new JwtSecurityToken(
    issuer: _jwt.Issuer,
    audience: _jwt.Audience,
    claims: claims,
    notBefore: DateTime.UtcNow,
    expires: DateTime.UtcNow
        .AddMinutes(_jwt.ExpMinutes),
    signingCredentials: credentials);

return new JwtSecurityTokenHandler()
    .WriteToken(token);
```

The token contains the selected current Identity data at issuance time.

Changing a user's roles or claims in the database does not rewrite a JWT that has already been issued. Short token lifetimes, refresh/reissue policies, revocation design, and security-stamp checks are separate architecture decisions.

## API login endpoint

The source shows an API controller using `UserManager`, `SignInManager`, and configuration.

```csharp
[ApiController]
[Route("api/auth")]
public sealed class AuthController : ControllerBase
{
    private readonly UserManager<IdentityUser>
        _userManager;

    private readonly SignInManager<IdentityUser>
        _signInManager;

    private readonly IConfiguration _configuration;

    public AuthController(
        UserManager<IdentityUser> userManager,
        SignInManager<IdentityUser> signInManager,
        IConfiguration configuration)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _configuration = configuration;
    }
}
```

A login action:

```csharp
[HttpPost("login")]
public async Task<IActionResult> Login(
    LoginRequest request)
{
    IdentityUser? user =
        await _userManager
            .FindByEmailAsync(request.Email);

    if (user is null)
    {
        return Unauthorized();
    }

    SignInResult check =
        await _signInManager
            .CheckPasswordSignInAsync(
                user,
                request.Password,
                lockoutOnFailure: true);

    if (!check.Succeeded)
    {
        return Unauthorized();
    }

    IList<string> roles =
        await _userManager.GetRolesAsync(user);

    var claims = new List<Claim>
    {
        new(
            JwtRegisteredClaimNames.Sub,
            user.Id),

        new(
            JwtRegisteredClaimNames.Email,
            user.Email ?? ""),

        new(
            ClaimTypes.Name,
            user.UserName ?? user.Email ?? user.Id),

        new(
            JwtRegisteredClaimNames.Jti,
            Guid.NewGuid().ToString())
    };

    claims.AddRange(
        roles.Select(
            role => new Claim(
                ClaimTypes.Role,
                role)));

    var key =
        new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(
                _configuration["Jwt:Key"]!));

    var credentials =
        new SigningCredentials(
            key,
            SecurityAlgorithms.HmacSha256);

    var token = new JwtSecurityToken(
        issuer: _configuration["Jwt:Issuer"],
        audience: _configuration["Jwt:Audience"],
        claims: claims,
        expires: DateTime.UtcNow.AddMinutes(30),
        signingCredentials: credentials);

    string accessToken =
        new JwtSecurityTokenHandler()
            .WriteToken(token);

    return Ok(new
    {
        accessToken
    });
}

public sealed record LoginRequest(
    string Email,
    string Password);
```

This is “a normal JWT endpoint,” but password verification and role retrieval come from Identity managers.

Using `CheckPasswordSignInAsync(..., lockoutOnFailure: true)` is preferable to manually comparing hashes because it applies Identity's password and sign-in rules.

A separate `JwtTokenService.CreateTokenAsync(user)` can keep token construction out of the controller:

```csharp
IdentityUser? user =
    await _userManager
        .FindByNameAsync(loginDto.Username);

if (user is null)
{
    return Unauthorized();
}

// Validate password and sign-in requirements.

string jwt =
    await _jwtTokenService
        .CreateTokenAsync(user);

return Ok(new
{
    accessToken = jwt
});
```

## Protecting API endpoints

```csharp
[ApiController]
[Route("api/me")]
public sealed class MeController : ControllerBase
{
    [Authorize]
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new
        {
            name = User.Identity?.Name,
            claims = User.Claims.Select(
                claim => new
                {
                    claim.Type,
                    claim.Value
                })
        });
    }
}
```

The browser or other client sends:

```http
Authorization: Bearer <token>
```

The JWT bearer handler validates the token, builds a `ClaimsPrincipal`, and assigns it to `HttpContext.User`.

## SPA usage shown in the source

The SPA flow is:

1. call `POST /api/auth/login` with email and password;
2. receive an `accessToken`;
3. store the token, preferably in memory;
4. if it is persisted in browser storage, understand the cross-site-scripting risk;
5. send `Authorization: Bearer <token>` on protected API calls.

A token in local storage or session storage is readable by JavaScript running in that origin. An XSS vulnerability can therefore steal it. Storing in memory reduces persistence but does not remove every browser threat.

Cookie-based BFF or same-site application architectures have a different security model and should not be treated as equivalent merely because both authenticate API requests.

## Built-in Identity API endpoint pattern

Instead of implementing every registration and login route manually, modern ASP.NET Core versions expose Identity API endpoints intended for API clients.

At a high level:

- register the relevant Identity API services;
- map the Identity endpoints;
- let the SPA or mobile client call them;
- configure cookie or bearer-token behavior according to the application architecture.

Exact endpoint shapes and available options vary by .NET version. The central distinction is that Identity provides prebuilt account endpoints rather than requiring a custom controller for every flow.

## Region conclusion

Identity does not issue an application-specific JWT automatically just because users and roles are stored in Identity tables. In the custom pattern, the application verifies the user with Identity, reads user claims, roles, and role claims through manager APIs, constructs the JWT, and configures bearer validation separately.
