# Stage0 - stored procedures source check and boundary review v001

Source SVG: `stored procedures.svg`  
Conspect folder: `_ai-conspects/stored procedures`

## Counts

```text
unique embedded images: 3
image uses on canvas: 3
text labels parsed: 108
duplicate image uses by content: 0
```

## Important rule

Inventory and candidate regions are checklists only, not source of truth. A transcript region becomes complete only after visual/semantic review.

## Text labels

- T-001: `stored proc with` at x=9710.3, y=173.3
- T-002: `dif sql api's` at x=9710.3, y=404.9
- T-003: `why stored procedures` at x=12021.7, y=594.4
- T-004: `stored procedures` at x=14095.7, y=1644.2
- T-005: `ado.net usage` at x=14095.7, y=1852.6
- T-006: `syntax` at x=15674.2, y=1942.6
- T-007: `scope_identity()` at x=17123.1, y=3052.3
- T-008: `ef core and stored proc` at x=7388.3, y=3819.8
- T-009: `usage` at x=7388.3, y=4074.4
- T-010: `manual queries` at x=5400.2, y=4108.0
- T-011: `cant buld query on top` at x=5080.3, y=4350.2
- T-012: `of stored procedure in sql server` at x=5080.3, y=4441.0
- T-013: `returning data with stored procedure` at x=16316.5, y=4519.8
- T-014: `fromsql for tracked,` at x=6484.6, y=4537.0
- T-015: `CUD operations ef core mapping` at x=9129.1, y=4563.9
- T-016: `db calls with/without stored procedure` at x=3333.7, y=4599.1
- T-017: `sql server doesn allow composing over interm results of` at x=5122.5, y=4599.5
- T-018: `entity mapped` at x=6484.6, y=4625.2
- T-019: `stored procedure` at x=5122.5, y=4647.2
- T-020: `asenumerable starts db call` at x=5122.5, y=4695.0
- … 88 more labels are indexed in `data/svg-labels-stage0.json` and CSV.

## Candidate regions

### R01 - stored-procedures-ado-efcore-results-output-params-and-concurrency

full small-conspect pass: stored-procedure syntax and motivations, ADO.NET/EF Core execution, result sets, output parameters, CUD mapping and concurrency semantics

```text
image uses: 3
sources: S-001, S-002, S-003
text labels: 108
```

## Next

Process this full small conspect in the next combined ten-conspect final-coverage archive after stage0 is reviewed and committed.
