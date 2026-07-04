# Account activation — source-preserving/code transcript v002

Generated: 2026-07-04

## Source verification

```text
source/Account activation.svg
viewBox: 0 0 3937.184444550269 12486.655037148304
Git blob SHA: 5ffaf61f91cb8e5c14ec8d8b702db9d9e408a09f
unique screenshots: 16
image uses: 16
native non-empty SVG text nodes: 146
broken/external/dangling: 0
```

## Coverage

```text
source-specific blocks: 16 / 16
visible code/examples represented: 16 / 16
source-specific question sets: 16 / 16
native text nodes preserved: 146 / 146
technical corrections: token length, missing return, ActivatedAt, GET side effect, HttpContext link generation
remaining sources: 0
```

---

## S-001 — Legacy registration code uses RNG for security code

**Known limits:** none

### Near-literal normalized transcript

```csharp
userToAdd.SecurityCode = Convert.ToBase64String(
    RandomNumberGenerator.GetBytes(128));

// hash & salt the password
userToAdd.Password =
    _passwordHasher.HashPassword(userToAdd, password);

_context.Users.Add(userToAdd);
```

### Study meaning

The old registration flow stores an activation/security code on the user. It correctly uses cryptographic randomness, but the design evolves later into a separate `Activation` entity.

### Recall questions

1. Which API generates random bytes?
2. Why not use `Random`?
3. Where is the code stored in the legacy flow?
4. What later design replaces this?


---

## S-002 — Legacy expiration date is added to the user

**Known limits:** none

### Near-literal normalized transcript

```csharp
userToAdd.SecurityCode = Convert.ToBase64String(
    RandomNumberGenerator.GetBytes(128));

userToAdd.SecurityCodeExpirationDate =
    DateTime.UtcNow.AddHours(1);
```

### Study meaning

The code should be time-limited. The later design uses `DateTimeOffset`/`TimeProvider` for better testability and precision.

### Recall questions

1. What expiration window is shown?
2. Why should activation codes expire?
3. Why is TimeProvider better in application code?
4. What happens after expiration?


---

## S-003 — Legacy ActivateUserAsync lookup

**Known limits:** none

### Near-literal normalized transcript

```csharp
public async Task<bool> ActivateUserAsync(string securityCode)
{
    if (string.IsNullOrWhiteSpace(securityCode))
    {
        throw new ArgumentNullException(nameof(securityCode));
    }

    // find a user with this security code as an active security code
    var user = await _context.Users.FirstOrDefaultAsync(u =>
        u.SecurityCode == securityCode &&
        u.SecurityCodeExpirationDate >= DateTime.UtcNow);

    if (user == null)
    {
        return false;
    }

    user.Active = true;
    user.SecurityCode = null;
    return true;
}
```

### Study meaning

This legacy service validates nonblank code, looks up a nonexpired code, activates the user, and clears the code. It must also persist changes in the unit of work.

### Recall questions

1. Why check expiration in the query?
2. Why clear the code?
3. What should persist the change?
4. What does false mean?


---

## S-004 — Register flow redirects to check-email page

**Known limits:** none

### Near-literal normalized transcript

Visible source:

```csharp
Console.WriteLine(activationLink);
return Redirect("~/User/ActivationCodeSent");
```

Note on canvas:

```text
In register redirect user to checkemail page, not signin
```

### Study meaning

After registration, the user should not be signed in automatically if the account requires email activation. Redirect to an instruction/check-email page.

### Recall questions

1. Why not sign in immediately?
2. What should the user see after registration?
3. What should the email contain?
4. What should happen if email sending fails?


---

## S-005 — User owns a list of account activations

**Known limits:** none

### Near-literal normalized transcript

```csharp
public class User : Entity
{
    public FullName FullName { get; private set; }
    public Email Email { get; private set; }
    public PasswordHash PasswordHash { get; private set; }

    private readonly List<Activation> _accountActivations =
        new List<Activation>();

    public Activation LastAccountActivation =>
        _accountActivations.MaxBy(a => a.CodeExpirationTime);
}
```

### Study meaning

A separate activation entity allows activation history, attempts, expiration, row versioning, and multiple reissue flows instead of mutating activation fields directly on `User`.

### Recall questions

1. Why store activations separately?
2. What does LastAccountActivation select?
3. What collection backs the relationship?
4. What edge case exists if the list is empty?


---

## S-006 — Activation entity fields

**Known limits:** none

### Near-literal normalized transcript

```csharp
public class Activation : Entity
{
    public string SecurityCode { get; private set; }
    public DateTimeOffset CodeExpirationTime { get; private set; }
    public bool IsActivated { get; private set; }
    public Maybe<DateTimeOffset> ActivatedAt { get; private set; }
    public bool IsActivationAttempted { get; private set; }
    public User User { get; internal set; } = default!;

    // Empty constructor for EF
}
```

### Study meaning

The entity captures token value, expiry, activation state, optional activation timestamp, attempt flag, and owning user.

### Recall questions

1. Which field stores the code?
2. Which field stores expiry?
3. Why is ActivatedAt a Maybe?
4. Why does EF need an empty constructor?


---

## S-007 — Private activation constructor

**Known limits:** none

### Near-literal normalized transcript

```csharp
private Activation(
    string securityCode,
    DateTimeOffset securityCodeExpiration,
    bool isActive,
    Maybe<DateTimeOffset> activatedAt,
    bool isActivationAttempted)
{
    SecurityCode = securityCode;
    CodeExpirationTime = securityCodeExpiration;
    ActivatedAt = activatedAt;
    IsActivated = isActive;
    IsActivationAttempted = isActivationAttempted;
}
```

### Study meaning

The constructor centralizes the entity invariants and keeps external code from creating partially initialized activation records.

### Recall questions

1. Why private constructor?
2. Which values are initialized?
3. What would a public constructor risk?
4. Which factory method calls it?


---

## S-008 — Activation domain method validates code and expiration

**Known limits:** none

### Near-literal normalized transcript

```csharp
internal UnitResult<Error> ActivateAccount(
    string inputCode,
    DateTimeOffset utcNow)
{
    Guard.IsNotNull(inputCode);
    Guard.IsNotNull(utcNow);

    if (inputCode != SecurityCode)
    {
        IsActivationAttempted = true;
        return Errors.Account.InValidActivationCode(
            SecurityCode,
            inputCode);
    }

    if (utcNow > CodeExpirationTime)
    {
        IsActivationAttempted = true;
        return Errors.Account.ActivationCodeHasExpired(
            inputCode,
            CodeExpirationTime);
    }

    IsActivationAttempted = true;
    IsActivated = true;
    return UnitResult.Success<Error>();
}
```

### Study meaning

The entity owns the activation rule: wrong code fails, expired code fails, valid code activates.

### Technical correction / boundary

The shown success path does not set `ActivatedAt`. A complete domain method should normally set `ActivatedAt = Maybe.From(utcNow)` and make repeated activation idempotent or return a clear already-activated error.

### Recall questions

1. What is checked first?
2. What happens on wrong code?
3. What happens on expired code?
4. What state changes on success?


---

## S-009 — StartAccountActivation factory

**Known limits:** none

### Near-literal normalized transcript

```csharp
internal static Activation StartAccountActivation(
    DateTimeOffset utcNow)
{
    var code = Convert.ToHexString(
        RandomNumberGenerator.GetBytes(128));

    var expirationDate = utcNow.AddHours(1);

    var aaInfo = new Activation(
        code!,
        expirationDate,
        false,
        Maybe.None,
        false);

    return aaInfo;
}
```

### Study meaning

The factory generates a cryptographically random activation code and creates a nonactivated, nonattempted activation record with one-hour expiry.

### Technical correction / boundary

`GetBytes(128)` plus hex encoding produces 256 characters. If EF column length is 100, this will not fit. Use fewer bytes, for example 32 bytes -> 64 hex chars, or increase the column length. Consider storing a hash of the code instead of the raw code.

### Recall questions

1. What method creates the random code?
2. What encoding is used?
3. How long is the code valid?
4. What initial state is used?


---

## S-010 — EF mapping for Activation

**Known limits:** none

### Near-literal normalized transcript

```csharp
modelBuilder.Entity<Activation>(ab =>
{
    ab.ToTable("AccountActivations").HasKey(a => a.Id);
    ab.Property(a => a.Id).HasColumnName("ActivationsIds");
    ab.Property<long>("UserId");

    ab.Property(a => a.ActivatedAt)
        .HasConversion(
            maybe => maybe.GetValueOrDefault(),
            value => Maybe.From(value));

    ab.Property(a => a.SecurityCode)
        .HasMaxLength(100);

    ab.Property<byte[]>("Version")
        .IsRowVersion();
});
```

### Study meaning

The mapping configures table/key, shadow foreign key, Maybe conversion, security-code length, and row version concurrency.

### Technical correction / boundary

`HasMaxLength(100)` conflicts with a 256-character hex code from 128 random bytes. Fix token size or database column length.

### Recall questions

1. What table is used?
2. What is the shadow FK?
3. How is Maybe converted?
4. What is Version for?


---

## S-011 — User-to-Activation relationship mapping

**Known limits:** none

### Near-literal normalized transcript

```csharp
ub.HasMany<Activation>("_accountActivations")
    .WithOne(aa => aa.User)
    .HasForeignKey("UserId")
    .OnDelete(DeleteBehavior.Cascade);
```

### Study meaning

The user owns many activation records through the private backing field. Cascade delete removes activation records with the user.

### Recall questions

1. Which backing field is used?
2. Which navigation points back to User?
3. Which FK is used?
4. What does cascade delete do?


---

## S-012 — RegisterHandler sends activation email

**Known limits:** none

### Near-literal normalized transcript

```csharp
var securityCode = user.LastAccountActivation.SecurityCode;

var link = _linkFactory.CreateLink(
    "ActivateAccount",
    "Account",
    securityCode);

var message =
    $"To activate your account click on " +
    $"<a href=\"{link}\">link</a>:";

var sendEmail = await _email.SendEmailAsync(
    user.Email,
    "Activate your account",
    message,
    cancellationToken);

if (sendEmail.IsFailure)
{
    return sendEmail.Error;
}

return UnitResult.Success<Error>();
```

### Study meaning

After registration, an activation is created and its code is embedded in an email link. Email failure aborts the workflow with an error.

### Recall questions

1. Where does the code come from?
2. What creates the link?
3. What subject is used?
4. What happens if email sending fails?


---

## S-013 — VerificationLinkFactory uses LinkGenerator

**Known limits:** none

### Near-literal normalized transcript

```csharp
public sealed class VerificationLinkFactory
    : IVerificationLinkFactory
{
    private readonly IHttpContextAccessor _contextAccessor;
    private readonly LinkGenerator _link;

    public VerificationLinkFactory(
        IHttpContextAccessor contextAccessor,
        LinkGenerator link)
    {
        _contextAccessor = contextAccessor;
        _link = link;
    }

    public string CreateLink(
        string action,
        string controller,
        string code,
        string scheme = "https")
    {
        var link = _link.GetUriByAction(
            _contextAccessor.HttpContext!,
            action,
            controller,
            new { code },
            scheme);

        if (link is null)
        {
            throw new InvalidOperationException(
                "Can't create verification link");
        }

        return link;
    }
}
```

### Study meaning

The factory generates absolute activation URLs using MVC action/controller routing and the current HTTP context.

### Technical correction / boundary

This design depends on a current `HttpContext`. For background jobs or outbox workers, prefer configured public base URL plus route/link generation that does not require an active request context.

### Recall questions

1. Which service generates the URI?
2. Why is IHttpContextAccessor used?
3. What route value is passed?
4. What happens if link generation fails?


---

## S-014 — DI registrations

**Known limits:** none

### Near-literal normalized transcript

```csharp
builder.Services.AddSingleton<TimeProvider>(
    TimeProvider.System);

builder.Services.AddTransient<IEmailService, EmailService>();

builder.Services.AddScoped<
    IVerificationLinkFactory,
    VerificationLinkFactory>();
```

### Study meaning

TimeProvider enables testable time. Email service sends the activation email. Link factory is scoped because it depends on request context.

### Recall questions

1. Why register TimeProvider?
2. Which service sends mail?
3. Why scoped link factory?
4. How can time be mocked in tests?


---

## S-015 — ActivateAccountHandler

**Known limits:** none

### Near-literal normalized transcript

```csharp
public class ActivateAccountHandler
    : IRequestHandler<ActivateAccountCommand, UnitResult<Error>>
{
    private readonly IUserRepository _users;
    private readonly ILogger _logger;
    private readonly TimeProvider _time;

    public async Task<UnitResult<Error>> Handle(
        ActivateAccountCommand request,
        CancellationToken cancellationToken)
    {
        var userOrNothing = await _users
            .GetBySecurityCodeAsync(request.code, cancellationToken);

        if (userOrNothing.HasNoValue)
        {
            var error = Errors.User.NotFoundForRequestedCode();
            _logger.LogWarning(error.Message, request.code);
        }

        var user = userOrNothing.Value;

        var result = user.ActivateAccount(
            request.code,
            _time.GetUtcNow());

        if (result.IsFailure)
        {
            return result.Error;
        }

        return UnitResult.Success<Error>();
    }
}
```

### Study meaning

The handler loads a user by activation code, delegates domain validation to the User/Activation aggregate, and returns domain errors.

### Technical correction / boundary

The screenshot branch logs not-found but does not return the error before reading `.Value`; that can throw. It should `return error;`. The handler must also ensure state changes are persisted, either by repository/unit of work or pipeline behavior.

### Recall questions

1. What repository method is called?
2. What does TimeProvider provide?
3. Where is activation logic delegated?
4. What does UnitResult express?


---

## S-016 — Activate endpoint and GET-link boundary

**Known limits:** none

### Near-literal normalized transcript

```csharp
[HttpGet("activate/{code}")]
public async Task<IActionResult> ActivateAccountAsync(
    string code)
{
    var activateAccountCommand =
        new ActivateAccountCommand(code);

    // send command and render/redirect result
}
```

Canvas note:

```text
Make sure that activate link leads to get endpoint
```

### Study meaning

Email activation links are normally opened through a browser GET route. The endpoint should be idempotent and safe against link scanners, prefetchers, repeated clicks, and expired codes.

### Technical correction / boundary

HTTP GET is conventionally safe; changing account state through GET is common for email verification but has risks. A robust flow can make GET show a confirmation page and POST perform mutation, or make GET activation idempotent and scanner-resistant.

### Recall questions

1. Why does an email link often use GET?
2. What is the side-effect concern?
3. How should repeated clicks behave?
4. How can link scanners affect activation?
