# Stage0 - linq to sql source check and boundary review v001

Source SVG: `linq to sql.svg`  
Conspect folder: `_ai-conspects/linq to sql`

## Counts

```text
unique embedded images: 2
image uses on canvas: 2
text labels parsed: 60
duplicate image uses by content: 0
```

## Important rule

Inventory and candidate regions are checklists only, not source of truth. A transcript region becomes complete only after visual/semantic review.

## Text labels

- T-001: `inner / left joins` at x=18311.1, y=112.2
- T-002: `select many to sql` at x=13722.0, y=252.1
- T-003: `with join in query syntax` at x=18311.1, y=257.2
- T-004: `and with multile from` at x=18311.1, y=402.2
- T-005: `where filter after left join can lead to not inclu nulls` at x=18613.5, y=639.0
- T-006: `so need to be careful` at x=18613.5, y=664.0
- T-007: `inner and left joins` at x=869.7, y=892.3
- T-008: `what doesnt translate well` at x=8121.2, y=921.9
- T-009: `when including navigations in query` at x=869.7, y=996.6
- T-010: `ef linq translation to sql` at x=4258.6, y=1060.0
- T-011: `how we can loose data with query filters` at x=869.7, y=1100.9
- T-012: `cross join` at x=14540.0, y=1208.2
- T-013: `know exact sql` at x=6443.8, y=1218.7
- T-014: `list of unsupported` at x=7937.1, y=1219.7
- T-015: `include == join` at x=995.6, y=1239.5
- T-016: `when navigation has required() then ef uses inner join (because if this` at x=995.6, y=1281.7
- T-017: `shit is required - it must be there and we cant loose data with inner join)` at x=995.6, y=1323.9
- T-018: `when navigation is optional then ef uses left join` at x=995.6, y=1366.1
- T-019: `query filters break this shit, so when some navigation is required and` at x=995.6, y=1450.4
- T-020: `it has query filter - we will build inner join and we may not fetch outer` at x=995.6, y=1492.6
- … 40 more labels are indexed in `data/svg-labels-stage0.json` and CSV.

## Candidate regions

### R01 - linq-to-sql-translation-joins-apply-and-limitations

full small-conspect pass: EF Core LINQ-to-SQL translation, unsupported constructs, query filters, JOIN forms, CROSS/OUTER APPLY and SQL-shape reasoning

```text
image uses: 2
sources: S-001, S-002
text labels: 60
```

## Next

Process this full small conspect in the next combined ten-conspect final-coverage archive after stage0 is reviewed and committed.
