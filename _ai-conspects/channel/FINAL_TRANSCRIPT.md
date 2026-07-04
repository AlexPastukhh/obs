# Channel<T> — integrated final study transcript

The existing five regional transcripts remain the authoritative source-preserving layer. This file connects them for direct repetition.

## 1. Core model

`System.Threading.Channels` provides an async producer/consumer queue.

```text
Channel<T>
├── Writer : ChannelWriter<T>
└── Reader : ChannelReader<T>
```

Producers write work/messages. Consumers read and process them. The channel combines storage, coordination, completion, and async waiting.

## 2. Bounded and unbounded

```csharp
var unbounded = Channel.CreateUnbounded<int>();
var bounded = Channel.CreateBounded<int>(100);
```

An unbounded channel normally lets writers proceed but can grow memory when producers outrun consumers.

A bounded channel imposes capacity and backpressure. `BoundedChannelFullMode` determines what happens when full:

```text
Wait        writer waits
DropWrite   incoming write is dropped
DropNewest  newest buffered item is dropped
DropOldest  oldest buffered item is dropped
```

## 3. Reading and writing

```csharp
await channel.Writer.WriteAsync(item);
bool wrote = channel.Writer.TryWrite(item);

var item = await channel.Reader.ReadAsync();
bool read = channel.Reader.TryRead(out var item);
```

Async methods can wait without busy-looping. `Try*` methods return immediately.

The common consumer pattern:

```csharp
await foreach (var item in channel.Reader.ReadAllAsync(ct))
{
    await ProcessAsync(item, ct);
}
```

## 4. Completion

```csharp
channel.Writer.TryComplete();
channel.Writer.TryComplete(exception);
```

Completion means no more writes. Already-buffered items remain readable. `ReadAllAsync` ends after completion and draining. Error completion can be observed by readers.

## 5. Lower-level wait/try loops

```csharp
while (await channel.Reader.WaitToReadAsync(ct))
{
    while (channel.Reader.TryRead(out var item))
    {
        Process(item);
    }
}
```

This pattern waits once and then drains the batch currently available.

Writer-side code can use `WaitToWriteAsync` followed by `TryWrite`, especially when the exact full-mode behavior matters.

## 6. Options

`SingleReader` and `SingleWriter` are binary access-pattern/performance hints:

```text
true  exactly one reader/writer is expected
false potentially multiple readers/writers
```

They are not exact numeric limits.

## 7. Channel versus other primitives

```text
SemaphoreSlim:
controls how many operations run

Channel<T>:
stores queued items and coordinates producers/consumers

BlockingCollection<T>:
older blocking/thread-oriented producer-consumer primitive
```

## 8. WebSocket pattern

Many parts of an application may want to send messages, but concurrent `SendAsync` calls are dangerous. Let producers enqueue outgoing messages and use one send loop:

```csharp
await foreach (var message in connection.Outgoing.Reader.ReadAllAsync(ct))
{
    await socket.SendAsync(
        message.Buffer,
        message.MessageType,
        message.EndOfMessage,
        ct);
}
```

A send loop and receive loop can run concurrently: one active send and one active receive. The endpoint coordinates startup, completion, close, cancellation, and awaiting both loops.

## 9. Background work pattern

A singleton/background processor can own a channel. Public application code enqueues work; one hosted loop consumes it. Bounded capacity gives backpressure and prevents unbounded memory growth.
