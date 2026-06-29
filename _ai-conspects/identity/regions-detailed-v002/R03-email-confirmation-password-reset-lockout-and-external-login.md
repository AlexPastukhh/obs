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
