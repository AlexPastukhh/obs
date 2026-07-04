# Account activation — R02-domain-activation-entity

Generated: 2026-07-04

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
