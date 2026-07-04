# Account activation — R01-token-generation-legacy-flow

Generated: 2026-07-04

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
