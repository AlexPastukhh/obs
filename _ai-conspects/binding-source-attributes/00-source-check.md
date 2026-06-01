# Source Check - BINDING SOURCE ATTRIBUTES

Generated: 2026-06-01 18:38:45 UTC

## Direction check

Goal:
Convert `BINDING SOURCE ATTRIBUTES` into source-preserving AI-readable text.

Now:
The target conspect is selected and its raw source bundle was found on the raw source branch.

This step:
Record source availability and prepare the per-conspect workspace under `_ai-conspects/binding-source-attributes/`.

Why:
This prevents asking for screenshots manually when the raw bundle already contains `full.svg`, `image-index.csv`, and copied images.

Next:
1. Open/read the 3 images from the bundle.
2. Build a small spatial map from `full.svg`.
3. Create the first source-preserving transcript file under `regions/`.

---

## Scope

Work only inside:

```text
_ai-conspects/binding-source-attributes/
```

Do not edit:

```text
_ai-conspects/react-query-rquery/
```

unless the user explicitly asks to transfer/fix that conspect.

---

## Raw source location

Repository:

```text
AlexPastukhh/obs
```

Raw branch:

```text
ai-processing-excalidraw-conspects
```

Bundle:

```text
_ai-test-bundles-server/fw_Asp__Sheet__BINDING SOURCE ATTRIBUTES/
```

Source Excalidraw note:

```text
Canvases/new theory/fw_Asp/Sheet/BINDING SOURCE ATTRIBUTES.md
```

Source SVG:

```text
Canvases/new theory/fw_Asp/Sheet/BINDING SOURCE ATTRIBUTES.svg
```

---

## Files checked

| File | Status | Notes |
|---|---|---|
| `full.svg` | accessible | visual map source; viewBox observed as `0 0 1098 1076.7777608235483` |
| `note.md` | accessible | Excalidraw metadata + embedded file mapping |
| `text-elements-raw.txt` | accessible | embedded file mapping |
| `image-index.md` | accessible | names source note/source SVG and image table |
| `image-index.csv` | accessible | 3 copied images |
| `images/*.png` | indexed, not visually opened here | image rows confirmed from index; visual reading deferred |

---

## Image index summary

| # | fileId short | copied image | status |
|---:|---|---|---|
| 1 | `cff6870722` | `images/001__cff6870722__Pasted Image 20260213035052_419.png` | COPIED |
| 2 | `b2e22dce47` | `images/002__b2e22dce47__Pasted Image 20260213035055_533.png` | COPIED |
| 3 | `bbda8972bc` | `images/003__bbda8972bc__Pasted Image 20260213035115_249.png` | COPIED |

---

## Status

```text
source-bundle-available
image-count: 3
visual-image-reading: not done yet
transcript: not started
```

Because the bundle has only 3 images, the next archive can probably be a full per-conspect transcript rather than a multi-stage region system.

---

## Reliability note

Do not claim screenshot/code content is verified until images are visually opened.

Current evidence only confirms file availability and image inventory, not screenshot content.
