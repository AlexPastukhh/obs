# HEAD REQUEST — repetition guide v003

## Decision table

| Need | Preferred request |
|---|---|
| existence or metadata only | HEAD |
| validate cached body and receive new body immediately when changed | conditional GET |
| avoid expensive representation generation | explicit metadata-only HEAD |
| exact byte length unavailable | omit Content-Length |

## Core questions

1. Why is conditional GET usually better than conditional HEAD?
2. When may HEAD include Content-Length?
3. Why is an estimate invalid?
4. Which comparison does If-None-Match use?
5. How is wildcard `*` handled?
6. Why is raw `Contains(etag)` wrong?
7. Why must GET and HEAD share validator logic?
8. Why can rowversion be preferable to UpdatedAt?
9. Why is `[HttpGet]` not an automatic HEAD route?
10. Which headers may be omitted on HEAD?
11. How do negotiated variants affect ETags?
12. What tests prove that HEAD sends no content?

## Coding exercises

1. Implement the corrected HEAD action.
2. Add the same validator logic to GET.
3. Encode a rowversion as an ETag.
4. Test multiple If-None-Match values.
5. Test weak tags and wildcard.
6. Verify 404, 200, and 304.
7. Verify exact Content-Length behavior.
8. Verify no body bytes are sent.
