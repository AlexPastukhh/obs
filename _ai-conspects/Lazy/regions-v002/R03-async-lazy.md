# Asynchronous lazy initialization

Generated: 2026-07-01

## Transcript policy

- Every screenshot has a dedicated source block.
- Visible C# is preserved.
- Thread-safety and exception semantics are kept source-specific.
- Every source includes recall questions.

## S-014 — Async factory rule

**Known limits:** none

### Near-literal normalized transcript

If the factory is asynchronous, use:

```csharp
Lazy<Task<T>>
```

Do not use `Lazy<T>` and then block with `.Result`.

### Study meaning

The Lazy value should be the Task itself. Callers await the cached Task instead of synchronously blocking and risking deadlocks or thread starvation.

### Recall questions

1. What generic shape is recommended for async initialization?
2. Why is `.Result` discouraged?
3. What exactly is cached in Lazy<Task<T>>?


---

## S-015 — Lazy<Task<string>> file example

**Known limits:** none

### Near-literal normalized transcript

```csharp
private readonly Lazy<Task<string>> _content;

public MyType(string path)
{
    _content = new Lazy<Task<string>>(
        () => File.ReadAllTextAsync(path));
}

public Task<string> GetContentAsync()
    => _content.Value;
```

### Study meaning

The first call creates one asynchronous file-read Task. Later callers receive the same Task and therefore share the same completion/result.

### Recall questions

1. What type does the factory return?
2. When does the file read begin?
3. Do later callers start another read?
4. How should a caller consume GetContentAsync?
