# Stage0 source and boundary review - csharp-hashcode-equals-dictionary-hashset-mutable-keys

Generated: 2026-06-13 09:35:00 UTC

## Source

- SVG: `source/csharp-hashcode-equals-dictionary-hashset-mutable-keys.svg`
- Semantic title: C# HashCode, Equals/GetHashCode and mutable dictionary keys
- Stage0 is an inventory/boundary checklist only. It is not source of truth for final wording.

## Counts

```text
unique embedded images: 24
image uses on canvas: 24
text labels parsed: 19
duplicate image uses by extracted file/content: 0
```

## Candidate regions

| Region | Boundary / semantic road | Image uses | Text labels |
|---|---|---:|---:|
| R01 | Mutable keys and hashtable bucket failure | 3 | 8 |
| R02 | Equals/GetHashCode considerations and HashCode.Combine | 8 | 5 |
| R03 | HashCode struct, incremental Add and null handling | 8 | 4 |
| R04 | HashCode in a loop and conditional logic | 5 | 2 |

## Parsed text labels

- T001 [R01] DONT MAKE OBJECTS WITH MUTABLE
- T002 [R01] PROPS - KEY OF DICT/EL OF HASHSET
- T003 [R02] hashcode,hashcode
- T004 [R02] combine
- T005 [R03] hashcode struct
- T006 [R03] incr adding
- T007 [R02] some considerations
- T008 [R02] dont use mutable fields if obj
- T009 [R02] is dict key
- T010 [R04] hashcode in a loop
- T011 [R04] example
- T012 [R03] handles null fine
- T013 [R01] compute hash once
- T014 [R01] place in bucket
- T015 [R01] dont recompute on mutation
- T016 [R01] hashtable gets different hash
- T017 [R01] when we pass mutated obj as key
- T018 [R01] searches different bucket
- T019 [R03] conditional logic

## Next pass recommendation

```text
Suggested first candidate: full pass = 24 image uses + 19 text labels.
Fallback split: use the region split plan if a single pass becomes too dense.
```

## Notes

- Visual/semantic boundary review is still required in transcript pass.
- Nearby means coordinate + semantic road, not just geometric adjacency.
- Image uses are tracked separately from unique image files.
