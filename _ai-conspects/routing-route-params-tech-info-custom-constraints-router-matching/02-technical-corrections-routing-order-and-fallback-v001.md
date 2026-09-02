# Technical corrections — routing order and post-selection fallback

Generated: 2026-09-02

Status: authoritative correction layer for `regions/RTR03-matching-precedence-order-and-overlaps-v001.md`

## Sources used for correction

- Microsoft Learn, **Routing in ASP.NET Core**: <https://learn.microsoft.com/en-us/aspnet/core/fundamentals/routing?view=aspnetcore-10.0>
- Microsoft Learn, **ASP.NET Core middleware**: <https://learn.microsoft.com/en-us/aspnet/core/fundamentals/middleware/?view=aspnetcore-10.0>
- Microsoft Learn, **Routing to controller actions in ASP.NET Core**: <https://learn.microsoft.com/en-us/aspnet/core/mvc/controllers/routing?view=aspnetcore-10.0>

The corrections below are narrow dispositions of source-card claims. They do not replace or rewrite the visually verified near-literal transcript.

## C-001 — Endpoint matching is not sequential registration-order probing

Applies to: S-007, S-010, S-011, and S-012.

Official routing documentation describes matching as phases over the candidate set:

1. route-template path matching;
2. route-constraint filtering;
3. `MatcherPolicy` filtering;
4. final `EndpointSelector` choice.

Candidates are prioritized using `RouteEndpoint.Order` and route-template precedence. If the best remaining candidates still have the same priority, selection is ambiguous. The implementation does not guarantee a general “first registered endpoint wins” processing order.

Disposition:

- S-010 and S-011 are retained as correct boundaries: controller declaration order and Minimal API registration order must not be the application contract.
- S-007's phrase “and sometimes registration order” must not be recalled as a general endpoint-routing guarantee. Conventional controller route mapping has a documented order-assignment exception, but this is not equivalent to arbitrary endpoint registration order deciding ties.
- S-012 correctly attributes the literal route's result to specificity rather than registration order.

## C-002 — Literal precedence makes S-009's explicit order redundant

Applies to: S-008, S-009, S-012, S-013, and S-014.

The routing documentation ranks literal segments above parameter segments. Therefore `/search/popular` has higher route-template precedence than `/search/{term}` even if the two endpoints are registered in the opposite order.

Disposition:

- S-009's observed URL-to-action outcomes are preserved.
- The example does not demonstrate a need for `Order`; the literal route already wins through precedence.
- The source's later S-012 and S-013 cards provide the preferred interpretation: use semantic route shape or constraints first, and reserve explicit order for exceptional ambiguity resolution.

## C-003 — Handler-level feature checks do not trigger a second route selection

Applies to: S-016.

Routing selects the endpoint before its action/handler executes. In S-016, the `Order = 1` endpoint wins during routing. Its later `FeatureEnabled()` check and returned `NotFound()` occur after that selection.

Disposition:

- Returning 404 or throwing from `FeatureSearch` does not cause routing to retry the `Order = 2` `DefaultSearch` endpoint.
- The lower-priority endpoint is therefore not a guaranteed runtime fallback as written.
- Conditional selection must occur before final endpoint selection through an appropriate routing/matcher mechanism, or both behaviors must be dispatched explicitly inside one selected endpoint. Those alternative designs are a correction boundary, not claims recovered from the screenshots.

## C-004 — Authorization failure does not reroute to a public endpoint

Applies to: S-017.

Official middleware documentation places routing before authorization so authorization can inspect the endpoint already selected by routing. An authorization challenge or failure acts on that selected endpoint; it does not restart route matching with the next `Order` value.

Disposition:

- S-017 correctly says that `AdminSearch` is selected first and that authorization can reject/challenge the request.
- The shown `PublicSearch` endpoint is not an authorization fallback for the same path after that rejection.
- With the shown identical templates and explicit order values, the public endpoint is lower priority during selection; it is not reached merely because authorization or an action filter rejects the selected admin endpoint.

## C-005 — Valid scope of explicit route order in the remaining examples

Applies to: S-015 and S-018.

Explicit order can resolve otherwise overlapping route candidates before dispatch. This supports the narrow selection behavior shown by an intentional application override of a framework/library endpoint, and it can temporarily choose one identical legacy/new route during migration.

Boundary:

- only the selected endpoint executes;
- the lower-priority endpoint is not a post-dispatch retry target;
- the source's broader recommendation remains: prefer unambiguous route design and avoid routine dependence on `Order`.

## Correction summary

| Source claim | Disposition |
|---|---|
| S-007 general registration-order tiebreak wording | QUALIFIED |
| S-009 `Order` necessity for literal-versus-parameter route | QUALIFIED; result is right, necessity is not demonstrated |
| S-016 guaranteed feature-flag fallback | CORRECTED |
| S-017 authorization/filter fallback to public endpoint | CORRECTED |
| S-015 and S-018 pre-dispatch explicit-order selection | RETAINED with no post-dispatch fallback implication |
