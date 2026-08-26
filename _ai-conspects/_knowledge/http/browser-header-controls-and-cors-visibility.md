# Browser-controlled headers and CORS visibility

Knowledge ID: `http.browser-header-controls-and-cors-visibility`

Topic: `http`

## Core model

Browser networking has distinct controls over which request headers application JavaScript may set and which response headers it may read. Seeing a field in developer tools does not prove that page JavaScript can access it.

`Origin` identifies the request origin as scheme, host, and port in relevant fetch/CORS scenarios. Treat it as allow-list input, not proof of user identity.

Cross-origin JavaScript can read safelisted response headers plus fields explicitly exposed by the server:

```http
Access-Control-Expose-Headers: X-Correlation-ID, ETag
```

Request-header permission and response-header visibility are different concerns.

## Browser-controlled request context

`Expect: 100-continue` allows a client to send headers first and wait for the server before transmitting a potentially large body. Browser JavaScript cannot set `Expect` freely because it is a forbidden request header; non-browser clients such as .NET may control it through their client stack.

`Referer` is the historically misspelled field carrying the referring address according to referrer and privacy policy. It may be reduced or absent and must not be trusted as authorization data.

## What should be recallable

- What distinction exists between sending request headers and reading response headers in a browser?
- How does `Access-Control-Expose-Headers` affect cross-origin script visibility?
- Why are developer-tools visibility and JavaScript visibility different?
- What does `Origin` identify, and why is it not identity proof?
- What are the roles and trust limitations of `Expect` and `Referer`?

## Sources

- Workspace: `_ai-conspects/headers/`
- Integrated source: `FINAL_TRANSCRIPT.md`, sections 2, 3, 5, and relevant rules in section 12
- Regional evidence: `regions/R01-location-origin-exposed-response-headers-and-cross-origin-visibility.md` and `regions/R02-expect-referer-authorization-and-www-authenticate-realm.md`
- Original SVG: `source/headers.svg`
