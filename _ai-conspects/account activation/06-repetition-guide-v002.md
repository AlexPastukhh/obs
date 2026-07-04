# Account activation — repetition guide v002

## One-minute model

```text
register user
-> create activation record with cryptographic code + expiry
-> send absolute verification link
-> redirect to check-email page
-> activation endpoint receives code
-> load activation/user by code or code hash
-> domain method checks wrong/expired/already activated
-> set IsActivated and ActivatedAt
-> save changes
-> render success/failure
```

## Critical risks to remember

1. token length must fit the database column;
2. raw token should ideally not be stored/logged;
3. missing user branch must return before `.Value`;
4. successful activation should set `ActivatedAt`;
5. GET activation must be idempotent or split into GET confirmation + POST mutation;
6. link generation must work outside request context if email is sent later;
7. changes must be persisted;
8. repeated clicks and scanners must be handled;
9. expired/invalid code responses must avoid user enumeration;
10. row version/concurrency should protect double activation.

## Checklist

```text
[ ] cryptographic token generation
[ ] token encoded length <= column length
[ ] token hash storage considered
[ ] expiry time uses TimeProvider
[ ] ActivatedAt set on success
[ ] invalid/expired/already activated are distinct domain errors
[ ] not-found branch returns
[ ] raw code not logged
[ ] email failure handled
[ ] link uses public external URL
[ ] activation route tested with repeated clicks
[ ] changes saved
[ ] concurrency handled
```
