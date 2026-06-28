# Final semantic transcript — TextEncoder, TextDecoder and streaming chunks

Authoritative source: `source/textdecoder, encoder, streaming and processing chunks, textdecoderstream of transformstream.svg`

---

# R01 — strings, bytes and encoding

## `TextEncoder`

JavaScript strings are character data. Files, sockets, hashing APIs and network payloads often require bytes.

```ts
const encoder =
  new TextEncoder();

const bytes =
  encoder.encode("Hello");
```

Result:

```text
input
    JavaScript string

output
    Uint8Array containing UTF-8 bytes
```

For ASCII text:

```text
H = 72
e = 101
l = 108
l = 108
o = 111
```

`TextEncoder` uses UTF-8.

## `TextDecoder`

```ts
const decoder =
  new TextDecoder("utf-8");

const text =
  decoder.decode(bytes);
```

Result:

```text
input
    BufferSource / typed-array bytes

output
    JavaScript string
```

`decode` commonly receives `Uint8Array`, but it can work with compatible buffer sources and views.

## `ArrayBuffer` versus `Uint8Array`

`ArrayBuffer` is raw storage. It does not identify:

```text
where meaningful bytes begin
how many bytes are meaningful
what numeric interpretation applies
```

A typed-array view describes a byte range:

```ts
const buffer =
  new ArrayBuffer(100);

const full =
  new Uint8Array(buffer);

full[0] = 72;
full[1] = 105;

const meaningful =
  new Uint8Array(
    buffer,
    0,
    2,
  );

console.log(
  decoder.decode(meaningful),
);
// Hi
```

Decoding the entire 100-byte buffer would also process unused zero bytes.

## UTF-8 and endianness

UTF-8 defines a byte sequence, so normal text decoding does not require choosing little-endian or big-endian numeric order.

Endianness matters when bytes represent multi-byte numbers:

```ts
const view =
  new DataView(buffer);

const length =
  view.getUint32(
    0,
    false,
  );
```

A binary protocol can combine:

```text
numeric header
    DataView with specified endianness

text body
    TextDecoder with UTF-8
```

---

# R02 — incremental decoding and arbitrary chunks

## Stream chunks do not preserve message boundaries

```ts
const reader =
  response.body!.getReader();

const {
  value,
  done,
} = await reader.read();
```

Each `value` is an arbitrary byte chunk.

It is not guaranteed to be:

```text
one line
one JSON object
one word
one character
one application message
one protocol frame
```

Chunk boundaries can be influenced by:

```text
network packet arrival
browser buffering
timing
compression
server writes
runtime implementation
```

## Multi-byte characters can cross chunks

A UTF-8 character may require several bytes. One chunk may contain the first bytes and the next chunk the remainder.

Incorrect independent decoding:

```ts
const a =
  decoder.decode(chunk1);

const b =
  decoder.decode(chunk2);
```

Correct streaming mode:

```ts
const decoder =
  new TextDecoder();

let text = "";

text += decoder.decode(
  chunk1,
  { stream: true },
);

text += decoder.decode(
  chunk2,
  { stream: true },
);

text += decoder.decode();
```

`stream: true` tells the decoder to retain an incomplete trailing byte sequence for the next call. The final zero-argument `decode()` flushes the decoder.

## Progressive loop

```ts
const reader =
  response.body!.getReader();

const decoder =
  new TextDecoder();

let pendingText = "";

while (true) {
  const {
    value,
    done,
  } = await reader.read();

  if (done) {
    pendingText +=
      decoder.decode();
    break;
  }

  pendingText +=
    decoder.decode(
      value,
      { stream: true },
    );

  // parse complete logical records
}
```

Character decoding solves byte-boundary problems. It does not solve application message framing.

## Line-delimited parsing

```ts
let buffer = "";

for await (const textChunk of chunks) {
  buffer += textChunk;

  const lines =
    buffer.split("\n");

  buffer =
    lines.pop() ?? "";

  for (const line of lines) {
    if (!line.trim()) {
      continue;
    }

    const value =
      JSON.parse(line);

    process(value);
  }
}

if (buffer.trim()) {
  process(
    JSON.parse(buffer),
  );
}
```

The parser must preserve an incomplete final line across chunks.

## Length-prefixed and mixed binary/text formats

For a length-prefixed protocol:

```text
accumulate bytes
read complete numeric header
wait until the declared body length exists
slice exactly that body
decode or parse it
retain remaining bytes
```

Do not convert all bytes to text when a frame includes binary fields.

---

# R03 — `TextDecoderStream` and `TransformStream`

## Decode a byte stream into a text stream

```ts
const textStream =
  response.body!
    .pipeThrough(
      new TextDecoderStream(),
    );

const reader =
  textStream.getReader();

while (true) {
  const {
    value,
    done,
  } = await reader.read();

  if (done) {
    break;
  }

  console.log(value);
}
```

`TextDecoderStream` performs incremental decoding and handles multi-byte character boundaries.

The resulting chunks are still arbitrary text chunks. They are not guaranteed to correspond to lines or messages.

## Transform text chunks into lines

```ts
function splitLines() {
  let pending = "";

  return new TransformStream<
    string,
    string
  >({
    transform(chunk, controller) {
      pending += chunk;

      const lines =
        pending.split("\n");

      pending =
        lines.pop() ?? "";

      for (const line of lines) {
        controller.enqueue(line);
      }
    },

    flush(controller) {
      if (pending) {
        controller.enqueue(pending);
      }
    },
  });
}
```

Pipeline:

```ts
const lines =
  response.body!
    .pipeThrough(
      new TextDecoderStream(),
    )
    .pipeThrough(
      splitLines(),
    );
```

## Parse JSON Lines progressively

```ts
const objects =
  lines.pipeThrough(
    new TransformStream<
      string,
      unknown
    >({
      transform(line, controller) {
        if (!line.trim()) {
          return;
        }

        controller.enqueue(
          JSON.parse(line),
        );
      },
    }),
  );
```

Pipeline stages separate responsibilities:

```text
byte stream
TextDecoderStream
text chunks
line-splitting TransformStream
complete lines
JSON parser TransformStream
application objects
```

## `TextEncoderStream`

For outgoing text streams:

```ts
const byteStream =
  textStream.pipeThrough(
    new TextEncoderStream(),
  );
```

The regular `TextEncoder` is typically used for complete strings. `TextEncoderStream` integrates encoding into a stream pipeline.

## Error policy

A decoder can be configured with fatal behavior:

```ts
const decoder =
  new TextDecoder(
    "utf-8",
    {
      fatal: true,
    },
  );
```

Without fatal mode, malformed sequences may be replaced with the replacement character.

Choose the policy according to the protocol:

```text
strict structured protocol
    fail on malformed input

human-facing tolerant text
    replacement may be acceptable
```

# Coverage

```text
unique embedded screenshots: 32
image uses: 32
native SVG labels: 4
duplicate extra placements: 0

processed image uses: 32
processed text labels: 4
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
