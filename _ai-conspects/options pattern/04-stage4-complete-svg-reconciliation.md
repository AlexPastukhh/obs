# Stage4 — complete-SVG reconciliation and missing screenshot restoration

The previous options-pattern conspect was internally audited as 40/40 because the earlier exported SVG contained only 40 image uses. The newly supplied `options pattern(1).svg` contains 91 image uses while preserving the original 40 as the first 40 placements.

This correction pass:

- normalizes the source to `source/options pattern.svg`;
- preserves the original OPT01–OPT04 transcripts;
- restores and visually reviews S-041..S-091;
- adds OPT05, OPT06 and OPT07 transcripts;
- reconciles final coverage to 91/91;
- renames the folder from `_ai-conspects/options-pattern` to `_ai-conspects/options pattern` to match the SVG basename while ignoring the technical `(1)` upload suffix.

```text
Original audited source: 40 image uses
Complete source:         91 image uses
Restored in this pass:   51 image uses
Final processed:         91 image uses
Remaining missing:        0
```
