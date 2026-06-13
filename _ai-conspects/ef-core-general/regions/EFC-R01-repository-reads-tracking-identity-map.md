# EFC-R01 - Repository reads / tracking / identity map

Conspect: `ef-core-general`  
File type: **source-level semantic transcript**  
Stage: **1 / transcript v001**  
Generated: 2026-06-13 05:33:27 UTC

---

## Direction check

Goal:
Process EF Core General Stage1 sources after Stage0 boundary review.

Done:
Stage0 created stable source IDs and rough candidate groups.

Now:
This file processes `28` sources for `EFC-R01`.

Why:
This is the first real transcript pass, not only an audit summary.

Next:
After Stage1 review/commit, process Stage2 R04 + R05.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
```text
Repository/query read behavior in EF Core: tracking vs no-tracking, identity map, identity resolution, Include/Load/Find, duplicate instances, graph loading, and practical read/write fetch discipline.
```

Key ideas:

- Tracking queries attach returned entities to the DbContext change tracker and identity map.
- No-tracking queries are cheaper for read-only work but can create duplicate entity instances.
- AsNoTrackingWithIdentityResolution avoids duplicate instances without long-term change tracking.
- Find first checks the identity map; Single/First with a predicate always issues a query.
- Include is usually a query-shaping tool; explicit Load is often another database call.
- Avoid partially initialized graphs and relying on already-tracked state accidentally.
- For writes, fetch the entity you plan to change or attach carefully; do not mix read-only projections with mutation semantics.

Reading quality:
```text
Stage1 uses source-level semantic transcript from visible source images/contact sheets.
It is stronger than a coverage-only summary, but it is not a verbatim code-punctuation transcript.
For exact C# punctuation, use the preserved Stage0 PNG source images.
No OCR-timeout, image-missing, empty-visible-text, or placeholder transcript is used.
```

---

## 0.2 Coverage / boundary review

Included source IDs:
```text
S-002, S-005, S-009, S-012, S-016, S-018, S-023, S-024, S-029, S-031, S-033, S-034, S-035, S-036, S-037, S-038, S-040, S-042, S-043, S-044, S-047, S-049, S-051, S-052, S-054, S-056, S-058, S-060
```

Boundary decision:
```text
Included in EFC-R01 after Stage1 visual/semantic source review.
```

---

## 1. Source inventory

| Source | Image use | fileId short | Stage0 group | Status | Theme |
|---|---|---|---|---|---|
| S-002 | IU-002 | `e64cf87310` | `EFC-R01-repository-reads-tracking-identity-map` | `verified-visible-semantic-transcript` | Make reads no-tracking by default. |
| S-005 | IU-005 | `af19e8920a` | `EFC-R01-repository-reads-tracking-identity-map` | `verified-visible-semantic-transcript` | Identity map reason. |
| S-009 | IU-009 | `1256f47477` | `EFC-R01-repository-reads-tracking-identity-map` | `verified-visible-semantic-transcript` | If you need identity resolution, consider AsNoTrackingWithIdentityResolution. |
| S-012 | IU-012 | `27e0fafb7d` | `EFC-R01-repository-reads-tracking-identity-map` | `verified-visible-semantic-transcript` | When does an entity become tracked? |
| S-016 | IU-016 | `5f5db5c14f` | `EFC-R01-repository-reads-tracking-identity-map` | `verified-visible-semantic-transcript` | Project only what you need. |
| S-018 | IU-018 | `31d62e0a78` | `EFC-R01-repository-reads-tracking-identity-map` | `verified-visible-semantic-transcript` | Load data only when needed. |
| S-023 | IU-023 | `07d0c9bb3c` | `EFC-R01-repository-reads-tracking-identity-map` | `verified-visible-semantic-transcript` | Find skips query if entity is already loaded/tracked. |
| S-024 | IU-024 | `a67f713ace` | `EFC-R01-repository-reads-tracking-identity-map` | `verified-visible-semantic-transcript` | Avoid big Include graphs. |
| S-029 | IU-029 | `f5a69d20bc` | `EFC-R01-repository-reads-tracking-identity-map` | `verified-visible-semantic-transcript` | If entity appears twice in a tracked query, EF returns the same tracked instance. |
| S-031 | IU-031 | `0e5b2c9aff` | `EFC-R01-repository-reads-tracking-identity-map` | `verified-visible-semantic-transcript` | Find is useful but not a general query replacement. |
| S-033 | IU-033 | `05e414e028` | `EFC-R01-repository-reads-tracking-identity-map` | `verified-visible-semantic-transcript` | What AsNoTrackingWithIdentityResolution is. |
| S-034 | IU-034 | `be97b0c8b5` | `EFC-R01-repository-reads-tracking-identity-map` | `verified-visible-semantic-transcript` | Compare three query modes. |
| S-035 | IU-035 | `691ce63670` | `EFC-R01-repository-reads-tracking-identity-map` | `verified-visible-semantic-transcript` | Loading collections explicitly. |
| S-036 | IU-036 | `75c8a8c2fe` | `EFC-R01-repository-reads-tracking-identity-map` | `verified-visible-semantic-transcript` | No-tracking + identity resolution practical card. |
| S-037 | IU-037 | `ac404adaa8` | `EFC-R01-repository-reads-tracking-identity-map` | `verified-visible-semantic-transcript` | Multiple collections can load in one roundtrip but maybe with duplicate rows. |
| S-038 | IU-038 | `2252a4c4af` | `EFC-R01-repository-reads-tracking-identity-map` | `verified-visible-semantic-transcript` | Why this matters. |
| S-040 | IU-040 | `7f7dafd9fe` | `EFC-R01-repository-reads-tracking-identity-map` | `verified-visible-semantic-transcript` | Use Include when you know the root and which related data you need. |
| S-042 | IU-042 | `eb072cdd8b` | `EFC-R01-repository-reads-tracking-identity-map` | `verified-visible-semantic-transcript` | Not by default: Include does not automatically happen. |
| S-043 | IU-043 | `e3704b53e4` | `EFC-R01-repository-reads-tracking-identity-map` | `verified-visible-semantic-transcript` | Use Find or Load when appropriate. |
| S-044 | IU-044 | `16669395cb` | `EFC-R01-repository-reads-tracking-identity-map` | `verified-visible-semantic-transcript` | Why not default to always loading. |
| S-047 | IU-047 | `2175a4a601` | `EFC-R01-repository-reads-tracking-identity-map` | `verified-visible-semantic-transcript` | Practical tradeoff: Include vs Find + Load. |
| S-049 | IU-049 | `f79556b4d7` | `EFC-R01-repository-reads-tracking-identity-map` | `verified-visible-semantic-transcript` | Queries that project entities multiple times. |
| S-051 | IU-051 | `a42c0c4aad` | `EFC-R01-repository-reads-tracking-identity-map` | `verified-visible-semantic-transcript` | Self-referencing / graph-like data. |
| S-052 | IU-052 | `810b517d3a` | `EFC-R01-repository-reads-tracking-identity-map` | `verified-visible-semantic-transcript` | Load after Fetch / explicit loading note. |
| S-054 | IU-054 | `4f85a4e72b` | `EFC-R01-repository-reads-tracking-identity-map` | `verified-visible-semantic-transcript` | Fetch + include / then can use Find if entity already tracked. |
| S-056 | IU-056 | `3edaef3497` | `EFC-R01-repository-reads-tracking-identity-map` | `verified-visible-semantic-transcript` | Fetch root, then conditionally load relationships. |
| S-058 | IU-058 | `1607e83e8f` | `EFC-R01-repository-reads-tracking-identity-map` | `verified-visible-semantic-transcript` | When to include because root is already fetched. |
| S-060 | IU-060 | `b074625c29` | `EFC-R01-repository-reads-tracking-identity-map` | `verified-visible-semantic-transcript` | Is this still practical? |

---

## 2. Source-level transcript

### S-002 - Make reads no-tracking by default.

Metadata:
```text
source_id: S-002
image_use_id: IU-002
fileId_short: e64cf87310
stage0_group: EFC-R01-repository-reads-tracking-identity-map
stage1_region: EFC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Make reads no-tracking by default.

Idea:
- Tracking a big CQRS/query model can cost more than it gives.
- Use AsNoTracking for read-only queries.
- If the same entity can appear multiple times and reference equality matters, use AsNoTrackingWithIdentityResolution instead of full tracking.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-005 - Identity map reason.

Metadata:
```text
source_id: S-005
image_use_id: IU-005
fileId_short: af19e8920a
stage0_group: EFC-R01-repository-reads-tracking-identity-map
stage1_region: EFC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Identity map reason.

Within one DbContext, EF Core keeps one tracked object instance per primary key.
If EF sees the same row again, it returns the already tracked object instead of creating another instance.

But this matters only for tracking queries, not normal no-tracking reads.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-009 - If you need identity resolution, consider AsNoTrackingWithIdentityResolution.

Metadata:
```text
source_id: S-009
image_use_id: IU-009
fileId_short: 1256f47477
stage0_group: EFC-R01-repository-reads-tracking-identity-map
stage1_region: EFC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
If you need identity resolution, consider AsNoTrackingWithIdentityResolution.

It gives a no-tracking result but prevents duplicate instances of the same entity within the result graph. Good when you need reference consistency in a read result but do not want tracked state.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-012 - When does an entity become tracked?

Metadata:
```text
source_id: S-012
image_use_id: IU-012
fileId_short: 27e0fafb7d
stage0_group: EFC-R01-repository-reads-tracking-identity-map
stage1_region: EFC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
When does an entity become tracked?

Usually when:
- the query is a tracking query;
- the entity is returned by the DbContext;
- or it is explicitly attached/added/updated.

No-tracking queries do not add returned entities to the change tracker.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-016 - Project only what you need.

Metadata:
```text
source_id: S-016
image_use_id: IU-016
fileId_short: 5f5db5c14f
stage0_group: EFC-R01-repository-reads-tracking-identity-map
stage1_region: EFC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Project only what you need.

Projection avoids materializing entire aggregates or graphs when a query only needs a DTO/read model. The note contrasts selecting only needed fields with loading full tracked objects.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-018 - Load data only when needed.

Metadata:
```text
source_id: S-018
image_use_id: IU-018
fileId_short: 31d62e0a78
stage0_group: EFC-R01-repository-reads-tracking-identity-map
stage1_region: EFC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Load data only when needed.

The visible code contrasts querying/including related data versus calling Load. It warns that change tracking can observe and keep relationships, so understand when a collection/reference is loaded.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-023 - Find skips query if entity is already loaded/tracked.

Metadata:
```text
source_id: S-023
image_use_id: IU-023
fileId_short: 07d0c9bb3c
stage0_group: EFC-R01-repository-reads-tracking-identity-map
stage1_region: EFC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Find skips query if entity is already loaded/tracked.

Find checks the identity map first. If the entity is already tracked, it returns the tracked instance without a new database query. If not tracked, it queries by key and then tracks the entity.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-024 - Avoid big Include graphs.

Metadata:
```text
source_id: S-024
image_use_id: IU-024
fileId_short: a67f713ace
stage0_group: EFC-R01-repository-reads-tracking-identity-map
stage1_region: EFC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Avoid big Include graphs.

Includes can duplicate rows and explode result size when collections are involved. Multiple collection includes can produce large SQL/results. Prefer projections, split queries, or explicit loads when appropriate.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-029 - If entity appears twice in a tracked query, EF returns the same tracked instance.

Metadata:
```text
source_id: S-029
image_use_id: IU-029
fileId_short: f5a69d20bc
stage0_group: EFC-R01-repository-reads-tracking-identity-map
stage1_region: EFC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
If entity appears twice in a tracked query, EF returns the same tracked instance.

Example pattern:
- tracking query + include/cross reference;
- same primary key appears more than once;
- identity map returns the same object reference.

This can be useful for aggregate graph consistency.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-031 - Find is useful but not a general query replacement.

Metadata:
```text
source_id: S-031
image_use_id: IU-031
fileId_short: 0e5b2c9aff
stage0_group: EFC-R01-repository-reads-tracking-identity-map
stage1_region: EFC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Find is useful but not a general query replacement.

Find:
- checks identity map first;
- queries by primary key if not tracked;
- returns tracked entity.

Use it when you need by-key lookup and identity-map behavior. Do not use it as a general query/filter mechanism.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-033 - What AsNoTrackingWithIdentityResolution is.

Metadata:
```text
source_id: S-033
image_use_id: IU-033
fileId_short: 05e414e028
stage0_group: EFC-R01-repository-reads-tracking-identity-map
stage1_region: EFC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
What AsNoTrackingWithIdentityResolution is.

It is no-tracking, but EF still performs identity resolution within the result so that multiple appearances of the same row map to one object instance. After enumeration those instances are not kept tracked in the DbContext.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-034 - Compare three query modes.

Metadata:
```text
source_id: S-034
image_use_id: IU-034
fileId_short: be97b0c8b5
stage0_group: EFC-R01-repository-reads-tracking-identity-map
stage1_region: EFC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Compare three query modes.

Tracking:
- tracked by DbContext;
- identity resolution;
- changes can be saved.

No tracking:
- no tracking;
- faster;
- can duplicate instances.

No tracking with identity resolution:
- no tracking after result materialization;
- avoids duplicate instances inside result graph.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-035 - Loading collections explicitly.

Metadata:
```text
source_id: S-035
image_use_id: IU-035
fileId_short: 691ce63670
stage0_group: EFC-R01-repository-reads-tracking-identity-map
stage1_region: EFC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Loading collections explicitly.

Visible code:
var student = await context.Students...
await context.Entry(student).Collection(s => s.Enrollments).LoadAsync();

Meaning:
Explicit Load loads a relationship later. It is a database call. Use when you intentionally want to defer relationship loading.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-036 - No-tracking + identity resolution practical card.

Metadata:
```text
source_id: S-036
image_use_id: IU-036
fileId_short: 75c8a8c2fe
stage0_group: EFC-R01-repository-reads-tracking-identity-map
stage1_region: EFC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
No-tracking + identity resolution practical card.

AsNoTrackingWithIdentityResolution does not track for SaveChanges, but it deduplicates instances inside the materialized result. Use it when read graph consistency matters more than change tracking.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-037 - Multiple collections can load in one roundtrip but maybe with duplicate rows.

Metadata:
```text
source_id: S-037
image_use_id: IU-037
fileId_short: ac404adaa8
stage0_group: EFC-R01-repository-reads-tracking-identity-map
stage1_region: EFC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Multiple collections can load in one roundtrip but maybe with duplicate rows.

Visible note:
Include can join multiple collections, which may create a huge joined result. Split query can reduce duplication but may involve multiple SQL queries. Choose intentionally.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-038 - Why this matters.

Metadata:
```text
source_id: S-038
image_use_id: IU-038
fileId_short: 2252a4c4af
stage0_group: EFC-R01-repository-reads-tracking-identity-map
stage1_region: EFC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Why this matters.

Suppose every page returns the same Customer row. Without identity resolution, many copies may exist in the object graph. With identity resolution, one object is reused within the result, reducing duplicate instances.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-040 - Use Include when you know the root and which related data you need.

Metadata:
```text
source_id: S-040
image_use_id: IU-040
fileId_short: 7f7dafd9fe
stage0_group: EFC-R01-repository-reads-tracking-identity-map
stage1_region: EFC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Use Include when you know the root and which related data you need.

Example:
context.Students
    .Include(s => s.Enrollments)
    .Single(...)

Good when:
- you need the full aggregate/graph;
- you want to avoid lazy/implicit extra queries;
- graph is not too large.

Bad when only a small projection is needed.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-042 - Not by default: Include does not automatically happen.

Metadata:
```text
source_id: S-042
image_use_id: IU-042
fileId_short: eb072cdd8b
stage0_group: EFC-R01-repository-reads-tracking-identity-map
stage1_region: EFC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Not by default: Include does not automatically happen.

A normal query does not load navigations unless:
- Include/ThenInclude is used;
- explicit Load is called;
- lazy loading proxies are enabled;
- AutoInclude is configured.

If no related data is loaded, navigation access may be null/empty or trigger lazy load if configured.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-043 - Use Find or Load when appropriate.

Metadata:
```text
source_id: S-043
image_use_id: IU-043
fileId_short: e3704b53e4
stage0_group: EFC-R01-repository-reads-tracking-identity-map
stage1_region: EFC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Use Find or Load when appropriate.

Find:
- searches identity map first;
- queries by key only if needed.

Load:
- explicitly loads a navigation/collection.

Use these for command/write scenarios or self-contained work-unit code.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-044 - Why not default to always loading.

Metadata:
```text
source_id: S-044
image_use_id: IU-044
fileId_short: 16669395cb
stage0_group: EFC-R01-repository-reads-tracking-identity-map
stage1_region: EFC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Why not default to always loading.

Because extra columns/rows and huge graphs are expensive. Loading everything can mask N+1 or create huge result sets. Prefer projection for read models and explicit includes/loads for write workflows.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-047 - Practical tradeoff: Include vs Find + Load.

Metadata:
```text
source_id: S-047
image_use_id: IU-047
fileId_short: 2175a4a601
stage0_group: EFC-R01-repository-reads-tracking-identity-map
stage1_region: EFC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Practical tradeoff: Include vs Find + Load.

Include:
- usually one roundtrip;
- simpler when full graph is needed;
- can get heavy with multiple collections.

Find + Load:
- can avoid re-querying tracked roots;
- more explicit and easier to debug;
- each Load is usually another DB call.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-049 - Queries that project entities multiple times.

Metadata:
```text
source_id: S-049
image_use_id: IU-049
fileId_short: f79556b4d7
stage0_group: EFC-R01-repository-reads-tracking-identity-map
stage1_region: EFC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Queries that project entities multiple times.

If a projection returns the same entity through several paths, tracking gives same instance, no-tracking can produce duplicates, and no-tracking identity resolution deduplicates only within the result.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-051 - Self-referencing / graph-like data.

Metadata:
```text
source_id: S-051
image_use_id: IU-051
fileId_short: a42c0c4aad
stage0_group: EFC-R01-repository-reads-tracking-identity-map
stage1_region: EFC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Self-referencing / graph-like data.

Visible example shows graph-like data and why projection may be better than loading full entity graphs. Use DTOs/projections to avoid accidentally materializing large cyclic graphs.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-052 - Load after Fetch / explicit loading note.

Metadata:
```text
source_id: S-052
image_use_id: IU-052
fileId_short: 810b517d3a
stage0_group: EFC-R01-repository-reads-tracking-identity-map
stage1_region: EFC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Load after Fetch / explicit loading note.

You can fetch a root entity and later use explicit Load for related data. This is often useful in command handlers where the root was already found/tracked and you conditionally need relationships.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-054 - Fetch + include / then can use Find if entity already tracked.

Metadata:
```text
source_id: S-054
image_use_id: IU-054
fileId_short: 4f85a4e72b
stage0_group: EFC-R01-repository-reads-tracking-identity-map
stage1_region: EFC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Fetch + include / then can use Find if entity already tracked.

Card compares:
- querying with Include;
- then finding/using already tracked entities.

Main idea:
if root is already tracked, Find avoids extra root query, but related collections still require Include/Load/explicit handling.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-056 - Fetch root, then conditionally load relationships.

Metadata:
```text
source_id: S-056
image_use_id: IU-056
fileId_short: 3edaef3497
stage0_group: EFC-R01-repository-reads-tracking-identity-map
stage1_region: EFC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Fetch root, then conditionally load relationships.

Pattern:
- fetch tracked root;
- if condition, call context.Entry(root).Collection(...).LoadAsync();
- then modify and SaveChanges.

This is useful when relationship loading depends on runtime logic.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-058 - When to include because root is already fetched.

Metadata:
```text
source_id: S-058
image_use_id: IU-058
fileId_short: 1607e83e8f
stage0_group: EFC-R01-repository-reads-tracking-identity-map
stage1_region: EFC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
When to include because root is already fetched.

If root is already tracked, avoid re-querying root. Use explicit loading if needed. But if you need the whole graph in one query, Include can still be correct. For one-to-many collections, understand split/single-query behavior.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-060 - Is this still practical?

Metadata:
```text
source_id: S-060
image_use_id: IU-060
fileId_short: b074625c29
stage0_group: EFC-R01-repository-reads-tracking-identity-map
stage1_region: EFC-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Is this still practical?

Sometimes yes, but not useful as an early optimization. Start with a straightforward query design:
- avoid huge graphs;
- use projection for read models;
- use Include/Load when you need relationships for writes.

Only add identity-resolution tricks when duplicated instances or graph consistency actually matter.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

## 3. Cleaned source notes

- Tracking queries attach returned entities to the DbContext change tracker and identity map.
- No-tracking queries are cheaper for read-only work but can create duplicate entity instances.
- AsNoTrackingWithIdentityResolution avoids duplicate instances without long-term change tracking.
- Find first checks the identity map; Single/First with a predicate always issues a query.
- Include is usually a query-shaping tool; explicit Load is often another database call.
- Avoid partially initialized graphs and relying on already-tracked state accidentally.
- For writes, fetch the entity you plan to change or attach carefully; do not mix read-only projections with mutation semantics.

---

## 4. Open review issues

- If exact code punctuation matters, re-open the preserved Stage0 source PNG for that specific source.
- This Stage1 pass closes the sources semantically and keeps source-image anchors for precision patches.
- Stage2 R04/R05 is still pending.
