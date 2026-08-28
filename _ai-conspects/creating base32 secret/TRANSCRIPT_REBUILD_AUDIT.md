# Transcript rebuild audit

Status: rebuilt package v005.

## Scope

This folder was included in the four-conspect transcript rebuild after the previous generated package was rejected for mojibake/OCR corruption.

## Rules for accepting this package

- Treat `regions/full-source-near-literal-*` as a source-indexed study transcript, not a forensic OCR dump.
- Code-heavy and symbol-heavy blocks are marked `medium`.
- The authoritative source remains the uploaded/repository SVG screenshots.
- Any code used for implementation must be visually checked against the screenshot/source before copying.
- This package is suitable for repetition structure and source navigation, but not for byte-for-byte code quotation.

## What was fixed from the rejected package

- UTF-8 mojibake artifacts in generated markdown.
- Trailing whitespace that failed `git diff --check`.
- The command wrapper no longer treats harmless Git stderr warnings as fatal.
- Confidence labels no longer overclaim `high` after automated rebuild.

## Folder

```text
_ai-conspects/creating base32 secret
```
