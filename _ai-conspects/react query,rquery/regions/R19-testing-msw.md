# R19 - Testing / MSW

Conspect: `react query,rquery`  
File type: **verified region/correction transcript**  
Stage: **6b / transcript v001**  
Generated: 2026-06-02 12:49:41 UTC

---

## Direction check

Goal:
Process the first transcript pass after Stage6a boundary review.

Done:
Stage6a split S-384..S-537 into candidate groups.

Now:
This file processes `3` sources for `R19`.

Why:
The cards are readable and were locally rechecked before marking processed.

Next:
After Stage6b review/commit, process Stage6c R20 + R22.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
```text
Testing setup with a fresh QueryClient per test, renderWithClient helper, disabled retries, and network-layer mocking with MSW.
```

Key ideas:

- Tests should usually create a fresh QueryClient per test.
- Retries are usually disabled in tests to avoid slow/flaky tests.
- `renderWithClient` wraps UI in a QueryClientProvider with a test client.
- Prefer mocking the network layer or API function with MSW/seeded cache instead of mocking `useQuery` directly.

Reading quality:
```text
Visible text was read from Stage6a source images/contact sheets with OCR assistance.
No OCR-timeout, image-missing, empty-visible-text, or placeholder transcript is used.
If a later review finds a small OCR artifact, fix that source with a precision patch.
```

---

## 0.2 Coverage / boundary review

Included source IDs:
```text
S-430, S-441, S-445
```

Boundary decision:
```text
Included in R19 after Stage6b local visual/semantic recheck.
```

---

## 1. Source inventory

| Source | Image use | fileId short | Stage6a group | Status | Theme |
|---|---|---|---|---|---|
| S-430 | IU-430 | `05b7498309` | `R19` | `verified-visible-ocr-assisted` | 36. Testing |
| S-441 | IU-441 | `d086ba0a5e` | `R19` | `verified-visible-ocr-assisted` | function renderWithClient(ui: React.ReactElement) { |
| S-445 | IU-445 | `a3a53e14ef` | `R19` | `verified-visible-ocr-assisted` | 36.2 Mock the network layer, not useQuery |

---

## 2. Source transcript

### S-430 - 36. Testing

Metadata:
```text
source_id: S-430
image_use_id: IU-430
fileId_short: 05b7498309
image_file: S-430__05b7498309.png
stage6a_group: R19
stage6b_region: R19
status: verified-visible-ocr-assisted
transcript_method: Stage6b visible read from source image; OCR-assisted
```

#### Verified visible text
```text
36. Testing
36.1 Fresh client per test
Do not share one client across all tests unless you reset it carefully.
‘> TypeScript ‘eo
import { QueryClient, QueryClientProvider } from ‘@tanstack/react-query'
import { render } from ‘@testing-library/react'
function createTestQueryClient() {
return new QueryClient({
defaultOptions: {
queries: {
retry: false,
ts
ts
3) NY
}
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-441 - function renderWithClient(ui: React.ReactElement) {

Metadata:
```text
source_id: S-441
image_use_id: IU-441
fileId_short: d086ba0a5e
image_file: S-441__d086ba0a5e.png
stage6a_group: R19
stage6b_region: R19
status: verified-visible-ocr-assisted
transcript_method: Stage6b visible read from source image; OCR-assisted
```

#### Verified visible text
```text
function renderWithClient(ui: React.ReactElement) {
const testClient = createTestQueryClient()
return render(
<QueryClientProvider client={testClient}>{ui}</QueryClientProvider>
)
}
Retries are usually disabled in tests.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-445 - 36.2 Mock the network layer, not useQuery

Metadata:
```text
source_id: S-445
image_use_id: IU-445
fileId_short: a3a53e14ef
image_file: S-445__a3a53e14ef.png
stage6a_group: R19
stage6b_region: R19
status: verified-visible-ocr-assisted
transcript_method: Stage6b visible read from source image; OCR-assisted
```

#### Verified visible text
```text
36.2 Mock the network layer, not useQuery
Preferred:
e MSW
e mocked API module / query function
e seeded cache
Avoid mocking useQuery directly because it is brittle and easy to fake incorrectly.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

## 3. Cleaned source notes

- Tests should usually create a fresh QueryClient per test.
- Retries are usually disabled in tests to avoid slow/flaky tests.
- `renderWithClient` wraps UI in a QueryClientProvider with a test client.
- Prefer mocking the network layer or API function with MSW/seeded cache instead of mocking `useQuery` directly.

---

## 4. Evidence table

| Claim | Evidence | Confidence |
|---|---|---|
| Tests should usually create a fresh QueryClient per test. | S-430, S-441, S-445 | medium-high |
| Retries are usually disabled in tests to avoid slow/flaky tests. | S-430, S-441, S-445 | medium-high |
| `renderWithClient` wraps UI in a QueryClientProvider with a test client. | S-430, S-441, S-445 | medium-high |
| Prefer mocking the network layer or API function with MSW/seeded cache instead of mocking `useQuery` directly. | S-430, S-441, S-445 | medium-high |

---

## 5. Open review issues

- This file is valid for Stage6b because every included source has visible text and no OCR-placeholder processed source.
- Remaining Stage6a groups are not closed by this file: main R20/R22 and R21/R23.
- Stage6 closure audit must run after Stage6b/Stage6c/Stage6d are complete.
