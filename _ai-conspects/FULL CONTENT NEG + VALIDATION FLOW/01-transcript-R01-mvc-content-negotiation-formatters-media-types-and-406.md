# Regional transcript — R01: MVC content negotiation, formatters, media types and 406

Conspect: `FULL CONTENT NEG + VALIDATION FLOW`  
Generated: 2026-06-27 10:00:00 UTC

## Coverage

```text
text elements represented: 7 / 7
image uses processed: 5 / 5
unique screenshots represented: 5
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

ASP.NET Core MVC uses **input formatters** to deserialize request bodies and
**output formatters** to serialize action results. These are separate lists with
separate supported media types.

### Output negotiation

- MVC compares the request `Accept` values with the output formatters that can
  serialize the action result.
- Missing `Accept` normally means the client accepts any representation and the
  server chooses its default.
- A syntactically valid but unsupported `Accept` value is a **406 Not
  Acceptable** case.
- `MvcOptions.ReturnHttpNotAcceptable = true` prevents silent fallback when the
  client explicitly excludes every representation the API can produce.
- `RespectBrowserAcceptHeader` controls whether MVC honors broad browser
  `Accept` headers.

### Formatter configuration

- JSON normally comes from the System.Text.Json output formatter and is
  configured with `AddJsonOptions`.
- XML or custom formatters must be registered explicitly.
- Vendor JSON media types can be added to a JSON formatter when the same
  serializer can produce that representation.
- The configured media type must be a real representation, not a wildcard
  placeholder.

### Attributes

- `[Produces]` documents or constrains response media types.
- `[Consumes]` declares accepted request body media types and participates in
  action selection.
- Attributes should match actual formatter support; metadata alone cannot make
  an unavailable formatter work.

### Failure boundaries

- malformed `Accept` syntax → 400 when explicitly validated;
- valid but unsupported `Accept` → 406;
- malformed request `Content-Type` → syntax-validation failure;
- valid but unsupported request `Content-Type` → 415.

## Representative source labels

- configure formatters
- full content negotiation basics flow
- + validation problem details (can name sheet like this)
- configure system.text.json options
- input/output formatters
- supported media types
- configure 406

## Covered text elements

```text
T-001, T-004, T-005, T-548, T-552, T-553, T-554
```

## Covered screenshot uses

```text
IU-001, IU-002, IU-135, IU-136, IU-137
```

## Audit note

Every listed text element and screenshot placement is closed in the final ledgers.
The complete SVG and extracted screenshots remain authoritative for exact code punctuation.
