# R04 - Cache Tag Helper / view components / display templates / validation helpers

Generated: 2026-06-13 08:06:22 UTC

Image uses: 8

```text
S-001, S-002, S-007, S-008, S-009, S-010, S-011, S-025
```

## Core idea

R04 covers reusable and performance-oriented Razor view tools:

```text
Cache Tag Helper
view components
display templates
validation helper examples
Product view examples
```

These tools sit on top of the base MVC/Razor view flow from P01.

## Cache Tag Helper

The Cache Tag Helper caches a fragment of generated view output.

Mental model:

```text
first request renders expensive fragment
fragment output is cached
later requests reuse cached output
cache varies/expires based on configured rules
```

This is useful for expensive but reusable view fragments.

## Cache expiration

Cache can expire in different ways.

Common concepts:

```text
absolute expiration
sliding expiration
duration-based expiration
```

Absolute expiration means the fragment expires at a fixed time.

Sliding expiration means repeated access can keep it alive.

Duration-based expiration means the fragment is cached for a configured time span.

## Varying cache entries

A cached fragment may need different versions for different inputs.

Typical variation ideas:

```text
vary by route value
vary by query
vary by user
vary by cookie
vary by header
vary by culture
```

If a fragment is user-specific but not varied by user, one user's content can be incorrectly reused for another user.

So cache variation is a correctness rule, not just a performance rule.

## Cache Tag Helper caution

Do not cache fragments that contain per-user or rapidly changing data unless variation/expiration is correct.

Be careful with:

```text
logged-in user name
cart count
personalized recommendations
authorization-dependent UI
CSRF/form-specific output
```

A safe pattern is to cache mostly public or stable fragments, and vary correctly for anything contextual.

## View components

A view component is a reusable UI component with its own logic.

Mental model:

```text
component class prepares data
component view renders HTML
parent view invokes component
```

Good fit:

```text
cart summary
navigation menu
featured products
profile widget
dashboard panel
```

A view component is stronger than a partial because it can run logic and obtain its own model.

## Partials vs view components

Use a partial when:

```text
the parent already has all needed data
the fragment is simple markup
no independent logic is needed
```

Use a view component when:

```text
the fragment needs its own data retrieval
the fragment has nontrivial preparation logic
the component is reusable across pages
```

## Display templates

Display templates provide consistent rendering for values or model types.

They help avoid repeating the same display markup everywhere.

Typical idea:

```text
type or property uses a display template
Razor renders consistent HTML for that value
```

This is useful for repeated formatting and reusable display rules.

## Validation helper examples

Validation helpers/tag helpers render ModelState errors near the form fields or as a summary.

Typical pieces:

```text
field-specific message
validation summary
invalid CSS classes
model-level errors
```

The important connection:

```text
controller returns invalid model to same view
ModelState errors stay available
validation helpers render errors
```

If the controller redirects on invalid form data, normal ModelState errors are lost unless extra handling is added.

## Product view examples

In the Products app, these helpers are most useful around:

```text
edit/create forms
product listing display
shared product cards
validation messages
success messages after redirect
cached or reusable UI blocks
```

A good view stays readable:

```text
strongly typed model
tag helpers for fields/routes/validation
partials/components for reusable UI
TempData only for redirect messages
cache helper only for stable fragments
```

## Practical checklist

For each reusable view fragment, ask:

```text
Is this simple markup? -> partial
Does it need logic/data loading? -> view component
Is it expensive but stable? -> cache tag helper
Is it a repeated formatting rule? -> display template
Is it validation output? -> validation helper/tag helper
```

For cache:

```text
What makes this output different?
Should it vary by user/query/route/culture?
How long can it safely live?
Can it leak user-specific output?
```

## Boundary note

R04 closes the tag-helper/cache/component/template pass.

After R03 and R04, this conspect needs only a final coverage audit to verify all source image uses are processed.
