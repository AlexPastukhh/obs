# Route nesting — repetition guide v002

## One-minute decision model

```text
Is parent key required for identity? -> nest
Does parent own lifecycle/invariants? -> nest commands/collections
Is child independent and globally addressable? -> top-level canonical single URI
Does parent context change representation or authorization? -> optional scoped nested route
Can child move or have multiple parents? -> avoid parent in canonical identity
Need global filtering? -> query canonical collection
```

## Compare

1. global uniqueness vs aggregate ownership.
2. canonical URI vs scoped view.
3. nested collection vs filtered global collection.
4. aggregate child vs aggregate root.
5. 404 vs 403 for mismatched parent/child.
6. top-level lookup vs nested lifecycle command.
7. parent-scoped query vs load-then-compare.
8. stable identity vs mutable relationship.
9. alias route vs competing canonical identity.
10. deep nesting vs required operation context.

## Review checklist

```text
[ ] resource identity components are explicit
[ ] aggregate/lifecycle invariants are documented
[ ] canonical single-resource URI is chosen
[ ] CreatedAt/Location uses canonical URI
[ ] parent membership is enforced in query/authorization
[ ] mismatch 404/403 policy is documented
[ ] top-level access exists when business requires it
[ ] reparenting/multiple-parent behavior is modeled
[ ] filtering is not confused with containment
[ ] nesting depth includes only required context
```
