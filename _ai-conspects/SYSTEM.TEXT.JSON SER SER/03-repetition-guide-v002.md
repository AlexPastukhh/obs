# System.Text.Json — repetition guide v002

Generated: 2026-07-01

## Configuration map

| Scenario | Registration |
|---|---|
| MVC controllers | `AddControllers().AddJsonOptions(...)` |
| Minimal APIs | `ConfigureHttpJsonOptions(...)` |
| Content negotiation and media types | MVC options and input/output formatters |

## High-value questions

1. Why do controllers and Minimal APIs have separate configuration paths?
2. Which options affect output only, input only, or both?
3. Compare `WhenWritingNull` and `WhenWritingDefault`.
4. Why is `IgnoreNullValues` no longer the correct option?
5. How does `JsonStringEnumConverter` change the wire format?
6. Why can `IgnoreCycles` change payload shape?
7. What causes MVC to return HTTP 406?
8. How is `application/vnd.myapp+json` added for both request and response bodies?

## Coding prompts

1. Configure camelCase, enum strings, and null omission for controllers.
2. Apply the same three settings to Minimal APIs.
3. Enable indented JSON only in Development.
4. Register a vendor JSON media type for input and output.
5. Serialize `UserDto` with and without `WhenWritingNull`.
6. Explain why omitting `false` through `WhenWritingDefault` may be semantically dangerous.
