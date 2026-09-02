# RTR01 — Route parameter forms and built-in constraints

Generated: 2026-09-02

Sources: S-001 through S-004

## 0. Transcript policy

- Every source PNG was inspected at original resolution.
- The readable transcript below preserves visible claims, code, examples, and caveats.
- Browser/chat chrome such as the copy-code label is not learning content.
- No OCR-only text is promoted as verified.

## 0.1 Area overview / key ideas / reading quality

What this area is about: required, optional, and catch-all route parameters, followed by the role and composition of inline route constraints.

Key ideas: missing required segments prevent a match; optional segments yield a defaulted parameter value; catch-all parameters capture the remaining path; constraints filter route candidates rather than executing the endpoint.

How well I perceived the area: all four cards are complete and mutually coherent.

Reading limitations: none material. Syntax highlighting and copy-code UI do not obscure the code.

Confidence: high; all four sources are visually verified.

## S-001 — `{name}` required parameter

Verification: `verified`

Known limits: none

### Near-literal normalized transcript

`{name}` — required parameter

- Matches a single URL segment and binds it to the route parameter `name`.
- If the URL does not contain that segment, the route will not match; the result is 404 if no other route matches.

Example:

```csharp
app.MapGet("/products/{id}", (int id) => $"Product {id}");
```

- `/products/5` matches with `id = 5`.
- `/products` does not match.

### Recall questions

1. What does a required route parameter bind?
2. What happens when the required segment is absent?
3. Which two example paths match or fail?

---

## S-002 — `{name?}` optional parameter

Verification: `verified`

Known limits: none

### Near-literal normalized transcript

`{name?}` — optional parameter

- The segment may be present or absent. If absent, the parameter gets its CLR default, for example `null` for reference/nullable types and `0` for `int`, unless a default is used.
- This is useful for pages such as `/articles` and `/articles/3` using the same route.

Example:

```csharp
app.MapGet("/items/{page?}", (int? page) => page ?? 1);
```

- `/items` gives `page = null`; the example returns `1`.
- `/items/2` gives `page = 2`.

### Recall questions

1. What value is observed when an optional segment is absent?
2. Why does the example use `int?` and `?? 1`?
3. Which two URL shapes can share the route?

---

## S-003 — `{*slug}` catch-all parameter

Verification: `verified`

Known limits: none

### Near-literal normalized transcript

`{*slug}` — catch-all parameter

- Captures the rest of the URL, including slashes, into a single parameter.
- Must be the last segment in the route template.
- It can capture zero segments, so `/blog` can match `/blog/{*slug}` with `slug == ""`.

Example for CMS slugs:

```csharp
app.MapGet("/blog/{*slug}", (string slug) => $"slug: '{slug}'");
```

- `/blog` gives `slug == ""` (empty).
- `/blog/2025/02/my-post` gives `slug == "2025/02/my-post"`.

Tip: to disallow an empty capture, combine the parameter with a constraint or handle the empty case in code.

### Recall questions

1. What part of the path does a catch-all capture?
2. Where must it appear in the template?
3. What does the example say about a zero-segment capture?

---

## S-004 — Inline constraints

Verification: `verified`

Known limits: none

### Near-literal normalized transcript

Constraints — basic idea

- A constraint restricts what a route parameter can match. If the constraint fails, the route is treated as not matching and routing continues to the next candidate.
- Constraints make routes unambiguous and avoid hitting actions with invalid values; the card says this reduces false matches and improves routing performance.

Syntax:

```text
{param:constraint1:constraint2}
```

Multiple constraints can be chained.

Example:

```csharp
app.MapGet("/orders/{id:int:min(1)}", (int id) => $"order {id}");
```

Only positive integers greater than or equal to `1` match.

### Recall questions

1. What happens to a candidate when a constraint fails?
2. How are multiple constraints chained?
3. What values does `int:min(1)` accept in the example?

## Coverage

```text
verified source images: S-001, S-002, S-003, S-004
processed image uses: 4/4
unresolved visual readings: 0
```
