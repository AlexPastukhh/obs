# Conspect Processing Rules

Generated: 2026-06-01 17:21:45 UTC

This file contains compact workflow rules for AI chats that process Excalidraw conspects into source-preserving text.

---

## 1. Folder ownership

Processed conspect work is separated by folders:

```text
_ai-conspects/<conspect-slug>/
```

One chat should normally work inside one conspect folder.

Example:

```text
_ai-conspects/react-query-rquery/
_ai-conspects/asp-jsondocument-jsonnode-jsonelement/
_ai-conspects/css-stacking-contexts-zindex/
```

Do not edit another conspect folder unless the user explicitly asks.

---

## 2. Source availability

Raw source and exported bundles may exist on:

```text
ai-processing-excalidraw-conspects
```

Before asking the user for screenshots manually, check whether the raw branch already has:

```text
Canvases/.../*.svg
_ai-test-bundles-server/<bundle-name>/
```

A bundle may contain:

```text
full.svg
image-index.csv
images/*.png
text-elements-raw.txt
```

Bundles are incremental. Not all conspects are guaranteed to have a full bundle yet.

---

## 3. Direction check

Every substantial response about conspect processing should include a short direction check.

Use this compact format:

```md
## Direction check

Goal:
`<main goal>`

Now:
`<where we are>`

This step:
`<what this response/archive does>`

Why:
`<how this moves the goal forward>`

Next:
`<1-3 likely next steps>`
```

Keep it short. Its purpose is to maintain direction, not to create a long report.

Good example:

```md
## Direction check

Goal:
Convert Excalidraw conspects into source-preserving text for AI repetition.

Now:
`react-query-rquery`: R10 Mutations done; R07 is next.

This step:
Check/source R07 materials before transcript work.

Why:
Prevents guessing and keeps transcript tied to real SVG/images.

Next:
1. confirm raw bundle/source;
2. transcribe R07 region;
3. generate evidence/hooks after transcript.
```

---

## 4. Archive granularity

Do not create one user-facing archive per 8-10 screenshots.

Prefer:

```text
one conspect stage map/index
one screenshot mapping pass
one full region transcript
one full region correction/consolidation
one workflow/protocol update
```

Avoid:

```text
tiny overlay archives
minor batch archives
archives that edit multiple conspects at once
```

---

## 5. Verification rule

Do not claim screenshot text/code is verified unless it was visually checked.

Allowed statuses:

```text
verified
verified-from-sheet-crop
verified-visible-partial
scaffold/inventory only
pending visual verification
ocr-assisted draft / needs visual verification
```

If source is cut off or unclear, mark it explicitly.

Do not put corrupted OCR/mojibake into the main readable transcript.

---

## 6. Shared files

Shared rule files at the root of `_ai-conspects/` should be edited only for workflow/protocol changes.

Normal conspect work should stay inside:

```text
_ai-conspects/<conspect-slug>/
```

---

## 7. Diff review commands

Do not print long full diffs in the console.

Use:

```powershell
git diff --stat -- _ai-conspects
git --no-pager diff -- _ai-conspects | Set-Clipboard
```

Optional file export:

```powershell
git --no-pager diff -- _ai-conspects > C:\Users\alexa\Downloads\ai-conspects-last-diff.patch
```
