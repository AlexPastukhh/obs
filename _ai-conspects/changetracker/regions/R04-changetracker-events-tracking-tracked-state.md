# R04 - ChangeTracker events / Tracking / Tracked / state changes

Generated: 2026-06-02 14:38:25 UTC

## 0.1 Area overview / key ideas / reading quality

This region is the event tail for `ChangeTracker`.

The road is:

```text
Tracking
→ Tracked
→ StateChanging
→ StateChanged
→ event args
→ diagnostics/audit/debug examples
```

Key ideas:

```text
1. `Tracking` fires before an entity becomes tracked.
2. `Tracked` fires after an entity becomes tracked.
3. `StateChanging` fires before an entity state changes.
4. `StateChanged` fires after an entity state changes.
5. Event args expose the current entity/entry and context about the event.
6. `Tracked` can tell whether tracking came from a query via `FromQuery`.
7. State change events expose old/new states.
8. Events are useful for diagnostics, debugging, lightweight local policies, and teaching EF's lifecycle.
9. Durable audit should usually live at SaveChanges/interceptor boundaries, not only in ChangeTracker events.
```

Reading quality:

```text
overall: high
included R04 image uses: 20
```

## 0.2 Coverage / boundary review

Included in R04:

```text
S-136, S-137, S-138, S-139, S-140, S-141, S-142, S-143, S-144, S-145, S-146, S-147, S-148, S-149, S-150, S-151, S-152, S-153, S-154, S-155
```

No event-tail screenshots were excluded in this pass.

## 1. `Tracking`

`Tracking` fires before EF starts tracking an entity.

Handler shape:

```csharp
context.ChangeTracker.Tracking += (sender, e) =>
{
    Console.WriteLine($"Tracking: {e.Entry.Entity.GetType().Name}");
};
```

Use it when code wants to observe that an entity is about to enter the change tracker.

Possible uses:

```text
debugging
diagnostics
local context-level validation
teaching/visualizing EF lifecycle
```

It is not the same as `Tracked`: at `Tracking` time, the entity is in the process of being tracked.

## 2. `Tracked`

`Tracked` fires after EF has started tracking an entity.

Handler shape:

```csharp
context.ChangeTracker.Tracked += (sender, e) =>
{
    Console.WriteLine($"Tracked: {e.Entry.Entity.GetType().Name}");
};
```

`Tracked` event args include `FromQuery`.

That helps distinguish:

```text
entity tracked because a query materialized it
entity tracked because code called Add / Attach / Update
```

Example:

```csharp
context.ChangeTracker.Tracked += (sender, e) =>
{
    Console.WriteLine($"{e.Entry.Entity.GetType().Name}, FromQuery={e.FromQuery}");
};
```

## 3. `Tracking` vs `Tracked`

The difference:

```text
Tracking -> before entity is tracked
Tracked  -> after entity is tracked
```

Use `Tracking` when you need the "about to happen" lifecycle point.

Use `Tracked` when you need to inspect the entity after EF has attached tracking metadata.

Typical teaching output:

```text
Tracking Blog
Tracked Blog
```

The exact order can help explain what EF is doing during query materialization or explicit `Attach`.

## 4. `StateChanging`

`StateChanging` fires before an entity changes state.

Handler shape:

```csharp
context.ChangeTracker.StateChanging += (sender, e) =>
{
    Console.WriteLine($"{e.Entry.Entity.GetType().Name}: {e.OldState} -> {e.NewState}");
};
```

Use it for diagnostics around state transitions.

Examples of transitions:

```text
Unchanged -> Modified
Added -> Unchanged
Modified -> Unchanged
Unchanged -> Deleted
Deleted -> Detached
```

It is useful when code needs to observe the old state before EF applies the change.

## 5. `StateChanged`

`StateChanged` fires after an entity state has changed.

Handler shape:

```csharp
context.ChangeTracker.StateChanged += (sender, e) =>
{
    Console.WriteLine($"{e.Entry.Entity.GetType().Name}: {e.OldState} -> {e.NewState}");
};
```

Use it when code wants to react after the new state is already applied.

Difference:

```text
StateChanging -> before the transition
StateChanged  -> after the transition
```

## 6. What can trigger these events

Events can fire during:

```text
query materialization
Add
Attach
Update
Remove
DetectChanges
SaveChanges / AcceptAllChanges state cleanup
relationship/cascade state transitions
TrackGraph traversal
```

The exact event sequence depends on the operation.

For example, a query can produce `Tracked` events with `FromQuery = true`.

An explicit `context.Add(entity)` can produce `Tracked` events with `FromQuery = false`.

Editing a property and detecting changes can later produce state change events.

## 7. Good and bad uses

Good uses:

```text
debug output
local diagnostics
teaching EF lifecycle
simple context-scoped hooks
temporary troubleshooting
```

Be careful with:

```text
durable audit
business workflows
external side effects
network calls
database writes inside handlers
```

Reason:

```text
ChangeTracker events are local to one DbContext instance and its in-memory lifecycle.
```

For durable audit or cross-cutting persistence rules, SaveChanges overrides/interceptors are usually a better boundary.

## 8. Example diagnostic setup

Example setup:

```csharp
context.ChangeTracker.Tracked += (sender, e) =>
{
    Console.WriteLine($"Tracked {e.Entry.Entity.GetType().Name}, FromQuery={e.FromQuery}");
};

context.ChangeTracker.StateChanged += (sender, e) =>
{
    Console.WriteLine($"{e.Entry.Entity.GetType().Name}: {e.OldState} -> {e.NewState}");
};
```

Then:

```csharp
var blog = await context.Blogs.FirstAsync();
blog.Name = "Updated";
await context.SaveChangesAsync();
```

Possible output can show:

```text
entity tracked from query
entity state changed from Unchanged to Modified
entity state later accepted back to Unchanged
```

This makes events useful for understanding how EF moves tracked entities through the state machine.

## 9. Event args mental model

Event args usually provide:

```text
Entry
Entity through Entry.Entity
OldState / NewState for state events
FromQuery for Tracked
```

So event handlers often start with:

```csharp
var entry = e.Entry;
var entity = entry.Entity;
var state = entry.State;
```

The handler can inspect metadata through:

```csharp
entry.Metadata
```

or properties through:

```csharp
entry.Properties
```

But avoid heavy work in event handlers unless the cost and side effects are intentional.

## 10. Evidence table

| Source group | What it supports |
|---|---|
| S-136-S138 | ChangeTracker event list and Tracking / Tracked overview. |
| S-139-S142 | Tracking and Tracked handler examples, FromQuery. |
| S-143-S146 | StateChanged / StateChanging overview and handler signatures. |
| S-147-S149 | StateChanging examples and old/new state semantics. |
| S-150-S155 | Tracking/Tracked examples, difference between events, state output. |

## 11. Open questions / follow-up hooks

- Final coverage audit should verify all 164 image uses after R01/R01 correction/R02/R03/R04.
- Events should not be confused with SaveChanges interceptors.
- TrackGraph can cause tracking/state events, but the conceptual owners are still separate: R03 for traversal, R04 for event lifecycle.
