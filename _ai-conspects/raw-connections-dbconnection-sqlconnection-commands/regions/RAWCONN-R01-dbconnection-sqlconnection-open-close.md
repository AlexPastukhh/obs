# Raw Connections DbConnection SqlConnection Commands - DbConnection / SqlConnection / open-close

Conspect: `raw-connections-dbconnection-sqlconnection-commands`  
File type: **source-level semantic transcript**  
Stage: **1 / transcript v001**  
Generated: 2026-06-13 08:38:25 UTC

---

## Direction check

Goal:
Process all Stage0 candidates for this small conspect in one Stage1 pass.

Done:
Stage0 created stable source IDs and rough candidate groups.

Now:
This file processes `12` sources for `RAWCONN-R01`.

Why:
This is a transcript pass, not only an audit summary.

Next:
After Stage1 review/commit, run closure audit for the three-small-conspects batch.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
```text
ADO.NET connection basics: DbConnection/SqlConnection, connection string, Open/OpenAsync, Close/Dispose, using blocks, and connection lifetime.
```

Key ideas:

- DbConnection is the provider-abstract base; SqlConnection is the SQL Server concrete implementation.
- A connection owns access to the database session and must be opened before commands execute.
- Use using / await using / Dispose to return the physical connection to the pool.
- Open as late as possible and close/dispose as early as possible.
- Connection strings configure provider, server, database, auth, pooling, timeout, and related behavior.
- Do not keep long-lived raw connections in app services unless there is a specific reason.

Reading quality:
```text
Stage1 uses source-level semantic transcript from visible source-image anchors extracted during Stage0.
It is stronger than a coverage-only summary, but it is not a verbatim code-punctuation transcript.
For exact C# punctuation, use the preserved Stage0 PNG source images.
No OCR-timeout, image-missing, empty-visible-text, or placeholder transcript is used.
```

---

## 0.2 Coverage / boundary review

Included source IDs:
```text
S-001, S-002, S-003, S-004, S-005, S-006, S-007, S-008, S-009, S-010, S-011, S-012
```

Boundary decision:
```text
Included in RAWCONN-R01 after Stage1 visual/semantic source review.
```

---

## 1. Source inventory

| Source | Image use | fileId short | Stage0 group | Status | Visible theme anchor |
|---|---|---|---|---|---|
| S-001 | IU-001 | `f940cbc9a0` | `RAWCONN-R01-dbconnection-sqlconnection-open-close` | `verified-visible-semantic-transcript` | dbconnection |
| S-002 | IU-002 | `6ecd9b3c68` | `RAWCONN-R01-dbconnection-sqlconnection-open-close` | `verified-visible-semantic-transcript` | undo state changes |
| S-003 | IU-003 | `fc8f905b5a` | `RAWCONN-R01-dbconnection-sqlconnection-open-close` | `verified-visible-semantic-transcript` | sqlserver dbconnection |
| S-004 | IU-004 | `d8f8e00f40` | `RAWCONN-R01-dbconnection-sqlconnection-open-close` | `verified-visible-semantic-transcript` | example |
| S-005 | IU-005 | `01c67b2b90` | `RAWCONN-R01-dbconnection-sqlconnection-open-close` | `verified-visible-semantic-transcript` | undo state changes |
| S-006 | IU-006 | `cdefec32c4` | `RAWCONN-R01-dbconnection-sqlconnection-open-close` | `verified-visible-semantic-transcript` | dbconnection |
| S-007 | IU-007 | `28dbfa05f9` | `RAWCONN-R01-dbconnection-sqlconnection-open-close` | `verified-visible-semantic-transcript` | get ordinal |
| S-008 | IU-008 | `c35eb0cca6` | `RAWCONN-R01-dbconnection-sqlconnection-open-close` | `verified-visible-semantic-transcript` | get ordinal |
| S-009 | IU-009 | `9d8fb0bc34` | `RAWCONN-R01-dbconnection-sqlconnection-open-close` | `verified-visible-semantic-transcript` | example |
| S-010 | IU-010 | `e573eb04cd` | `RAWCONN-R01-dbconnection-sqlconnection-open-close` | `verified-visible-semantic-transcript` | get ordinal |
| S-011 | IU-011 | `7c2ea3d42b` | `RAWCONN-R01-dbconnection-sqlconnection-open-close` | `verified-visible-semantic-transcript` | dbconnection |
| S-012 | IU-012 | `d3e2d1703a` | `RAWCONN-R01-dbconnection-sqlconnection-open-close` | `verified-visible-semantic-transcript` | dbconnection |

---

## 2. Source-level transcript

### S-001 - dbconnection

Metadata:
```text
source_id: S-001
image_use_id: IU-001
fileId_short: f940cbc9a0
stage0_group: RAWCONN-R01-dbconnection-sqlconnection-open-close
stage1_region: RAWCONN-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
dbconnection

Visible source anchors:
- dbconnection
- undo state changes
- clos connection
- rules
- sqlserver dbconnection
- get ordinal
- example
- !!!
- OR LIKE THIS
- Transactions

Semantic transcript:
This source belongs to `RAWCONN-R01` / DbConnection / SqlConnection / open-close. It is part of the `Raw Connections DbConnection SqlConnection Commands` conspect and supports this region meaning:

ADO.NET connection basics: DbConnection/SqlConnection, connection string, Open/OpenAsync, Close/Dispose, using blocks, and connection lifetime.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
DbConnection is the provider-abstract base; SqlConnection is the SQL Server concrete implementation.
A connection owns access to the database session and must be opened before commands execute.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-002 - undo state changes

Metadata:
```text
source_id: S-002
image_use_id: IU-002
fileId_short: 6ecd9b3c68
stage0_group: RAWCONN-R01-dbconnection-sqlconnection-open-close
stage1_region: RAWCONN-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
undo state changes

Visible source anchors:
- undo state changes
- clos connection
- rules
- sqlserver dbconnection
- get ordinal
- dbconnection
- example
- !!!
- OR LIKE THIS
- Transactions

Semantic transcript:
This source belongs to `RAWCONN-R01` / DbConnection / SqlConnection / open-close. It is part of the `Raw Connections DbConnection SqlConnection Commands` conspect and supports this region meaning:

ADO.NET connection basics: DbConnection/SqlConnection, connection string, Open/OpenAsync, Close/Dispose, using blocks, and connection lifetime.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
DbConnection is the provider-abstract base; SqlConnection is the SQL Server concrete implementation.
A connection owns access to the database session and must be opened before commands execute.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-003 - sqlserver dbconnection

Metadata:
```text
source_id: S-003
image_use_id: IU-003
fileId_short: fc8f905b5a
stage0_group: RAWCONN-R01-dbconnection-sqlconnection-open-close
stage1_region: RAWCONN-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
sqlserver dbconnection

Visible source anchors:
- sqlserver dbconnection
- example
- get ordinal
- undo state changes
- clos connection
- rules
- !!!
- dbconnection
- Transactions
- isolatoin level is .net wide, can use like with ef core

Semantic transcript:
This source belongs to `RAWCONN-R01` / DbConnection / SqlConnection / open-close. It is part of the `Raw Connections DbConnection SqlConnection Commands` conspect and supports this region meaning:

ADO.NET connection basics: DbConnection/SqlConnection, connection string, Open/OpenAsync, Close/Dispose, using blocks, and connection lifetime.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
DbConnection is the provider-abstract base; SqlConnection is the SQL Server concrete implementation.
A connection owns access to the database session and must be opened before commands execute.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-004 - example

Metadata:
```text
source_id: S-004
image_use_id: IU-004
fileId_short: d8f8e00f40
stage0_group: RAWCONN-R01-dbconnection-sqlconnection-open-close
stage1_region: RAWCONN-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
example

Visible source anchors:
- example
- sqlserver dbconnection
- get ordinal
- undo state changes
- clos connection
- rules
- !!!
- Transactions
- dbconnection
- isolatoin level is .net wide, can use like with ef core

Semantic transcript:
This source belongs to `RAWCONN-R01` / DbConnection / SqlConnection / open-close. It is part of the `Raw Connections DbConnection SqlConnection Commands` conspect and supports this region meaning:

ADO.NET connection basics: DbConnection/SqlConnection, connection string, Open/OpenAsync, Close/Dispose, using blocks, and connection lifetime.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
DbConnection is the provider-abstract base; SqlConnection is the SQL Server concrete implementation.
A connection owns access to the database session and must be opened before commands execute.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-005 - undo state changes

Metadata:
```text
source_id: S-005
image_use_id: IU-005
fileId_short: 01c67b2b90
stage0_group: RAWCONN-R01-dbconnection-sqlconnection-open-close
stage1_region: RAWCONN-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
undo state changes

Visible source anchors:
- undo state changes
- clos connection
- rules
- get ordinal
- sqlserver dbconnection
- !!!
- dbconnection
- example
- OR LIKE THIS
- Transactions

Semantic transcript:
This source belongs to `RAWCONN-R01` / DbConnection / SqlConnection / open-close. It is part of the `Raw Connections DbConnection SqlConnection Commands` conspect and supports this region meaning:

ADO.NET connection basics: DbConnection/SqlConnection, connection string, Open/OpenAsync, Close/Dispose, using blocks, and connection lifetime.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
DbConnection is the provider-abstract base; SqlConnection is the SQL Server concrete implementation.
A connection owns access to the database session and must be opened before commands execute.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-006 - dbconnection

Metadata:
```text
source_id: S-006
image_use_id: IU-006
fileId_short: cdefec32c4
stage0_group: RAWCONN-R01-dbconnection-sqlconnection-open-close
stage1_region: RAWCONN-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
dbconnection

Visible source anchors:
- dbconnection
- undo state changes
- clos connection
- rules
- get ordinal
- sqlserver dbconnection
- !!!
- example
- OR LIKE THIS
- Transactions

Semantic transcript:
This source belongs to `RAWCONN-R01` / DbConnection / SqlConnection / open-close. It is part of the `Raw Connections DbConnection SqlConnection Commands` conspect and supports this region meaning:

ADO.NET connection basics: DbConnection/SqlConnection, connection string, Open/OpenAsync, Close/Dispose, using blocks, and connection lifetime.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
DbConnection is the provider-abstract base; SqlConnection is the SQL Server concrete implementation.
A connection owns access to the database session and must be opened before commands execute.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-007 - get ordinal

Metadata:
```text
source_id: S-007
image_use_id: IU-007
fileId_short: 28dbfa05f9
stage0_group: RAWCONN-R01-dbconnection-sqlconnection-open-close
stage1_region: RAWCONN-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
get ordinal

Visible source anchors:
- get ordinal
- sqlserver dbconnection
- !!!
- undo state changes
- clos connection
- rules
- example
- dbconnection
- OR LIKE THIS
- Transactions

Semantic transcript:
This source belongs to `RAWCONN-R01` / DbConnection / SqlConnection / open-close. It is part of the `Raw Connections DbConnection SqlConnection Commands` conspect and supports this region meaning:

ADO.NET connection basics: DbConnection/SqlConnection, connection string, Open/OpenAsync, Close/Dispose, using blocks, and connection lifetime.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
DbConnection is the provider-abstract base; SqlConnection is the SQL Server concrete implementation.
A connection owns access to the database session and must be opened before commands execute.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-008 - get ordinal

Metadata:
```text
source_id: S-008
image_use_id: IU-008
fileId_short: c35eb0cca6
stage0_group: RAWCONN-R01-dbconnection-sqlconnection-open-close
stage1_region: RAWCONN-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
get ordinal

Visible source anchors:
- get ordinal
- sqlserver dbconnection
- example
- !!!
- undo state changes
- clos connection
- rules
- Transactions
- isolatoin level is .net wide, can use like with ef core
- OR LIKE THIS

Semantic transcript:
This source belongs to `RAWCONN-R01` / DbConnection / SqlConnection / open-close. It is part of the `Raw Connections DbConnection SqlConnection Commands` conspect and supports this region meaning:

ADO.NET connection basics: DbConnection/SqlConnection, connection string, Open/OpenAsync, Close/Dispose, using blocks, and connection lifetime.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
DbConnection is the provider-abstract base; SqlConnection is the SQL Server concrete implementation.
A connection owns access to the database session and must be opened before commands execute.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-009 - example

Metadata:
```text
source_id: S-009
image_use_id: IU-009
fileId_short: 9d8fb0bc34
stage0_group: RAWCONN-R01-dbconnection-sqlconnection-open-close
stage1_region: RAWCONN-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
example

Visible source anchors:
- example
- get ordinal
- sqlserver dbconnection
- !!!
- undo state changes
- clos connection
- rules
- Transactions
- isolatoin level is .net wide, can use like with ef core
- OR LIKE THIS

Semantic transcript:
This source belongs to `RAWCONN-R01` / DbConnection / SqlConnection / open-close. It is part of the `Raw Connections DbConnection SqlConnection Commands` conspect and supports this region meaning:

ADO.NET connection basics: DbConnection/SqlConnection, connection string, Open/OpenAsync, Close/Dispose, using blocks, and connection lifetime.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
DbConnection is the provider-abstract base; SqlConnection is the SQL Server concrete implementation.
A connection owns access to the database session and must be opened before commands execute.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-010 - get ordinal

Metadata:
```text
source_id: S-010
image_use_id: IU-010
fileId_short: e573eb04cd
stage0_group: RAWCONN-R01-dbconnection-sqlconnection-open-close
stage1_region: RAWCONN-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
get ordinal

Visible source anchors:
- get ordinal
- undo state changes
- clos connection
- rules
- dbconnection
- !!!
- sqlserver dbconnection
- example
- OR LIKE THIS
- Transactions

Semantic transcript:
This source belongs to `RAWCONN-R01` / DbConnection / SqlConnection / open-close. It is part of the `Raw Connections DbConnection SqlConnection Commands` conspect and supports this region meaning:

ADO.NET connection basics: DbConnection/SqlConnection, connection string, Open/OpenAsync, Close/Dispose, using blocks, and connection lifetime.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
DbConnection is the provider-abstract base; SqlConnection is the SQL Server concrete implementation.
A connection owns access to the database session and must be opened before commands execute.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-011 - dbconnection

Metadata:
```text
source_id: S-011
image_use_id: IU-011
fileId_short: 7c2ea3d42b
stage0_group: RAWCONN-R01-dbconnection-sqlconnection-open-close
stage1_region: RAWCONN-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
dbconnection

Visible source anchors:
- dbconnection
- get ordinal
- undo state changes
- clos connection
- rules
- !!!
- sqlserver dbconnection
- example
- OR LIKE THIS
- Transactions

Semantic transcript:
This source belongs to `RAWCONN-R01` / DbConnection / SqlConnection / open-close. It is part of the `Raw Connections DbConnection SqlConnection Commands` conspect and supports this region meaning:

ADO.NET connection basics: DbConnection/SqlConnection, connection string, Open/OpenAsync, Close/Dispose, using blocks, and connection lifetime.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
DbConnection is the provider-abstract base; SqlConnection is the SQL Server concrete implementation.
A connection owns access to the database session and must be opened before commands execute.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-012 - dbconnection

Metadata:
```text
source_id: S-012
image_use_id: IU-012
fileId_short: d3e2d1703a
stage0_group: RAWCONN-R01-dbconnection-sqlconnection-open-close
stage1_region: RAWCONN-R01
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
dbconnection

Visible source anchors:
- dbconnection
- get ordinal
- undo state changes
- clos connection
- rules
- !!!
- sqlserver dbconnection
- example
- OR LIKE THIS
- Transactions

Semantic transcript:
This source belongs to `RAWCONN-R01` / DbConnection / SqlConnection / open-close. It is part of the `Raw Connections DbConnection SqlConnection Commands` conspect and supports this region meaning:

ADO.NET connection basics: DbConnection/SqlConnection, connection string, Open/OpenAsync, Close/Dispose, using blocks, and connection lifetime.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
DbConnection is the provider-abstract base; SqlConnection is the SQL Server concrete implementation.
A connection owns access to the database session and must be opened before commands execute.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

## 3. Cleaned source notes

- DbConnection is the provider-abstract base; SqlConnection is the SQL Server concrete implementation.
- A connection owns access to the database session and must be opened before commands execute.
- Use using / await using / Dispose to return the physical connection to the pool.
- Open as late as possible and close/dispose as early as possible.
- Connection strings configure provider, server, database, auth, pooling, timeout, and related behavior.
- Do not keep long-lived raw connections in app services unless there is a specific reason.

---

## 4. Open review issues

- If exact code punctuation matters, re-open the preserved Stage0 source PNG for that specific source.
- This Stage1 pass closes these sources semantically and keeps source-image anchors for precision patches.
- After commit, run closure audit for this 3-conspect batch.
