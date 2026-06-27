# R04 — Migrating legacy hashes to automatic Identity versioning

Generated: 2026-06-27 UTC

## Coverage

```text
Image uses: 12
SVG text nodes: 1
Status: visually and semantically verified
```

**Images:** S-039, S-040, S-041, S-042, S-043, S-044, S-045, S-046, S-047, S-048, S-049, S-050

**Text nodes:** T-070

## Verified transcript

### Native Identity upgrades

The preferred route is to let `PasswordHasher<TUser>` own its internal versioning. Configure current policy, verify the stored Identity payload, and on `SuccessRehashNeeded` create a new hash and persist it after successful login.

This provides gradual migration without password resets.

### Migrating a non-Identity legacy format

When existing records use a manual scheme such as `hash:salt` or another custom serialization, the stored value needs an explicit application-level discriminator during the transition. The screenshots use conceptual prefixes such as:

```text
LEGACY:<old-format>
IDENTITY:<identity-base64>
```

The migration service:

1. identifies the record family from the prefix;
2. verifies Identity records with `IPasswordHasher<TUser>`;
3. verifies legacy records with the old parser/KDF and timing-safe comparison;
4. only after successful verification, creates a current Identity hash;
5. returns the upgraded stored value;
6. updates the user row as part of the successful login flow.

A failed legacy verification must never trigger conversion.

### Important distinction

Identity's own Base64 payload already contains its internal format marker. The `IDENTITY:` text is only a temporary application wrapper used to distinguish Identity payloads from unrelated legacy formats.

### Database update

The upgraded value is persisted only after authentication succeeds. This is the operational meaning of rehash-on-login: active accounts migrate naturally, while inactive accounts remain readable by the legacy verifier until policy decides otherwise.

## Boundary conclusion

R04 closes the migration branch: native version upgrades, custom legacy dispatch, successful-login conversion and database persistence.
