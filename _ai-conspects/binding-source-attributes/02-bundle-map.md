# Stage 1 - Bundle Map

Conspect: `BINDING SOURCE ATTRIBUTES`  
Slug: `binding-source-attributes`  
Generated: 2026-06-01 18:44:00 UTC

## Direction check

Goal:
Convert `BINDING SOURCE ATTRIBUTES` into source-preserving AI-readable text.

Now:
Source bundle has been located and confirmed.

This step:
Create a stable bundle map and region scaffold without claiming verified screenshot transcript.

Why:
The screenshots are the primary knowledge source, so we need a clean source inventory before transcription.

Next:
1. Visually open the 3 copied images.
2. Transcribe visible screenshot text/code into `regions/R01-binding-source-attributes.md`.
3. Add cleaned notes and evidence table only after visual verification.

---

## Source bundle

```text
_ai-test-bundles-server/fw_Asp__Sheet__BINDING SOURCE ATTRIBUTES/
```

Confirmed source files:

```text
_ai-test-bundles-server/fw_Asp__Sheet__BINDING SOURCE ATTRIBUTES/full.svg
_ai-test-bundles-server/fw_Asp__Sheet__BINDING SOURCE ATTRIBUTES/note.md
_ai-test-bundles-server/fw_Asp__Sheet__BINDING SOURCE ATTRIBUTES/text-elements-raw.txt
_ai-test-bundles-server/fw_Asp__Sheet__BINDING SOURCE ATTRIBUTES/image-index.md
_ai-test-bundles-server/fw_Asp__Sheet__BINDING SOURCE ATTRIBUTES/image-index.csv
_ai-test-bundles-server/fw_Asp__Sheet__BINDING SOURCE ATTRIBUTES/images/
```

Source note:

```text
Canvases/new theory/fw_Asp/Sheet/BINDING SOURCE ATTRIBUTES.md
```

Source SVG:

```text
Canvases/new theory/fw_Asp/Sheet/BINDING SOURCE ATTRIBUTES.svg
```

---

## Image inventory

| # | fileId short | copied image | original wikilink | status | transcript status |
|---:|---|---|---|---|---|
| 1 | `cff6870722` | `images/001__cff6870722__Pasted Image 20260213035052_419.png` | `Pasted Image 20260213035052_419.png` | COPIED | not-started |
| 2 | `b2e22dce47` | `images/002__b2e22dce47__Pasted Image 20260213035055_533.png` | `Pasted Image 20260213035055_533.png` | COPIED | not-started |
| 3 | `bbda8972bc` | `images/003__bbda8972bc__Pasted Image 20260213035115_249.png` | `Pasted Image 20260213035115_249.png` | COPIED | not-started |

---

## Verification rule

Do not mark screenshot/code text as verified until the image is visually checked.

Current status:

```text
screenshots available: yes
screenshots visually checked in this stage: no
verified transcript: no
```

---

## Local raw-source check commands

From repo root:

```powershell
cd C:\Users\alexa\obs
git checkout ai-processing-excalidraw-conspects

$bundle = "_ai-test-bundles-server\fw_Asp__Sheet__BINDING SOURCE ATTRIBUTES"

Test-Path "$bundle\full.svg"
Test-Path "$bundle\image-index.csv"
Get-ChildItem "$bundle\images" -File
```
