# CH03 - Concurrency assumptions and completion edge cases

Conspect: `channel`  
File type: **source-preserving region transcript**  
Stage: **3 / NEXT02 verified transcript v001**  
Generated: 2026-06-13 06:07:33 UTC

---

## 0.1 Area overview / key ideas / reading quality

Key ideas:
- SingleReader/SingleWriter are performance hints, not exact counts.
- These options express whether access is single or potentially multiple.
- TryComplete is useful for idempotent shutdown paths.
- TryComplete usually returns false when the channel is already completed.

Reading quality:
```text
Overall: high.
Most screenshots are readable; code blocks are compact but sufficient.
Confidence: high.
```

---

## 0.2 Coverage / boundary review

Included source IDs:
```text
S-014, S-034, S-035, S-036, S-037
```

Boundary decision:
```text
CH03 covers access-pattern options and TryComplete/completion edge cases.
No boundary correction was required for this region in NEXT02.
```

Pending after this region:
```text
CH05 remains for NEXT03.
```

---

## 1. Source inventory

| Region source | Source | Image use | fileId | Subregion | Status | Cut off | Theme |
|---|---|---|---|---|---|---|---|
| CH03A-S001 | S-014 | IU-014 | `19d7bc54f3` | CH03A | `verified-from-source-image` | no | SingleReader / SingleWriter options |
| CH03A-S002 | S-034 | IU-034 | `5714d2f139` | CH03A | `verified-from-source-image` | no | Can we specify number of writers/readers? |
| CH03A-S003 | S-035 | IU-035 | `9fc4a5e15a` | CH03A | `verified-from-source-image` | no | SingleReader/SingleWriter for unbounded and bounded channels |
| CH03B-S001 | S-036 | IU-036 | `649b905901` | CH03B | `verified-from-source-image` | no | Ignore TryComplete result if shutdown is idempotent |
| CH03B-S002 | S-037 | IU-037 | `12ed9ea359` | CH03B | `verified-from-source-image` | no | Can TryComplete fail only because it was already completed? |

---

## 2. Verified source transcript

## 2.1 CH03A

### CH03A-S001 / S-014 - `19d7bc54f3`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: SingleReader / SingleWriter options

#### Visible text

```text
SingleReader / SingleWriter options are performance hints.

Example:
- CreateUnbounded<string>(new UnboundedChannelOptions { SingleReader = true, SingleWriter = false })
- SingleReader true means exactly one consumer reads.
- SingleWriter false means multiple producers may write.

The slide says this helps the channel optimize internals a bit and should be used when you know the access pattern.
```

#### Visible code

```csharp
var channel = Channel.CreateUnbounded<string>(new UnboundedChannelOptions
{
    SingleReader = true,
    SingleWriter = false
});
```

---

### CH03A-S002 / S-034 - `5714d2f139`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Can we specify number of writers/readers?

#### Visible text

```text
Question: can we specify the number of writers/readers?

The answer:
- you do not specify an exact count like “3 writers” or “7 readers”.
- you specify whether there is exactly one reader or potentially multiple readers.
- and exactly one writer or potentially multiple writers.

Meaning: Channel options are binary optimization hints, not precise counts.
```

---

### CH03A-S003 / S-035 - `9fc4a5e15a`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: SingleReader/SingleWriter for unbounded and bounded channels

#### Visible text

```text
The slide shows option syntax for both channel types.

Unbounded:
- UnboundedChannelOptions
- SingleReader = true
- SingleWriter = false

Bounded:
- BoundedChannelOptions(100)
- SingleReader = true
- SingleWriter = true

Docs idea:
these options say whether all operations on the channel are accessed by multiple producers or consumers concurrently.

Meaning: configure these only when you know the concurrency model.
```

#### Visible code

```csharp
var channel = Channel.CreateUnbounded<string>(new UnboundedChannelOptions
{
    SingleReader = true,
    SingleWriter = false
});

var channel = Channel.CreateBounded<string>(new BoundedChannelOptions(100)
{
    SingleReader = true,
    SingleWriter = true
});
```

---

## 2.2 CH03B

### CH03B-S001 / S-036 - `649b905901`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Ignore TryComplete result if shutdown is idempotent

#### Visible text

```text
A common shutdown pattern:
- call _channel.Writer.TryComplete();
- ignore the result if the shutdown path is idempotent.

But if you care about which caller actually completed the channel, check the bool result.

Example:
- if TryComplete returns true, this caller completed it.
- if it returns false, someone else already completed it.
```

#### Visible code

```csharp
_channel.Writer.TryComplete();

bool completed = _channel.Writer.TryComplete();

if (!completed)
{
    // someone else already completed it
}
```

---

### CH03B-S002 / S-037 - `12ed9ea359`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Can TryComplete fail only because it was already completed?

#### Visible text

```text
TryComplete usually returns false because the channel has already been completed.

The main reason shown:
- “the channel was already completed before your call.”

The slide explains that conceptually another code path may have beaten you to completion, which still falls under the same idea: the channel is already closed for writing.

What should you do?
- usually one of these:
  - ignore false if completion is idempotent,
  - log/debug if unexpected,
  - coordinate shutdown so only one component owns completion.
```

---

## 3. Cleaned source notes

- Use SingleReader/SingleWriter only when the access pattern is known.
- They are performance hints, not reader/writer counts.
- TryComplete is useful when multiple shutdown paths may race.
- A false TryComplete usually means the channel is already completed.

---

## 4. Question hooks

- What do SingleReader and SingleWriter actually mean?
- Why are they only performance hints?
- When is it safe to ignore TryComplete's return value?
- Why can TryComplete return false?