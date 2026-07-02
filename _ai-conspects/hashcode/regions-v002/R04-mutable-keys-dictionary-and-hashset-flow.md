# R04 — mutable keys, Dictionary, HashSet, and bucket flow

Generated: 2026-06-30

## Transcript policy

- each screenshot has its own normalized source block;
- code is preserved in fenced blocks;
- explanation is kept separate from source text;
- uncertainty/limits are stated rather than silently filled;
- each screenshot has recall questions.

## S-022 — HashSet uses the same hashing principle

**Known limits:** none

### Near-literal normalized transcript

`HashSet<T>` is also hash-based.

Difference in purpose:

- `Dictionary<TKey, TValue>` stores key → value;
- `HashSet<T>` stores items, and each item acts as its own key.

Internally the same principle applies:

1. compute item hash;
2. choose bucket;
3. compare equality inside that bucket.

Mutable equality/hash fields are therefore dangerous in `HashSet<T>` too.

### Study meaning

The mutable-key rule applies to any hash-indexed collection, not only dictionaries.

### Recall questions

1. What acts as the key in HashSet?
2. What are the three lookup stages?
3. Why can Contains fail after mutation?
4. How can an item be safely changed?


---

## S-023 — Dictionary flow before mutation

**Known limits:** none

### Near-literal normalized transcript

Before mutation:

```text
key.Email = "a@test.com"
hash = 1234
bucket = 2
```

Stored:

```text
bucket 2 ->
entry(
    key.Email = "a@test.com",
    value = "hello")
```

Lookup with the same unchanged key:

```text
1. compute hash -> 1234
2. go to bucket 2
3. compare equality
4. found
```

### Study meaning

The lookup succeeds because the current hash still points to the bucket selected at insertion.

### Recall questions

1. When was bucket 2 selected?
2. What happens after reaching the bucket?
3. Does the collection scan every bucket?
4. Which invariant is still intact?


---

## S-024 — Dictionary flow after key mutation

**Known limits:** none

### Near-literal normalized transcript

After mutation:

```text
key.Email = "b@test.com"
hash = 8888
bucket = 1
```

But storage is still:

```text
bucket 2 ->
entry(the same object, but now mutated)
```

Lookup now:

```text
1. compute hash -> 8888
2. go to bucket 1
3. nothing there
4. not found
```

The problem is directly tied to hashtable bucket flow.

### Study meaning

Mutation changes the key's current identity without reindexing the collection's internal storage.

### Recall questions

1. Where is the entry physically stored?
2. Which bucket does the new hash choose?
3. Why is equality never checked against the old entry?
4. How can code repair the collection state?
