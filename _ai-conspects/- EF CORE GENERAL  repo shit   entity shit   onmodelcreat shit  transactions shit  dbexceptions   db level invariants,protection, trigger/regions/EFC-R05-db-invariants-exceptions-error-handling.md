# EFC-R05 - DB invariants / exceptions / error handling

Conspect: `ef-core-general`  
File type: **source-level semantic transcript**  
Stage: **2 / transcript v001**  
Generated: 2026-06-13 05:40:30 UTC

---

## Direction check

Goal:
Close the remaining EF Core General Stage0 candidates after Stage1.

Done:
Stage1 processed R01/R02/R03 and left 11 candidates.

Now:
This file processes `5` sources for `EFC-R05`.

Why:
This is the second transcript pass, not only an audit summary.

Next:
After Stage2 review/commit, run EF Core General closure audit.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
```text
EF Core exception guide: SaveChanges failures, DbUpdateException vs DbUpdateConcurrencyException, provider-specific inner exceptions, transaction commit failure, RetryLimitExceededException, and catch ordering.
```

Key ideas:

- Most common EF-level SaveChanges failures are DbUpdateException and DbUpdateConcurrencyException.
- Provider-specific failures such as SQL Server SqlException are usually found through inner exceptions.
- Commit failure is often provider-specific and is not usually DbUpdateConcurrencyException.
- RetryLimitExceededException appears when EF execution strategy exhausts configured retries.
- Catch specific EF exceptions before a general DbException / provider exception path.
- If an operation is non-transient, EF does not keep retrying forever; the original/underlying exception path may surface.

Reading quality:
```text
Stage2 uses source-level semantic transcript from visible source images/contact sheets.
It is stronger than a coverage-only summary, but it is not a verbatim code-punctuation transcript.
For exact C# punctuation, use the preserved Stage0 PNG source images.
No OCR-timeout, image-missing, empty-visible-text, or placeholder transcript is used.
```

---

## 0.2 Coverage / boundary review

Included source IDs:
```text
S-061, S-062, S-063, S-064, S-065
```

Boundary decision:
```text
Included in EFC-R05 after Stage2 visual/semantic source review.
```

---

## 1. Source inventory

| Source | Image use | fileId short | Stage0 group | Status | Theme |
|---|---|---|---|---|---|
| S-061 | IU-061 | `ea9b1ba7b6` | `EFC-R05-db-invariants-exceptions-error-handling` | `verified-visible-semantic-transcript` | Exception guide. |
| S-062 | IU-062 | `5310695bc8` | `EFC-R05-db-invariants-exceptions-error-handling` | `verified-visible-semantic-transcript` | 2) Transaction commit failure. |
| S-063 | IU-063 | `bb49429aea` | `EFC-R05-db-invariants-exceptions-error-handling` | `verified-visible-semantic-transcript` | 3) Retries exhausted. |
| S-064 | IU-064 | `601cdc59fb` | `EFC-R05-db-invariants-exceptions-error-handling` | `verified-visible-semantic-transcript` | What to catch. |
| S-065 | IU-065 | `bf9f234ad6` | `EFC-R05-db-invariants-exceptions-error-handling` | `verified-visible-semantic-transcript` | RetryLimitExceededException is the general EF Core exception for the execution strategy retrying an action more times than configured. |

---

## 2. Source-level transcript

### S-061 - Exception guide.

Metadata:
```text
source_id: S-061
image_use_id: IU-061
fileId_short: ea9b1ba7b6
stage0_group: EFC-R05-db-invariants-exceptions-error-handling
stage2_region: EFC-R05
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Exception guide.

1) SaveChanges failure.

Most common EF-level exceptions when saving:
- DbUpdateException: general save failure.
- DbUpdateConcurrencyException: optimistic concurrency conflict, usually "unexpected number of rows affected."

Under those, there is often an inner provider exception such as:
- SqlException for SQL Server.
- more generally, a provider-specific DbException.

Practical rule:
SaveChanges failed -> usually catch DbUpdateException and maybe DbUpdateConcurrencyException separately -> inspect InnerException for provider-specific details.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-062 - 2) Transaction commit failure.

Metadata:
```text
source_id: S-062
image_use_id: IU-062
fileId_short: 5310695bc8
stage0_group: EFC-R05-db-invariants-exceptions-error-handling
stage2_region: EFC-R05
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
2) Transaction commit failure.

For explicit CommitAsync failures, the exception is often provider-specific, such as SQL Server SqlException, or another database exception type.

Commit is a database/connection operation rather than an EF change-tracker issue.

If EF's transaction and resilience docs focus on commit behavior, while save exceptions are often DbUpdateException / DbUpdateConcurrencyException, do not assume every commit failure is a DbUpdateException.

Practical rule:
CommitAsync failed -> often provider exception / DbException / SqlException -> not usually DbUpdateException.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-063 - 3) Retries exhausted.

Metadata:
```text
source_id: S-063
image_use_id: IU-063
fileId_short: bb49429aea
stage0_group: EFC-R05-db-invariants-exceptions-error-handling
stage2_region: EFC-R05
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
3) Retries exhausted.

When the execution strategy retries and still cannot succeed within the configured limit, EF throws RetryLimitExceededException.

This applies to execution strategy operations such as ExecuteAsync(...) and ExecuteInTransactionAsync(...), and by the same model to returned tasks if the retry limit is reached.

Question:
When VerifySucceeded from ExecuteInTransaction fails multiple times and there are no retries left?

Practical final exception:
RetryLimitExceededException if the operation kept failing/retrying until the configured retry limit was exceeded.

If the error is non-transient, EF does not keep retrying forever; the underlying task fault can be returned, and the returned task becomes failed.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-064 - What to catch.

Metadata:
```text
source_id: S-064
image_use_id: IU-064
fileId_short: 601cdc59fb
stage0_group: EFC-R05-db-invariants-exceptions-error-handling
stage2_region: EFC-R05
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
What to catch.

Good practical order:

try
{
    // save / transaction / execution strategy work
}
catch (DbUpdateConcurrencyException ex)
{
    // concurrency conflict
}
catch (DbUpdateException ex)
{
    // general EF save failure
}
catch (RetryLimitExceededException ex)
{
    // transient retries exhausted
}
catch (DbException ex) // or SqlException if SQL Server-specific
{
    // transaction commit / provider-level DB failure
}

Meaning:
Catch the EF-specific cases before the broader database/provider catch path.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-065 - RetryLimitExceededException is the general EF Core exception for the execution strategy retrying an action more times than configured.

Metadata:
```text
source_id: S-065
image_use_id: IU-065
fileId_short: bf9f234ad6
stage0_group: EFC-R05-db-invariants-exceptions-error-handling
stage2_region: EFC-R05
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
RetryLimitExceededException is the general EF Core exception for the execution strategy retrying an action more times than configured.

For your cases:
- ExecuteAsync(...) with transient failures and retries exhausted -> RetryLimitExceededException.
- ExecuteInTransactionAsync(...) with a clear non-success path that keeps retrying until limit is hit -> RetryLimitExceededException.
- ExecuteInTransactionAsync(...) with an ambiguous commit path where verifySucceeded keeps determining "not succeeded" and retries are exhausted -> again, general "retry limit exceeded" outcome is RetryLimitExceededException.

Nuance:
If the failure is treated as non-transient / not retryable, EF does not keep retrying to the limit; in that case you get the underlying exception path instead, not RetryLimitExceededException.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

## 3. Cleaned source notes

- Most common EF-level SaveChanges failures are DbUpdateException and DbUpdateConcurrencyException.
- Provider-specific failures such as SQL Server SqlException are usually found through inner exceptions.
- Commit failure is often provider-specific and is not usually DbUpdateConcurrencyException.
- RetryLimitExceededException appears when EF execution strategy exhausts configured retries.
- Catch specific EF exceptions before a general DbException / provider exception path.
- If an operation is non-transient, EF does not keep retrying forever; the original/underlying exception path may surface.

---

## 4. Open review issues

- If exact code punctuation matters, re-open the preserved Stage0 source PNG for that specific source.
- This Stage2 pass closes the remaining sources semantically and keeps source-image anchors for precision patches.
- After commit, run closure audit.
