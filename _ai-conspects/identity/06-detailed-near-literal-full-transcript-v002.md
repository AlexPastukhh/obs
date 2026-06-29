# Identity — detailed near-literal full transcript v002

Generated: 2026-06-29 06:30:30 UTC

## Transcript policy

This transcript is intentionally detailed and close to the complete `identity(3).svg` source.

It preserves the source's distinct examples, code paths, API names, configuration decisions, warnings, and architecture comparisons. Only genuinely repeated explanations are consolidated.

This is not a review-question document and contains no generated questions.

## Structural source coverage

```text
non-empty SVG text nodes: 92 / 92
embedded image definitions: 64 / 64
unique image-content hashes: 64 / 64
image uses on canvas: 64 / 64
regions: 5 / 5
remaining source units: 0
```

## Source integrity

```text
current uploaded source: identity(3).svg
canonical repository path: _ai-conspects/identity/source/identity.svg
SHA-256: d34a00268ef3532318e20b9adffcc99d5073b9be102695307782aaefd51e403a
Git blob SHA: 920acc2dabcbcf2e570bca84a88d8e88794cc4a8
```

---

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


---

# R02 — Core managers, users, roles, claims, email sender and URL-safe tokens

## Coverage

```text
source screenshots: 14 / 14
SVG text nodes assigned to this region: 3 / 3
remaining: 0
```

Covered source IDs: `S-001, S-002, S-005, S-006, S-008, S-010, S-012, S-013, S-014, S-016, S-017, S-018, S-019, S-021`.

## Authentication and authorization

Authentication answers:

```text
Who is this request acting as?
```

Authorization answers:

```text
Is that authenticated principal allowed to perform this operation?
```

After successful authentication, ASP.NET Core exposes the principal through:

```csharp
HttpContext.User
```

Controllers and endpoints can then use:

```csharp
[Authorize]
[Authorize(Roles = "Admin")]
```

or policy-based authorization.

## Main Identity manager services

### `UserManager<TUser>`

`UserManager<TUser>` is the central service for creating and managing users.

It is used for operations such as:

- finding a user by ID, name, or email;
- creating a user and hashing the supplied password;
- changing or resetting passwords;
- generating and confirming tokens;
- reading and writing user claims;
- adding and removing roles;
- associating external logins;
- reading lockout state.

### `SignInManager<TUser>`

`SignInManager<TUser>` handles application sign-in behavior.

It is used for:

- password sign-in;
- checking a password with lockout handling;
- creating the local authentication cookie;
- signing in an already resolved user;
- signing out;
- external-login callbacks;
- two-factor and recovery-code flows.

### `RoleManager<TRole>`

`RoleManager<TRole>` manages role records and claims stored on roles.

It is used to:

- check whether a role exists;
- create and delete roles;
- find roles by name;
- add, remove, and retrieve role claims.

## Typical controller injection

```csharp
public sealed class AccountController : Controller
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly SignInManager<IdentityUser> _signInManager;
    private readonly RoleManager<IdentityRole> _roleManager;

    public AccountController(
        UserManager<IdentityUser> userManager,
        SignInManager<IdentityUser> signInManager,
        RoleManager<IdentityRole> roleManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _roleManager = roleManager;
    }
}
```

The application should use these managers rather than directly updating Identity tables. The managers enforce normalization, password hashing, token validation, security-stamp behavior, and store abstractions.

## Creating a user

```csharp
var user = new IdentityUser
{
    UserName = model.Email,
    Email = model.Email
};

IdentityResult result =
    await _userManager.CreateAsync(user, model.Password);

if (!result.Succeeded)
{
    foreach (IdentityError error in result.Errors)
    {
        ModelState.AddModelError(
            string.Empty,
            error.Description);
    }

    return View(model);
}
```

`CreateAsync(user, password)` does not store the plaintext password. Identity validates it against the configured password policy and stores a password hash through the configured password hasher.

## Password sign-in

```csharp
SignInResult result =
    await _signInManager.PasswordSignInAsync(
        model.Email,
        model.Password,
        isPersistent: true,
        lockoutOnFailure: true);
```

The parameters mean:

- the first value identifies the account;
- the second is the submitted password;
- `isPersistent: true` requests a persistent application cookie;
- `lockoutOnFailure: true` allows a failed attempt to contribute to Identity lockout.

The result can represent success, lockout, two-factor requirement, disallowed sign-in, or failure.

## Sign-out

```csharp
await _signInManager.SignOutAsync();
```

For the standard cookie scheme, this removes the local Identity application cookie.

## Looking users up

```csharp
IdentityUser? byEmail =
    await _userManager.FindByEmailAsync(email);

IdentityUser? byId =
    await _userManager.FindByIdAsync(id);
```

The normalized fields and configured store support these manager operations.

## Roles

### Adding and removing a user role

```csharp
IdentityResult addResult =
    await _userManager.AddToRoleAsync(user, "Admin");

IdentityResult removeResult =
    await _userManager.RemoveFromRoleAsync(user, "Admin");
```

### Checking role membership

```csharp
bool isAdmin =
    await _userManager.IsInRoleAsync(user, "Admin");
```

### Creating a role only when absent

```csharp
if (!await _roleManager.RoleExistsAsync("Admin"))
{
    await _roleManager.CreateAsync(
        new IdentityRole("Admin"));
}
```

A role must exist before it can be assigned. Registering `IdentityRole` support does not automatically create every application role.

## User claims and role claims

### Direct user claims

```csharp
var claim = new Claim("department", "sales");

await _userManager.AddClaimAsync(user, claim);
await _userManager.RemoveClaimAsync(user, claim);

IList<Claim> claims =
    await _userManager.GetClaimsAsync(user);
```

### Claims attached to a role

```csharp
IdentityRole? role =
    await _roleManager.FindByNameAsync("Admin");

if (role is not null)
{
    IList<Claim> roleClaims =
        await _roleManager.GetClaimsAsync(role);
}
```

User claims and role claims are stored in different tables. Custom token code must decide whether it needs only direct user claims, role names, or also claims stored on every role.

## Reading the current principal

Inside an authenticated request:

```csharp
string? name = User.Identity?.Name;

bool isAdmin = User.IsInRole("Admin");

string? department =
    User.FindFirst("department")?.Value;
```

These values are read from the claims principal produced by the active authentication handler. They are not live database queries on every property access.

## `IEmailSender`

Identity can generate confirmation and password-reset tokens, but it does not magically deliver email.

An application needs an email-sending implementation if it wants generated links to reach the user.

A development implementation can log the destination and link:

```csharp
public sealed class DevEmailSender : IEmailSender
{
    private readonly ILogger<DevEmailSender> _logger;

    public DevEmailSender(
        ILogger<DevEmailSender> logger)
    {
        _logger = logger;
    }

    public Task SendEmailAsync(
        string email,
        string subject,
        string htmlMessage)
    {
        _logger.LogInformation(
            "Email to {Email}: {Subject}\n{Body}",
            email,
            subject,
            htmlMessage);

        return Task.CompletedTask;
    }
}
```

Register it through dependency injection:

```csharp
builder.Services.AddSingleton<IEmailSender, DevEmailSender>();
```

Different framework versions and templates may use a non-generic or generic sender interface, but the responsibility remains the same: the application supplies delivery.

The default Identity UI invokes an email sender for flows such as confirmation, resend confirmation, forgot password, and password reset. Custom controllers can instead call a custom email service immediately after generating a token.

## Generating and confirming an email token

```csharp
string token =
    await _userManager
        .GenerateEmailConfirmationTokenAsync(user);
```

Later:

```csharp
IdentityResult result =
    await _userManager
        .ConfirmEmailAsync(user, token);
```

The same token must be associated with the same user and the same purpose.

## URL safety of Identity tokens

Raw Identity tokens are not guaranteed to be safe when placed directly in a query string. Characters can be altered by URL parsing or encoding.

The source therefore encodes the token as UTF-8 bytes and then Base64Url:

```csharp
using Microsoft.AspNetCore.WebUtilities;
using System.Text;

string token =
    await _userManager
        .GenerateEmailConfirmationTokenAsync(user);

string code = WebEncoders.Base64UrlEncode(
    Encoding.UTF8.GetBytes(token));
```

The confirmation URL carries `code`, not the unencoded raw token.

On receipt:

```csharp
string token = Encoding.UTF8.GetString(
    WebEncoders.Base64UrlDecode(code));

IdentityResult result =
    await _userManager
        .ConfirmEmailAsync(user, token);
```

Base64Url avoids the ordinary Base64 characters that conflict with URL semantics.

Identity tokens are:

- purpose-specific;
- user-specific;
- protected by the configured token provider;
- normally time-limited;
- sensitive enough that they should not be logged casually;
- intended to travel over HTTPS.

## Region conclusion

The manager APIs are the supported boundary around the Identity schema. They create and verify users, passwords, roles, claims, logins, and tokens while preserving all Identity invariants. Email delivery and URL-safe transport are separate application responsibilities around those manager operations.


---

# R03 — Email confirmation, password reset, lockout and external login

## Coverage

```text
source screenshots: 26 / 26
SVG text nodes assigned to this region: 7 / 7
remaining: 0
```

Covered source IDs: `S-020, S-022, S-023, S-024, S-025, S-027, S-028, S-030, S-032, S-036, S-037, S-039, S-040, S-042, S-044, S-046, S-047, S-049, S-050, S-052, S-053, S-055, S-056, S-058, S-060, S-061`.

## Email-confirmation flow

A custom confirmation flow normally performs these steps:

1. create the user;
2. generate an email-confirmation token;
3. Base64Url-encode it;
4. build an HTTPS callback URL containing the user identifier and encoded code;
5. send that URL through an email service;
6. receive the callback;
7. resolve the user;
8. decode the token;
9. call `ConfirmEmailAsync`.

Generation:

```csharp
string token =
    await _userManager
        .GenerateEmailConfirmationTokenAsync(user);

string code = WebEncoders.Base64UrlEncode(
    Encoding.UTF8.GetBytes(token));

string callbackUrl = Url.Action(
    action: "ConfirmEmail",
    controller: "Account",
    values: new
    {
        userId = user.Id,
        code
    },
    protocol: Request.Scheme)!;

await _emailSender.SendEmailAsync(
    user.Email!,
    "Confirm your email",
    $"Confirm by clicking <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>here</a>.");
```

Confirmation:

```csharp
IdentityUser? user =
    await _userManager.FindByIdAsync(userId);

if (user is null)
{
    return NotFound();
}

string token = Encoding.UTF8.GetString(
    WebEncoders.Base64UrlDecode(code));

IdentityResult result =
    await _userManager.ConfirmEmailAsync(
        user,
        token);
```

When `RequireConfirmedEmail` is enabled, a user may exist and have a valid password but still be prevented from signing in until this succeeds.

## Password-reset flow

The reset flow follows a similar shape but uses a different token purpose.

### Requesting a reset

1. receive an email address;
2. find the user;
3. generate a password-reset token;
4. encode it for the URL;
5. send a reset link.

```csharp
IdentityUser? user =
    await _userManager.FindByEmailAsync(email);

if (user is not null)
{
    string token =
        await _userManager
            .GeneratePasswordResetTokenAsync(user);

    string code = WebEncoders.Base64UrlEncode(
        Encoding.UTF8.GetBytes(token));

    // Build and send reset URL.
}
```

Applications commonly return the same outward response whether the email exists or not, so the endpoint does not disclose account existence.

### Applying the reset

```csharp
IdentityUser? user =
    await _userManager.FindByEmailAsync(model.Email);

if (user is null)
{
    return RedirectToAction("ResetPasswordConfirmation");
}

string token = Encoding.UTF8.GetString(
    WebEncoders.Base64UrlDecode(model.Code));

IdentityResult result =
    await _userManager.ResetPasswordAsync(
        user,
        token,
        model.NewPassword);
```

The password is validated against the current password policy and stored as a fresh Identity password hash.

Email-confirmation tokens and password-reset tokens are not interchangeable even if they are generated for the same user.

## Built-in password hashing

Identity hashes passwords through the configured `IPasswordHasher<TUser>`.

Application code should not:

- store plaintext passwords;
- encrypt passwords for later decryption;
- compare password strings directly with a database column;
- manually update `PasswordHash` without the manager APIs.

`UserManager.CreateAsync`, `ChangePasswordAsync`, `ResetPasswordAsync`, and sign-in checks coordinate the password hasher and security-related state.

## Lockout model

The standard user record contains lockout-related fields including:

- `AccessFailedCount`;
- `LockoutEnd`;
- `LockoutEnabled`.

A typical configuration is:

```csharp
builder.Services.Configure<IdentityOptions>(options =>
{
    options.Lockout.AllowedForNewUsers = true;
    options.Lockout.MaxFailedAccessAttempts = 5;
    options.Lockout.DefaultLockoutTimeSpan =
        TimeSpan.FromMinutes(15);
});
```

Password policy can be configured alongside it:

```csharp
options.Password.RequiredLength = 8;
options.Password.RequireDigit = true;
options.Password.RequireUppercase = true;
options.Password.RequireLowercase = true;
options.Password.RequireNonAlphanumeric = false;
```

For production applications, the source notes that requiring confirmed email before sign-in is common:

```csharp
options.SignIn.RequireConfirmedEmail = true;
```

## Sign-in checks and lockout increments

The normal sign-in operation can perform lockout accounting automatically:

```csharp
SignInResult result =
    await _signInManager.PasswordSignInAsync(
        email,
        password,
        isPersistent: false,
        lockoutOnFailure: true);
```

A lower-level password check can also participate in lockout:

```csharp
SignInResult result =
    await _signInManager.CheckPasswordSignInAsync(
        user,
        password,
        lockoutOnFailure: true);
```

With `lockoutOnFailure: true`, a failed password can increment `AccessFailedCount`. When the configured maximum is reached, Identity sets the lockout end time. Subsequent sign-in checks can return a locked-out result until the period expires or administrators change the state.

Useful manager operations include:

```csharp
await _userManager.AccessFailedAsync(user);
await _userManager.ResetAccessFailedCountAsync(user);

bool locked =
    await _userManager.IsLockedOutAsync(user);

await _userManager.SetLockoutEndDateAsync(
    user,
    DateTimeOffset.UtcNow.AddMinutes(30));
```

Successful authentication normally resets the failed-access count through the sign-in flow.

## Account lockout is not endpoint rate limiting

Identity lockout protects a user account against repeated failed credentials.

It is not a complete substitute for request-rate limiting.

An attacker can still:

- distribute requests across many usernames;
- hammer registration, forgot-password, or token endpoints;
- consume application resources before the user-specific lockout check;
- attack from many addresses or devices.

The application can add ASP.NET Core Rate Limiter middleware, reverse-proxy limits, WAF rules, telemetry, and abuse detection in addition to Identity lockout.

## Identity UI versus custom account UI

The default Identity UI supplies Razor Pages for common account flows. It is useful when the application wants working registration, login, confirmation, reset, and account-management pages quickly.

A custom controller or SPA flow can use the same managers directly and design different routes, views, JSON contracts, and email templates.

The underlying users, roles, claims, tokens, password hasher, and stores are the same.

## Common configuration mistakes

### Authentication middleware is missing

Symptoms:

```text
HttpContext.User is anonymous
[Authorize] redirects or returns 401 unexpectedly
a valid cookie appears to have no effect
```

Fix: include `UseAuthentication()` before `UseAuthorization()`.

### Login path does not exist

The cookie handler redirects to a configured login path, but the application has no route or Razor Page at that location.

### IIS or server authentication prevents the request reaching the app

If server-level anonymous access is disabled while application-level Identity is expected to handle login, the web server may reject the request before ASP.NET Core Identity can run.

### Roles appear not to work

Possible causes include:

- role services were not registered;
- the role record was never created;
- the user was never assigned to the role;
- a custom JWT did not contain `ClaimTypes.Role`;
- token validation did not use the expected role-claim type.

### Token links fail

The raw token was placed in the URL without Base64Url encoding, or the callback did not decode it back into the original token.

## External-login architecture

An external provider authenticates the person, but the application still needs a local Identity user if it wants normal local roles, claims, application data, and account management.

The SVG labels state the essential rule:

```text
external login works as an application login only when there is
a local user account and an AspNetUserLogins association created
from the actual provider login information
```

The association connects:

```text
local UserId
+ LoginProvider
+ ProviderKey
```

`ProviderKey` is the provider's stable unique identifier for that account, often based on the OIDC `sub` claim.

## Registering an external provider

A Google example:

```csharp
builder.Services
    .AddAuthentication()
    .AddGoogle("Google", options =>
    {
        options.ClientId =
            builder.Configuration["Authentication:Google:ClientId"]!;

        options.ClientSecret =
            builder.Configuration["Authentication:Google:ClientSecret"]!;

        options.CallbackPath = "/signin-google";
    });
```

The exact callback path and configuration depend on the handler and provider.

The application still configures Identity and its stores:

```csharp
builder.Services
    .AddDefaultIdentity<IdentityUser>()
    .AddEntityFrameworkStores<AppDbContext>();
```

## Starting the external challenge

A login button sends the provider name to an action.

```html
<form asp-action="ExternalLogin" method="post">
    <button
        type="submit"
        name="provider"
        value="Google">
        Sign in with Google
    </button>
</form>
```

The action creates redirect properties and returns a challenge:

```csharp
[HttpPost]
[ValidateAntiForgeryToken]
public IActionResult ExternalLogin(
    string provider,
    string? returnUrl = null)
{
    string redirectUrl = Url.Action(
        nameof(ExternalLoginCallback),
        "Account",
        new { returnUrl })!;

    AuthenticationProperties properties =
        _signInManager.ConfigureExternalAuthenticationProperties(
            provider,
            redirectUrl);

    return Challenge(properties, provider);
}
```

The `provider` string, such as `"Google"`, is the authentication scheme.

`Challenge` asks that handler to begin authentication. The handler constructs the provider authorization URL containing values such as:

- client ID;
- redirect URI;
- requested scopes;
- state and correlation data.

The response is normally a `302` redirect to the external provider.

## External callback

The provider authenticates the user and redirects to the configured callback. The handler validates the remote response and creates a temporary external principal.

Application callback code then reads the external-login information:

```csharp
[HttpGet]
public async Task<IActionResult> ExternalLoginCallback(
    string? returnUrl = null,
    string? remoteError = null)
{
    ExternalLoginInfo? info =
        await _signInManager.GetExternalLoginInfoAsync();

    if (info is null)
    {
        return RedirectToAction(nameof(Login));
    }

    SignInResult result =
        await _signInManager.ExternalLoginSignInAsync(
            info.LoginProvider,
            info.ProviderKey,
            isPersistent: false,
            bypassTwoFactor: false);

    if (result.Succeeded)
    {
        return LocalRedirect(returnUrl ?? "/");
    }

    // Create or link a local user here.
}
```

An explicit `[HttpGet]` is clearer for a callback reached through the usual provider redirect. Conventional MVC routing may match a GET action without the attribute, but the source favors making the HTTP method visible.

## What `GetExternalLoginInfoAsync` returns

The method reads the temporary external authentication cookie and produces information including:

- `LoginProvider`;
- `ProviderKey`;
- `ProviderDisplayName`;
- the external `ClaimsPrincipal`;
- authentication tokens when configured for storage.

`LoginProvider` identifies the scheme, for example `"Google"`.

`ProviderKey` identifies the user's account at that provider.

## Existing linked account

```csharp
SignInResult result =
    await _signInManager.ExternalLoginSignInAsync(
        info.LoginProvider,
        info.ProviderKey,
        isPersistent: false);
```

This searches `AspNetUserLogins` for the provider-and-key pair, resolves the linked local user, applies sign-in rules, and signs the local user into the application when allowed.

## First external login: create and link a local user

If no association exists, the application can obtain the email claim, create or find a local user, and add the login:

```csharp
string? email =
    info.Principal.FindFirstValue(
        ClaimTypes.Email);

if (email is null)
{
    // Ask the user for an email or reject the flow.
}

IdentityUser? user =
    await _userManager.FindByEmailAsync(email);

if (user is null)
{
    user = new IdentityUser
    {
        UserName = email,
        Email = email,
        EmailConfirmed = true
    };

    IdentityResult create =
        await _userManager.CreateAsync(user);

    if (!create.Succeeded)
    {
        // Present errors.
    }
}

IdentityResult link =
    await _userManager.AddLoginAsync(user, info);

if (link.Succeeded)
{
    await _signInManager.SignInAsync(
        user,
        isPersistent: false);
}
```

Whether an externally supplied email may be treated as confirmed depends on the provider, requested scopes, returned claims, and the application's trust policy.

## Region conclusion

Confirmation, password reset, lockout, and external login are separate Identity subsystems, but they share the same local user and manager infrastructure. Tokens establish a limited-purpose proof, lockout changes account sign-in state, and external login links a provider identity to the local account rather than eliminating the local Identity model.


---

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


---

# R05 — Default Identity UI versus Identity API endpoints

## Coverage

```text
source screenshots: 3 / 3
SVG text nodes assigned to this region: 1 / 1
remaining: 0
```

Covered source IDs: `S-062, S-063, S-064`.

## Two meanings of “default Identity endpoints”

The source separates two different built-in experiences.

## A. Default Identity UI — Razor Pages and cookie-focused flows

The default UI provides account pages with routes such as:

```text
/Identity/Account/Login
/Identity/Account/Register
/Identity/Account/ForgotPassword
/Identity/Account/ResetPassword
/Identity/Account/ConfirmEmail
```

This is designed primarily for traditional MVC and Razor Pages applications.

Characteristics:

- it uses the normal Identity application cookie;
- it provides ready-made pages and handlers for common account flows;
- it uses `IEmailSender` during confirmation and reset flows;
- it can give an application a complete account system quickly;
- the pages can be scaffolded into the application and customized later.

The UI still uses the same Identity stores, managers, token providers, password policies, and lockout configuration discussed in the previous regions.

## B. Identity API endpoints — Minimal API endpoints for APIs and SPAs

Identity API endpoints are prebuilt endpoints mapped in `Program.cs` for client-driven account flows.

They are intended for:

- single-page applications;
- mobile clients;
- other API clients;
- projects that do not want to build every registration, login, confirmation, and reset endpoint from scratch.

Depending on the framework version and authentication configuration, they can participate in token-based or cookie-based architectures.

The source's high-level distinction is:

```text
Default Identity UI:
ready-made HTML/Razor account pages, normally cookie-focused

Identity API endpoints:
ready-made HTTP endpoints for programmatic API clients
```

The two are related but are not the same feature.

## Version and architecture caveat

The exact route names, request contracts, token response shape, refresh behavior, and cookie/token options of the API endpoints depend on the .NET version and how Identity is registered.

A project should check the documentation for its target framework rather than copying endpoint assumptions from another version.

The larger architecture decision remains important:

- traditional server-rendered application with an Identity cookie;
- SPA calling custom JWT endpoints;
- SPA using built-in Identity API endpoints;
- BFF or another server-side session design;
- external OIDC provider or dedicated authorization server.

## Region conclusion

“Use default Identity” can mean either scaffolded Razor account pages or mapped API endpoints. The first is an interactive UI solution centered on cookies; the second is a programmatic endpoint surface for API clients. Neither removes the need to understand Identity stores, managers, email delivery, lockout, token transport, and the application's chosen browser security model.


## Full-conspect conclusion

The source presents ASP.NET Core Identity as a complete local membership system rather than merely a login helper.

The material moves from the underlying schema and minimal setup, through manager-based user/role/claim/token operations, into account-security flows such as confirmation, reset and lockout, then into external-login linking and two API-facing architectures:

- application-issued JWTs backed by Identity user data;
- built-in Identity API endpoints.

The complete source SVG remains authoritative for exact screenshot punctuation and original visual layout. This transcript is the authoritative detailed semantic layer for repetition and reconstruction.
