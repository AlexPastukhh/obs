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
