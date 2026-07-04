# Account activation — technical risk correction notice v002

## 1. Token length mismatch

Source code:

```csharp
Convert.ToHexString(RandomNumberGenerator.GetBytes(128))
```

produces 256 hex characters.

EF mapping:

```csharp
ab.Property(a => a.SecurityCode)
    .HasMaxLength(100);
```

cannot store that value safely. Fix by reducing token bytes, increasing column size, or storing a fixed-length hash.

## 2. Handler missing return

The not-found branch logs an error but then continues to:

```csharp
var user = userOrNothing.Value;
```

It must return the error immediately.

## 3. Success path should set ActivatedAt

The domain method sets `IsActivated = true` but should also set:

```csharp
ActivatedAt = Maybe.From(utcNow);
```

and should define repeated activation behavior.

## 4. GET activation side effect

Email activation links naturally open with GET, but GET is conventionally safe. Use an idempotent GET flow or a GET confirmation + POST mutation flow.

## 5. Link generation context

`IHttpContextAccessor.HttpContext!` works only when a request context exists. Email sent from background jobs or an outbox should use configured public base URL or another request-independent link strategy.

## 6. Raw code security

Prefer storing a hash of the activation code and never log the raw code.
