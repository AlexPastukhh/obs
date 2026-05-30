# Repeat Chains 2026-02..2026-04 — active shifted
Status: draft / active recovery source.
This file contains active repeat chains after the 2026-05 break shift and the 2026-05-31 active start delay.
Rules:

```text
- Completed stages before 2026-04-28 stay as history.
- First pending stage on or after 2026-04-28 was shifted by +1 calendar month.
- Follow-up explicit decision: active planned dates on/after 2026-05-28 are delayed by +3 days so 2026-05-28 becomes 2026-05-31.
- Later stages are recalculated/preserved by exact day gaps: +5, +10, +20, +40, +80.
- Only real processing/general-note units are listed. Missing dates are valid holes.
```
Recovery notes:

```text
- Recovery/2026-05 break - active chain shift.md
- Recovery/2026-05-31 active chain delay.md
```

Possible holes to verify:

```text
March: 2603, 2703, 2803, 2903
April: 1304, 2104, 2304, 2404, 2504, 2604, 2704
```

## Pre-February standalone numbered chains
| Unit | Processing | +5 | +10 | +20 | +40 | +80 | Shift |
|---|---:|---:|---:|---:|---:|---:|---|
| `c# 1` | 2026-02-03 | 2026-02-08 | 2026-02-18 | 2026-03-10 | 2026-04-19 | 2026-08-11 | shift from +80; +3d active delay |
| `c# 2` | 2026-02-03 | 2026-02-08 | 2026-02-18 | 2026-03-10 | 2026-04-19 | 2026-08-11 | shift from +80; +3d active delay |
| `c# 3` | 2026-02-04 | 2026-02-09 | 2026-02-19 | 2026-03-11 | 2026-04-20 | 2026-08-12 | shift from +80; +3d active delay |
| `asp 1` | 2026-02-04 | 2026-02-09 | 2026-02-19 | 2026-03-11 | 2026-04-20 | 2026-08-12 | shift from +80; +3d active delay |
| `asp 2` | 2026-02-05 | 2026-02-10 | 2026-02-20 | 2026-03-12 | 2026-04-21 | 2026-08-13 | shift from +80; +3d active delay |
| `js 1` | 2026-02-05 | 2026-02-10 | 2026-02-20 | 2026-03-12 | 2026-04-21 | 2026-08-13 | shift from +80; +3d active delay |
| `js 2` | 2026-02-06 | 2026-02-11 | 2026-02-21 | 2026-03-13 | 2026-04-22 | 2026-08-14 | shift from +80; +3d active delay |
| `regex 1` | 2026-02-06 | 2026-02-11 | 2026-02-21 | 2026-03-13 | 2026-04-22 | 2026-08-14 | shift from +80; +3d active delay |
| `regex 1.1` | 2026-02-07 | 2026-02-12 | 2026-02-22 | 2026-03-14 | 2026-04-23 | 2026-08-15 | shift from +80; +3d active delay |
| `regex 2` | 2026-02-07 | 2026-02-12 | 2026-02-22 | 2026-03-14 | 2026-04-23 | 2026-08-15 | shift from +80; +3d active delay |
| `sql 1` | 2026-02-08 | 2026-02-13 | 2026-02-23 | 2026-03-15 | 2026-04-24 | 2026-08-16 | shift from +80; +3d active delay |
| `sql 2` | 2026-02-08 | 2026-02-13 | 2026-02-23 | 2026-03-15 | 2026-04-24 | 2026-08-16 | shift from +80; +3d active delay |
| `sql 3` | 2026-02-09 | 2026-02-14 | 2026-02-24 | 2026-03-16 | 2026-04-25 | 2026-08-17 | shift from +80; +3d active delay |
| `react 1` | 2026-02-09 | 2026-02-14 | 2026-02-24 | 2026-03-16 | 2026-04-25 | 2026-08-17 | shift from +80; +3d active delay |
| `react 2` | 2026-02-10 | 2026-02-15 | 2026-02-25 | 2026-03-17 | 2026-04-26 | 2026-08-18 | shift from +80; +3d active delay |
| `css 1` | 2026-02-10 | 2026-02-15 | 2026-02-25 | 2026-03-17 | 2026-04-26 | 2026-08-18 | shift from +80; +3d active delay |
| `css 2` | 2026-02-11 | 2026-02-16 | 2026-02-26 | 2026-03-18 | 2026-04-27 | 2026-08-19 | shift from +80; +3d active delay |

## February legacy chains
| Unit | Processing | +5 | +10 | +20 | +40 | +80 | Shift |
|---|---:|---:|---:|---:|---:|---:|---|
| `1202 ADDED ASP REACT CSS REGEX ASP TEST SQL` | 2026-02-12 | 2026-02-17 | 2026-02-27 | 2026-03-19 | 2026-05-31 | 2026-08-19 | shift from +40; +3d active delay |
| `1302 added css asp react progbasics c#` | 2026-02-13 | 2026-02-18 | 2026-02-28 | 2026-03-20 | 2026-06-01 | 2026-08-20 | shift from +40; +3d active delay |
| `1402 added asp css sql regex` | 2026-02-14 | 2026-02-19 | 2026-03-01 | 2026-03-21 | 2026-06-02 | 2026-08-21 | shift from +40; +3d active delay |
| `1502 ADDED ASP` | 2026-02-15 | 2026-02-20 | 2026-03-02 | 2026-03-22 | 2026-06-04 | 2026-08-23 | shift from +40; +3d active delay |
| `1602 ADDED ASP` | 2026-02-16 | 2026-02-21 | 2026-03-03 | 2026-03-23 | 2026-06-05 | 2026-08-24 | shift from +40; +3d active delay |
| `1702 added asp sharp` | 2026-02-17 | 2026-02-22 | 2026-03-04 | 2026-03-24 | 2026-06-06 | 2026-08-25 | shift from +40; +3d active delay |
| `1802 added frwrkqs ASP` | 2026-02-18 | 2026-02-23 | 2026-03-05 | 2026-03-25 | 2026-06-07 | 2026-08-26 | shift from +40; +3d active delay |
| `1902 added asp` | 2026-02-19 | 2026-02-24 | 2026-03-06 | 2026-03-26 | 2026-06-08 | 2026-08-27 | shift from +40; +3d active delay |
| `2002 added asp` | 2026-02-20 | 2026-02-25 | 2026-03-07 | 2026-03-27 | 2026-06-09 | 2026-08-28 | shift from +40; +3d active delay |
| `2102 added sharp asp jsts` | 2026-02-21 | 2026-02-26 | 2026-03-08 | 2026-03-28 | 2026-06-10 | 2026-08-29 | shift from +40; +3d active delay |
| `2202 added sql asp` | 2026-02-22 | 2026-02-27 | 2026-03-09 | 2026-03-29 | 2026-06-11 | 2026-08-30 | shift from +40; +3d active delay |
| `2302 ADDED FRWRK react asp sharp` | 2026-02-23 | 2026-02-28 | 2026-03-10 | 2026-03-30 | 2026-06-12 | 2026-08-31 | shift from +40; +3d active delay |
| `2402 ADDED SQL ASP SHARP` | 2026-02-24 | 2026-03-01 | 2026-03-11 | 2026-03-31 | 2026-06-13 | 2026-09-01 | shift from +40; +3d active delay |
| `2502 ADDED ASP JS` | 2026-02-25 | 2026-03-02 | 2026-03-12 | 2026-04-01 | 2026-06-14 | 2026-09-02 | shift from +40; +3d active delay |
| `2602 added asp` | 2026-02-26 | 2026-03-03 | 2026-03-13 | 2026-04-02 | 2026-06-15 | 2026-09-03 | shift from +40; +3d active delay |
| `2802 ADDED ASP SHARP` | 2026-02-28 | 2026-03-05 | 2026-03-15 | 2026-04-04 | 2026-06-17 | 2026-09-05 | shift from +40; +3d active delay |

## March legacy chains
| Unit | Processing | +5 | +10 | +20 | +40 | +80 | Shift |
|---|---:|---:|---:|---:|---:|---:|---|
| `0103 ADDED PROGBAS ASP REACT` | 2026-03-01 | 2026-03-06 | 2026-03-16 | 2026-04-05 | 2026-06-18 | 2026-09-06 | shift from +40; +3d active delay |
| `0203 added asp progbas` | 2026-03-02 | 2026-03-07 | 2026-03-17 | 2026-04-06 | 2026-06-19 | 2026-09-07 | shift from +40; +3d active delay |
| `0303 added asp` | 2026-03-03 | 2026-03-08 | 2026-03-18 | 2026-04-07 | 2026-06-20 | 2026-09-08 | shift from +40; +3d active delay |
| `0403 added asp progbasics` | 2026-03-04 | 2026-03-09 | 2026-03-19 | 2026-04-08 | 2026-06-21 | 2026-09-09 | shift from +40; +3d active delay |
| `0503 added asp` | 2026-03-05 | 2026-03-10 | 2026-03-20 | 2026-04-09 | 2026-06-22 | 2026-09-10 | shift from +40; +3d active delay |
| `0603 added asp sql regex frwrk sharp progbasics jsts` | 2026-03-06 | 2026-03-11 | 2026-03-21 | 2026-04-10 | 2026-06-23 | 2026-09-11 | shift from +40; +3d active delay |
| `0703 added asp frwrk SHARP REACT` | 2026-03-07 | 2026-03-12 | 2026-03-22 | 2026-04-11 | 2026-06-24 | 2026-09-12 | shift from +40; +3d active delay |
| `0803 added css asp sharp react` | 2026-03-08 | 2026-03-13 | 2026-03-23 | 2026-04-12 | 2026-06-25 | 2026-09-13 | shift from +40; +3d active delay |
| `0903 added prgb asp react` | 2026-03-09 | 2026-03-14 | 2026-03-24 | 2026-04-13 | 2026-06-26 | 2026-09-14 | shift from +40; +3d active delay |
| `1003 react asp` | 2026-03-10 | 2026-03-15 | 2026-03-25 | 2026-04-14 | 2026-06-27 | 2026-09-15 | shift from +40; +3d active delay |
| `1103 added asp react` | 2026-03-11 | 2026-03-16 | 2026-03-26 | 2026-04-15 | 2026-06-28 | 2026-09-16 | shift from +40; +3d active delay |
| `1203 added asp` | 2026-03-12 | 2026-03-17 | 2026-03-27 | 2026-04-16 | 2026-06-29 | 2026-09-17 | shift from +40; +3d active delay |
| `1303 added sharp prbs react asp` | 2026-03-13 | 2026-03-18 | 2026-03-28 | 2026-04-17 | 2026-06-30 | 2026-09-18 | shift from +40; +3d active delay |
| `1403 added react asp frwr sql` | 2026-03-14 | 2026-03-19 | 2026-03-29 | 2026-04-18 | 2026-07-01 | 2026-09-19 | shift from +40; +3d active delay |
| `1503 added sharp asp react` | 2026-03-15 | 2026-03-20 | 2026-03-30 | 2026-04-19 | 2026-07-02 | 2026-09-20 | shift from +40; +3d active delay |
| `1603 added react asp sql` | 2026-03-16 | 2026-03-21 | 2026-03-31 | 2026-04-20 | 2026-07-03 | 2026-09-21 | shift from +40; +3d active delay |
| `1703 added asp react` | 2026-03-17 | 2026-03-22 | 2026-04-01 | 2026-04-21 | 2026-07-03 | 2026-09-21 | shift from +40; +3d active delay |
| `1803 added react` | 2026-03-18 | 2026-03-23 | 2026-04-02 | 2026-04-22 | 2026-07-04 | 2026-09-22 | shift from +40; +3d active delay |
| `1903 asp` | 2026-03-19 | 2026-03-24 | 2026-04-03 | 2026-04-23 | 2026-07-05 | 2026-09-23 | shift from +40; +3d active delay |
| `2003 react asp` | 2026-03-20 | 2026-03-25 | 2026-04-04 | 2026-04-24 | 2026-07-06 | 2026-09-24 | shift from +40; +3d active delay |
| `2103 added react asp` | 2026-03-21 | 2026-03-26 | 2026-04-05 | 2026-04-25 | 2026-07-07 | 2026-09-25 | shift from +40; +3d active delay |
| `2203 added asp react` | 2026-03-22 | 2026-03-27 | 2026-04-06 | 2026-04-26 | 2026-07-08 | 2026-09-26 | shift from +40; +3d active delay |
| `2303 added react asp sql` | 2026-03-23 | 2026-03-28 | 2026-04-07 | 2026-04-27 | 2026-07-09 | 2026-09-27 | shift from +40; +3d active delay |
| `2403 added asp react` | 2026-03-24 | 2026-03-29 | 2026-04-08 | 2026-05-31 | 2026-07-10 | 2026-09-28 | shift from +20; +3d active delay |
| `2503 added asp react` | 2026-03-25 | 2026-03-30 | 2026-04-09 | 2026-06-01 | 2026-07-11 | 2026-09-29 | shift from +20; +3d active delay |
| `3003 added react asp` | 2026-03-30 | 2026-04-04 | 2026-04-14 | 2026-06-07 | 2026-07-17 | 2026-10-05 | shift from +20; +3d active delay |

## April observed chains
| Unit | Processing | +5 | +10 | +20 | +40 | +80 | Shift |
|---|---:|---:|---:|---:|---:|---:|---|
| `0104 added asp react` | 2026-04-01 | 2026-04-06 | 2026-04-16 | 2026-06-09 | 2026-07-19 | 2026-10-07 | shift from +20; +3d active delay |
| `0204 added asp` | 2026-04-02 | 2026-04-07 | 2026-04-17 | 2026-06-10 | 2026-07-20 | 2026-10-08 | shift from +20; +3d active delay |
| `0304 added asp react` | 2026-04-03 | 2026-04-08 | 2026-04-18 | 2026-06-11 | 2026-07-21 | 2026-10-09 | shift from +20; +3d active delay |
| `0404 added asp react` | 2026-04-04 | 2026-04-09 | 2026-04-19 | 2026-06-12 | 2026-07-22 | 2026-10-10 | shift from +20; +3d active delay |
| `0504 added asp react` | 2026-04-05 | 2026-04-10 | 2026-04-20 | 2026-06-13 | 2026-07-23 | 2026-10-11 | shift from +20; +3d active delay |
| `0604 added asp react` | 2026-04-06 | 2026-04-11 | 2026-04-21 | 2026-06-14 | 2026-07-24 | 2026-10-12 | shift from +20; +3d active delay |
| `0704 added asp react` | 2026-04-07 | 2026-04-12 | 2026-04-22 | 2026-06-15 | 2026-07-25 | 2026-10-13 | shift from +20; +3d active delay |
| `0804 added asp react` | 2026-04-08 | 2026-04-13 | 2026-04-23 | 2026-06-16 | 2026-07-26 | 2026-10-14 | shift from +20; +3d active delay |
| `0904 added asp react` | 2026-04-09 | 2026-04-14 | 2026-04-24 | 2026-06-17 | 2026-07-27 | 2026-10-15 | shift from +20; +3d active delay |
| `1004 added asp react` | 2026-04-10 | 2026-04-15 | 2026-04-25 | 2026-06-18 | 2026-07-28 | 2026-10-16 | shift from +20; +3d active delay |
| `1104 added asp` | 2026-04-11 | 2026-04-16 | 2026-04-26 | 2026-06-19 | 2026-07-29 | 2026-10-17 | shift from +20; +3d active delay |
| `1204 added asp react` | 2026-04-12 | 2026-04-17 | 2026-04-27 | 2026-06-20 | 2026-07-30 | 2026-10-18 | shift from +20; +3d active delay |
| `1404 added asp react` | 2026-04-14 | 2026-04-19 | 2026-06-01 | 2026-06-21 | 2026-07-31 | 2026-10-19 | shift from +10; +3d active delay |
| `1504 added asp react` | 2026-04-15 | 2026-04-20 | 2026-06-02 | 2026-06-22 | 2026-08-01 | 2026-10-20 | shift from +10; +3d active delay |
| `1604 added asp react` | 2026-04-16 | 2026-04-21 | 2026-06-04 | 2026-06-24 | 2026-08-03 | 2026-10-22 | shift from +10; +3d active delay |
| `1704 added asp react` | 2026-04-17 | 2026-04-22 | 2026-06-05 | 2026-06-25 | 2026-08-04 | 2026-10-23 | shift from +10; +3d active delay |
| `1804 added asp react` | 2026-04-18 | 2026-04-23 | 2026-06-06 | 2026-06-26 | 2026-08-05 | 2026-10-24 | shift from +10; +3d active delay |
| `1904 added asp react` | 2026-04-19 | 2026-04-24 | 2026-06-07 | 2026-06-27 | 2026-08-06 | 2026-10-25 | shift from +10; +3d active delay |
| `2004 added asp` | 2026-04-20 | 2026-04-25 | 2026-06-08 | 2026-06-28 | 2026-08-07 | 2026-10-26 | shift from +10; +3d active delay |
| `2204 added asp` | 2026-04-22 | 2026-04-27 | 2026-06-10 | 2026-06-30 | 2026-08-09 | 2026-10-28 | shift from +10; +3d active delay |

## Recovery chains from unprocessed raw notes
| Unit | Processing | +5 | +10 | +20 | +40 | +80 | Shift |
|---|---:|---:|---:|---:|---:|---:|---|
| `2804 processing of 2604 raw` | 2026-05-31 | 2026-06-05 | 2026-06-15 | 2026-07-05 | 2026-08-14 | 2026-11-02 | shift from processing; +3d active delay |
| `2904 processing of 2704 raw` | 2026-06-01 | 2026-06-06 | 2026-06-16 | 2026-07-06 | 2026-08-15 | 2026-11-03 | shift from processing; +3d active delay |
| `3004 processing of 2804 raw` | 2026-06-02 | 2026-06-07 | 2026-06-17 | 2026-07-07 | 2026-08-16 | 2026-11-04 | shift from processing; +3d active delay |
