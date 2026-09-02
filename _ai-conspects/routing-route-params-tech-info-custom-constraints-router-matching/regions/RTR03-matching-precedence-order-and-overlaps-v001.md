# RTR03 — Router matching, precedence, order, and overlapping endpoints

Generated: 2026-09-02

Sources: S-006 through S-018 and native canvas labels T-001, T-019 through T-023

## 0. Transcript policy

- Every source PNG was inspected at original resolution.
- The near-literal layer preserves what each card says, including claims later qualified or corrected.
- S-006/S-007 are overlapping consecutive crops of one explanation.
- Technical interpretation must also apply `02-technical-corrections-routing-order-and-fallback-v001.md`.

## 0.1 Area overview / key ideas / reading quality

What this area is about: how endpoint candidates are formed and narrowed, how template precedence and explicit `Order` affect selection, why code/registration order should not be treated as a general routing contract, and examples that present overlapping endpoints as deliberate overrides or fallbacks.

Key ideas: routing selects before action execution; constraints eliminate candidates; literal/specific templates normally win through precedence; explicit order is an exceptional ambiguity tool; identical patterns require especially careful lifecycle reasoning.

How well I perceived the area: all 13 cards are readable. S-006/S-007 form one continuous explanation, while S-015 through S-018 form a sequence of identical-template scenarios.

Reading limitations: some screenshots begin or end at a continuation boundary, but the adjacent crop supplies the missing continuation. No learning line is unreadable.

Confidence: high for the visible transcript; corrected interpretation is documented separately where source claims conflict with the endpoint-selection lifecycle.

## S-006 — How the router tests endpoints, steps 1–3

Verification: `verified`

Known limits: the card continues into S-007.

### Near-literal normalized transcript

What the router does: how it “tests” endpoints (plain language + steps)

Think of the router as a tiny referee that gets an incoming HTTP request (method + path + headers) and asks every registered endpoint “can you handle this?” It does not call the endpoint immediately; it tests them and then chooses the best match.

High-level steps:

1. **Collect endpoints.** When the app starts, all registered endpoints—controller actions, minimal API delegates, static-file endpoints, and so on—are stored in the router's endpoint collection.
2. **Filter by HTTP method and basic shape.** The router first removes endpoints that clearly cannot match, for example a GET request versus an endpoint registered only for POST, or templates with different fixed prefixes.
3. **Match route templates.** For remaining endpoints, the router attempts to match the incoming path against each endpoint's route template, such as `/api/products/{id}` or `/blog/{*slug}`. If the template text does not match the URL structure, the endpoint is dropped from consideration.

### Recall questions

1. What information from the request participates in the card's router model?
2. What endpoint set exists before a request is dispatched?
3. Which candidates are removed by method/basic-shape and template matching?

---

## S-007 — How the router tests endpoints, steps 4–6

Verification: `verified`

Known limits: this is the continuation of S-006.

### Near-literal normalized transcript

4. **Evaluate constraints and parameter parsing.** For each template that looked like a fit, the router tests constraints such as `{id:int}`, `minlength(3)`, and regex. If a constraint fails—for example `abc` for `{id:int}`—that endpoint is treated as not matched.
5. **Score candidates and pick the winner.** If multiple endpoints still match, the router uses precedence rules—specificity, template precedence, explicit `Order` values, and the card says sometimes registration order—to pick the best one. Only the selected endpoint executes.
6. **If nothing matches, return 404.** After all filtering, if no endpoint remains, the router returns 404 or lets another middleware handle it.

Why this matters practically:

- Constraints and templates cause non-matches, not errors; they let the router skip endpoints early.
- The router does most of this work quickly and in memory, so the card says constraints help performance and reduce ambiguous matches.
- The router's decision happens before controller action execution; model binding and filters run only after the router selects an endpoint.

### Recall questions

1. What happens when a route constraint fails?
2. Which ordering inputs does the source card list?
3. At what point do action execution, model binding, and filters occur?
4. Which registration-order wording is qualified by the technical correction?

---

## S-008 — Intended meaning of explicit `Order`

Verification: `verified`

Known limits: none

### Near-literal normalized transcript

The correct understanding (in one paragraph)

`Order` is useful when there is intentionally a specific endpoint and a general endpoint that could both match the same request, but the specific endpoint should always win for its specific cases. The general endpoint still exists to handle everything else. `Order` tells the router which one should be preferred when both match.

### Recall questions

1. What overlap does the source use to motivate `Order`?
2. What is the general endpoint supposed to handle?

---

## S-009 — `Order` example with a literal and parameter route

Verification: `verified`

Known limits: the technical correction notes that literal-route precedence already determines this example's result.

### Near-literal normalized transcript

Why does `Order` exist at all?

Sometimes both endpoints must exist, but only one should win for a request and constraints alone are not expressive enough.

Example where `Order` makes sense:

```csharp
[HttpGet("search/{term}", Order = 2)]
public IActionResult General(string term) => Ok($"General: {term}");

[HttpGet("search/popular", Order = 1)]
public IActionResult Popular() => Ok("Popular");
```

Requests shown by the card:

- `/search/popular` goes to `Popular`.
- `/search/anything-else` goes to `General`.

### Recall questions

1. Which two routes overlap for `/search/popular`?
2. What result is shown for each example URL?
3. Why does the correction say this particular example does not prove that `Order` is needed?

---

## S-010 — Controller action declaration order

Verification: `verified`

Known limits: none

### Near-literal normalized transcript

Question: does action method order in a controller class matter?

Short answer: **No—the order of action methods inside a controller class does not matter.**

The card introduces this as the point where many people become confused.

### Recall questions

1. Does source-code declaration order decide which controller action wins?

---

## S-011 — Minimal API registration order is not a contract

Verification: `verified`

Known limits: none

### Near-literal normalized transcript

Question: if Minimal API registration order matters, can the general endpoint simply be registered last?

The card calls this a subtle but important correction.

Short, precise answer: **do not rely on Minimal API registration order alone to guarantee that a general endpoint runs last.** It may appear to work, but it is not reliable or guaranteed by the routing system.

### Recall questions

1. Why must Minimal API registration order not be used as the selection contract?

---

## S-012 — When registration order only appears to work

Verification: `verified`

Known limits: none

### Near-literal normalized transcript

When registration order appears to work:

```csharp
app.MapGet("/search/popular", () => "popular");
app.MapGet("/search/{term}", term => $"search {term}");
```

This works even if reversed because:

- `/search/popular` is more specific;
- the router's precedence rules already prefer it.

It is route specificity, not registration order, that determines the shown result.

### Recall questions

1. Why does reversing these two registrations not change the winner?
2. Which route is more specific?

---

## S-013 — Prefer semantic route design

Verification: `verified`

Known limits: none

### Near-literal normalized transcript

What to do instead 90% of the time:

If endpoints differ semantically, express that difference in the route:

```text
/search/by-id/{id:int}
/search/by-name/{name}
```

Or use constraints:

```text
/search/{id:int}
/search/{name:alpha}
```

These designs remove ambiguity and the need for `Order`.

### Recall questions

1. What two route-design techniques replace explicit order in the examples?
2. Why are the resulting routes less ambiguous?

---

## S-014 — `Order` is an exceptional tool

Verification: `verified`

Known limits: none

### Near-literal normalized transcript

Final truth (the important takeaway):

`Order` exists for rare, edge, transitional, or framework-integration cases—not everyday API design.

### Recall questions

1. In what category of cases does the source reserve `Order`?

---

## S-015 — Backward compatibility / legacy endpoints

Verification: `verified`

Known limits: none

### Near-literal normalized transcript

When this pattern does make sense in the real world

Backward compatibility / legacy endpoints: an old endpoint may need to stay alive while behavior is migrated.

```csharp
// NEW behavior (preferred)
[HttpGet("search/{query}", Order = 1)]
public IActionResult NewSearch(string query) => NewLogic(query);

// OLD behavior (fallback / legacy)
[HttpGet("search/{query}", Order = 2)]
public IActionResult LegacySearch(string query) => OldLogic(query);
```

The card states:

- only one executes;
- both must exist temporarily;
- `Order` controls which one wins;
- the legacy route is removed later.

### Recall questions

1. What migration situation does the example model?
2. Which endpoint wins matching while both identical templates exist?
3. What happens to the legacy route later?

---

## S-016 — Feature flag / conditional logic claim

Verification: `verified`

Known limits: the card's guaranteed-runtime-fallback interpretation is corrected by `02-technical-corrections-routing-order-and-fallback-v001.md`.

### Near-literal normalized transcript

Feature flags / conditional logic

One endpoint may be conditionally enabled:

```csharp
[HttpGet("search/{term}", Order = 1)]
public IActionResult FeatureSearch(string term)
{
    if (!FeatureEnabled())
        return NotFound(); // or throw
    return FeatureLogic(term);
}

[HttpGet("search/{term}", Order = 2)]
public IActionResult DefaultSearch(string term)
{
    return DefaultLogic(term);
}
```

The card claims:

- endpoint A wins routing;
- endpoint B exists as a guaranteed fallback;
- logic decides which behavior applies;
- this is rare but legitimate.

### Recall questions

1. What two endpoints and order values are shown?
2. What fallback behavior does the card claim?
3. Why does the technical correction reject post-selection fallback from this code?

---

## S-017 — Filters / attributes differ claim

Verification: `verified`

Known limits: the card's authorization-failure fallback interpretation is corrected by `02-technical-corrections-routing-order-and-fallback-v001.md`.

### Near-literal normalized transcript

Filters / attributes differ

Routes are identical, but filters, authorization, or metadata differ.

```csharp
[Authorize(Roles = "Admin")]
[HttpGet("search/{term}", Order = 1)]
public IActionResult AdminSearch(string term) => Ok("admin");

[HttpGet("search/{term}", Order = 2)]
public IActionResult PublicSearch(string term) => Ok("public");
```

The card states:

- the router picks `AdminSearch` first;
- the authorization filter may reject;
- if rejected, the request fails or challenges;
- the public endpoint is fallback only when the admin route does not apply;
- this is subtle and should be used carefully.

### Recall questions

1. Which metadata differs between the identical templates?
2. Which endpoint is selected first?
3. Why does an authorization rejection not select the lower-priority endpoint according to the technical correction?

---

## S-018 — Intentional override of framework-generated routes

Verification: `verified`

Known limits: none

### Near-literal normalized transcript

Intentional override of framework-generated routes

Frameworks or libraries may generate controller routes that cannot be modified.

```csharp
// Your override
[HttpGet("search/{term}", Order = 1)]
public IActionResult Override(string term) => Ok("override");

// Library route (lower priority)
[HttpGet("search/{term}", Order = 100)]
public IActionResult LibraryRoute(string term) => Ok("library");
```

The card says `Order` must be used to take control.

### Recall questions

1. Why can route-template redesign be unavailable in this example?
2. Which order value gives the application override higher priority?

## Native canvas annotation

T-019 through T-023 read:

```text
Order
actually no
precedence rules
apply specific endpoint
first
```

This annotation reinforces the source's own correction from presumed declaration/registration order toward precedence-based selection.

## Technical-correction boundary

The near-literal blocks remain historical source evidence. The authoritative technical interpretation is:

- endpoint routing does not provide a general registration/declaration-order guarantee;
- explicit route order and template precedence participate before endpoint dispatch;
- returning 404, throwing, or failing authorization after one endpoint is selected does not make routing retry a lower-priority endpoint;
- therefore S-016's guaranteed feature fallback and S-017's public fallback are not safe mechanics as written.

See `../02-technical-corrections-routing-order-and-fallback-v001.md` for the official-source basis and exact dispositions.

## Coverage

```text
verified source images: S-006..S-018 = 13/13
processed native labels: T-001, T-019..T-023 = 6/6
unresolved visual readings: 0
technical corrections: S-007 qualification; S-009 qualification; S-016 correction; S-017 correction
```
