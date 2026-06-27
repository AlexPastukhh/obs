# Regional transcript — R07: Policy result, failed requirements, schemes and challenge/forbid events

Conspect: `AUTHORIZATION`  
Generated: 2026-06-27 06:00:00 UTC

## Coverage

```text
region: R07
image uses processed: 29 / 29
unique screenshots represented: 29
repeated placements retained: 0
remaining image uses: 0
```

## Semantic transcript

The final region joins result inspection with scheme behavior and shows how to carry safe failure context to the response layer.

## Result types

- `Succeeded` permits endpoint execution.
- `Challenged` indicates no acceptable authenticated principal for the policy.
- `Forbidden` indicates an authenticated principal failed authorization.
- A forbidden result may expose an `AuthorizationFailure` for server-side inspection.

## Failed requirements

- Custom handling can check whether a specific requirement remains failed or pending.
- Failure reasons can be recorded for logs and diagnostics.
- Client-facing responses should use stable error codes rather than serializing internal requirement objects.

## Scheme loops

- Policies may name several schemes, and the default result handler invokes challenge or forbid on each.
- Each scheme can run its own events, such as redirect suppression for APIs or access-denied redirects for cookies.
- Bypassing the default scheme loop is safe only when the custom response intentionally replaces that behavior.

## Passing response context

- A handler or result layer can place a sanitized marker in request features/items for later response selection.
- Headers can carry a public reason code when the frontend needs a specific action.
- Never treat the reason marker as proof of authentication; it is response metadata after authorization evaluation.

## Authentication check

- Challenge versus forbid depends on the policy's authentication result, not merely on the existence of any principal object.
- A principal can contain unauthenticated identities, so `User != null` is not an authorization decision.

## Caveats

- Authorization diagnostics should be logged server-side with appropriate privacy controls.
- Custom responses must preserve cache and security headers expected by the application.

## Nearby source labels

- succeeded
- Challenged
- result types
- Forbidden
- authSchemes
- requirements
- Looping over policy schemes
- custom handler example
- !!!
- bypasses scheme beh
- customize only specific cases
- events wont run
- or can pass some metadata in headers/context so your
- forbidden even callback will know the exatc reason of forbid
- and you may pass some info to frontend
- its mostly safe to bypass forbid
- +
- if you dont need events to run
- inspect failed requirements
- Custom response for
- specific requirements
- properties
- AuthorizationPolicy

## Covered screenshot uses

```text
IU-092, IU-093, IU-094, IU-095, IU-096, IU-097, IU-098, IU-099, IU-100, IU-101, IU-102, IU-103, IU-104
IU-105, IU-106, IU-107, IU-108, IU-109, IU-110, IU-111, IU-112, IU-113, IU-114, IU-115, IU-116, IU-117
IU-118, IU-119, IU-120
```

## Audit note

Every listed placement is closed in the final image-use ledger.
Repeated placements remain separate coverage units.
The complete SVG and extracted screenshots remain authoritative for exact code punctuation.
