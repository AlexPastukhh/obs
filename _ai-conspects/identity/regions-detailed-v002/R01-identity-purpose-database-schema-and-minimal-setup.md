# R01 — Identity purpose, database schema and minimal setup

## Coverage

```text
source screenshots: 6 / 6
SVG text nodes assigned to this region: 2 / 2
remaining: 0
```

Covered source IDs: `S-003, S-004, S-007, S-009, S-011, S-015`.

## What ASP.NET Core Identity is

ASP.NET Core Identity is the membership system normally used when an ASP.NET Core application owns its user accounts.

It provides the infrastructure for:

- creating and storing users;
- password hashing and password verification;
- login and logout;
- application roles;
- user claims and role claims;
- cookie-based sign-in;
- account lockout after failed attempts;
- email-confirmation tokens;
- password-reset tokens;
- optional two-factor authentication;
- external-login associations;
- an extensible persistence store, commonly implemented with Entity Framework Core.

Identity is not Windows Authentication. It is application-level account management and authentication.

## Default database schema

When the EF Core Identity stores are used, the standard schema contains related tables with these responsibilities.

### `AspNetUsers`

Stores user accounts. Typical fields include the user ID, username, normalized username, email, normalized email, password hash, security stamp, concurrency stamp, phone data, two-factor settings, lockout fields, and failed-access count.

### `AspNetRoles`

Stores application roles such as `Admin`, `Manager`, or `User`.

### `AspNetUserRoles`

The many-to-many join between users and roles.

Its key is normally the composite pair:

```text
UserId + RoleId
```

### `AspNetUserClaims`

Stores claims attached directly to an individual user.

A claim is represented by a type and value, for example:

```text
department = sales
permission = invoices.read
```

### `AspNetRoleClaims`

Stores claims attached to a role. A user can obtain these conceptually through membership in that role, but custom JWT creation must explicitly include them if they are required in the token.

### `AspNetUserLogins`

Stores external-login associations.

A row connects a local Identity user to an external provider by values such as:

```text
LoginProvider
ProviderKey
ProviderDisplayName
UserId
```

### `AspNetUserTokens`

Stores provider-specific user tokens when a configured flow needs persistence.

## Minimal package and DbContext setup

A standard EF Core setup uses the Identity EF package and a context derived from `IdentityDbContext`.

```csharp
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

public sealed class AppDbContext : IdentityDbContext
{
    public AppDbContext(
        DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }
}
```

The generic form can be used when the application defines custom user and role types:

```csharp
public sealed class AppDbContext
    : IdentityDbContext<ApplicationUser, IdentityRole, string>
{
    public AppDbContext(
        DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }
}
```

After the model is configured, EF Core migrations create or update the Identity tables.

## Registering Identity services

A representative configuration registers the DbContext and Identity stores:

```csharp
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("Default"));
});

builder.Services
    .AddIdentity<IdentityUser, IdentityRole>(options =>
    {
        options.Password.RequiredLength = 8;

        options.Lockout.MaxFailedAccessAttempts = 5;

        options.User.RequireUniqueEmail = true;

        // Often false during development.
        // Commonly true in production.
        options.SignIn.RequireConfirmedEmail = false;
    })
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();
```

`AddEntityFrameworkStores<AppDbContext>()` tells Identity to persist users, roles, claims, logins, tokens, and related data through that context.

`AddDefaultTokenProviders()` enables standard token providers used by operations such as email confirmation, password reset, phone-number changes, and two-factor flows.

## Cookie configuration

For the normal interactive cookie flow, the application can configure the Identity application cookie:

```csharp
builder.Services.ConfigureApplicationCookie(options =>
{
    options.LoginPath = "/account/login";
    options.AccessDeniedPath = "/account/denied";
    options.SlidingExpiration = true;
});
```

- `LoginPath` is the destination used when an unauthenticated browser request is challenged by the cookie handler.
- `AccessDeniedPath` is used when the user is authenticated but is not authorized.
- `SlidingExpiration` can renew an active cookie as the user continues to use the application.

The configured paths must actually exist. A common mistake is to point the cookie handler at `/Account/Login` while the application has no matching route or Razor Page.

## Middleware order

A minimal request pipeline includes routing, authentication, and authorization in the correct order:

```csharp
var app = builder.Build();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapDefaultControllerRoute();

app.Run();
```

`UseAuthentication()` reads the configured authentication mechanism and assigns the resulting principal to `HttpContext.User`.

`UseAuthorization()` evaluates authorization policies, roles, and `[Authorize]` metadata against that principal.

If authentication middleware is omitted, protected requests often appear anonymous even when a valid cookie or bearer token was sent.

## Region conclusion

The minimal setup is not only “add a users table.” It establishes the complete Identity object model, EF Core stores, token providers, authentication cookie, and request-pipeline integration on which the later manager APIs and account flows depend.
