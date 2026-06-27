# WebSockets recovered-screenshot semantic refresh v003

## Purpose

The original transcript was based on 21 screenshots because the first SVG export omitted most screenshot assets. The corrected `websockets(1).svg` restored 186 screenshots, producing a 207-screenshot authoritative source.

## Result

```text
original screenshot coverage: 21
recovered screenshots: 186
corrected screenshot coverage: 207
canvas labels: 53
semantic review completed: 207 / 207
remaining: 0
```

## Superseding transcript

```text
regions/R01R02R03-websockets-corrected-final-v003.md
```

The earlier transcript remains preserved for history:

```text
regions/R01R02R03-websockets-final.md
```

The corrected transcript expands the previous summary with:

- complete fragmented-message handling;
- UTF-8 boundary considerations;
- maximum logical message size;
- browser and React lifecycle patterns;
- close-code and close-reason constraints;
- ClientWebSocket option categories;
- one-send/one-receive concurrency rules;
- channel-based serialized sends and bounded backpressure;
- subprotocol negotiation;
- handshake headers versus message metadata;
- per-message compression trade-offs;
- browser `bufferedAmount` high/low watermark policy;
- application acknowledgements;
- cookie and JWT upgrade authentication;
- query-token handling;
- Origin validation and the difference from CORS;
- protected endpoint ordering;
- reconnect, diagnostics and production checklist.
