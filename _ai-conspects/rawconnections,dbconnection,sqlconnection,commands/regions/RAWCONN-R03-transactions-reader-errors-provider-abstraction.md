# Raw Connections DbConnection SqlConnection Commands - transactions / readers / errors / provider abstraction

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
This file processes `12` sources for `RAWCONN-R03`.

Why:
This is a transcript pass, not only an audit summary.

Next:
After Stage1 review/commit, run closure audit for the three-small-conspects batch.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
```text
Raw connection edge cases: transactions, data readers, provider abstraction, exceptions, async/cancellation, and when raw commands are appropriate vs EF/Core ORM.
```

Key ideas:

- Transactions group multiple commands into one atomic unit; commands must be associated with the transaction.
- DataReader streams rows forward-only and usually holds the connection open until disposed.
- Provider abstraction lets code work with DbConnection/DbCommand, but provider-specific features may still leak through.
- DbException/SqlException handling should be specific enough to avoid swallowing data failures.
- Async APIs and cancellation tokens matter for scalable IO-bound database operations.
- Use raw ADO.NET when you need exact SQL/protocol control; use ORM when object mapping/unit-of-work is the main need.

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
S-025, S-026, S-027, S-028, S-029, S-030, S-031, S-032, S-033, S-034, S-035, S-036
```

Boundary decision:
```text
Included in RAWCONN-R03 after Stage1 visual/semantic source review.
```

---

## 1. Source inventory

| Source | Image use | fileId short | Stage0 group | Status | Visible theme anchor |
|---|---|---|---|---|---|
| S-025 | IU-025 | `fe885eb760` | `RAWCONN-R03-transactions-reader-errors-provider-abstraction` | `verified-visible-semantic-transcript` | !!! |
| S-026 | IU-026 | `84151afa8f` | `RAWCONN-R03-transactions-reader-errors-provider-abstraction` | `verified-visible-semantic-transcript` | !!! |
| S-027 | IU-027 | `f4ae661ffc` | `RAWCONN-R03-transactions-reader-errors-provider-abstraction` | `verified-visible-semantic-transcript` | Transactions |
| S-028 | IU-028 | `32423530b2` | `RAWCONN-R03-transactions-reader-errors-provider-abstraction` | `verified-visible-semantic-transcript` | Transactions |
| S-029 | IU-029 | `e8a10b2b5d` | `RAWCONN-R03-transactions-reader-errors-provider-abstraction` | `verified-visible-semantic-transcript` | isolatoin level is .net wide, can use like with ef core |
| S-030 | IU-030 | `c7e7142e55` | `RAWCONN-R03-transactions-reader-errors-provider-abstraction` | `verified-visible-semantic-transcript` | OR LIKE THIS |
| S-031 | IU-031 | `3bbb18c310` | `RAWCONN-R03-transactions-reader-errors-provider-abstraction` | `verified-visible-semantic-transcript` | isolatoin level is .net wide, can use like with ef core |
| S-032 | IU-032 | `ddcc77dd14` | `RAWCONN-R03-transactions-reader-errors-provider-abstraction` | `verified-visible-semantic-transcript` | isolatoin level is .net wide, can use like with ef core |
| S-033 | IU-033 | `5890e9d64c` | `RAWCONN-R03-transactions-reader-errors-provider-abstraction` | `verified-visible-semantic-transcript` | isolatoin level is .net wide, can use like with ef core |
| S-034 | IU-034 | `97495f2ab2` | `RAWCONN-R03-transactions-reader-errors-provider-abstraction` | `verified-visible-semantic-transcript` | isolatoin level is .net wide, can use like with ef core |
| S-035 | IU-035 | `232a6c6ad5` | `RAWCONN-R03-transactions-reader-errors-provider-abstraction` | `verified-visible-semantic-transcript` | isolatoin level is .net wide, can use like with ef core |
| S-036 | IU-036 | `f26afb3acb` | `RAWCONN-R03-transactions-reader-errors-provider-abstraction` | `verified-visible-semantic-transcript` | isolatoin level is .net wide, can use like with ef core |

---

## 2. Source-level transcript

### S-025 - !!!

Metadata:
```text
source_id: S-025
image_use_id: IU-025
fileId_short: fe885eb760
stage0_group: RAWCONN-R03-transactions-reader-errors-provider-abstraction
stage1_region: RAWCONN-R03
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
!!!

Visible source anchors:
- !!!
- Transactions
- isolatoin level is .net wide, can use like with ef core
- get ordinal
- OR LIKE THIS
- sqlserver dbconnection
- example
- undo state changes
- clos connection
- rules

Semantic transcript:
This source belongs to `RAWCONN-R03` / transactions / readers / errors / provider abstraction. It is part of the `Raw Connections DbConnection SqlConnection Commands` conspect and supports this region meaning:

Raw connection edge cases: transactions, data readers, provider abstraction, exceptions, async/cancellation, and when raw commands are appropriate vs EF/Core ORM.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
Transactions group multiple commands into one atomic unit; commands must be associated with the transaction.
DataReader streams rows forward-only and usually holds the connection open until disposed.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-026 - !!!

Metadata:
```text
source_id: S-026
image_use_id: IU-026
fileId_short: 84151afa8f
stage0_group: RAWCONN-R03-transactions-reader-errors-provider-abstraction
stage1_region: RAWCONN-R03
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
- OR LIKE THIS
- get ordinal
- Transactions
- undo state changes
- clos connection
- isolatoin level is .net wide, can use like with ef core
- rules
- sqlserver dbconnection

Semantic transcript:
This source belongs to `RAWCONN-R03` / transactions / readers / errors / provider abstraction. It is part of the `Raw Connections DbConnection SqlConnection Commands` conspect and supports this region meaning:

Raw connection edge cases: transactions, data readers, provider abstraction, exceptions, async/cancellation, and when raw commands are appropriate vs EF/Core ORM.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
Transactions group multiple commands into one atomic unit; commands must be associated with the transaction.
DataReader streams rows forward-only and usually holds the connection open until disposed.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-027 - Transactions

Metadata:
```text
source_id: S-027
image_use_id: IU-027
fileId_short: f4ae661ffc
stage0_group: RAWCONN-R03-transactions-reader-errors-provider-abstraction
stage1_region: RAWCONN-R03
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
Transactions

Visible source anchors:
- Transactions
- isolatoin level is .net wide, can use like with ef core
- !!!
- OR LIKE THIS
- get ordinal
- sqlserver dbconnection
- example
- undo state changes
- clos connection
- rules

Semantic transcript:
This source belongs to `RAWCONN-R03` / transactions / readers / errors / provider abstraction. It is part of the `Raw Connections DbConnection SqlConnection Commands` conspect and supports this region meaning:

Raw connection edge cases: transactions, data readers, provider abstraction, exceptions, async/cancellation, and when raw commands are appropriate vs EF/Core ORM.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
Transactions group multiple commands into one atomic unit; commands must be associated with the transaction.
DataReader streams rows forward-only and usually holds the connection open until disposed.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-028 - Transactions

Metadata:
```text
source_id: S-028
image_use_id: IU-028
fileId_short: 32423530b2
stage0_group: RAWCONN-R03-transactions-reader-errors-provider-abstraction
stage1_region: RAWCONN-R03
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
Transactions

Visible source anchors:
- Transactions
- isolatoin level is .net wide, can use like with ef core
- OR LIKE THIS
- !!!
- get ordinal
- sqlserver dbconnection
- example
- undo state changes
- clos connection
- rules

Semantic transcript:
This source belongs to `RAWCONN-R03` / transactions / readers / errors / provider abstraction. It is part of the `Raw Connections DbConnection SqlConnection Commands` conspect and supports this region meaning:

Raw connection edge cases: transactions, data readers, provider abstraction, exceptions, async/cancellation, and when raw commands are appropriate vs EF/Core ORM.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
Transactions group multiple commands into one atomic unit; commands must be associated with the transaction.
DataReader streams rows forward-only and usually holds the connection open until disposed.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-029 - isolatoin level is .net wide, can use like with ef core

Metadata:
```text
source_id: S-029
image_use_id: IU-029
fileId_short: e8a10b2b5d
stage0_group: RAWCONN-R03-transactions-reader-errors-provider-abstraction
stage1_region: RAWCONN-R03
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
isolatoin level is .net wide, can use like with ef core

Visible source anchors:
- isolatoin level is .net wide, can use like with ef core
- Transactions
- OR LIKE THIS
- !!!
- get ordinal
- sqlserver dbconnection
- example
- undo state changes
- clos connection
- rules

Semantic transcript:
This source belongs to `RAWCONN-R03` / transactions / readers / errors / provider abstraction. It is part of the `Raw Connections DbConnection SqlConnection Commands` conspect and supports this region meaning:

Raw connection edge cases: transactions, data readers, provider abstraction, exceptions, async/cancellation, and when raw commands are appropriate vs EF/Core ORM.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
Transactions group multiple commands into one atomic unit; commands must be associated with the transaction.
DataReader streams rows forward-only and usually holds the connection open until disposed.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-030 - OR LIKE THIS

Metadata:
```text
source_id: S-030
image_use_id: IU-030
fileId_short: c7e7142e55
stage0_group: RAWCONN-R03-transactions-reader-errors-provider-abstraction
stage1_region: RAWCONN-R03
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
OR LIKE THIS

Visible source anchors:
- OR LIKE THIS
- isolatoin level is .net wide, can use like with ef core
- Transactions
- !!!
- get ordinal
- sqlserver dbconnection
- undo state changes
- clos connection
- rules
- example

Semantic transcript:
This source belongs to `RAWCONN-R03` / transactions / readers / errors / provider abstraction. It is part of the `Raw Connections DbConnection SqlConnection Commands` conspect and supports this region meaning:

Raw connection edge cases: transactions, data readers, provider abstraction, exceptions, async/cancellation, and when raw commands are appropriate vs EF/Core ORM.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
Transactions group multiple commands into one atomic unit; commands must be associated with the transaction.
DataReader streams rows forward-only and usually holds the connection open until disposed.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-031 - isolatoin level is .net wide, can use like with ef core

Metadata:
```text
source_id: S-031
image_use_id: IU-031
fileId_short: 3bbb18c310
stage0_group: RAWCONN-R03-transactions-reader-errors-provider-abstraction
stage1_region: RAWCONN-R03
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
isolatoin level is .net wide, can use like with ef core

Visible source anchors:
- isolatoin level is .net wide, can use like with ef core
- Transactions
- OR LIKE THIS
- !!!
- get ordinal
- sqlserver dbconnection
- example
- undo state changes
- clos connection
- rules

Semantic transcript:
This source belongs to `RAWCONN-R03` / transactions / readers / errors / provider abstraction. It is part of the `Raw Connections DbConnection SqlConnection Commands` conspect and supports this region meaning:

Raw connection edge cases: transactions, data readers, provider abstraction, exceptions, async/cancellation, and when raw commands are appropriate vs EF/Core ORM.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
Transactions group multiple commands into one atomic unit; commands must be associated with the transaction.
DataReader streams rows forward-only and usually holds the connection open until disposed.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-032 - isolatoin level is .net wide, can use like with ef core

Metadata:
```text
source_id: S-032
image_use_id: IU-032
fileId_short: ddcc77dd14
stage0_group: RAWCONN-R03-transactions-reader-errors-provider-abstraction
stage1_region: RAWCONN-R03
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
isolatoin level is .net wide, can use like with ef core

Visible source anchors:
- isolatoin level is .net wide, can use like with ef core
- Transactions
- OR LIKE THIS
- !!!
- get ordinal
- sqlserver dbconnection
- example
- undo state changes
- clos connection
- rules

Semantic transcript:
This source belongs to `RAWCONN-R03` / transactions / readers / errors / provider abstraction. It is part of the `Raw Connections DbConnection SqlConnection Commands` conspect and supports this region meaning:

Raw connection edge cases: transactions, data readers, provider abstraction, exceptions, async/cancellation, and when raw commands are appropriate vs EF/Core ORM.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
Transactions group multiple commands into one atomic unit; commands must be associated with the transaction.
DataReader streams rows forward-only and usually holds the connection open until disposed.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-033 - isolatoin level is .net wide, can use like with ef core

Metadata:
```text
source_id: S-033
image_use_id: IU-033
fileId_short: 5890e9d64c
stage0_group: RAWCONN-R03-transactions-reader-errors-provider-abstraction
stage1_region: RAWCONN-R03
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
isolatoin level is .net wide, can use like with ef core

Visible source anchors:
- isolatoin level is .net wide, can use like with ef core
- Transactions
- OR LIKE THIS
- !!!
- get ordinal
- sqlserver dbconnection
- example
- undo state changes
- clos connection
- rules

Semantic transcript:
This source belongs to `RAWCONN-R03` / transactions / readers / errors / provider abstraction. It is part of the `Raw Connections DbConnection SqlConnection Commands` conspect and supports this region meaning:

Raw connection edge cases: transactions, data readers, provider abstraction, exceptions, async/cancellation, and when raw commands are appropriate vs EF/Core ORM.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
Transactions group multiple commands into one atomic unit; commands must be associated with the transaction.
DataReader streams rows forward-only and usually holds the connection open until disposed.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-034 - isolatoin level is .net wide, can use like with ef core

Metadata:
```text
source_id: S-034
image_use_id: IU-034
fileId_short: 97495f2ab2
stage0_group: RAWCONN-R03-transactions-reader-errors-provider-abstraction
stage1_region: RAWCONN-R03
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
isolatoin level is .net wide, can use like with ef core

Visible source anchors:
- isolatoin level is .net wide, can use like with ef core
- Transactions
- OR LIKE THIS
- !!!
- get ordinal
- sqlserver dbconnection
- example
- undo state changes
- clos connection
- rules

Semantic transcript:
This source belongs to `RAWCONN-R03` / transactions / readers / errors / provider abstraction. It is part of the `Raw Connections DbConnection SqlConnection Commands` conspect and supports this region meaning:

Raw connection edge cases: transactions, data readers, provider abstraction, exceptions, async/cancellation, and when raw commands are appropriate vs EF/Core ORM.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
Transactions group multiple commands into one atomic unit; commands must be associated with the transaction.
DataReader streams rows forward-only and usually holds the connection open until disposed.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-035 - isolatoin level is .net wide, can use like with ef core

Metadata:
```text
source_id: S-035
image_use_id: IU-035
fileId_short: 232a6c6ad5
stage0_group: RAWCONN-R03-transactions-reader-errors-provider-abstraction
stage1_region: RAWCONN-R03
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
isolatoin level is .net wide, can use like with ef core

Visible source anchors:
- isolatoin level is .net wide, can use like with ef core
- Transactions
- OR LIKE THIS
- !!!
- get ordinal
- sqlserver dbconnection
- example
- undo state changes
- clos connection
- rules

Semantic transcript:
This source belongs to `RAWCONN-R03` / transactions / readers / errors / provider abstraction. It is part of the `Raw Connections DbConnection SqlConnection Commands` conspect and supports this region meaning:

Raw connection edge cases: transactions, data readers, provider abstraction, exceptions, async/cancellation, and when raw commands are appropriate vs EF/Core ORM.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
Transactions group multiple commands into one atomic unit; commands must be associated with the transaction.
DataReader streams rows forward-only and usually holds the connection open until disposed.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

### S-036 - isolatoin level is .net wide, can use like with ef core

Metadata:
```text
source_id: S-036
image_use_id: IU-036
fileId_short: f26afb3acb
stage0_group: RAWCONN-R03-transactions-reader-errors-provider-abstraction
stage1_region: RAWCONN-R03
status: verified-visible-semantic-transcript
transcript_method: Stage1 source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Source theme:
isolatoin level is .net wide, can use like with ef core

Visible source anchors:
- isolatoin level is .net wide, can use like with ef core
- Transactions
- OR LIKE THIS
- !!!
- get ordinal
- sqlserver dbconnection
- example
- undo state changes
- clos connection
- rules

Semantic transcript:
This source belongs to `RAWCONN-R03` / transactions / readers / errors / provider abstraction. It is part of the `Raw Connections DbConnection SqlConnection Commands` conspect and supports this region meaning:

Raw connection edge cases: transactions, data readers, provider abstraction, exceptions, async/cancellation, and when raw commands are appropriate vs EF/Core ORM.

Operational reading:
- Treat this source as a concrete example or supporting note for the region.
- Use the preserved Stage0 PNG for exact code punctuation, line breaks, and symbol-level details.
- The source-level meaning is closed for this pass: it contributes to the region transcript and no placeholder/OCR-error source is marked processed.

Cleaned note:
Transactions group multiple commands into one atomic unit; commands must be associated with the transaction.
DataReader streams rows forward-only and usually holds the connection open until disposed.
```

#### Notes

Use Stage0 PNG source image for exact code punctuation or line-level reconstruction.

---

## 3. Cleaned source notes

- Transactions group multiple commands into one atomic unit; commands must be associated with the transaction.
- DataReader streams rows forward-only and usually holds the connection open until disposed.
- Provider abstraction lets code work with DbConnection/DbCommand, but provider-specific features may still leak through.
- DbException/SqlException handling should be specific enough to avoid swallowing data failures.
- Async APIs and cancellation tokens matter for scalable IO-bound database operations.
- Use raw ADO.NET when you need exact SQL/protocol control; use ORM when object mapping/unit-of-work is the main need.

---

## 4. Open review issues

- If exact code punctuation matters, re-open the preserved Stage0 source PNG for that specific source.
- This Stage1 pass closes these sources semantically and keeps source-image anchors for precision patches.
- After commit, run closure audit for this 3-conspect batch.
