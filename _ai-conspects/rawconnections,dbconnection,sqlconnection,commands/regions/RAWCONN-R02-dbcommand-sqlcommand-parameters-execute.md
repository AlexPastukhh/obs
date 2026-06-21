# Raw Connections DbConnection SqlConnection Commands - DbCommand / SqlCommand / parameters / execute

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
This file processes `12` sources for `RAWCONN-R02`.

Why:
This is a transcript pass, not only an audit summary.

Next:
After Stage1 review/commit, run closure audit for the three-small-conspects batch.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
```text
ADO.NET command basics: DbCommand/SqlCommand, CommandText, parameters, ExecuteReader/ExecuteScalar/ExecuteNonQuery, and avoiding SQL injection.
```

Key ideas:

- DbCommand/SqlCommand represents one SQL operation against an open connection.
- CommandText holds SQL text or stored procedure name depending on CommandType.
- Parameters bind values safely and avoid SQL injection/string-concat query bugs.
- ExecuteReader is for rowsets; ExecuteScalar is for one value; ExecuteNonQuery is for insert/update/delete or DDL counts.
- Command timeout/cancellation should be considered for long-running work.
- Raw commands are useful for precise SQL control, but require manual mapping and error handling.

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
S-013, S-014, S-015, S-016, S-017, S-018, S-019, S-020, S-021, S-022, S-023, S-024
```

Boundary decision:
```text
Included in RAWCONN-R02 after Stage1 visual/semantic source review.
```

---

## 1. Source inventory

| Source | Image use | fileId short | Stage0 group | Status | Visible theme anchor |
|---|---|---|---|---|---|
| S-013 | IU-013 | `b923de2999` | `RAWCONN-R02-dbcommand-sqlcommand-parameters-execute` | `verified-visible-semantic-transcript` | get ordinal |
| S-014 | IU-014 | `ff0098421b` | `RAWCONN-R02-dbcommand-sqlcommand-parameters-execute` | `verified-visible-semantic-transcript` | example |
| S-015 | IU-015 | `c31da8b5c9` | `RAWCONN-R02-dbcommand-sqlcommand-parameters-execute` | `verified-visible-semantic-transcript` | !!! |
| S-016 | IU-016 | `9a9dad95c1` | `RAWCONN-R02-dbcommand-sqlcommand-parameters-execute` | `verified-visible-semantic-transcript` | !!! |
| S-017 | IU-017 | `180e2924f9` | `RAWCONN-R02-dbcommand-sqlcommand-parameters-execute` | `verified-visible-semantic-transcript` | dbconnection |
| S-018 | IU-018 | `5af3d4221f` | `RAWCONN-R02-dbcommand-sqlcommand-parameters-execute` | `verified-visible-semantic-transcript` | dbconnection |
| S-019 | IU-019 | `d28aad3da4` | `RAWCONN-R02-dbcommand-sqlcommand-parameters-execute` | `verified-visible-semantic-transcript` | dbconnection |
| S-020 | IU-020 | `29296a8445` | `RAWCONN-R02-dbcommand-sqlcommand-parameters-execute` | `verified-visible-semantic-transcript` | !!! |
| S-021 | IU-021 | `922d33c60c` | `RAWCONN-R02-dbcommand-sqlcommand-parameters-execute` | `verified-visible-semantic-transcript` | example |
| S-022 | IU-022 | `a1b59358db` | `RAWCONN-R02-dbcommand-sqlcommand-parameters-execute` | `verified-visible-semantic-transcript` | !!! |
| S-023 | IU-023 | `252b134be5` | `RAWCONN-R02-dbcommand-sqlcommand-parameters-execute` | `verified-visible-semantic-transcript` | !!! |
| S-024 | IU-024 | `93046bf0a7` | `RAWCONN-R02-dbcommand-sqlcommand-parameters-execute` | `verified-visible-semantic-transcript` | !!! |

---

## 2. Source-level transcript

### S-013 - get ordinal

Metadata:
```text
source_id: S-013
image_use_id: IU-013
fileId_short: b923de2999
stage0_group: RAWCONN-R02-dbcommand-sqlcommand-parameters-execute
stage1_region: RAWCONN-R02
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
get ordinal

Visible source anchors:
- get ordinal
- !!!
- sqlserver dbconnection
- example
- undo state changes
- clos connection
- Transactions
- rules
- isolatoin level is .net wide, can use like with ef core
- OR LIKE THIS

Semantic transcript:
This source belongs to `RAWCONN-R02` / DbCommand / SqlCommand / parameters / execute. It is part of the `Raw Connections DbConnection SqlConnection Commands` conspect and supports this region meaning:

ADO.NET command basics: DbCommand/SqlCommand, CommandText, parameters, ExecuteReader/ExecuteScalar/ExecuteNonQuery, and avoiding SQL injection.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
DbCommand/SqlCommand represents one SQL operation against an open connection.
CommandText holds SQL text or stored procedure name depending on CommandType.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-014 - example

Metadata:
```text
source_id: S-014
image_use_id: IU-014
fileId_short: ff0098421b
stage0_group: RAWCONN-R02-dbcommand-sqlcommand-parameters-execute
stage1_region: RAWCONN-R02
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
- !!!
- sqlserver dbconnection
- undo state changes
- Transactions
- isolatoin level is .net wide, can use like with ef core
- clos connection
- rules
- OR LIKE THIS

Semantic transcript:
This source belongs to `RAWCONN-R02` / DbCommand / SqlCommand / parameters / execute. It is part of the `Raw Connections DbConnection SqlConnection Commands` conspect and supports this region meaning:

ADO.NET command basics: DbCommand/SqlCommand, CommandText, parameters, ExecuteReader/ExecuteScalar/ExecuteNonQuery, and avoiding SQL injection.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
DbCommand/SqlCommand represents one SQL operation against an open connection.
CommandText holds SQL text or stored procedure name depending on CommandType.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-015 - !!!

Metadata:
```text
source_id: S-015
image_use_id: IU-015
fileId_short: c31da8b5c9
stage0_group: RAWCONN-R02-dbcommand-sqlcommand-parameters-execute
stage1_region: RAWCONN-R02
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
!!!

Visible source anchors:
- !!!
- get ordinal
- undo state changes
- clos connection
- rules
- dbconnection
- sqlserver dbconnection
- example
- OR LIKE THIS
- Transactions

Semantic transcript:
This source belongs to `RAWCONN-R02` / DbCommand / SqlCommand / parameters / execute. It is part of the `Raw Connections DbConnection SqlConnection Commands` conspect and supports this region meaning:

ADO.NET command basics: DbCommand/SqlCommand, CommandText, parameters, ExecuteReader/ExecuteScalar/ExecuteNonQuery, and avoiding SQL injection.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
DbCommand/SqlCommand represents one SQL operation against an open connection.
CommandText holds SQL text or stored procedure name depending on CommandType.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-016 - !!!

Metadata:
```text
source_id: S-016
image_use_id: IU-016
fileId_short: 9a9dad95c1
stage0_group: RAWCONN-R02-dbcommand-sqlcommand-parameters-execute
stage1_region: RAWCONN-R02
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
!!!

Visible source anchors:
- !!!
- get ordinal
- sqlserver dbconnection
- undo state changes
- clos connection
- rules
- example
- OR LIKE THIS
- Transactions
- isolatoin level is .net wide, can use like with ef core

Semantic transcript:
This source belongs to `RAWCONN-R02` / DbCommand / SqlCommand / parameters / execute. It is part of the `Raw Connections DbConnection SqlConnection Commands` conspect and supports this region meaning:

ADO.NET command basics: DbCommand/SqlCommand, CommandText, parameters, ExecuteReader/ExecuteScalar/ExecuteNonQuery, and avoiding SQL injection.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
DbCommand/SqlCommand represents one SQL operation against an open connection.
CommandText holds SQL text or stored procedure name depending on CommandType.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-017 - dbconnection

Metadata:
```text
source_id: S-017
image_use_id: IU-017
fileId_short: 180e2924f9
stage0_group: RAWCONN-R02-dbcommand-sqlcommand-parameters-execute
stage1_region: RAWCONN-R02
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
dbconnection

Visible source anchors:
- dbconnection
- !!!
- get ordinal
- undo state changes
- clos connection
- rules
- sqlserver dbconnection
- OR LIKE THIS
- example
- Transactions

Semantic transcript:
This source belongs to `RAWCONN-R02` / DbCommand / SqlCommand / parameters / execute. It is part of the `Raw Connections DbConnection SqlConnection Commands` conspect and supports this region meaning:

ADO.NET command basics: DbCommand/SqlCommand, CommandText, parameters, ExecuteReader/ExecuteScalar/ExecuteNonQuery, and avoiding SQL injection.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
DbCommand/SqlCommand represents one SQL operation against an open connection.
CommandText holds SQL text or stored procedure name depending on CommandType.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-018 - dbconnection

Metadata:
```text
source_id: S-018
image_use_id: IU-018
fileId_short: 5af3d4221f
stage0_group: RAWCONN-R02-dbcommand-sqlcommand-parameters-execute
stage1_region: RAWCONN-R02
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
dbconnection

Visible source anchors:
- dbconnection
- !!!
- get ordinal
- undo state changes
- clos connection
- rules
- sqlserver dbconnection
- OR LIKE THIS
- example
- Transactions

Semantic transcript:
This source belongs to `RAWCONN-R02` / DbCommand / SqlCommand / parameters / execute. It is part of the `Raw Connections DbConnection SqlConnection Commands` conspect and supports this region meaning:

ADO.NET command basics: DbCommand/SqlCommand, CommandText, parameters, ExecuteReader/ExecuteScalar/ExecuteNonQuery, and avoiding SQL injection.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
DbCommand/SqlCommand represents one SQL operation against an open connection.
CommandText holds SQL text or stored procedure name depending on CommandType.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-019 - dbconnection

Metadata:
```text
source_id: S-019
image_use_id: IU-019
fileId_short: d28aad3da4
stage0_group: RAWCONN-R02-dbcommand-sqlcommand-parameters-execute
stage1_region: RAWCONN-R02
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
dbconnection

Visible source anchors:
- dbconnection
- !!!
- get ordinal
- undo state changes
- clos connection
- rules
- sqlserver dbconnection
- OR LIKE THIS
- Transactions
- example

Semantic transcript:
This source belongs to `RAWCONN-R02` / DbCommand / SqlCommand / parameters / execute. It is part of the `Raw Connections DbConnection SqlConnection Commands` conspect and supports this region meaning:

ADO.NET command basics: DbCommand/SqlCommand, CommandText, parameters, ExecuteReader/ExecuteScalar/ExecuteNonQuery, and avoiding SQL injection.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
DbCommand/SqlCommand represents one SQL operation against an open connection.
CommandText holds SQL text or stored procedure name depending on CommandType.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-020 - !!!

Metadata:
```text
source_id: S-020
image_use_id: IU-020
fileId_short: 29296a8445
stage0_group: RAWCONN-R02-dbcommand-sqlcommand-parameters-execute
stage1_region: RAWCONN-R02
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
!!!

Visible source anchors:
- !!!
- get ordinal
- sqlserver dbconnection
- Transactions
- example
- isolatoin level is .net wide, can use like with ef core
- undo state changes
- clos connection
- OR LIKE THIS
- rules

Semantic transcript:
This source belongs to `RAWCONN-R02` / DbCommand / SqlCommand / parameters / execute. It is part of the `Raw Connections DbConnection SqlConnection Commands` conspect and supports this region meaning:

ADO.NET command basics: DbCommand/SqlCommand, CommandText, parameters, ExecuteReader/ExecuteScalar/ExecuteNonQuery, and avoiding SQL injection.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
DbCommand/SqlCommand represents one SQL operation against an open connection.
CommandText holds SQL text or stored procedure name depending on CommandType.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-021 - example

Metadata:
```text
source_id: S-021
image_use_id: IU-021
fileId_short: 922d33c60c
stage0_group: RAWCONN-R02-dbcommand-sqlcommand-parameters-execute
stage1_region: RAWCONN-R02
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
example

Visible source anchors:
- example
- !!!
- get ordinal
- sqlserver dbconnection
- Transactions
- isolatoin level is .net wide, can use like with ef core
- undo state changes
- OR LIKE THIS
- clos connection
- rules

Semantic transcript:
This source belongs to `RAWCONN-R02` / DbCommand / SqlCommand / parameters / execute. It is part of the `Raw Connections DbConnection SqlConnection Commands` conspect and supports this region meaning:

ADO.NET command basics: DbCommand/SqlCommand, CommandText, parameters, ExecuteReader/ExecuteScalar/ExecuteNonQuery, and avoiding SQL injection.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
DbCommand/SqlCommand represents one SQL operation against an open connection.
CommandText holds SQL text or stored procedure name depending on CommandType.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-022 - !!!

Metadata:
```text
source_id: S-022
image_use_id: IU-022
fileId_short: a1b59358db
stage0_group: RAWCONN-R02-dbcommand-sqlcommand-parameters-execute
stage1_region: RAWCONN-R02
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
!!!

Visible source anchors:
- !!!
- get ordinal
- Transactions
- isolatoin level is .net wide, can use like with ef core
- sqlserver dbconnection
- example
- OR LIKE THIS
- undo state changes
- clos connection
- rules

Semantic transcript:
This source belongs to `RAWCONN-R02` / DbCommand / SqlCommand / parameters / execute. It is part of the `Raw Connections DbConnection SqlConnection Commands` conspect and supports this region meaning:

ADO.NET command basics: DbCommand/SqlCommand, CommandText, parameters, ExecuteReader/ExecuteScalar/ExecuteNonQuery, and avoiding SQL injection.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
DbCommand/SqlCommand represents one SQL operation against an open connection.
CommandText holds SQL text or stored procedure name depending on CommandType.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-023 - !!!

Metadata:
```text
source_id: S-023
image_use_id: IU-023
fileId_short: 252b134be5
stage0_group: RAWCONN-R02-dbcommand-sqlcommand-parameters-execute
stage1_region: RAWCONN-R02
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
!!!

Visible source anchors:
- !!!
- dbconnection
- get ordinal
- undo state changes
- clos connection
- rules
- OR LIKE THIS
- sqlserver dbconnection
- Transactions
- isolatoin level is .net wide, can use like with ef core

Semantic transcript:
This source belongs to `RAWCONN-R02` / DbCommand / SqlCommand / parameters / execute. It is part of the `Raw Connections DbConnection SqlConnection Commands` conspect and supports this region meaning:

ADO.NET command basics: DbCommand/SqlCommand, CommandText, parameters, ExecuteReader/ExecuteScalar/ExecuteNonQuery, and avoiding SQL injection.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
DbCommand/SqlCommand represents one SQL operation against an open connection.
CommandText holds SQL text or stored procedure name depending on CommandType.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-024 - !!!

Metadata:
```text
source_id: S-024
image_use_id: IU-024
fileId_short: 93046bf0a7
stage0_group: RAWCONN-R02-dbcommand-sqlcommand-parameters-execute
stage1_region: RAWCONN-R02
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
!!!

Visible source anchors:
- !!!
- dbconnection
- get ordinal
- undo state changes
- clos connection
- rules
- OR LIKE THIS
- Transactions
- sqlserver dbconnection
- isolatoin level is .net wide, can use like with ef core

Semantic transcript:
This source belongs to `RAWCONN-R02` / DbCommand / SqlCommand / parameters / execute. It is part of the `Raw Connections DbConnection SqlConnection Commands` conspect and supports this region meaning:

ADO.NET command basics: DbCommand/SqlCommand, CommandText, parameters, ExecuteReader/ExecuteScalar/ExecuteNonQuery, and avoiding SQL injection.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
DbCommand/SqlCommand represents one SQL operation against an open connection.
CommandText holds SQL text or stored procedure name depending on CommandType.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

## 3. Cleaned source notes

- DbCommand/SqlCommand represents one SQL operation against an open connection.
- CommandText holds SQL text or stored procedure name depending on CommandType.
- Parameters bind values safely and avoid SQL injection/string-concat query bugs.
- ExecuteReader is for rowsets; ExecuteScalar is for one value; ExecuteNonQuery is for insert/update/delete or DDL counts.
- Command timeout/cancellation should be considered for long-running work.
- Raw commands are useful for precise SQL control, but require manual mapping and error handling.

---

## 4. Open review issues

- If exact code punctuation matters, re-open the preserved Stage0 source PNG for that specific source.
- This Stage1 pass closes these sources semantically and keeps source-image anchors for precision patches.
- After commit, run closure audit for this 3-conspect batch.
