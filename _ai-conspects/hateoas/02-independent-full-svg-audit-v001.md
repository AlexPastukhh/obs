# Independent complete-SVG audit v001

Generated: 2026-06-27 UTC

## Required final audit

```text
embedded assets: 76
total image uses: 78
processed image uses: 78
restored image uses: 78
duplicate placements: 2
SVG text nodes: 55
processed SVG text nodes: 55
vector paths: 29
unassigned images: 0
multiply assigned images: 0
unassigned text nodes: 0
missing: 0
unreviewed: 0
```

## Duplicate-placement accounting

One embedded screenshot is placed three times:

```text
S-001
S-002
S-075
```

That produces two duplicate placements beyond the first occurrence. All three placements are reviewed and assigned exactly once.

## Independent repeat verification

```text
DOM assets / uses / text nodes: 76 / 78 / 55
regex assets / uses / text nodes: 76 / 78 / 55
asset SHA sets equal: yes
placement sets equal: yes
orphan assets: 0
missing referenced assets: 0
result: PASS
```

Every image use and SVG text node is assigned exactly once.
