# Account activation — corrected domain/code reference v002

## Corrected token sizing

If the column is limited to 100 characters, use a token size that fits:

```csharp
var code = Convert.ToHexString(
    RandomNumberGenerator.GetBytes(32)); // 64 hex chars
```

Alternative: keep 128 bytes of entropy but increase the column length to at least 256 for hex.

Prefer storing only a hash of the activation code:

```csharp
var rawCode = Convert.ToHexString(
    RandomNumberGenerator.GetBytes(32));

var codeHash = SHA256.HashData(
    Encoding.UTF8.GetBytes(rawCode));
```

Send raw code by email; store/lookup hash.

## Corrected domain method

```csharp
internal UnitResult<Error> ActivateAccount(
    string inputCode,
    DateTimeOffset utcNow)
{
    Guard.IsNotNull(inputCode);

    if (IsActivated)
    {
        return Errors.Account.AlreadyActivated();
    }

    IsActivationAttempted = true;

    if (inputCode != SecurityCode)
    {
        return Errors.Account.InvalidActivationCode();
    }

    if (utcNow > CodeExpirationTime)
    {
        return Errors.Account.ActivationCodeHasExpired(
            inputCode,
            CodeExpirationTime);
    }

    IsActivated = true;
    ActivatedAt = Maybe.From(utcNow);

    return UnitResult.Success<Error>();
}
```

## Corrected handler not-found branch

```csharp
if (userOrNothing.HasNoValue)
{
    var error = Errors.User.NotFoundForRequestedCode();
    _logger.LogWarning(
        "Activation code was not found.");

    return error;
}
```

Do not log raw activation codes.

## Persistence boundary

After successful activation, changes must be saved:

```csharp
var result = user.ActivateAccount(
    request.Code,
    _time.GetUtcNow());

if (result.IsFailure)
{
    return result.Error;
}

await _users.UnitOfWork.SaveChangesAsync(
    cancellationToken);

return UnitResult.Success<Error>();
```

If a pipeline behavior performs saving, document that boundary explicitly.

## Safer link flow

Option A — idempotent GET activation:

```csharp
[HttpGet("activate/{code}")]
public async Task<IActionResult> Activate(
    string code,
    CancellationToken ct)
{
    var result = await _sender.Send(
        new ActivateAccountCommand(code),
        ct);

    return result.IsSuccess
        ? View("Activated")
        : View("ActivationFailed", result.Error);
}
```

Option B — GET confirmation + POST mutation:

```csharp
[HttpGet("activate/{code}")]
public IActionResult Confirm(string code)
{
    return View(new ActivateAccountViewModel(code));
}

[HttpPost("activate")]
[ValidateAntiForgeryToken]
public async Task<IActionResult> Activate(
    ActivateAccountViewModel model,
    CancellationToken ct)
{
    var result = await _sender.Send(
        new ActivateAccountCommand(model.Code),
        ct);

    return result.IsSuccess
        ? RedirectToAction("Activated")
        : View("ActivationFailed", result.Error);
}
```

## Link factory without active request dependency

For background email, prefer configuration:

```csharp
public sealed class PublicUrlOptions
{
    public required string BaseUrl { get; init; }
}
```

```csharp
public string CreateActivationLink(string code)
{
    return $"{_options.BaseUrl.TrimEnd('/')}/account/activate/{Uri.EscapeDataString(code)}";
}
```

If using `LinkGenerator` in a request, ensure `HttpContext` is available and host/scheme are correct behind reverse proxies.
