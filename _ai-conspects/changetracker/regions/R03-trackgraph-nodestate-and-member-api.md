# R03 - TrackGraph / NodeState / member API helpers

Generated: 2026-06-02 14:38:25 UTC

## 0.1 Area overview / key ideas / reading quality

This region is about EF Core graph traversal for disconnected entity graphs and the member-level helper APIs that sit near that topic.

The road is:

```text
TrackGraph
→ EntityEntryGraphNode
→ NodeState
→ disconnected graph state decisions
→ traversal stopping rules
→ member/property/navigation helper APIs
```

Key ideas:

```text
1. `TrackGraph` is for disconnected graphs where EF must decide state per node.
2. `TrackGraph` walks reachable entities and calls your callback for each node.
3. The callback gets a node whose important property is `node.Entry`.
4. `node.Entry.State` is where code decides Added / Modified / Unchanged / Deleted / Detached.
5. `NodeState` lets a caller pass custom state through traversal.
6. Leaving a node Detached can stop traversal for that branch.
7. `TrackGraph` is useful when DTOs or client graphs encode whether each entity is new/existing/deleted.
8. Member/property helper APIs provide generic access to scalar and navigation members.
```

Reading quality:

```text
overall: high
included R03 image uses: 23
checked but not reprocessed here: S-081, S-082
```

## 0.2 Coverage / boundary review

Included in R03:

```text
S-083, S-084, S-085, S-086, S-087, S-088, S-089, S-090, S-091, S-092, S-093, S-094, S-095, S-096, S-097, S-128, S-129, S-130, S-131, S-132, S-133, S-134, S-135
```

Checked but not included/reprocessed:

```text
S-081, S-082
```

Reason: these were already processed by R01 as `AcceptAllChanges` material.

## 1. Why `TrackGraph` exists

The normal EF Core APIs already traverse graphs:

```text
Add
Attach
Update
Remove
```

But those APIs apply broad rules. `TrackGraph` is used when code needs custom per-node decisions.

Common scenario:

```text
API receives a disconnected graph
some nodes are new
some nodes already exist
some nodes should be modified
some nodes should be deleted
```

Instead of applying one state to the whole graph, code can inspect each node and decide.

## 2. Basic `TrackGraph` shape

Typical shape:

```csharp
context.ChangeTracker.TrackGraph(rootEntity, node =>
{
    var entry = node.Entry;

    if (entry.IsKeySet)
    {
        entry.State = EntityState.Modified;
    }
    else
    {
        entry.State = EntityState.Added;
    }
});
```

Mental model:

```text
root entity -> related entity -> related entity ...
each visited object gets an EntityEntry
callback decides state
```

`TrackGraph` does not magically know product rules. It gives the callback a place to apply product rules.

## 3. `EntityEntryGraphNode`

The callback receives a graph node.

Important node members:

```text
Entry
NodeState
SourceEntry
InboundNavigation
```

The most important member is:

```csharp
node.Entry
```

because it exposes the `EntityEntry` for the current entity.

The callback usually reads information from:

```text
node.Entry.Entity
node.Entry.IsKeySet
node.Entry.Metadata
node.Entry.State
```

and then assigns:

```csharp
node.Entry.State = EntityState.Added;
node.Entry.State = EntityState.Modified;
node.Entry.State = EntityState.Unchanged;
node.Entry.State = EntityState.Deleted;
```

## 4. State assignment examples

A simple key-based rule:

```csharp
context.ChangeTracker.TrackGraph(root, node =>
{
    node.Entry.State = node.Entry.IsKeySet
        ? EntityState.Modified
        : EntityState.Added;
});
```

A domain-flag rule:

```csharp
context.ChangeTracker.TrackGraph(root, node =>
{
    if (node.Entry.Entity is ITrackChanges tracked)
    {
        node.Entry.State = tracked.IsDeleted
            ? EntityState.Deleted
            : tracked.IsNew
                ? EntityState.Added
                : EntityState.Modified;
    }
});
```

A safer rule can also leave nodes unchanged:

```csharp
context.ChangeTracker.TrackGraph(root, node =>
{
    node.Entry.State = node.Entry.IsKeySet
        ? EntityState.Unchanged
        : EntityState.Added;
});
```

Then code can mark only selected properties as modified.

## 5. `NodeState`

`NodeState` lets traversal carry custom state.

Useful when parent/relationship context affects child decisions.

Conceptual shape:

```csharp
context.ChangeTracker.TrackGraph(
    root,
    initialState,
    node =>
    {
        var state = node.NodeState;
        var entry = node.Entry;

        // decide entry.State
        // optionally return/assign state for children
    });
```

Use it when the traversal needs extra information that is not directly on the entity itself.

Examples:

```text
current depth
current tenant id
parent decision
whether the current branch is read-only
whether child nodes should be skipped or marked
```

## 6. Traversal stopping behavior

The notes emphasize a key rule:

```text
If the callback leaves the node Detached, EF can stop traversing that branch.
```

Meaning:

```text
tracked state assignment is not only about SaveChanges;
it can also affect graph traversal.
```

So if code intends to continue into child entities, it must be clear about the state assigned to the current node.

## 7. TrackGraph vs Add/Attach/Update

The practical distinction:

```text
Add      -> broad graph rule: new graph / insert behavior
Attach   -> broad graph rule: existing graph / unchanged behavior
Update   -> broad graph rule: existing graph / modified behavior
TrackGraph -> custom per-node state decisions
```

Use `TrackGraph` only when the broad APIs do not express the required rules.

Good fit:

```text
mixed new/existing entities
soft-delete flags
client-provided entity states
graph DTOs
generic repository merge code
```

Bad fit:

```text
simple insert
simple update of one aggregate with known state
normal tracked query + edit + SaveChanges
```

## 8. Member / property helper APIs

This region also includes helper APIs around members.

At the `EntityEntry` level:

```text
Properties
References
Collections
Navigations
Members
```

Those APIs let generic code work without compile-time knowledge of the entity type.

Typical generic inspection:

```csharp
foreach (var member in entry.Members)
{
    Console.WriteLine(member.Metadata.Name);
}
```

Scalar property inspection:

```csharp
foreach (var property in entry.Properties)
{
    Console.WriteLine($"{property.Metadata.Name}: {property.CurrentValue}");
}
```

Navigation inspection:

```csharp
foreach (var navigation in entry.Navigations)
{
    Console.WriteLine($"{navigation.Metadata.Name}: {navigation.IsLoaded}");
}
```

## 9. Property modification helpers

For disconnected updates, a common pattern is:

```csharp
context.Attach(entity);

context.Entry(entity)
    .Property(e => e.Name)
    .IsModified = true;
```

This avoids marking every property modified.

Generic string-based version:

```csharp
var entry = context.Entry(entity);
entry.Property("Name").IsModified = true;
```

Use this when code has a detached object but wants a precise update rather than a full `Update(entity)`.

## 10. Evidence table

| Source group | What it supports |
|---|---|
| S-083/S-084 | Manual state assignment, client graph/update flags, and TrackGraph callback shape. |
| S-085-S087 | Overview / use cases / graph traversal mental model. |
| S-088-S097 | TrackGraph examples, traversal behavior, detached branch behavior, NodeState, internal graph traversal notes. |
| S-128-S135 | Member/property/navigation helper APIs and generic member inspection helpers. |
| S-081/S-082 | Checked here but already processed in R01 as AcceptAllChanges material. |

## 11. Open questions / follow-up hooks

- R04 events are separate from graph traversal even though they may fire during tracking.
- Application code must define state rules explicitly; TrackGraph only supplies the traversal hook.
- For durable audit, prefer SaveChanges/interceptors; ChangeTracker events are local context lifecycle hooks.
