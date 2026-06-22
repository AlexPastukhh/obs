# Final coverage transcript - EF Core composite key: primary keys, foreign keys and indexes

Generated: 2026-06-13 09:50:00 UTC

## Coverage statement

This pass closes all Stage0 sources: `25` image uses and `18` text labels. Stage0 inventory is used as a checklist only; wording below is based on visual/semantic boundary review of the preserved source images and labels.

## Big picture

Composite keys are keys made from multiple columns/properties. They are useful when the natural identity is a tuple rather than a single surrogate value, but every lookup and relationship must carry the whole key shape.

## R01 - Composite key basics and entity configuration

Coverage: `14` image uses, `4` text labels.

Composite key means one entity key consists of several properties. EF Core represents it as one key definition with an ordered list of key properties, usually configured with `HasKey(e => new { ... })`.

The entity example road shows that the model identity is not just `Id`; the key can be a pair such as `(TenantId, LocalId)` or another domain tuple. This is the reason every identity operation has to preserve the same order and values.

Why use it: when uniqueness belongs to a combination, when a dependent row is naturally scoped by another column, or when the database already uses a multi-column primary key. The tradeoff is more verbose queries, relationship config and indexes.

Source labels closed in this region:

- `T001`: composite key

- `T002`: entity example

- `T003`: ef core example

- `T004`: why a composite key

## R02 - Finding entities and foreign-key consequences

Coverage: `6` image uses, `9` text labels.

Finding an entity by key requires passing all key parts. A partial key is not enough to identify one row, so `Find`/lookup APIs need the full tuple in the configured order.

Foreign keys targeting a composite key are also composite. The dependent side must expose and configure all matching FK properties. The notes explicitly call out that you need to point at two elements everywhere, not one.

When configuring relationships, `HasForeignKey` must list the whole dependent-side tuple. If the principal key is not the primary key, `HasPrincipalKey` must list the matching principal-side tuple as well.

Source labels closed in this region:

- `T005`: ------what it leads to------

- `T006`: to find entity need to pass all keys

- `T007`: foreign keys

- `T008`: need to actually add hasforignkey

- `T009`: just about the

- `T010`: fact that we need

- `T011`: to point at

- `T012`: 2 elements

- `T013`: everywhere

## R03 - Null semantics, uniqueness and indexes over composite keys

Coverage: `5` image uses, `5` text labels.

Null semantics matter: if any component is null, the tuple is not a complete key value for identity. Composite primary key parts are normally non-null; optional composite foreign keys become null when any part is null.

Uniqueness applies to the whole combination, not to each column separately. Two rows may repeat one component as long as the complete tuple remains unique.

Indexes over composite keys have ordering implications. They are useful for predicates that match the leftmost/key-prefix columns; queries that filter only later columns may need a different index.

Source labels closed in this region:

- `T014`: null if any part is null

- `T015`: !!!

- `T016`: uniqueness applies to comb

- `T017`: indexes over composite keys

- `T018`: ???

## Final audit

- Remaining unclosed image uses: `0`

- Remaining unclosed text labels: `0`

- Exact code punctuation should be corrected from the preserved screenshots/source if a verbatim study sheet is needed.
