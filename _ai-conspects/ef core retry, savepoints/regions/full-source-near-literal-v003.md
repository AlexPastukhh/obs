# EF Core retries, transactions, savepoints, isolation, and pooling — source-preserving near-literal transcript

## Source identity

```text
uploaded source snapshot: ef core retry, savepoints(2).svg
SHA-256: c73ba05e069382d682f21b3ea949bf2cc13dbbadf253776a945df611590ebdad
Git blob verified in repository: 9b3d6771d614e3cd43757833206cda7da50fdab7
embedded image definitions: 76
image uses: 76
SVG text nodes: 56
```

## Transcription method and boundary

- One `S-XXX` block is retained for every embedded image use, in SVG use order.
- Text is transcribed at a near-literal level; spelling, whitespace, and punctuation are lightly normalized.
- Screenshot UI chrome, copy icons, language badges, and source-site footers are omitted.
- Prose blocks marked `high` were cleanly readable. Code/symbol-heavy blocks are marked `medium` and remain traceable to the exact embedded image hash.
- Interpretation is not substituted for visible source text.

## SVG canvas text nodes

- `T-001`: createexecutionstrategy
- `T-002`: sqlserver dbcontext
- `T-003`: retries
- `T-004`: configure retiries
- `T-005`: defaults, what start retrying after we
- `T-006`: configure
- `T-007`: what can retry without create execution strategy
- `T-008`: when exactly we need it
- `T-009`: [empty text node]
- `T-010`: pattern with createexecutionstrategy
- `T-011`: flows
- `T-012`: quick
- `T-013`: executeintransaction
- `T-014`: remember about automatic atomic retries
- `T-015`: savechanges(false)
- `T-016`: saveponts
- `T-017`: savepoints of savechanges
- `T-018`: you decide what to do on failed savechanges
- `T-019`: and failed savechanges doesnt call acceptallchanges
- `T-020`: ef core buffering
- `T-021`:  from retries
- `T-022`: is it app memory
- `T-023`: or db meory buffering
- `T-024`: what exaycly buffers?
- `T-025`: do we buffer the sql result?
- `T-026`: example of anyasync with retries
- `T-027`: so what if i dont want to have
- `T-028`: retries for specific query?
- `T-029`: pooling
- `T-030`: multiple dbcontexs
- `T-031`: pooling
- `T-032`: multiple db contexts
- `T-033`: and you want one transaction
- `T-034`: usetransaction
- `T-035`: Executeasync
- `T-036`: executeasync without transaction
- `T-037`: when just need to retry with some app
- `T-038`: logic like get current time
- `T-039`: !!! executeasync without transaction is possible when we dont have multiple
- `T-040`: writes and the state that we need to rollback
- `T-041`: savepoints are for transactions, not for just
- `T-042`: savechanges
- `T-043`: useful execution stratefy properties
- `T-044`: when we use execute (not in transaction)
- `T-045`: method
- `T-046`: and there is some ambigous outcome of
- `T-047`: the transaction
- `T-048`: [empty text node]
- `T-049`: by default - we will retry
- `T-050`: !!!
- `T-051`: isolation level
- `T-052`: in manual retries from same tranaction
- `T-053`: using savepoints cases
- `T-054`: in gen ef core have
- `T-055`: db error codes of sql server
- `T-056`: and about retries

## Source transcript

### S-001 — What it means

Source image SHA-256: `3bdbd1be00aa56f69a7133f781f56b9a06acc39d28bc3c0353f08d30feedef48`
Dimensions: `941 × 357`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
What it means:

- create the configured retry strategy for transient database failures
EF Core's connection resiliency docs say execution strategies automatically retry failed database commands
when failures are transient. Providers can supply provider-specific retry logic; SQL Server has one tailored for
SQL Server/Azure SQL.
This matters most when retries are enabled and you need a whole block of work to be retried as one unit,
especially when using your own transaction. EF docs say that with retrying execution strategies, user-initiated
transactions are not automatically supported unless you run the whole block through the execution strategy
returned by Database.CreateExecutionStrategy().
```

### S-002 — Typical pattern

Source image SHA-256: `0828abf261400db6ce8a133754d476ecad43b82b6726dbaad3db71081d862b78`
Dimensions: `993 × 503`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
Typical pattern:
var strategy = context.Database.CreateExecutionStrategy();
await strategy.ExecuteAsync(async() =>
await using var tx = await context.Database.BeginTransactionAsync();
await context.SaveChangesAsync();
await tx.CommitAsync();
Why:
- each DB operation can be retried
- if you want several operations plus a transaction to behave as one retriable unit, the strategy needs to
own the whole block
```

### S-003 — CreateExecutionStrategy() — what it is

Source image SHA-256: `0643b0617a6a0fb20051e069b23ee0fead9d35f69c97ef190b701a93ece37e95`
Dimensions: `951 × 374`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
3) CreateExecutionStrategy() — what it is
An execution strategy is EF Core's retry policy for transient failures like temporary network drops or brief
SQL availability hiccups. SQL Server's provider has a built-in retrying strategy tailored for SQL Server/Azure
SQL Database.CreateExecutionStrategy() gives you the strategy currently configured for that DbContext.
Think of it like this:
- no retry strategy configured — EF just runs your DB operation once
- retry strategy configured —> EF may retry certain failed operations automatically
- CreateExecutionStrategy() — gives you that configured retry policy so you can run a whole block as
one retriable unit.
```

### S-004 — 3a) Can | configure it somehow?

Source image SHA-256: `6221c10c2da1e8397cad625f2d4c913d8b7f10141fc2a156f97eb0c1d3e13feb`
Dimensions: `956 × 430`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
3a) Can | configure it somehow?
Yes. For SQL Server, the usual way is EnableRetry0nFailure() when you configure the context.
documents overloads where you can use defaults, change max retry count, change max delay, and add extra
SQL error numbers considered transient. The SQL Server strategy is preconfigured with known transient SQL
error numbers. _
Basic:
builder.Services.AddDbContext<AppDbContext>(options =>
options.UseSqlServer(
connectionString,
sql => sql.EnableRetryOnFailure()));
```

### S-005 — Custom

Source image SHA-256: `ef26f1b7a57f2c45b6ce0ed24cd75d0ec387d98d5a4320d73676d8254bee4c84`
Dimensions: `979 × 431`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
Custom:
builder.Services.AddDbContext<AppDbContext>(options =>
options.UseSqlServer(
connectionString,
sql => sql-EnableRetryOnFailure(
maxRetryCount: 10,
maxRetryDelay: TimeSpan.FromSeconds(30),
errorNumbersToAdd: null)));
That is the standard "tur retries on" switch for SQL Server EF Core apps.
You can also register a custom execution strategy if you need behavior beyond the defaults. EF Core's
connection resiliency docs explicitly mention a mechanism for a custom strategy.
```

### S-006 — 3b) What are the defaults? What is automatic, and when?

Source image SHA-256: `1715a9bf6f9877c45402980475b48aa15c7e38dd0a2003c1782661c3b0b37ea8`
Dimensions: `943 × 649`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
3b) What are the defaults? What is automatic, and when?
For SQL Server, EnableRetryOnFailure() configures the default retrying IExecutionStrategy.
says the default values are 6 maximum retries and 30 seconds maximum delay, and the strategy already
knows common transient SQL Server error numbers. — Mosor team
When retries are enabled, EF Core automatically makes each individual operation its own retriable unit.
: each query and each call to 'SaveChanges() is retried as a unit if a transient
failure occurs.
So after enabling retries, this gets automatic retry behavior:
var customer = await context.Customers.SingleAsync(c => c-Id == id);
customer.Name = "New Name";
await context.SaveChangesAsync();
Here:
- the singleAsync query is retriable as one unit
- the SaveChangesAsync call is retriable as one unit
One more important default effect: enabling retry-on-failure causes EF to internally buffer result sets, which
can increase memory use for large queries.
```

### S-007 — 3d) If | do not wrap with CreateExecutionStrategy(), what retries still happen?

Source image SHA-256: `4151ffb352980d1326073c8260f27c369b4ba5bc15447aeb2ca38ad954b21190`
Dimensions: `942 × 551`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
3d) If | do not wrap with CreateExecutionStrategy(), what retries still happen?
If retries are enabled and you are not using your own explicit transaction, EF retries each operation
separately. That means:
- one query can retry
- one SaveChanges() can retry
- another later query can retry
but each is retried independently as its own unit.
Example:
var a = await context.Users.CountAsync(); // retriable unit #1
var b = await context.Orders.CountAsync(); // retriable unit #2
await context.SaveChangesAsync(); // vetriable unit #3
Each call can be retried on its own if retries are enabled. But EF is not treating all three lines as one atomic
retriable block.
```

### S-008 — 3e) What changes when | start my own transaction?

Source image SHA-256: `a3e81403e35c861e6d09fec3b97cfb5870522600167aea21ec17a287f6179d4b`
Dimensions: `994 × 589`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
3e) What changes when | start my own transaction?
If your code calls BeginTransaction() / BeginTransactionAsync(), you are defining a larger unit of work. EF
can no longer safely retry each inner operation independently, because a retry may need to replay the entire
transaction block, not just one statement. enabled and you try to use a
user-initiated transaction directly, you get an exception telling you to use
DbContext. Database.CreateExecutionStrategy() -
So this is the problematic shape:
await using var tx = await context.Database.BeginTransactionAsync();
var user = await context.Users.SingleAsync(x => x.Id == id);
user.Name = "A";
await context.SaveChangesAsync();
await tx.CommitAsync();
With retry strategy enabled, EF does not just magically replay that whole block for you. That is why the docs
tell you to wrap it in the execution strategy. _wicesofLeam «
```

### S-009 — Correct pattern

Source image SHA-256: `db68c89094c4ffc8a51400718767b5081baf83fc746eb35fdae18c9fe619dc79`
Dimensions: `996 × 481`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
Correct pattern:
var strategy = context.Database.CreateExecutionStrategy();
await strategy.ExecuteAsync(async() =>
await using var tx = await context.Database.BeginTransactionAsync();
var user = await context.Users.SingleAsync(x => x.Id == id);
user.Name = "A";
await context.SaveChangesAsync();
await tx.CommitAsync();
Now the strategy can replay the whole delegate if a transient failure happens. —
```

### S-010 — Savepoints around SaveChanges

Source image SHA-256: `05559bc7183b5e495515b8178fc752b8a024b9cd6071a9fe59300138900fc3a4`
Dimensions: `925 × 438`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
1) Savepoints around SaveChanges
Ifa transaction is already open and you call 'SaveChanges, EF Core automatically creates a savepoint before
saving. If that 'SaveChanges fails, EF automatically rolls back to that savepoint, leaving the outer transaction
in the same state as before that save started. AutoSavepointsEnabled is true by default, and savepoints are
created only if the provider supports them. Micwsoftzam -
A failed saveChanges does not automatically roll back the whole transaction. It only rolls back the failed save
operation to the savepoint. You can then decide whether to:

- fix the problem and try again,

- continue with other logic,

- or roll back the whole transaction yourself. _Microsor team
```

### S-011 — SaveChanges #1

Source image SHA-256: `0cad8f6106ed2c7c6dbfad5df807806056ce524d2795bfe894164c92a4dc7f27`
Dimensions: `972 × 632`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
SaveChanges #1
EF creates savepoint S1
SaveChanges #2
EF creates savepoint S2
EF rolls back to S2
```

### S-012 — db.Orders.Add(new Order { Id = Guid.NewGuid() });

Source image SHA-256: `8078b23a49421c7d7c0eeeaecc33db258edf9a5dc1812662b37e780efb9f7f7a`
Dimensions: `917 × 405`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
await using var tx = await db.Database.BeginTransactionAsync();
db.Orders.Add(new Order { Id = Guid.NewGuid() });
await db.SaveChangesAsync(); // succeeds
db.OrderLines.Add(new OrderLine { OrderId = Guid.Empty }); // invalid FK, for example
await db.SaveChangesAsync(); // fails, EF rolls back to savepoint
await tx.CommitAsync();
```

### S-013 — catch

Source image SHA-256: `7bcc102ddd2b5828e0b9da33f09dca54d5d7b58a3bd7ee143b0ea6863c0b2deb`
Dimensions: `935 × 298`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
catch
// First SaveChanges is still inside transaction at this point
// second SaveChanges was rolled back to its savepoint
await tx.RollbackAsync(); // your decision
On SQL Server, EF does not create savepoints when MARS is enabled, so recovery after failure is worse in
that case.
```

### S-014 — SaveChanges(false) — when and why

Source image SHA-256: `5cc4212256a1336c5f4fdd316f1d850929c1b6eaa4bbdc1997069705d122df5a`
Dimensions: `899 × 276`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
3) SaveChanges(false) — when and why
SaveChanges(false) means:
- execute the database write,
- but do not call AcceptAllChanges() yet.
EF's connection-resiliency docs show this pattern specifically to avoid changing entity state to [Unchanged
too early. wizso Lean
```

### S-015 — You need it when

Source image SHA-256: `11ffb03c441c6f00d54f5875c56df5807953713f38f0b7de30a0baa236b8389f`
Dimensions: `929 × 395`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
You need it when:

- SaveChanges may already succeed,

- commit success is not yet safely known,

- and you may need to retry or recover using the same tracked changes in the current context.
If default SaveChanges() is used, EF accepts the changes right after successful save. If commit later fails or
becomes ambiguous, the context may already have forgotten that those changes were pending.
SaveChanges(false) preserves them until success is fully confirmed. — Micesoftteam

- Ifretry rebuilds the entire unit of work from scratch, SaveChanges(false) may be unnecessary.

- If retry/recovery depends on preserving current tracked state, use SaveChanges(false).
```

### S-016 — Tracked state is NOT accepted yet

Source image SHA-256: `a5ca88c5df4e616680eb50d5882bc59924b922f69d6f025bbb108a3a5d5fa16e`
Dimensions: `908 × 374`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
Tracked state is NOT accepted yet

If commit succeeds + AcceptAllChanges

If commit ambiguous/fails > verify / retry still possible with same tracked state
```

### S-017 — Example where false is useful

Source image SHA-256: `a6cf9199d9d005ed2febbb146d337afb73b269c79c5ae27cc5abb9ac74ce5b52`
Dimensions: `936 × 418`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
Example where false is useful
var blog = new Blog { BlogId = Guid.NewGuid(), Url = "https: //site" };
db. Blogs.Add(blog);
var strategy = db.Database.CreateExecutionStrategy();
await strategy. ExecuteInTransactionAsync(
db,
operation: (ctx, ct) => ctx.SaveChangesAsync(false, ct),
verifySucceeded: (ctx, ct) =>
ctx.Blogs.AsNoTracking()-AnyAsync(b => b.BlogId == blog-BlogId, ct));
db. ChangeTracker.AcceptAlChanges();
```

### S-018 — Here

Source image SHA-256: `b9d374e3c664f63b7991598e8d4075af012de367150a9a526060cc21da888158`
Dimensions: `905 × 153`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
Here:
- the blog was already tracked before the save,
- if commit becomes ambiguous, we still want that same tracked state available,
- so false is appropriate. cost tam «
```

### S-019 — Example where false may be unnecessary

Source image SHA-256: `6c8c93993a5a7ce8ccb1b1b3529580d9241446aabf95d8928eaac86b7fb9b0ba`
Dimensions: `913 × 485`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
Example where false may be unnecessary
var strategy = db.Database.CreateExecutionStrategy();
await strategy.ExecuteAsync(async() =>
await using var inner = new AppDbContext(...);
await using var tx = await inner.Database.BeginTransactionAsync();
inner.Blogs.Add(new Blog
BlogId = Guid.NewGuid(),
Url = "https: //site"
await inner.SaveChangesAsync(); // often fine here
await tx.CommitAsync();
```

### S-020 — Here the whole state is rebuilt inside the retried delegate. If retry happens, the delegate recr…

Source image SHA-256: `a449ba05a570eafdc0e497d1308c76eb90ded94e66fbb640403f61410bc6709b`
Dimensions: `958 × 129`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
Here the whole state is rebuilt inside the retried delegate. If retry happens, the delegate recreates the entity
and tracked state from scratch, so preserving old tracked state is less important. This is why false is not
universally required. The key issue is state preservation, not the helper method name. wisesot sam
```

### S-021 — ExecuteInTransactionAsync — overview

Source image SHA-256: `49d93faa70ef41387636a13668d06ac3234dc111cc1e28dd9e7a80361583db08`
Dimensions: `980 × 422`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
ExecuteInTransactionAsync — overview
ExecuteInTransactionAsync is an execution-strategy helper for running an operation inside a transaction
with retry support, plus an extra mechanism for the hard case where commit throws and the app cannot
tell whether the transaction actually committed. EF documents it as executing the operation in a
transaction and allowing a check whether the transaction was rolled back if an error occurs during commit.
So it solves two commit-failure situations:
1. Commit failed clearly
It is clear the transaction did not commit.
2. Commit failed ambiguously
The connection dropped during commit, so the app cannot tell whether the database committed or
rolled back. EF calls this the commit-failure/idempotency problem.
```

### S-022 — operation is the transactional unit of work that should be retried as one unit.

Source image SHA-256: `da236a9b348b2e16902675addb98706fa60ccec76d0fec2ea31f76b40b58d1b2`
Dimensions: `753 × 331`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
operation is the transactional unit of work that should be retried as one unit.
Usually that is:
- tracked changes already prepared in the context
- one SaveChangesAsync(...)
Sometimes it can be more than one database action, but conceptually it is:
"everything that belongs to this one transaction attempt."
```

### S-023 — Example shape

Source image SHA-256: `aaad0f4360c9848050df5f35b6ed81092124530ed81cee17602b922310763a68`
Dimensions: `921 × 310`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
Example shape:

var strategy = db.Database.CreateExecutionStrategy();
await strategy. ExecuteInTransactionAsync(

db,

operation: (ctx, ct) => ctx.SaveChangesAsync(false, ct),

verifySucceeded: (ctx, ct) =>

ctx. Blogs -AsNoTracking().AnyAsync(b => b.BlogId == blogid, ct));
```

### S-024 — 3 possible outcomes

Source image SHA-256: `b547b2d00fd2a00a906279708ab500c8c573066d2430ce37d0a270b07ad1af41`
Dimensions: `939 × 467`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
3 possible outcomes:
A. commit succeeds
B. commit fails clearly
C. commit fails ambiguously
```

### S-025 — Flow A: commit succeeds normally

Source image SHA-256: `53f12619b04415c286e20950989bc4e94d9a9e78df79c5a7244510903b7cca2d`
Dimensions: `917 × 315`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
Flow A: commit succeeds normally

Method completes successfully

You can call AcceptAllChanges if you used SaveChanges(false)
```

### S-026 — verifySucceeded is not needed here.

Source image SHA-256: `a18cca1d6b395bb638cc3ba0da5c9ab5357e36585b1a4d8e43ddbc83e77f0f2a`
Dimensions: `935 × 532`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
- verifySucceeded is not needed here.
- Normal success path.
Example:
var strategy = db.Database.CreateExecutionStrategy();
db.Blogs.Add(new Blog { BlogId = blogId, Url = url });
await strategy. ExecuteInTransactionAsync(
db,
operation: (ctx, ct) => ctx.SaveChangesAsync(false, ct),
verifySucceeded: (ctx, ct) =>
ctx. Blogs -AsNoTracking().AnyAsync(b => b.BlogId == blogid, ct));
db. ChangeTracker.AcceptAlChanges();
If commit succeeds cleanly:
```

### S-027 — If commit succeeds cleanly

Source image SHA-256: `f25de6377af4c55eb1997f4b51663bc5aa94db94ebc377e8e12d75af2c0c2ea5`
Dimensions: `836 × 208`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
If commit succeeds cleanly:
- operation ran
- transaction committed
- method returns
- then you finalize tracked state with AcceptAllChanges() -
```

### S-028 — Flow B: commit fails clearly, not ambiguous

Source image SHA-256: `adaf12b9b2c7d4104594f9bff8a4d6b2016bff6d1e20546f2e119fefc87a5c62`
Dimensions: `916 × 555`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
Flow B: commit fails clearly, not ambiguous
This is the variation you asked for.
Example idea:
- database returns an error in a way that clearly means commit did not happen
- or transaction is known to have rolled back
Failure is clear: transaction did NOT commit
Execution strategy can retry the whole operation
If retries exhausted > exception bubbles out Lb
```

### S-029 — In this case, there is no ambiguity about whether the DB committed. So verifySucceeded is not re…

Source image SHA-256: `c227d80b28609c2e75e23997adf7c0a4e9d21dd0b15daea0f0a221f4df6c718e`
Dimensions: `924 × 370`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
In this case, there is no ambiguity about whether the DB committed. So verifySucceeded is not really the
key thing here. The strategy can just treat the attempt as failed and retry the whole operation according to
the retry policy. That follows the general execution-strategy model where the delegate is the retriable unit.
Why this is simpler than ambiguous commit
Because EF does not have to ask:

- "did it maybe commit?"

- "should | avoid replaying because it already succeeded?"
It already knows the answer: it failed.
```

### S-030 — Flow C: commit fails ambiguously

Source image SHA-256: `d86a04a1057453f479a30da072fa7246e9d8d871bfa48668b8025d7680a3225e`
Dimensions: `886 × 490`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
Flow C: commit fails ambiguously
This is the special hard case.
Commit throws transient error / connection lost
Outcome is unknown:
If verifySucceeded == true
If verifySucceeded == false
```

### S-031 — This is exactly the scenario \verifySucceeded is for. EF's resiliency docs explain that if the c…

Source image SHA-256: `22eb345e213fbf271b69b3d48d4515664b17d2128bd9fec6acb92548f298ce5a`
Dimensions: `985 × 117`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
This is exactly the scenario \verifySucceeded is for. EF's resiliency docs explain that if the connection drops
during commit, the final state may be unknown, and verification is needed to decide whether retry is safe.
```

### S-032 — So when is verifySucceeded used?

Source image SHA-256: `7c3de4a2a6e997e9cb82e5d1abf960feee51ecff251cb54b651d0cda88b72408`
Dimensions: `970 × 306`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
So when is verifySucceeded used?
Best notes version:
- Commit succeeds — no verification needed.
- Commit fails clearly — treat as failed, retry may happen.
- Commit fails ambiguously ~ run verifySucceeded to determine whether the operation actually
succeeded.
So \verifySucceeded is not a general callback for every failure. It is for the ambiguous-commit problem.
```

### S-033 — Compact example with all meanings

Source image SHA-256: `89202804ee5ff3cdd123388adeb8373680a342b3525fffc80d3cbeeda5468912`
Dimensions: `940 × 481`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
Compact example with all meanings
var strategy = db.Database.CreateExecutionStrategy();
var blogld = Guid.NewGuid();
db.Blogs.Add(new Blog { BlogId = blogId, Url = url });
await strategy. ExecuteInTransactionAsync(
db,
operation: (ctx, ct) =>
ctx. SaveChangesAsync(false, ct),
verifySucceeded: (ctx, ct) =>
ctx. Blogs. AsNoTracking()
-AnyAsync(b => b.BlogId == blogId, ct));
db. ChangeTracker.AcceptAl1Changes();
```

### S-034 — operation = "try to save this unit of work"

Source image SHA-256: `4f0497f46bcdc755819058fc3f67874bcd525134dcda2d1567b481fc6e5f864b`
Dimensions: `778 × 270`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
- operation = "try to save this unit of work"
- if commit succeeds — done
- if commit clearly fails — retry the operation
- if commit outcome is unclear > check DB with verifySucceeded
- row exists — treat as success
- row does not exist = retry operation
```

### S-035 — Retry buffering: what happens and where it matters

Source image SHA-256: `fa1574412e089a0699d42e0316542751afdf7d579af9ae39c210c3e0d7d1b7bb`
Dimensions: `942 × 501`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
1) Retry buffering: what happens and where it matters
With retries enabled, EF may buffer the entire result set internally so that if the query must be retried, EF can
still produce consistent results. That means the "streaming vs buffering" distinction in your code is no longer
the whole story: even a streaming-looking query can still be internally buffered by EF. microsor team
Flow: AsAsyncEnumerable() / await foreach without retries
EF materializes one row / object
```

### S-036 — Memory profile

Source image SHA-256: `d3bb300f412abcccee315739c032ee4abb65c567ffcec487f3dd503eeb17832d`
Dimensions: `928 × 488`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
Memory profile:
- usually roughly flat
+ only a small number of rows / objects are in memory at a time
- good when the result set is large and you truly want streaming. EF's performance docs describe this as
fixed-memory behavior for streaming evaluation. wicesor tam
Example:
await foreach(var post in context.Posts
.Where(p => p.Title.StartsWith("A"))
-AsAsyncEnumerable())
Process(post) 5
If retries are not enabled, this is close to true streaming.
```

### S-037 — Flow: AsAsyncEnumerable() / await foreach with retries enabled

Source image SHA-256: `20791c290d5dbb92406a54af1ae10c4e2b0316b4462ffccecf367bc1d1970013`
Dimensions: `922 × 527`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
Flow: AsAsyncEnumerable() / await foreach with retries enabled
Entire result set is held in memory
EF starts yielding rows to your loop
Memory profile:
- memory grows with result size
- if 100,000 rows come back, EF may hold many or all of them before your loop sees them
- your code still looks streaming, but EF's internal buffering changes the real memory behavior. EF
explicitly warns that enabling a retrying execution strategy causes internal buffering. —
So yes, 'await foreach is an important example, but the retry-buffering issue is broader than that.
```

### S-038 — Another example not about "object streaming"

Source image SHA-256: `934f86c05345cec5c0099596b51ecb1d49181fab0c5786d2f3bbb8a732d0dda6`
Dimensions: `934 × 451`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
Another example not about "object streaming"
Agood non- await foreach example is doing a projection and then buffering into an array or list.
var titles = await context.Posts
.Where(p => p.Title.StartswWith("A"))
-Select(p => p-Title)
-ToArrayAsync();
This is not about object-by-object streaming at all. ToArrayAsync() already means "load everything." If
retries are enabled, EF may first internally buffer the result set for retry support, and then [ToArrayAsync()
buffers it again into your final array. EF docs say exactly this for ToList: the result can be loaded into
memory twice, once internally by EF and once by the buffering operator. The same reasoning applies to
similar terminal buffering operators. wicrsoftieam
```

### S-039 — Flow for ToListAsync() / ToArrayAsync() without retries

Source image SHA-256: `dcb511026bc8002bdbd0c523aa367ed1587fa1810fdc3ab9cdb3e655657af82a`
Dimensions: `900 × 451`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
Flow for ToListAsync() / ToArrayAsync() without retries
Rows are appended into List/Array result
Memory profile:
- one main full in-memory copy for your final collection
- expected, because ToListAsync() / ToArrayAsync() is a buffering API. EF's docs classify these as
buffering operators.
```

### S-040 — Flow for ToListAsync() with retries enabled

Source image SHA-256: `eb16e70ac0c16dffc12ed9557d90179a1c39e41ffdd61608a7c4625d2f5b27f9`
Dimensions: `940 × 464`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
Flow for ToListAsync() with retries enabled
EF buffers result set internally for retry support
EF materializes rows into your List
Memory profile:
- plus your final Listet>
- effectively "buffered twice." EF explicitly calls out this exact ToList case. micesttsan
```

### S-041 — What the ToListAsync() note means

Source image SHA-256: `63c90f1ca953f52825e69e3bdc91fa97a7dd44b1466b65b818b6e288baa3ad32`
Dimensions: `929 × 442`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
What the ToListAsync() note means
The note means:
.ToListAsync() already loads all rows into memory once
- retry support may force EF to keep another internal copy / buffered result shape
- so memory can be much larger than "just the list | asked for." —
Asimple mental model:
Without retries: QO
With retries:
DB rows > EF internal buffer > your List
That is why the docs warn about extra memory use. Mizosot tes
```

### S-042 — Yes — the buffering we're talking about is application-side memory in your EF/Core process, not …

Source image SHA-256: `0fea87ef03b9997c1e536b5acec0a7ba832058f12e0101220914bcafa370e3da`
Dimensions: `916 × 118`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
Yes — the buffering we're talking about is application-side memory in your EF/Core process, not "extra SOL
Server memory because EF decided to buffer." EF's docs describe this as EF loading resultsets into memory
internally on the client side. _wecoson team
```

### S-043 — AnyAsync / "is there at least one row?" case

Source image SHA-256: `ca0d7078f44201b50bf8fa988e4012b7027ae92305f8fab70598b016bf72b44d`
Dimensions: `953 × 422`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
1) AnyAsync / "is there at least one row?" case
If your code is just checking whether matching rows exist, EF typically translates that to an EXISTS -style
query on relational providers, so the database can answer with essentially one boolean result rather than
returning all matching rows. That means there is no large resultset to buffer in the first place. This is a very
different situation from enumerating many rows. _Miceoteam
Example:
var exists = await context.Posts
.Where(p => p.Title.StartswWith("A"))
-AnyAsync();
Possible SQL shape:
```

### S-044 — Possible SQL shape

Source image SHA-256: `d41618de635331ea5bef9c8ffc1e348aa735b62c49c50e97e994703cb3b27663`
Dimensions: `980 × 406`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
Possible SQL shape:
"> sal(ay
SELECT CASE
SELECT 1
WHERE [p].[Title] LIKE N'A%')
THEN CAST(1 AS bit)
The exact SQL can vary by provider/version, but the important thing is: the DB is asked for existence, not for
all rows. So memory usage in the app is tiny both with and without retries, because the result is just a scalar
boolean, not a large rowset. — Micesot tam
```

### S-045 — Flow for AnyAsync

Source image SHA-256: `f9e2d194236f07e9a8a1616a81d807242944fde48bd05c4ffbc3bf58e7cf670c`
Dimensions: `885 × 307`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
Flow for AnyAsync
Without retries:
App sends EXISTS-style query QO
DB returns one boolean-like result
EF materializes one scalar result
```

### S-046 — With retries enabled, EF can still apply its retry behavior, but there still isn't a large resul…

Source image SHA-256: `beed64e2b6e97d6b78d7526be285d4783e7fd6129a9e6855d9100c889fa44b46`
Dimensions: `916 × 293`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
With retries enabled, EF can still apply its retry behavior, but there still isn't a large resultset to internally
buffer. So practically, memory remains tiny because the result is just one scalar. The retry-buffering warning
matters mainly when a query returns many rows. Micesot ism
So for your "just check if there are some entities with some conditions" scenario:

- without retries/split query: tiny memory

+ with retries: still tiny, because the result is still basically one value

+ what is buffered: effectively just the scalar result, not many entities. — wicesot tam
```

### S-047 — Yes, you can have pooling with multiple DbContext types, but there is an important rule

Source image SHA-256: `597616ac4493bd8a291a3baa01422a935a8ba8ee7b98fa67ebd71e6e5ef64ae3`
Dimensions: `955 × 412`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
Yes, you can have pooling with multiple DbContext types, but there is an important rule:
Pooling is for reusing a context with one fixed EF configuration. You can safely replace request-specific
state like 'TenantId, but you generally should not replace the core EF configuration of a pooled context after
it comes from the pool. In pooled contexts, (OnConfiguring runs only once when the instance is first created,
so it is not the place for per-request changes. _micesot am
What counts as "configuration" here:
- okay to vary per request: custom mutable fields/properties such as TenantId
- not okay to vary on the same pooled context instance: provider choice, most options built into
DbContextOptions, and anything you expected OnConfiguring to recompute each request. Each
DbContext instance uses one provider, and pooled instances are reused with that setup. micesor tem ~
4\ Tun Aifferant NhCantavi -laccoc
```

### S-048 — Two different DbContext classes

Source image SHA-256: `7797f019c0b90642187f7eb3f276136081e22f505453613c51ed31edaec55e10`
Dimensions: `937 × 412`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
1) Two different DbContext classes
This is the easy case, and it works well with pooling.
builder Services. AddPooledDbContextFactory<ReadDbContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("ReadDb")));
builder Services. AddPooledDbContextFactory<writeDbContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("WriteDb")));
Each context type gets its own pool and its own fixed configuration. That is a normal and safe setup. The
configuration for ReadDbContext stays with that pool; the configuration for WriteDbContext stays with its
Pool,
```

### S-049 — Same DbContext type, but two fixed configurations

Source image SHA-256: `e3597e515b64ad31950344127961165da001e02c096aac8f7d190573dd644025`
Dimensions: `969 × 588`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
2) Same DbContext type, but two fixed configurations
Also possible, but usually you should register two separate factories/services, each with its own options,
instead of trying to mutate one pooled context after checkout.
Conceptually:
builder.Services.AddPooledDbContextFactory<AppDbContext>("tenantA", options =>
options.UseSqlServer(connA)); // pseudo-shape only
builder.Services.AddPooledDbContextFactory<AppDbContext>("tenantB", options =>
options.UseSqlServer(connB));
In real code, because DI registration names are awkward in default ASP.NET Core DI, people often use one of
these patterns instead:
- two different DbContext subclasses
- two wrapper factories, each wrapping a differently configured pooled factory
- no pooling for the dynamic case
The main idea is: one pool per stable configuration.
```

### S-050 — Can you replace the connection string too?

Source image SHA-256: `e537d4c477269c69ee8b91525efda330925011e601aab6fb4e8a6b798ae0504e`
Dimensions: `899 × 295`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
3) Can you replace the connection string too?

For a pooled context, not by rebuilding the EF options each request. The docs are explicit that

OnConFiguring only runs once for a pooled instance, so per-request configuration does not belong there.

For multi-tenancy with different databases per tenant, is usually

implemented by using a different connection string per tenant. _ wicrosof team

But with pooling, you need extra care. The safer choices are:
```

### S-051 — IDbContextFactory<AppDbContext> pooledFactory,

Source image SHA-256: `86b81a68ecd51375a57f8bec27a27664eac6a8b0cb9f6aa0d289a0f09b4f0c48`
Dimensions: `836 × 506`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
public sealed class AppDbContextScopedFactory: IDbContextFactory<AppDbContext>
private readonly IDbContextFactory<AppDbContext> _pooledFactory;
private readonly ITenant? _tenant;
public AppDbContextScopedFactory(
IDbContextFactory<AppDbContext> pooledFactory,
ITenant? tenant)
_pooledFactory = pooledFactory;
_tenant = tenant;
public AppDbContext CreateDbContext()
var context = _pooledFactory.CreateDbContext();
context.TenantId = _tenant?.TenantId ?? -1;
return context;
```

### S-052 — So if the pooled context already had an old TenantId, do we just replace it?

Source image SHA-256: `9664190dabf89fa3ec7d4f41826cdfd92be75280bfefb206683f6f79b826ede4`
Dimensions: `860 × 103`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
So if the pooled context already had an old TenantId, do we just replace it?
Yes. That is the intent.
```

### S-053 — Can you apply retries only to some specific calls?

Source image SHA-256: `fa143a9e6fbe58e2b5967f0d1a4cf94dfdfe5d86ddbfbb1205ae119b28e78b65`
Dimensions: `951 × 397`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
Can you apply retries only to some specific calls?
Not in the common "same context, same query API, just one query flag" sense.
Retries are configured through the provider options / execution strategy for the context. So if you want
retries only for some operations, the normal design is:

- AppDbContext with retry strategy enabled

- StreamingDbContext or another options setup without retry strategy
or manually choose a different configured context for the sensitive operation. EF docs show execution
strategy being specified when configuring the context options, not per query. Microsotttsam -
You can also register a custom execution strategy, but that is still a context/provider configuration choice,
not a casual per-query toggle. icosot eam
```

### S-054 — Can you use both in one logical operation?

Source image SHA-256: `a4c7dab01f904d3748730db2dec33cc128bc800045c2a562d63abd8eb0b3d89d`
Dimensions: `1002 × 585`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
Can you use both in one logical operation?
Yes, but only carefully.
If both contexts point to the same relational database, they can share the same DbConnection and
DbTransaction, and you can enlist both with UseTransaction(...). EF Core documents this exact pattern
for sharing a transaction across multiple contexts. wiosoft tam
If both contexts are enlisted in the same database transaction:
- one commit commits both
- one rollback rolls back both
So yes, if one side fails and you roll back that shared transaction, both contexts' database work is rolled back
together. —wicxosottisam
This is for the same relational database / same underlying connection/transaction family.
If the two contexts are for different databases, then this is no longer the simple shared-transaction case.
```

### S-055 — Example 1: no explicit transaction, but you want one logical retry block

Source image SHA-256: `62a882c35f9c60f05c496c4e55e0f8987b329e49fa01950551c96f200110226e`
Dimensions: `953 × 193`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
Example 1: no explicit transaction, but you want one logical retry block
Suppose your method does:

1. read current user

2. call some app logic based on that data

3. save changes
```

### S-056 — You may want transient failure to replay the whole sequence, not just whichever individual DB ca…

Source image SHA-256: `1cb9c9d62780c1b93f225c9cadcd93046b279038f9d19a25e8962dfc5fb823d5`
Dimensions: `1024 × 489`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
You may want transient failure to replay the whole sequence, not just whichever individual DB call failed.
public async Task TouchUserAsync(Guid userId, CancellationToken ct = default)

var strategy = _db.Database.CreateExecutionStrategy();
await strategy.ExecuteAsync(async() =>
var user = await _db.Users.SingleAsync(x => x.Id == userId, ct);
user.LastSeenUtc = DateTime.UtcNow;
user.VisitCount++;
await _db.SaveChangesAsync(ct);
No explicit transaction here.
```

### S-057 — What is the point?

Source image SHA-256: `54dab5c0ad14ae07218a752d9de847d86cfb34db2ce887edc1a6390f5ad945bf`
Dimensions: `1049 × 179`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
What is the point?

Ifa transient failure happens during this block, EF retries the whole delegate. So the read + update + save

are treated as one retriable unit in your application logic, even though there is no explicit Begintransaction -
leammicrosofc.
```

### S-058 — If your entity is already being tracked before the delegate, and you just mutate a property outs…

Source image SHA-256: `8223eb3de3177147d3fb8b82cb0db9380dc67a880bcfe4174f394218c5c326d2`
Dimensions: `1005 × 170`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
If your entity is already being tracked before the delegate, and you just mutate a property outside vs. inside,
be careful about state accumulation across retries. The cleanest patter is often to create a fresh context /
fresh entity state inside the retried delegate, which is also how tegy
transaction example.
```

### S-059 — is this about the case when i do something like add 1 or minus 1 and its

Source image SHA-256: `dd2e473fe204c52030997987c0c704b0fd442df1a5f2acc3106e09d6b6d21548`
Dimensions: `964 × 425`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
is this about the case when i do something like add 1 or minus 1 and its
in the retriable delegate?
Ayman va npotaxennn 5s
Yes — exactly that kind of case.
If the retried delegate mutates already-tracked state like:
entity-Count += 1;
then a retry can apply that mutation again on the same in-memory entity, which can give the wrong value.
```

### S-060 — What each of those properties is good for

Source image SHA-256: `b250a2e44a18436a7d75b807088d74a5a5318a66c13f4fe24a9c311659caa0a6`
Dimensions: `947 × 393`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
What each of those properties is good for

MaxRetryCount: how many retry attempts the concrete strategy allows. Helpful when you want to inspect or
log the configured policy. arson tem -

NaxRetryDelay: the upper bound for delay between retries. Helpful when you want to understand worst-
case retry latency. microsot team «

ExceptionsEncountered: the exceptions that have caused retries so far. Helpful for logging after a retrying
operation fails or succeeds after retries.

AdditionalErrorNumbers: extra SQL Server error numbers you want treated as transient in addition to the
built-in set. This is SQL Server-specific.
A realistic diagnostics example:
```

### S-061 — A realistic diagnostics example

Source image SHA-256: `605247d5c2d2f80db0f4cdabf9104675521f59dfa6c9dfb33b47e3326b359def`
Dimensions: `951 × 333`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
A realistic diagnostics example:
var strategy = db.Database.CreateExecutionStrategy();
await strategy.ExecuteAsync(async() =>
db.Payments.Add(new Payment { OrderId = 123, Amount = 50m });
await db.SaveChangesAsync();
```

### S-062 — catch(Exception ex) when(strategy is SqlServerRetryingExecutionStrategy sqlStrategy)

Source image SHA-256: `00bd345ba5834c8cc8550241e75c16fc89251e68d90600f37824b8a7b3340079`
Dimensions: `977 × 419`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
catch(Exception ex) when(strategy is SqlServerRetryingExecutionStrategy sqlStrategy)
logger. LogError(ex,
"Operation failed after retries. MaxRetryCount={MaxRetryCount}, MaxRetryDelay={MaxRetr:
sqlStrategy MaxRetryCount,
sqlStrategy MaxRetryDelay,
sqlStrategy.ExceptionsEncountered.Count);
foreach(var seen in sqlStrategy.ExceptionsEncountered)
logger.LogWarning(seen, "Retried exception encountered.");
throw;
3 Vv
? »
```

### S-063 — Savepoint retry and execution-strategy retry are different things

Source image SHA-256: `244f51c8659bbc869261a54b9ac2f19abd30c0f9f89700e60702e14bef91abc8`
Dimensions: `962 × 411`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
3) Savepoint retry and execution-strategy retry are different things
Inside a manual transaction, EF can create a savepoint before SaveChanges and roll back to it on failure
when supported. That is about keeping the transaction alive after a failed save. But execution-strategy retry
is about replaying a failed operation or whole transaction block after a transient infrastructure error. Those
are related, but they are not the same mechanism.
So:

- Execution strategy retry = "rerun the operation / delegate"

- Savepoint rollback = "move the current transaction back to an earlier internal checkpoint"

This distinction matters because isolation level mostly changes whether staying inside the same transaction
after rollback is useful.
```

### S-064 — Where isolation level actually matters

Source image SHA-256: `9f7606f2a21ce617c1e53beacc9a8e4deda5ead173249cfbf967b0f37789be85`
Dimensions: `969 × 354`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
Where isolation level actually matters
The most useful question is:
After a failure, if | stay inside the same transaction and read again, can | see a new committed state that
makes retry worthwhile? — wicorot am
That is the right lens for deciding between:
+ retrying the whole transaction
+ retrying from a savepoint in the same transaction
- letting EnableRetryOnFailure replay the whole delegate. — icrsoftteam ~
```

### S-065 — Under SQL Server READ COMMITTED, data can change between statements in the same transaction. SQL

Source image SHA-256: `52bae106722632e224e09a5afd679438f07274243652df342de150f0098cfe19`
Dimensions: `918 × 358`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
Under SQL Server READ COMMITTED, data can change between statements in the same transaction. SQL
Server explicitly says nonrepeatable reads and phantoms can occur, and with READ_COMMITTED SNAPSHOT ON,
each statement sees a snapshot as of the start of that statement. icosot team
That means ReadCommitted is the best fit for "rollback to savepoint, re-read, and try again in the same
transaction", because a later statement may see fresher committed data than the earlier statement did.

So if you are doing manual business retry inside a transaction, ReadCommitted is the isolation level where

same-transaction retry most naturally makes sense. icosof Lssm
```

### S-066 — ReadCommitted with READ_COMMITTED_SNAPSHOT ON

Source image SHA-256: `fb06daf286a2b0c74879225f16798eec78c34f6eb353b6efff03e4058c2d1f81`
Dimensions: `929 × 273`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
ReadCommitted with READ_COMMITTED_SNAPSHOT ON
This is often even easier to reason about for retry purposes. SQL Server says each statement gets a
transactionally consistent view of the data as of the start of the statement, using row versioning instead of
shared locks for reads. _Mcrsot tem

So after a savepoint rollback, your next query can usually see a fresher committed version without holding
read locks the whole time. That makes it a very good environment for same-transaction re-read and retry
logic. sicwot team
```

### S-067 — This is the important contrast. Under SQL Server SNAPSHOT, statements in the transaction see dat…

Source image SHA-256: `537fa36b058fb8db12692da2f0204be181d8ee2931f06a2663bc5e69f8d13b9b`
Dimensions: `936 × 349`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
This is the important contrast. Under SQL Server SNAPSHOT, statements in the transaction see data as it
existed at the start of the transaction, not the start of each statement. Changes committed by other
transactions after your transaction started are not visible inside that same transaction.

So under Snapshot, a rollback to savepoint usually does not give you a meaningfully fresher view. You are
still inside the same transaction-start snapshot. If the reason for retry is "somebody else changed the row; |
need to re-read current state and try again', then retrying inside the same transaction is usually the wrong
move. Start a new transaction instead.

That is the clearest place where isolation level changes retry strategy.
```

### S-068 — SQL Server says REPEATABLE READ holds shared locks on data read until the transaction completes.…

Source image SHA-256: `6a170439e14ba8695db7ec70c88db48c07a478aa53988ea2c9d0aaa238b2e090`
Dimensions: `975 × 295`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
SQL Server says REPEATABLE READ holds shared locks on data read until the transaction completes. EF's
concurrency docs explain that on SQL Server this acts as pessimistic locking: once you read the row, another
updater is blocked until your transaction ends. Mcrosor team -
That means retrying from a savepoint in the same transaction is usually not the interesting pattern. You are
not getting a fresh view so much as preserving the same locked transactional context. In practice,
transactions at this level should be short, and if retry is needed, restart the transaction rather than trying to
do a clever same-transaction recovery loop. Micesottteam =
```

### S-069 — SERIALIZABLE is stricter again: SQL Server uses range locks and keeps them until transaction end…

Source image SHA-256: `d28d478b057a0cc58075b62834ae89a1a7e3371045edfa01e0055201e9e33a68`
Dimensions: `963 × 265`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
SERIALIZABLE is stricter again: SQL Server uses range locks and keeps them until transaction end, so
repeated statements read the same set of rows. That is great for correctness when you truly need it, but poor
for "recover and re-read inside the same transaction" patterns.

So under Serializable, the usual answer is also: if you need to retry because the transaction failed, retry
the whole transaction, not "from a savepoint hoping to see a fresher world". microsot team ~
```

### S-070 — Does EnableRetryOnFailure itself depend on isolation level?

Source image SHA-256: `4f758da135f12b93fa3656c8a8fe7594a22e225648c53e0df63c0c9905c62d27`
Dimensions: `965 × 529`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
Does EnableRetryOnFailure itself depend on isolation level?
Not directly.
The execution strategy decides whether to retry based on whether the exception looks transient. EF docs
describe it as retrying failed database commands and replaying the operation/delegate. The docs do net say
that retry eligibility is switched on or off by isolation level. wices team «
What isolation level changes is:
1. what your transaction can see on a retry, and
2. whether retrying inside the same transaction is meaningful. coon san -
So the right summary is:
- EnableRetryOnFailure is about transient-failure replay
- isolation level is about transaction semantics and visibility
- isolation level therefore affects retry strategy design, even if it does not directly toggle execution
strategy behavior. wisest team
```

### S-071 — Which failures belong to which retry mechanism?

Source image SHA-256: `2e0989615e25536e2edd4b2650b69421ea8ba6141c3c60a134eae4db0c83ee19`
Dimensions: `975 × 373`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
Which failures belong to which retry mechanism?

This part is where people often mix things up.

A) Transient connection / transport / service failures

Examples: dropped connection, temporary SQL Azure issue, transient timeout recognized by the provider.
Use: execution strategy(EnableRetryOnFailure, or CreateExecutionStrategy().ExecuteAsync(...) fora
manual transaction).

Typical retry unit: single operation, or entire delegate if you own the transaction. _

Isolation level matters only indirectly here. If the whole delegate is replayed, you get a brand-new
transaction anyway, so the old snapshot/locks are gone. ios tam -
```

### S-072 — B) Optimistic concurrency conflicts

Source image SHA-256: `d16506eb190b1be3e5d75d4b16670b2002dd52b6bbfc8f5bf78d68cfccef7c0a`
Dimensions: `957 × 360`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
B) Optimistic concurrency conflicts
Examples: (DbUpdateConcurrencyException, rowversion/token mismatch, someone else updated the row first.
Use: application-level conflict resolution, not execution-strategy transient retry. EF's concurrency docs say
the app must deal with it, possibly by retrying the entire operation on new data. wizesot sam
This is where isolation level matters a lot:

- under ReadCommitted / RCSI, you can choose same-transaction savepoint rollback + re-read + retry

- under Snapshot, usually restart a new transaction

- under RepeatableRead / Serializable, usually keep the transaction short and retry by starting over.
```

### S-073 — C) Commit-time unknown outcome

Source image SHA-256: `974639cf260f9199dad7d3e90463a3cd8b5aa2c3212af5e402385650695c2e3e`
Dimensions: `965 × 327`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
C) Commit-time unknown outcome

EF also warns about the special case where the connection drops during commit. Then the transaction
outcome is unknown: it may have committed, or it may have rolled back. By default, execution strategy
retries as though rollback happened, which can be dangerous for non-idempotent operations. EF
recommends patterns such as ExecuteInTransactionAsync(..., verifySucceeded:...) or explicit
transaction tracking. —wicrsoft team

This is not really a savepoint problem. Once commit is in play, you are beyond "retry from savepoint". The
safe retry unit is the whole operation, plus verification/idempotency handling.
```

### S-074 — Can you have RCSI with BeginTransaction in EF Core?

Source image SHA-256: `e974c94d816e4fc5430f06d448e6a6b64ab16a6caf201915ad578ca3e3f33c60`
Dimensions: `938 × 177`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
1) Can you have RCSI with BeginTransaction in EF Core?

Yes, indirectly.

In EF Core you can start a transaction with a System.Data. IsolationLevel, e.g. ReadCommitted,
Serializable, Snapshot.BeginTransactionAsync accepts an IsolationLevel.
```

### S-075 — But RCSI is not a separate per-transaction isolation level you pass from EF Core. In SQL Server,

Source image SHA-256: `0cc265f55dc559f4e6b8c35a8b48a718a8ebf50a9d276fe3c50c53d88ae63586`
Dimensions: `947 × 366`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
But RCSI is not a separate per-transaction isolation level you pass from EF Core. In SQL Server,
READ_COMMITTED SNAPSHOT is a database option. When that option is on, transactions running at READ
COMMITTED use row versioning for reads instead of shared read locks. teammicroso.c. -2
So with EF Core:

await using var tx =

await db.Database.BeginTransactionAsync(IsolationLevel.ReadCommitted);

If the SQL Server database has READ COMMITTED SNAPSHOT ON, that transaction's reads behave as RCSI. If it is
OFF, the same code gives you the classic lock-based READ COMMITTED.team
```

### S-076 — Is RCSI SQL Server only?

Source image SHA-256: `20ae65f925448b5c17ccd8df724ef8e61384c855d25d337bcf234d25759e74f4`
Dimensions: `951 × 389`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
Is RCSI SQL Server only?

READ_COMMITTED_SNAPSHOT is a SQL Server / Azure SQL-specific feature and setting. Other databases may
use MVCC or snapshot-like behavior by default, but that is not the same thing as SQL Server's
READ_COMMITTED_SNAPSHOT option. The SQL Server docs describe RCSI specifically as a SQL Server database
option.
So the practical answer is:

- EF Core can start a ReadCommitted transaction.

- Whether that behaves as RCSI depends on the SQL Server database setting, not on a special EF Core

flag.
```

## Closure

```text
image uses transcribed: 76 / 76
SVG text nodes indexed: 56 / 56
semantic-only regional summary used as authoritative transcript: no
source reconstruction required: no
```
