# Regions - processing-data-as-stream-httpclient-endpoint-browser-websockets

Boundary-reviewed candidate regions:

```text
PDS01: ASP.NET endpoint request-body Stream reading and stream failure behavior
PDS02: Browser fetch/WebSocket message chunks and UTF-8 decoding
PDS03: HttpClient streaming response and chunk-by-chunk processing
PDS04: System.IO.Pipelines PipeReader/PipeWriter and SequenceReader
```

Recommended transcript order:

```text
NEXT01: PDS01 + PDS03 = 10 image uses
NEXT02: PDS02 = 6 image uses
NEXT03: PDS04 = 7 image uses
```

Each transcript must include:

```text
## 0.1 Area overview / key ideas / reading quality
## 0.2 Coverage / boundary review
```
