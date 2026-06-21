# EFC-R02 - Entities / constructors / Attach / shadow properties

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
This file processes `8` sources for `EFC-R02`.

Why:
This is the first real transcript pass, not only an audit summary.

Next:
After Stage1 review/commit, process Stage2 R04 + R05.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
```text
Entity materialization and lifecycle: EF constructors, parameterless constructor guidance, avoiding side effects, Attach/detached entities, shadow properties, and detached graph state.
```

Key ideas:

- EF materializes entities from database rows and may bypass normal business creation flows.
- Constructors may run during materialization, so constructors should avoid side effects and hidden database/publish logic.
- A safe constructor can validate simple invariants, but it should not assume application workflow context.
- Attach is for telling EF about a detached existing entity; then state must be managed explicitly.
- Detached updates can accidentally mark too much or too little as modified.
- Shadow properties let EF store/query columns not exposed on the CLR entity.

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
S-001, S-011, S-014, S-019, S-020, S-021, S-025, S-027
```

Boundary decision:
```text
Included in EFC-R02 after Stage1 visual/semantic source review.
```

---

## 1. Source inventory

| Source | Image use | fileId short | Stage0 group | Status | Theme |
|---|---|---|---|---|---|
| S-001 | IU-001 | `946177ff27` | `EFC-R02-entities-constructors-attach-shadow-props` | `verified-visible-semantic-transcript` | Not exactly: EF Core materializes entities from database rows without necessarily calling the same normal business methods used by application code. |
| S-011 | IU-011 | `8a232da430` | `EFC-R02-entities-constructors-attach-shadow-props` | `verified-visible-semantic-transcript` | Filter by a shadow property. |
| S-014 | IU-014 | `5e335b4ef1` | `EFC-R02-entities-constructors-attach-shadow-props` | `verified-visible-semantic-transcript` | Detached entity update example. |
| S-019 | IU-019 | `4538d60710` | `EFC-R02-entities-constructors-attach-shadow-props` | `verified-visible-semantic-transcript` | Parameterless constructor question. |
| S-020 | IU-020 | `1b74640858` | `EFC-R02-entities-constructors-attach-shadow-props` | `verified-visible-semantic-transcript` | How Attach helps. |
| S-021 | IU-021 | `bc91d60828` | `EFC-R02-entities-constructors-attach-shadow-props` | `verified-visible-semantic-transcript` | Safe constructor logic. |
| S-025 | IU-025 | `354939e8d7` | `EFC-R02-entities-constructors-attach-shadow-props` | `verified-visible-semantic-transcript` | Detached entity with unchanged state. |
| S-027 | IU-027 | `e42dcdf323` | `EFC-R02-entities-constructors-attach-shadow-props` | `verified-visible-semantic-transcript` | What to avoid in constructors. |

---

## 2. Source-level transcript

### S-001 - Not exactly: EF Core materializes entities from database rows without necessarily calling the same normal business methods used by application code.

Metadata:
```text
source_id: S-001
image_use_id: IU-001
fileId_short: 946177ff27
stage0_group: EFC-R02-entities-constructors-attach-shadow-props
stage1_region: EFC-R02
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Not exactly: EF Core materializes entities from database rows without necessarily calling the same normal business methods used by application code.

Visible meaning:
- EF creates an instance.
- It fills properties/fields from database values.
- It starts tracking the entity when the query is tracking.
- Constructor behavior can vary by mapping/access pattern.
- Do not rely on EF replaying business behavior during materialization.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-011 - Filter by a shadow property.

Metadata:
```text
source_id: S-011
image_use_id: IU-011
fileId_short: 8a232da430
stage0_group: EFC-R02-entities-constructors-attach-shadow-props
stage1_region: EFC-R02
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Filter by a shadow property.

Visible code:
var active = await db.Orders
    .Where(o => EF.Property<bool>(o, "IsDeleted") == false)
    .ToListAsync();

Meaning:
Shadow properties are database/model columns not exposed as normal CLR properties, but EF can still query them with EF.Property.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-014 - Detached entity update example.

Metadata:
```text
source_id: S-014
image_use_id: IU-014
fileId_short: 5e335b4ef1
stage0_group: EFC-R02-entities-constructors-attach-shadow-props
stage1_region: EFC-R02
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Detached entity update example.

Visible code:
var blog = new Blog { Id = 5, Name = "New name" };
context.Attach(blog);
context.Entry(blog).Property(x => x.Name).IsModified = true;
await context.SaveChangesAsync();

Meaning:
Attach tells EF the entity exists. Then individual modified properties must be marked, otherwise EF may not update or may update too much.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-019 - Parameterless constructor question.

Metadata:
```text
source_id: S-019
image_use_id: IU-019
fileId_short: 4538d60710
stage0_group: EFC-R02-entities-constructors-attach-shadow-props
stage1_region: EFC-R02
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Parameterless constructor question.

Visible note:
Do not remove all logic from constructors just because EF wants/uses a parameterless constructor. If EF can bind a parameterized constructor to mapped properties/services, it may use it; otherwise it can use a parameterless constructor and set members afterward.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-020 - How Attach helps.

Metadata:
```text
source_id: S-020
image_use_id: IU-020
fileId_short: 1b74640858
stage0_group: EFC-R02-entities-constructors-attach-shadow-props
stage1_region: EFC-R02
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
How Attach helps.

Attach is useful when:
- the entity already exists;
- you do not want EF to insert it;
- you want it tracked as Unchanged;
- then you will modify properties and let change tracking detect them, or explicitly mark properties as modified.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-021 - Safe constructor logic.

Metadata:
```text
source_id: S-021
image_use_id: IU-021
fileId_short: bc91d60828
stage0_group: EFC-R02-entities-constructors-attach-shadow-props
stage1_region: EFC-R02
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Safe constructor logic.

Good constructor logic:
- assign fields/properties;
- perform simple validation;
- maintain object consistency from passed values.

Example Money constructor validates amount and assigns amount/currency. If EF uses this constructor during materialization, the logic runs.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-025 - Detached entity with unchanged state.

Metadata:
```text
source_id: S-025
image_use_id: IU-025
fileId_short: 354939e8d7
stage0_group: EFC-R02-entities-constructors-attach-shadow-props
stage1_region: EFC-R02
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Detached entity with unchanged state.

Image shows attached entity state and property states. By default, Attach marks the entity as Unchanged; only explicitly marked properties become Modified. This prevents updating every column accidentally.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-027 - What to avoid in constructors.

Metadata:
```text
source_id: S-027
image_use_id: IU-027
fileId_short: e42dcdf323
stage0_group: EFC-R02-entities-constructors-attach-shadow-props
stage1_region: EFC-R02
status: verified-visible-semantic-transcript
transcript_method: Stage1 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
What to avoid in constructors.

Avoid constructor logic that assumes normal app creation flow:
- calling services;
- publishing events;
- touching database;
- depending on navigations being populated;
- logic only sensible for newly created objects, not rehydrated persisted ones.

EF may call the constructor during materialization.
```

#### Notes

Stage1 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

## 3. Cleaned source notes

- EF materializes entities from database rows and may bypass normal business creation flows.
- Constructors may run during materialization, so constructors should avoid side effects and hidden database/publish logic.
- A safe constructor can validate simple invariants, but it should not assume application workflow context.
- Attach is for telling EF about a detached existing entity; then state must be managed explicitly.
- Detached updates can accidentally mark too much or too little as modified.
- Shadow properties let EF store/query columns not exposed on the CLR entity.

---

## 4. Open review issues

- If exact code punctuation matters, re-open the preserved Stage0 source PNG for that specific source.
- This Stage1 pass closes the sources semantically and keeps source-image anchors for precision patches.
- Stage2 R04/R05 is still pending.
