# R07 — Near-literal source transcript: Cross-requirement success, explicit veto and domain authorization engines

Generated: 2026-07-04 UTC  
Source: `source/AUTHORIZATION.svg`  
Coverage: `S-105` through `S-112`  
Mode: near-literal normalized source transcript. Obvious OCR glyph errors are corrected; exact punctuation and provider-specific formatting remain authoritative in the preserved images.

---

## S-105 — One condition can succeed several different requirements

```text
source_id: S-105
image hash: 57e3e044a64a
image: source/images/S-105__57e3e044a64a.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
7) Another case: succeeding multiple different requirements from one
condition
Example:
If user is SystemAdmin:
satisfy all document requirements immediately.
```

### Key point

One condition can succeed several different requirements.

Nearby canvas notes:

- when need to succeed all / fail all based on one thing
- auth rule dispatcher / (switch inside)

### Repetition questions

1. Explain and reconstruct the rule or example: One condition can succeed several different requirements.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-106 — Custom failure logic based on a combination

```text
source_id: S-106
image hash: 750d44b30fa9
image: source/images/S-106__750d44b30fa9.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
8) Another case: custom failure logic

Sometimes you want to inspect pending requirements and call:
context.Fail();

based on a combination.

Example:
If document is archived, fail authorization no matter what.
```

### Key point

Custom failure logic based on a combination.

Nearby canvas notes:

- when need to succeed all / fail all based on one thing
- auth rule dispatcher / (switch inside)

### Repetition questions

1. Explain and reconstruct the rule or example: Custom failure logic based on a combination.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-107 — SystemAdmin bypass succeeds all document requirements

```text
source_id: S-107
image hash: 9a5c66cbccd5
image: source/images/S-107__9a5c66cbccd5.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
Non-generic handler:

public Task HandleAsync(AuthorizationHandlerContext context)
{
    if (!context.User.IsInRole("SystemAdmin"))
        return Task.CompletedTask;

    foreach (var requirement in context.PendingRequirements.ToList())
    {
        if (requirement is MustOwnDocumentRequirement ||
            requirement is SameTenantRequirement ||
            requirement is DocumentNotLockedRequirement)
        {
            context.Succeed(requirement);
        }
    }

    return Task.CompletedTask;
}

This can also be implemented with several generic handlers, but the non-generic handler centralizes the SystemAdmin bypass.
```

### Key point

SystemAdmin bypass succeeds all document requirements.

Nearby canvas notes:

- when need to succeed all / fail all based on one thing
- auth rule dispatcher / (switch inside)

### Repetition questions

1. Explain and reconstruct the rule or example: SystemAdmin bypass succeeds all document requirements.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-108 — Archived document causes explicit authorization failure

```text
source_id: S-108
image hash: 55098e98a0c8
image: source/images/S-108__55098e98a0c8.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
Non-generic handler:

public async Task HandleAsync(AuthorizationHandlerContext context)
{
    if (context.Resource is not Document document)
        return;

    if (document.IsArchived)
    {
        context.Fail();
        return;
    }

    // Other checks continue after this guard.
}
```

### Key point

Archived document causes explicit authorization failure.

Nearby canvas notes:

- when need to succeed all / fail all based on one thing
- auth rule dispatcher / (switch inside)

### Repetition questions

1. Explain and reconstruct the rule or example: Archived document causes explicit authorization failure.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-109 — Central document authorization switch with owner and tenant checks

```text
source_id: S-109
image hash: 4ee0dddd5729
image: source/images/S-109__4ee0dddd5729.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
foreach (var requirement in context.PendingRequirements.ToList())
{
    switch (requirement)
    {
        case MustOwnDocumentRequirement:
            if (document.OwnerId == context.User.FindFirst("sub")?.Value)
                context.Succeed(requirement);
            break;

        case SameTenantRequirement:
            if (document.TenantId == context.User.FindFirst("tenant")?.Value)
                context.Succeed(requirement);
            break;
    }
}

You can also model the archived-resource guard as a separate `NotArchivedRequirement`; sometimes central domain logic is clearer.
```

### Key point

Central document authorization switch with owner and tenant checks.

Nearby canvas notes:

- auth rule dispatcher / (switch inside)
- when need to succeed all / fail all based on one thing

### Repetition questions

1. Explain and reconstruct the rule or example: Central document authorization switch with owner and tenant checks.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-110 — Dynamic dispatch from metadata using OperationRequirement

```text
source_id: S-110
image hash: c573f91f9ea2
image: source/images/S-110__c573f91f9ea2.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
9. Another case: dynamic dispatch from metadata

Imagine requirements are marker/data objects:

public sealed class OperationRequirement : IAuthorizationRequirement
{
    public OperationRequirement(string operation)
    {
        Operation = operation;
    }

    public string Operation { get; }
}
```

### Key point

Dynamic dispatch from metadata using OperationRequirement.

Nearby canvas notes:

- auth rule dispatcher / (switch inside)
- when need to succeed all / fail all based on one thing

### Repetition questions

1. Explain and reconstruct the rule or example: Dynamic dispatch from metadata using OperationRequirement.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-111 — Mixed requirement marker types in a domain authorization engine

```text
source_id: S-111
image hash: 1e8edf2cad3b
image: source/images/S-111__1e8edf2cad3b.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
Actually this can use generic handler fine.
But if you have mixed requirements:
" CH
ResourceOperationRequirement
TenantRuleRequirement
SubscriptionRuleRequirement
FeatureFlagRequirement
```

### Key point

Mixed requirement marker types in a domain authorization engine.

Nearby canvas notes:

- auth rule dispatcher / (switch inside)
- when need to succeed all / fail all based on one thing

### Repetition questions

1. Explain and reconstruct the rule or example: Mixed requirement marker types in a domain authorization engine.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

## S-112 — DomainAuthorizationHandler delegates heterogeneous requirements to a rule evaluator

```text
source_id: S-112
image hash: 22c7ea3c7fe0
image: source/images/S-112__22c7ea3c7fe0.png
placements: 1
boundary: standalone or self-contained fragment
readability: high unless a continuation/crop is explicitly noted
transcription confidence: medium-high
```

### Near-literal normalized visible text

```text
One domain authorization engine can evaluate heterogeneous requirements:

public sealed class DomainAuthorizationHandler : IAuthorizationHandler
{
    private readonly IRuleEvaluator _rules;

    public DomainAuthorizationHandler(IRuleEvaluator rules)
    {
        _rules = rules;
    }

    public async Task HandleAsync(AuthorizationHandlerContext context)
    {
        var pending = context.PendingRequirements.ToList();

        foreach (var requirement in pending)
        {
            if (await _rules.CanSatisfyAsync(
                context.User,
                context.Resource,
                requirement))
            {
                context.Succeed(requirement);
            }
        }
    }
}

This authorization-engine style is legitimate, but it can become a large, difficult-to-test dispatcher if it is not bounded by one domain.
```

### Key point

DomainAuthorizationHandler delegates heterogeneous requirements to a rule evaluator.

Nearby canvas notes:

- auth rule dispatcher / (switch inside)
- when need to succeed all / fail all based on one thing

### Repetition questions

1. Explain and reconstruct the rule or example: DomainAuthorizationHandler delegates heterogeneous requirements to a rule evaluator.
2. Reconstruct the visible rule, API call or code fragment without opening the screenshot.

# R07 closure

```text
unique source blocks: 8 / 8
remaining in region: 0
whole-conspect remaining after this region: 0
```
