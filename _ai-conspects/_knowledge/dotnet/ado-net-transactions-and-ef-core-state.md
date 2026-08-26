# ADO.NET transactions and EF Core connection state

Knowledge ID: `dotnet.ado-net-transactions-and-ef-core-state`

Topic: `dotnet`

Several operations succeed or fail together only when their commands share the same open connection and transaction. Begin the transaction, associate every command, commit after all succeed, or rollback and rethrow on failure; then dispose it. `System.Data.IsolationLevel` is the common ADO.NET isolation abstraction and is also accepted by relevant EF Core integration paths.

## Raw commands inside an EF Core transaction

EF and raw ADO.NET work can share one transaction:

```csharp
await using var efTx = await db.Database.BeginTransactionAsync();

db.Orders.Add(order);
await db.SaveChangesAsync();

var conn = db.Database.GetDbConnection();
var adoTx = efTx.GetDbTransaction();
await using var cmd = conn.CreateCommand();

cmd.Transaction = adoTx;
cmd.CommandText = "UPDATE Inventory SET Quantity = Quantity - 1 WHERE ProductId = @p0";
var p = cmd.CreateParameter();
p.ParameterName = "@p0";
p.Value = order.ProductId;
cmd.Parameters.Add(p);

await cmd.ExecuteNonQueryAsync();
await efTx.CommitAsync();
```

Using the same connection is not sufficient: assign `cmd.Transaction` explicitly.

## Ownership and reusable state

Application code that opens a connection must restore/close that state according to ownership, whether the connection was constructed directly or obtained from `Database.GetDbConnection()`. Do not dispose an externally owned object in a way that breaks its owner.

EF Core does not reset arbitrary driver/session state changed manually. Restore transaction association, manually opened state, provider settings/modes, and mutable context/connection state before reuse. This matters especially with `DbContext` pooling because the context instance may serve another request. DbContext pooling and ADO.NET connection pooling are separate mechanisms; both require state hygiene.

## What should be recallable

- Same-connection/same-transaction, commit/rollback/rethrow, disposal, and isolation-level rules.
- How to enlist a raw command in an EF Core transaction and why the shared connection alone is insufficient.
- Connection ownership and which manually changed state must be restored, especially with pooled contexts.

## Sources

- Workspace: `_ai-conspects/rawconnections,dbconnection,sqlconnection,commands/`
- Processed source: `04-detailed-near-literal-transcript-v002.md`, sections 15, 20–21
- Original SVG: `source/rawconnections,dbconnection,sqlconnection,commands.svg`
