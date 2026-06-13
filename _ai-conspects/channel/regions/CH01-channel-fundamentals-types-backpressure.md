# CH01 - Channel fundamentals, creation, types, options, backpressure

Conspect: `channel`  
File type: **source-preserving region transcript**  
Stage: **2 / NEXT01 verified transcript v001**  
Generated: 2026-06-13 05:56:30 UTC

---

## 0.1 Area overview / key ideas / reading quality

Key ideas:
- System.Threading.Channels is a built-in producer/consumer primitive.
- A channel has writer and reader sides.
- Unbounded channels are simple but can grow memory if producers outrun consumers.
- Bounded channels introduce capacity/backpressure and FullMode policy.
- Channels are async-friendly queues, not just gates like SemaphoreSlim.

Reading quality:
```text
Overall: high.
Most screenshots are clean slide/code screenshots.
Confidence: high for visible code and concepts.
```

---

## 0.2 Coverage / boundary review

Included source IDs:
```text
S-001, S-002, S-003, S-008, S-009, S-010, S-018, S-019, S-020, S-062
```

Boundary decision:
```text
CH01 covers channel fundamentals, core writer/reader objects, channel type choices, FullMode, comparisons, and bounded backpressure.
No boundary correction was required for this region in NEXT01.
```

Pending after this region:
```text
CH03, CH04, CH05 remain for NEXT02/NEXT03.
```

---

## 1. Source inventory

| Region source | Source | Image use | fileId | Subregion | Status | Cut off | Theme |
|---|---|---|---|---|---|---|---|
| CH01A-S001 | S-001 | IU-001 | `69750ca020` | CH01A | `verified-from-source-image` | no | Namespace and why Channels exist |
| CH01A-S002 | S-002 | IU-002 | `e0c7de9230` | CH01A | `verified-from-source-image` | no | ChannelWriter<T> core piece |
| CH01A-S003 | S-003 | IU-003 | `3af3048afa` | CH01A | `verified-from-source-image` | no | ChannelReader<T> and channel object exposing both sides |
| CH01B-S001 | S-008 | IU-008 | `602aeda77b` | CH01B | `verified-from-source-image` | no | Unbounded channel |
| CH01B-S002 | S-009 | IU-009 | `914ba9f303` | CH01B | `verified-from-source-image` | no | Bounded channel and explicit BoundedChannelOptions |
| CH01B-S003 | S-010 | IU-010 | `66ac284b71` | CH01B | `verified-from-source-image` | no | BoundedChannelFullMode options |
| CH01C-S001 | S-018 | IU-018 | `69ee89af90` | CH01C | `verified-from-source-image` | no | Difference from BlockingCollection |
| CH01C-S002 | S-019 | IU-019 | `500221fcc1` | CH01C | `verified-from-source-image` | no | Difference from SemaphoreSlim |
| CH01B-S004 | S-020 | IU-020 | `3ff670517a` | CH01B | `verified-from-source-image` | no | Bounded backpressure example |
| CH01B-S005 | S-062 | IU-062 | `3ff670517a` | CH01B | `verified-from-source-image` | no | Duplicate canvas use of bounded backpressure example |

---

## 2. Verified source transcript

## 2.1 CH01A

### CH01A-S001 / S-001 - `69750ca020`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Namespace and why Channels exist

#### Visible text

```text
Channels live under System.Threading.Channels.

Why it exists:
- one or many producers create work/messages;
- one or many consumers process them;
- async code is involved;
- buffering and coordination are needed.

The slide says channels are nicer than manually combining Queue<T>, lock, Monitor, SemaphoreSlim and custom signaling.

Meaning: Channel<T> is a built-in producer/consumer primitive that combines storage, coordination and async waiting.
```

#### Visible code

```csharp
using System.Threading.Channels;
```

---

### CH01A-S002 / S-002 - `e0c7de9230`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: ChannelWriter<T> core piece

#### Visible text

```text
A channel has two sides. The writer side is ChannelWriter<T> and is used to write items.

Visible example:
- await writer.WriteAsync(item);

Meaning: writer APIs belong to the producer side of a channel.
```

#### Visible code

```csharp
await writer.WriteAsync(item);
```

---

### CH01A-S003 / S-003 - `3af3048afa`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: ChannelReader<T> and channel object exposing both sides

#### Visible text

```text
The reader side is ChannelReader<T> and is used to read items.

The channel object exposes both:
- channel.Writer as ChannelWriter<string>,
- channel.Reader as ChannelReader<string>.

Meaning: a Channel<T> is the owner/container; the app usually hands out writer to producers and reader to consumers.
```

#### Visible code

```csharp
var item = await reader.ReadAsync();

var channel = Channel.CreateUnbounded<string>();

ChannelWriter<string> writer = channel.Writer;
ChannelReader<string> reader = channel.Reader;
```

---

## 2.2 CH01B

### CH01B-S001 / S-008 - `602aeda77b`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Unbounded channel

#### Visible text

```text
Unbounded channel example:
- Channel.CreateUnbounded<int>().

This means:
- no fixed size limit;
- writers usually do not wait;
- queue can grow as needed.

Good for simple scenarios.

Risk:
- if producers are much faster than consumers, memory can grow a lot.
```

#### Visible code

```csharp
var channel = Channel.CreateUnbounded<int>();
```

---

### CH01B-S002 / S-009 - `914ba9f303`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Bounded channel and explicit BoundedChannelOptions

#### Visible text

```text
Bounded channel example:
- Channel.CreateBounded<int>(100).

This means:
- max capacity is 100 items;
- once full, writers cannot just keep adding forever;
- this is useful when you want backpressure.

Explicit version uses BoundedChannelOptions:
- SingleReader = true;
- SingleWriter = false;
- FullMode = BoundedChannelFullMode.Wait.

Meaning:
- capacity is 100;
- one reader;
- many writers;
- if full, writers wait.
```

#### Visible code

```csharp
var channel = Channel.CreateBounded<int>(100);

var channel = Channel.CreateBounded<int>(new BoundedChannelOptions(100)
{
    SingleReader = true,
    SingleWriter = false,
    FullMode = BoundedChannelFullMode.Wait
});
```

---

### CH01B-S003 / S-010 - `66ac284b71`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: BoundedChannelFullMode options

#### Visible text

```text
FullMode options for bounded channels:
- Wait: writer waits until space appears.
- DropNewest: newest queued item gets dropped.
- DropOldest: oldest queued item gets dropped.
- DropWrite: the new item being written gets dropped.

The slide says Wait is usually the most intuitive and safest default.
```

---

### CH01B-S004 / S-020 - `3ff670517a`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Bounded backpressure example

#### Visible text

```text
Example with bounded backpressure:
- channel has bounded capacity 2,
- FullMode is Wait,
- writes A and B fill the channel,
- write C waits until a reader removes something.

Conclusion: bounded channels are useful when you do not want unbounded memory growth.
```

#### Visible code

```csharp
var channel = Channel.CreateBounded<string>(new BoundedChannelOptions(2)
{
    FullMode = BoundedChannelFullMode.Wait
});

await channel.Writer.WriteAsync("A");
await channel.Writer.WriteAsync("B");

// This will wait until a reader removes something
await channel.Writer.WriteAsync("C");
```

---

### CH01B-S005 / S-062 - `3ff670517a`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Duplicate canvas use of bounded backpressure example

#### Visible text

```text
This is a second canvas use of the same embedded bounded-backpressure screenshot as S-020.

It repeats:
- bounded capacity 2,
- FullMode Wait,
- third write waits until space becomes available.

Tracked duplicate image use:
3ff670517a: S-020, S-062.
```

#### Visible code

```csharp
var channel = Channel.CreateBounded<string>(new BoundedChannelOptions(2)
{
    FullMode = BoundedChannelFullMode.Wait
});

await channel.Writer.WriteAsync("A");
await channel.Writer.WriteAsync("B");

// This will wait until a reader removes something
await channel.Writer.WriteAsync("C");
```

#### Notes

Duplicate embedded image use of S-020; treated as a separate canvas occurrence, not extraction error.

---

## 2.3 CH01C

### CH01C-S001 / S-018 - `69ee89af90`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Difference from BlockingCollection

#### Visible text

```text
Channel is presented as the modern async-friendly option.

Compared to older primitives:
- BlockingCollection<T> is more thread/blocking oriented.
- Channel<T> is better for async/await.
- Channels are lighter and more natural in modern .NET async apps.
```

---

### CH01C-S002 / S-019 - `500221fcc1`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Difference from SemaphoreSlim

#### Visible text

```text
A SemaphoreSlim is just a gate:
- it controls how many operations run at once.

A channel is a queue:
- it stores items,
- coordinates producers and consumers,
- can buffer work/messages.

For WebSocket sending:
- semaphore = “only one send at a time”;
- channel = “enqueue sends, one loop performs them”.

Meaning: a channel is higher-level than a semaphore because it models queued work, not just concurrency admission.
```

---

## 3. Cleaned source notes

- Use channels when you need an async producer/consumer queue.
- Expose writer to producers and reader to consumers.
- Use unbounded channels for simple scenarios where memory growth is not a concern.
- Use bounded channels for backpressure.
- FullMode decides what happens when a bounded channel is full.
- Channels are higher-level than SemaphoreSlim because they store work, not only limit concurrency.

---

## 4. Question hooks

- When should you use Channel<T> instead of Queue<T> plus locks?
- What is the difference between ChannelWriter<T> and ChannelReader<T>?
- What is the risk of unbounded channels?
- How does bounded channel backpressure work?
- What does BoundedChannelFullMode.Wait mean?
