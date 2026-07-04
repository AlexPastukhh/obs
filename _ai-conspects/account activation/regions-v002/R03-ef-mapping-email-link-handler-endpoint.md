# Account activation — R03-ef-mapping-email-link-handler-endpoint

Generated: 2026-07-04

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
