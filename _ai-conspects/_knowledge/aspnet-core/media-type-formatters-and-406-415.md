# ASP.NET Core media-type formatters and 406/415

Knowledge ID: `aspnet-core.media-type-formatters-and-406-415`

Topic: `aspnet-core`

## Response direction: `Accept`, `[Produces]`, and 406

`[Produces]` is response metadata/constraint. `Accept` expresses client preference; a registered output formatter serializes the object and must actually support the selected media type.

```text
object -> output formatter -> response body
Accept + Produces metadata + formatter support -> response Content-Type
```

`[Produces]` does not create XML/custom formatters or validate request bodies. Splitting one resource into plain, friendly, or hypermedia representations can be useful when each is a distinct contract and action metadata should document it.

ASP.NET Core can fall back to JSON for an unsupported `Accept` by default. With strict `ReturnHttpNotAcceptable`, a specific request for an unavailable representation returns `406 Not Acceptable`.

Parse one request `Content-Type` with `MediaTypeHeaderValue.TryParse`. A real `Accept` header is a comma-separated preference list, so manual negotiation must use `MediaTypeHeaderValue.TryParseList` and evaluate all alternatives and q-values. Applying the single-value parser to the whole list is the wrong abstraction.

Keep malformed syntax separate from a supported-types miss:

```text
malformed media type/list
    -> policy may return 400 Bad Request

valid Accept value, but no output formatter can produce it
    -> 406 Not Acceptable under strict negotiation
```

`Accept` normally does not select the controller action. Routing selects the action, the action can execute and return an object, and result execution then negotiates and selects the output formatter. An unsupported response representation may therefore be discovered only after the action has run.

## Request direction: `Content-Type`, `[Consumes]`, and 415

`[Consumes]` constrains accepted request media types and participates in action selection; an input formatter deserializes the body.

```text
body + Content-Type -> input formatter -> model
Consumes metadata  -> action candidate allowed for that type
```

Two distinct gates can produce failure: `[Consumes]` may prevent selecting the route/verb candidate, or the selected action may have no formatter capable of reading the media type. Missing required `Content-Type`, unsupported formatter types, and no matching media-specific action normally produce `415 Unsupported Media Type`.

Two same-route/same-verb actions can be disambiguated by vendor content type. Use custom `IActionConstraint` only for specialized action-selection logic beyond the built-in media-type rule. `[Consumes]` itself does not deserialize or register formatters.

Both `[Produces]` and `[Consumes]` also contribute supported response/request media types to OpenAPI/Swagger metadata.

## Directional diagnostic

```text
406 -> requested response representation unavailable
       inspect Accept, Produces, output formatters

415 -> submitted request representation unsupported
       inspect Content-Type, Consumes, input formatters/action selection
```

Status Code Pages or Problem Details can make bodyless failures actionable by naming the status, safe path/context, relevant header, and supported types when known. Do not leak formatter internals or claim an exact cause when selection is ambiguous.

A centralized status-code endpoint can map `/status-code/406` and `/status-code/415` to a reason phrase and the same safe Problem Details policy instead of duplicating diagnostics at every action.

## Browser headers and cache correctness

Browsers often send broad `Accept` lists (`text/html`, XML, images, `*/*`). Framework defaults may treat browser headers specially; `RespectBrowserAcceptHeader=true` makes MVC honor them fully and can change the selected representation.

When one URL returns different bodies based on `Accept`, include `Vary: Accept`. Negotiation chooses a representation; `Vary` tells caches that the choice is part of identity.

## What should be recallable

- Which roles belong to metadata, headers, and input/output formatters in each direction?
- Why does `[Produces]` not enable a missing serializer?
- How can `[Consumes]` disambiguate actions without deserializing the body?
- Which diagnostic chain distinguishes 406 from 415?
- What changes when MVC respects broad browser Accept headers?
- Why is `Vary: Accept` separate from negotiation?

## Sources

- Workspace: `_ai-conspects/produces-consumes-input-output-formatters-406-415-vary-accept/`
- Authoritative processed source: `regions/R01-produces-output-formatters-accept-negotiation.md` through `regions/R04-vary-accept-browser-accept-header-policy.md`
- Original SVG: `source/produces-consumes-input-output-formatters-406-415-vary-accept.svg`
- Workspace: `_ai-conspects/CONTENT NEGOTIATION RES API,FORMATTERS, XML,JSON/`
- Authoritative processed source: `01-final-transcript.md`, R01–R04
- Original SVG: `source/CONTENT NEGOTIATION RES API,FORMATTERS, XML,JSON.svg`
