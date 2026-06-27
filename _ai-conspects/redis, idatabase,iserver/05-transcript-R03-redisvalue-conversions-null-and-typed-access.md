# Regional transcript — R03: RedisValue conversions, null semantics and typed access

Conspect: `redis, idatabase,iserver`  
Generated: 2026-06-27 08:00:00 UTC

## Coverage

```text
image uses processed: 9 / 9
unique screenshots represented: 9
repeated placements retained: 0
remaining image uses: 0
```

## Semantic transcript

`RedisValue` is the client library's compact value carrier. It supports conversion and comparison conveniences, but callers must distinguish missing, empty and numeric values.

## RedisValue role

- `RedisValue` can represent strings, byte arrays and numeric values without forcing a string allocation in every case.
- Implicit and explicit operators make common assignments and reads concise.
- A returned value should be checked for null/missing before converting to a non-nullable application type.

## Missing versus empty

- A missing key or hash field yields a null Redis value.
- An empty string is a present value and is not the same as missing.
- Use `IsNull`, `IsNullOrEmpty` or explicit application checks according to the domain contract.

## Conversions

- Numeric conversions are appropriate when the stored representation is a valid number.
- String conversion decodes the underlying value; binary payloads should be read as bytes when text encoding is not intended.
- Deserialization belongs in the application boundary and should handle malformed or versioned data.

## Equality and operators

- Convenient `==`, `!=` and implicit conversion operators are library-defined value semantics.
- They do not make every cross-type comparison domain-safe; null and encoding behavior still require explicit thought.

## Caveats

- Avoid accidental culture-sensitive serialization; Redis numeric commands use invariant server representations.
- Do not treat a missing value as a valid default without an explicit domain rule.

## Nearby source labels

- sets
- redisvalue
- sortedsets
- lists
- !!!
- !!!!

## Covered screenshot uses

```text
IU-017, IU-020, IU-021, IU-029, IU-030, IU-031, IU-032, IU-033, IU-047
```

## Audit note

Every listed placement is closed in `data/image-uses-v002-closed.*`.
The complete SVG and recovered screenshots remain authoritative for exact syntax.
