# R02 - Multiple readers / batches / transactions / interleaving

Generated: 2026-06-20 08:05:01 UTC

With MARS enabled, multiple readers or batches can be active on one connection, but this does not mean unrestricted parallel execution.

Interleaving still follows SQL Server rules, and transactions can create surprising blocking or transaction-context issues.

This region covers multiple readers, batch interleaving, transaction concerns, and practical alternatives such as buffering or using separate connections.

