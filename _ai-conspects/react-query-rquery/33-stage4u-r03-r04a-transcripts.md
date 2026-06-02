# Stage 4u - R03 + R04A Transcripts v001

Generated: 2026-06-02 00:13:59 UTC

## Direction check

Goal:
Try a larger step after R03/R04 boundary review while keeping region files separate.

Done:
Stage4t created combined R03/R04 boundary review.

This step:
Add two transcripts in one archive:
- R03 notifyOnChangeProps / select / structural sharing
- R04A staleness / static staleTime / refetch triggers / retry

Why:
This doubles the working scope without mixing unrelated content in a single region file.

Boundary correction:
`S-069` moved from R04A candidate to R04B because local review shows it is active/inactive queries + gcTime.

Next:
1. apply and review diff;
2. commit;
3. process R04B.
