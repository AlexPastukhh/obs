# Regional transcript — R01: ObjectPoolProvider registration, default policies and DI lifetime

Conspect: `objectpool,arraypool,memorypool`  
Generated: 2026-06-27 08:00:00 UTC

## Coverage

```text
image uses processed: 13 / 13
unique screenshots represented: 13
repeated placements retained: 0
remaining image uses: 0
```

## Semantic transcript

Object pooling separates pool construction from pool consumption. The provider supplies pools, while dependency injection controls which pool instance is shared.

## Provider options

- `DefaultObjectPoolProvider` creates `ObjectPool<T>` instances and has a configurable maximum retained count.
- The provider is usually a singleton because pools are intended to be shared.
- The retained count limits cached objects, not the number that may be created concurrently.

## Registration

- Registering `ObjectPoolProvider` lets factories or services create pools through DI.
- More commonly, create and register the concrete `ObjectPool<T>` once so consumers receive the same pool.
- A transient pool defeats reuse and can retain separate object sets unnecessarily.

## Policies

- `IPooledObjectPolicy<T>` defines `Create` and `Return` behavior.
- A policy can reset an object and decide whether it is safe to retain.
- Policies are supplied when the pool is created; they do not usually need independent DI registration unless other code consumes them.

## Manual construction

- For simple cases, construct the provider, policy and pool directly during service registration.
- Use a custom provider only when retention policy or pool implementation must differ globally.

## Caveats

- Pool registration should match object thread-safety and sharing requirements.
- The pool does not dispose rejected objects automatically unless the policy/pool implementation explicitly does so.

## Nearby source labels

- (almost never)
- when may need not default provider
- do i need to register policies?
- 1 create everything manually
- 1
- 3 register the pool itself
- why register a policy
- createstringbuilderpool

## Covered screenshot uses

```text
IU-042, IU-043, IU-044, IU-045, IU-046, IU-047, IU-048, IU-049, IU-050, IU-051, IU-052, IU-053, IU-054
```

## Audit note

Every listed placement is closed in `data/image-uses-v002-closed.*`.
The complete SVG and recovered screenshots remain authoritative for exact syntax.
