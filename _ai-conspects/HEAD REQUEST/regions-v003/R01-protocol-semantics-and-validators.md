# R01 — Protocol semantics and validators

Generated: 2026-07-03

## S-009 — Plain-language HEAD semantics

### Near-literal normalized source

The source says that HEAD is like GET without a response body, returns corresponding status/headers, and can be implemented explicitly for expensive GET operations.

### Study meaning

The protocol overview is broadly correct: HEAD selects the same representation and returns metadata without content.

### Correction / boundary

More precisely: the server must not send content; it should send the same headers as GET; it may omit fields whose values are known only while generating content. The automatic GET fallback claim is removed.

### Recall questions

1. What HEAD rule is mandatory?
2. Which header behavior is a SHOULD?
3. Which fields may be omitted?
4. What ASP.NET Core claim is removed?


---

## S-001 — HEAD, ETag, and metadata-only flow

### Near-literal normalized source

Typical source flow:

1. Client sends:

```http
HEAD /documents/5
If-None-Match: "<etag>"
```

2. Server queries only version metadata, computes ETag, and returns:

- `304 Not Modified` when the validator matches;
- otherwise `200 OK` for HEAD with ETag and no body.

3. Client decides whether to issue GET.

### Study meaning

A metadata-only HEAD endpoint can avoid loading and serializing a large representation.

### Correction / boundary

Conditional HEAD is valid, but conditional GET is usually better for cache revalidation because a changed resource can be returned immediately instead of requiring HEAD followed by GET.

### Recall questions

1. What does HEAD omit?
2. Which metadata is needed to compute the ETag?
3. When is 304 returned?
4. Why is conditional GET usually better for revalidation?


---

## S-002 — Content-Length and representation size

### Near-literal normalized source

The source explains that exact JSON length is usually unknown without serializing the complete response.

Computing the exact size can defeat the metadata-only optimization. Therefore omitting Content-Length is acceptable when exact GET length is not cheaply known.

### Study meaning

HEAD may include Content-Length only as metadata about the actual GET representation.

### Correction / boundary

An estimate is invalid. The value must equal the exact number of octets that GET would have sent.

### Recall questions

1. Why is an estimate invalid?
2. When may Content-Length be included?
3. Why can exact calculation defeat the optimization?
4. What should HEAD do when exact length is unavailable?


---

## S-003 — Cheap metadata projection

### Near-literal normalized source

Candidate metadata:

- SQL Server rowversion;
- UpdatedAt;
- ID plus version;
- Content-Type;
- exact Content-Length when available.

A metadata query can return only:

```text
Id, RowVersion
```

and still support 404, ETag creation, and conditional evaluation.

### Study meaning

The repository query should project only the values needed to reproduce GET validators and relevant metadata.

### Correction / boundary

UpdatedAt can have precision or rapid-update issues. The validator must change whenever the selected representation changes.

### Recall questions

1. Why is rowversion useful?
2. What weakness can UpdatedAt have?
3. Which metadata is enough for 404 and ETag?
4. What must make the validator change?


---

## S-004 — Explicit HEAD optimization notes

### Near-literal normalized source

The source recommends a cheaper metadata-only database call, setting Content-Length only when efficient, and returning ETag or Last-Modified without a body.

### Study meaning

An explicit HEAD action is useful when it measurably avoids GET work.

### Correction / boundary

HEAD and GET should share validator helpers so status and metadata cannot drift.

### Recall questions

1. What work should explicit HEAD avoid?
2. When should Content-Length be omitted?
3. Which validators can be returned?
4. Why share helpers with GET?
