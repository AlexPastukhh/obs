# R03 — Raw DbConnection state, ADO.NET pooling and manual cleanup

## Boundary

This region covers raw `DbConnection` manipulation, EF reset boundaries, ADO.NET connection-pool lifetime, session-state leakage, and required manual cleanup.

## Verified transcript

When a pooled `DbContext` is returned, EF Core resets its own internal context state. It generally cannot guarantee cleanup of arbitrary state changed directly in the underlying provider connection or database session. If application code manually opens a connection, changes session state, starts provider-specific operations, or otherwise bypasses EF abstractions, that code owns the cleanup.

There are two distinct failure classes:

1. **Resource/lifetime leak:** a connection is opened and not closed/disposed, so the physical connection remains checked out longer than needed. Under load this can exhaust the provider pool and cause timeouts.
2. **Session-state leak:** a connection/session setting is changed and not restored. The same pooled physical connection may later serve another request with stale state.

Resetting session state does not remove the need to close/dispose. Closing/disposal returns the logical connection to the provider pool. Conversely, closing is not always proof that every provider-specific session setting was reset. The screenshots use SQL Server session context and transaction isolation level as concrete examples.

A safe rule is to let EF manage connection open/close in normal cases. When raw connection work is unavoidable, restore every manual change before the context is returned and close/dispose what application code opened. With pooling, “close” normally returns the physical connection for reuse; it does not necessarily destroy and recreate it.


## Source closure

- Verified image uses: 9
- Verified non-empty SVG text nodes: 15
- Missing: 0
- Unreviewed: 0
