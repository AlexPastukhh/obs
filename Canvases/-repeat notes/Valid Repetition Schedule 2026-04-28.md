# Valid Repetition Schedule — reconstructed at 2026-04-28

Status: draft / review before active use.

Assumption:

```text
Imagined current date: 2026-04-28.
Everything before 2026-04-28 was done as planned.
The schedule uses theoretical repeat chains by default.
```

Core rules:

```text
Repeats are generated from existing processing/general-note repeat units, not from every calendar date.
If a unit did not exist, it is a valid hole.
The current ladder is: processing -> +5 -> +10 -> +20 -> +40 -> +80 -> review / decide next.
```

## Processing backlog

These raw notes were known as unprocessed:

```md
- [ ] PROCESS_RAW [[2026-04-26 raw]]
- [ ] PROCESS_RAW [[2026-04-27 raw]]
- [ ] PROCESS_RAW [[2026-04-28 raw]]
```

If processed immediately from the imagined current date:

```text
2026-04-28 processing of 2026-04-26 raw
-> 2026-05-03 (+5)
-> 2026-05-13 (+10)
-> 2026-06-02 (+20)
-> 2026-07-12 (+40)
-> 2026-09-30 (+80 / review)

2026-04-29 processing of 2026-04-27 raw
-> 2026-05-04 (+5)
-> 2026-05-14 (+10)
-> 2026-06-03 (+20)
-> 2026-07-13 (+40)
-> 2026-10-01 (+80 / review)

2026-04-30 processing of 2026-04-28 raw
-> 2026-05-05 (+5)
-> 2026-05-15 (+10)
-> 2026-06-04 (+20)
-> 2026-07-14 (+40)
-> 2026-10-02 (+80 / review)
```

# Repeat chain sources

## Pre-February standalone numbered units

Assumption: 2 units per date before first day-based February unit (`1202`), preserving order.

```text
2026-02-03: c# 1, c# 2
2026-02-04: c# 3, asp 1
2026-02-05: asp 2, js 1
2026-02-06: js 2, regex 1
2026-02-07: regex 1.1, regex 2
2026-02-08: sql 1, sql 2
2026-02-09: sql 3, react 1
2026-02-10: react 2, css 1
2026-02-11: css 2
```

## February legacy units

```text
2026-02-12: 1202 ADDED ASP REACT CSS REGEX ASP TEST SQL
2026-02-13: 1302 added css asp react progbasics c#
2026-02-14: 1402 added asp css sql regex
2026-02-15: 1502 ADDED ASP
2026-02-16: 1602 ADDED ASP
2026-02-17: 1702 added asp sharp
2026-02-18: 1802 added frwrkqs ASP
2026-02-19: 1902 added asp
2026-02-20: 2002 added asp
2026-02-21: 2102 added sharp asp jsts
2026-02-22: 2202 added sql asp
2026-02-23: 2302 ADDED FRWRK react asp sharp
2026-02-24: 2402 ADDED SQL ASP SHARP
2026-02-25: 2502 ADDED ASP JS
2026-02-26: 2602 added asp
2026-02-28: 2802 ADDED ASP SHARP
```

## March legacy units

```text
2026-03-01: 0103 ADDED PROGBAS ASP REACT
2026-03-02: 0203 added asp progbas
2026-03-03: 0303 added asp
2026-03-04: 0403 added asp progbasics
2026-03-05: 0503 added asp
2026-03-06: 0603 added asp sql regex frwrk sharp progbasics jsts
2026-03-07: 0703 added asp frwrk SHARP REACT
2026-03-08: 0803 added css asp sharp react
2026-03-09: 0903 added prgb asp react
2026-03-10: 1003 react asp
2026-03-11: 1103 added asp react
2026-03-12: 1203 added asp
2026-03-13: 1303 added sharp prbs react asp
2026-03-14: 1403 added react asp frwr sql
2026-03-15: 1503 added sharp asp react
2026-03-16: 1603 added react asp sql
2026-03-17: 1703 added asp react
2026-03-18: 1803 added react
2026-03-19: 1903 asp
2026-03-20: 2003 react asp
2026-03-21: 2103 added react asp
2026-03-22: 2203 added asp react
2026-03-23: 2303 added react asp sql
2026-03-24: 2403 added asp react
2026-03-25: 2503 added asp react
2026-03-30: 3003 added react asp
```

Possible March holes / review:

```text
2603, 2703, 2803, 2903 are not included.
Add them only if a processing/general-note repeat unit actually existed.
```

## April observed units

```text
2026-04-01: 0104 added asp react
2026-04-02: 0204 added asp
2026-04-03: 0304 added asp react
2026-04-04: 0404 added asp react
2026-04-05: 0504 added asp react
2026-04-06: 0604 added asp react
2026-04-07: 0704 added asp react
2026-04-08: 0804 added asp react
2026-04-09: 0904 added asp react
2026-04-10: 1004 added asp react
2026-04-11: 1104 added asp
2026-04-12: 1204 added asp react
2026-04-14: 1404 added asp react
2026-04-15: 1504 added asp react
2026-04-16: 1604 added asp react
2026-04-17: 1704 added asp react
2026-04-18: 1804 added asp react
2026-04-19: 1904 added asp react
2026-04-20: 2004 added asp
2026-04-22: 2204 added asp
```

Possible April holes / review:

```text
1304, 2104, 2304, 2404, 2504, 2604, 2704 are not included.
Add them only if a processing/general-note repeat unit actually existed.
```

# Daily queues

# 2026-04

## 2026-04-28

- [ ] PROCESS_RAW [[2026-04-26 raw]]
- [ ] REPEAT `1202 ADDED ASP REACT CSS REGEX ASP TEST SQL` (+40 -> +80) <!-- legacy / review -->
- [ ] REPEAT `2403 added asp react` (+20 -> +40) <!-- legacy / review -->

## 2026-04-29

- [ ] PROCESS_RAW [[2026-04-27 raw]]
- [ ] REPEAT `1302 added css asp react progbasics c#` (+40 -> +80) <!-- legacy / review -->
- [ ] REPEAT `2503 added asp react` (+20 -> +40) <!-- legacy / review -->
- [ ] REPEAT `1404 added asp react` (+10 -> +20)

## 2026-04-30

- [ ] PROCESS_RAW [[2026-04-28 raw]]
- [ ] REPEAT `1402 added asp css sql regex` (+40 -> +80) <!-- legacy / review -->
- [ ] REPEAT `1504 added asp react` (+10 -> +20)

# 2026-05

## 2026-05-01

- [ ] REPEAT `1502 ADDED ASP` (+40 -> +80) <!-- legacy / review -->
- [ ] REPEAT `1604 added asp react` (+10 -> +20)

## 2026-05-02

- [ ] REPEAT `1602 ADDED ASP` (+40 -> +80) <!-- legacy / review -->
- [ ] REPEAT `1704 added asp react` (+10 -> +20)

## 2026-05-03

- [ ] REPEAT `1702 added asp sharp` (+40 -> +80) <!-- legacy / review -->
- [ ] REPEAT `1804 added asp react` (+10 -> +20)
- [ ] REPEAT `2804 processing of 2604 raw` (+5 -> +10) <!-- new recovery, area TBD -->

## 2026-05-04

- [ ] REPEAT `1802 added frwrkqs ASP` (+40 -> +80) <!-- legacy / review -->
- [ ] REPEAT `3003 added react asp` (+20 -> +40) <!-- legacy / review -->
- [ ] REPEAT `1904 added asp react` (+10 -> +20)
- [ ] REPEAT `2904 processing of 2704 raw` (+5 -> +10) <!-- new recovery, area TBD -->

## 2026-05-05

- [ ] REPEAT `1902 added asp` (+40 -> +80) <!-- legacy / review -->
- [ ] REPEAT `2004 added asp` (+10 -> +20)
- [ ] REPEAT `3004 processing of 2804 raw` (+5 -> +10) <!-- new recovery, area TBD -->

## 2026-05-06

- [ ] REPEAT `2002 added asp` (+40 -> +80) <!-- legacy / review -->
- [ ] REPEAT `0104 added asp react` (+20 -> +40)

## 2026-05-07

- [ ] REPEAT `2102 added sharp asp jsts` (+40 -> +80) <!-- legacy / review -->
- [ ] REPEAT `0204 added asp` (+20 -> +40)
- [ ] REPEAT `2204 added asp` (+10 -> +20)

## 2026-05-08

- [ ] REPEAT `2202 added sql asp` (+40 -> +80) <!-- legacy / review -->
- [ ] REPEAT `0304 added asp react` (+20 -> +40)

## 2026-05-09

- [ ] REPEAT `2302 ADDED FRWRK react asp sharp` (+40 -> +80) <!-- legacy / review -->
- [ ] REPEAT `0404 added asp react` (+20 -> +40)

## 2026-05-10

- [ ] REPEAT `2402 ADDED SQL ASP SHARP` (+40 -> +80) <!-- legacy / review -->
- [ ] REPEAT `0504 added asp react` (+20 -> +40)

## 2026-05-11

- [ ] REPEAT `2502 ADDED ASP JS` (+40 -> +80) <!-- legacy / review -->
- [ ] REPEAT `0604 added asp react` (+20 -> +40)

## 2026-05-12

- [ ] REPEAT `2602 added asp` (+40 -> +80) <!-- legacy / review -->
- [ ] REPEAT `0704 added asp react` (+20 -> +40)

## 2026-05-13

- [ ] REPEAT `0804 added asp react` (+20 -> +40)
- [ ] REPEAT `2804 processing of 2604 raw` (+10 -> +20) <!-- new recovery, area TBD -->

## 2026-05-14

- [ ] REPEAT `2802 ADDED ASP SHARP` (+40 -> +80) <!-- legacy / review -->
- [ ] REPEAT `0904 added asp react` (+20 -> +40)
- [ ] REPEAT `2904 processing of 2704 raw` (+10 -> +20) <!-- new recovery, area TBD -->

## 2026-05-15

- [ ] REPEAT `0103 ADDED PROGBAS ASP REACT` (+40 -> +80) <!-- legacy / review -->
- [ ] REPEAT `1004 added asp react` (+20 -> +40)
- [ ] REPEAT `3004 processing of 2804 raw` (+10 -> +20) <!-- new recovery, area TBD -->

## 2026-05-16

- [ ] REPEAT `0203 added asp progbas` (+40 -> +80) <!-- legacy / review -->
- [ ] REPEAT `1104 added asp` (+20 -> +40)

## 2026-05-17

- [ ] REPEAT `0303 added asp` (+40 -> +80) <!-- legacy / review -->
- [ ] REPEAT `1204 added asp react` (+20 -> +40)

## 2026-05-18

- [ ] REPEAT `0403 added asp progbasics` (+40 -> +80) <!-- legacy / review -->

## 2026-05-19

- [ ] REPEAT `0503 added asp` (+40 -> +80) <!-- legacy / review -->
- [ ] REPEAT `1404 added asp react` (+20 -> +40)

## 2026-05-20

- [ ] REPEAT `0603 added asp sql regex frwrk sharp progbasics jsts` (+40 -> +80) <!-- legacy / review -->
- [ ] REPEAT `1504 added asp react` (+20 -> +40)

## 2026-05-21

- [ ] REPEAT `0703 added asp frwrk SHARP REACT` (+40 -> +80) <!-- legacy / review -->
- [ ] REPEAT `1604 added asp react` (+20 -> +40)

## 2026-05-22

- [ ] REPEAT `0803 added css asp sharp react` (+40 -> +80) <!-- legacy / review -->
- [ ] REPEAT `1704 added asp react` (+20 -> +40)

## 2026-05-23

- [ ] REPEAT `0903 added prgb asp react` (+40 -> +80) <!-- legacy / review -->
- [ ] REPEAT `1804 added asp react` (+20 -> +40)

## 2026-05-24

- [ ] REPEAT `1003 react asp` (+40 -> +80) <!-- legacy / review -->
- [ ] REPEAT `1904 added asp react` (+20 -> +40)

## 2026-05-25

- [ ] REPEAT `1103 added asp react` (+40 -> +80) <!-- legacy / review -->
- [ ] REPEAT `2004 added asp` (+20 -> +40)

## 2026-05-26

- [ ] REPEAT `1203 added asp` (+40 -> +80) <!-- legacy / review -->

## 2026-05-27

- [ ] REPEAT `1303 added sharp prbs react asp` (+40 -> +80) <!-- legacy / review -->
- [ ] REPEAT `2204 added asp` (+20 -> +40)

## 2026-05-28

- [ ] REPEAT `1403 added react asp frwr sql` (+40 -> +80) <!-- legacy / review -->

## 2026-05-29

- [ ] REPEAT `1503 added sharp asp react` (+40 -> +80) <!-- legacy / review -->

## 2026-05-30

- [ ] REPEAT `1603 added react asp sql` (+40 -> +80) <!-- legacy / review -->

## 2026-05-31

- [ ] REPEAT `1703 added asp react` (+40 -> +80) <!-- legacy / review -->

# 2026-06

## 2026-06-01

- [ ] REPEAT `1803 added react` (+40 -> +80) <!-- legacy / review -->

## 2026-06-02

- [ ] REPEAT `1903 asp` (+40 -> +80) <!-- legacy / review -->
- [ ] REPEAT `2804 processing of 2604 raw` (+20 -> +40) <!-- new recovery, area TBD -->

## 2026-06-03

- [ ] REPEAT `2003 react asp` (+40 -> +80) <!-- legacy / review -->
- [ ] REPEAT `2904 processing of 2704 raw` (+20 -> +40) <!-- new recovery, area TBD -->

## 2026-06-04

- [ ] REPEAT `2103 added react asp` (+40 -> +80) <!-- legacy / review -->
- [ ] REPEAT `3004 processing of 2804 raw` (+20 -> +40) <!-- new recovery, area TBD -->

## 2026-06-05

- [ ] REPEAT `2203 added asp react` (+40 -> +80) <!-- legacy / review -->

## 2026-06-06

- [ ] REPEAT `2303 added react asp sql` (+40 -> +80) <!-- legacy / review -->

## 2026-06-07

- [ ] REPEAT `2403 added asp react` (+40 -> +80) <!-- legacy / review -->

## 2026-06-08

- [ ] REPEAT `2503 added asp react` (+40 -> +80) <!-- legacy / review -->

## 2026-06-13

- [ ] REPEAT `3003 added react asp` (+40 -> +80) <!-- legacy / review -->

## 2026-06-15

- [ ] REPEAT `0104 added asp react` (+40 -> +80)

## 2026-06-16

- [ ] REPEAT `0204 added asp` (+40 -> +80)

## 2026-06-17

- [ ] REPEAT `0304 added asp react` (+40 -> +80)

## 2026-06-18

- [ ] REPEAT `0404 added asp react` (+40 -> +80)

## 2026-06-19

- [ ] REPEAT `0504 added asp react` (+40 -> +80)

## 2026-06-20

- [ ] REPEAT `0604 added asp react` (+40 -> +80)

## 2026-06-21

- [ ] REPEAT `0704 added asp react` (+40 -> +80)

## 2026-06-22

- [ ] REPEAT `0804 added asp react` (+40 -> +80)

## 2026-06-23

- [ ] REPEAT `0904 added asp react` (+40 -> +80)

## 2026-06-24

- [ ] REPEAT `1004 added asp react` (+40 -> +80)

## 2026-06-25

- [ ] REPEAT `1104 added asp` (+40 -> +80)

## 2026-06-26

- [ ] REPEAT `1204 added asp react` (+40 -> +80)

## 2026-06-28

- [ ] REPEAT `1404 added asp react` (+40 -> +80)

## 2026-06-29

- [ ] REPEAT `1504 added asp react` (+40 -> +80)

## 2026-06-30

- [ ] REPEAT `1604 added asp react` (+40 -> +80)

# 2026-07

## 2026-07-01

- [ ] REPEAT `1704 added asp react` (+40 -> +80)

## 2026-07-02

- [ ] REPEAT `1804 added asp react` (+40 -> +80)

## 2026-07-03

- [ ] REPEAT `1904 added asp react` (+40 -> +80)

## 2026-07-04

- [ ] REPEAT `2004 added asp` (+40 -> +80)

## 2026-07-06

- [ ] REPEAT `2204 added asp` (+40 -> +80)

## 2026-07-08

- [ ] REPEAT `c# 1` (+80 -> review) <!-- standalone legacy / review -->
- [ ] REPEAT `c# 2` (+80 -> review) <!-- standalone legacy / review -->

## 2026-07-09

- [ ] REPEAT `c# 3` (+80 -> review) <!-- standalone legacy / review -->
- [ ] REPEAT `asp 1` (+80 -> review) <!-- standalone legacy / review -->

## 2026-07-10

- [ ] REPEAT `asp 2` (+80 -> review) <!-- standalone legacy / review -->
- [ ] REPEAT `js 1` (+80 -> review) <!-- standalone legacy / review -->

## 2026-07-11

- [ ] REPEAT `js 2` (+80 -> review) <!-- standalone legacy / review -->
- [ ] REPEAT `regex 1` (+80 -> review) <!-- standalone legacy / review -->

## 2026-07-12

- [ ] REPEAT `regex 1.1` (+80 -> review) <!-- standalone legacy / review -->
- [ ] REPEAT `regex 2` (+80 -> review) <!-- standalone legacy / review -->
- [ ] REPEAT `2804 processing of 2604 raw` (+40 -> +80) <!-- new recovery, area TBD -->

## 2026-07-13

- [ ] REPEAT `sql 1` (+80 -> review) <!-- standalone legacy / review -->
- [ ] REPEAT `sql 2` (+80 -> review) <!-- standalone legacy / review -->
- [ ] REPEAT `2904 processing of 2704 raw` (+40 -> +80) <!-- new recovery, area TBD -->

## 2026-07-14

- [ ] REPEAT `sql 3` (+80 -> review) <!-- standalone legacy / review -->
- [ ] REPEAT `react 1` (+80 -> review) <!-- standalone legacy / review -->
- [ ] REPEAT `3004 processing of 2804 raw` (+40 -> +80) <!-- new recovery, area TBD -->

## 2026-07-15

- [ ] REPEAT `react 2` (+80 -> review) <!-- standalone legacy / review -->
- [ ] REPEAT `css 1` (+80 -> review) <!-- standalone legacy / review -->

## 2026-07-16

- [ ] REPEAT `css 2` (+80 -> review) <!-- standalone legacy / review -->

## 2026-07-17

- [ ] REPEAT `1202 ADDED ASP REACT CSS REGEX ASP TEST SQL` (+80 -> review) <!-- legacy / review -->

## 2026-07-18

- [ ] REPEAT `1302 added css asp react progbasics c#` (+80 -> review) <!-- legacy / review -->

## 2026-07-19

- [ ] REPEAT `1402 added asp css sql regex` (+80 -> review) <!-- legacy / review -->

## 2026-07-20

- [ ] REPEAT `1502 ADDED ASP` (+80 -> review) <!-- legacy / review -->

## 2026-07-21

- [ ] REPEAT `1602 ADDED ASP` (+80 -> review) <!-- legacy / review -->

## 2026-07-22

- [ ] REPEAT `1702 added asp sharp` (+80 -> review) <!-- legacy / review -->

## 2026-07-23

- [ ] REPEAT `1802 added frwrkqs ASP` (+80 -> review) <!-- legacy / review -->

## 2026-07-24

- [ ] REPEAT `1902 added asp` (+80 -> review) <!-- legacy / review -->

## 2026-07-25

- [ ] REPEAT `2002 added asp` (+80 -> review) <!-- legacy / review -->

## 2026-07-26

- [ ] REPEAT `2102 added sharp asp jsts` (+80 -> review) <!-- legacy / review -->

## 2026-07-27

- [ ] REPEAT `2202 added sql asp` (+80 -> review) <!-- legacy / review -->

## 2026-07-28

- [ ] REPEAT `2302 ADDED FRWRK react asp sharp` (+80 -> review) <!-- legacy / review -->

## 2026-07-29

- [ ] REPEAT `2402 ADDED SQL ASP SHARP` (+80 -> review) <!-- legacy / review -->

## 2026-07-30

- [ ] REPEAT `2502 ADDED ASP JS` (+80 -> review) <!-- legacy / review -->

## 2026-07-31

- [ ] REPEAT `2602 added asp` (+80 -> review) <!-- legacy / review -->

# Checks and review before active use

```text
- Pre-February standalone numbered chains are included as 2 units per date before 1202.
- February legacy units are included.
- March legacy units are included, except possible holes 2603-2903.
- April observed units are included, except possible holes 1304, 2104, 2304-2704.
- Recovery chains for raw 26/27/28 include +5/+10/+20/+40 in this file; +80 is listed in the chain source after July.
- +40 is not final. The schedule continues to +80, then review/decision.
```

If a listed unit did not actually exist, delete its chain and generated queue entries.
If a missing unit did exist, add its chain and regenerate queue entries.
