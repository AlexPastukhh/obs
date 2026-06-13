# PDS02 - Browser fetch/WebSocket message chunks and UTF-8 decoding

Conspect: `processing-data-as-stream-httpclient-endpoint-browser-websockets`  
File type: **source-preserving region transcript**  
Stage: **3 / NEXT02 verified transcript v001**  
Generated: 2026-06-13 10:41:31 UTC

---

## 0.1 Area overview / key ideas / reading quality

This region covers client/server streaming differences for fetch/WebSockets and UTF-8 decoding across chunks.

Key ideas:
- Fetch reader.read returns Uint8Array chunks until done.
- Server WebSocket ReceiveAsync chunks must be accumulated until EndOfMessage.
- Browser WebSocket buffers complete messages for onmessage.
- Direct GetString per byte chunk can break split UTF-8 characters.
- Decoder.Convert preserves decoder state across chunks.

Reading quality:
```text
Overall: medium-high/high.
Exact source images remain source of truth; transcript preserves visible meaning and API shapes.
Confidence: high for conceptual/semantic mapping.
```

---

## 0.2 Coverage / boundary review

Included source IDs:
```text
S-005, S-008, S-009, S-010, S-012, S-013
```

Boundary decision:
```text
PDS02 was processed in NEXT02. No boundary correction was required for this region.
PDS04 remains pending for NEXT03.
```

---

## 1. Source inventory

| Region source | Source | Image use | fileId | Subregion | Status | Cut off | Theme |
|---|---|---|---|---|---|---|---|
| PDS02A-S001 | S-005 | IU-005 | `0b8ecf3862` | PDS02A | `verified-from-source-image` | no | Browser fetch reader loop |
| PDS02B-S001 | S-008 | IU-008 | `173aa87080` | PDS02B | `verified-from-source-image` | no | WebSocket receive loop and EndOfMessage |
| PDS02B-S002 | S-009 | IU-009 | `65a55deac0` | PDS02B | `verified-from-source-image` | no | WebSocket close / close output / abort |
| PDS02C-S001 | S-010 | IU-010 | `d97344f4d0` | PDS02C | `verified-from-source-image` | no | Browser WebSocket API receives full messages |
| PDS02D-S001 | S-012 | IU-012 | `96aaf9f572` | PDS02D | `verified-from-source-image` | no | UTF-8 decoder handles split characters |
| PDS02D-S002 | S-013 | IU-013 | `843188ffb7` | PDS02D | `verified-from-source-image` | no | Decoder.Convert for streaming text |

---

## 2. Verified source transcript

## 2.1 PDS02A

### PDS02A-S001 / S-005 - `0b8ecf3862`

Metadata:
- status: `verified-from-source-image`
- readability: `medium-high`
- cut off: `no`
- confidence: `high`
- theme: Browser fetch reader loop

#### Visible meaning

```text
Browser Fetch streaming uses response.body.getReader() and reader.read() in a loop. Each read returns a Uint8Array chunk and a done flag. done=true ends the body stream.
```

#### Visible code / API shape

```csharp
const reader = response.body.getReader();
while (true) {
  const { value, done } = await reader.read();
  if (done) break;
}
```

---

## 2.2 PDS02B

### PDS02B-S001 / S-008 - `173aa87080`

Metadata:
- status: `verified-from-source-image`
- readability: `medium-high`
- cut off: `no`
- confidence: `high`
- theme: WebSocket receive loop and EndOfMessage

#### Visible meaning

```text
Server-side WebSocket ReceiveAsync returns chunks of a WebSocket message. The EndOfMessage flag tells when the complete message has been received. A single ReceiveAsync is not guaranteed to equal one whole message.
```

#### Visible code / API shape

```csharp
var result = await socket.ReceiveAsync(buffer, ct);
if (result.EndOfMessage) { /* full message */ }
```

---

### PDS02B-S002 / S-009 - `65a55deac0`

Metadata:
- status: `verified-from-source-image`
- readability: `medium-high`
- cut off: `no`
- confidence: `high`
- theme: WebSocket close / close output / abort

#### Visible meaning

```text
WebSocket close behavior includes graceful close, close output and abort semantics. CloseAsync participates in close handshake; CloseOutputAsync sends close without waiting for full handshake; Abort tears down immediately.
```

#### Visible code / API shape

```csharp
await socket.CloseAsync(...);
await socket.CloseOutputAsync(...);
socket.Abort();
```

---

## 2.3 PDS02C

### PDS02C-S001 / S-010 - `d97344f4d0`

Metadata:
- status: `verified-from-source-image`
- readability: `medium-high`
- cut off: `no`
- confidence: `high`
- theme: Browser WebSocket API receives full messages

#### Visible meaning

```text
Browser WebSocket onmessage gives complete messages. Browser API does not expose partial WebSocket frames/chunks the way server ReceiveAsync does. The browser buffers until a full message is available.
```

#### Visible code / API shape

```csharp
socket.onmessage = event => {
  const message = event.data;
};
```

---

## 2.4 PDS02D

### PDS02D-S001 / S-012 - `96aaf9f572`

Metadata:
- status: `verified-from-source-image`
- readability: `medium-high`
- cut off: `no`
- confidence: `high`
- theme: UTF-8 decoder handles split characters

#### Visible meaning

```text
When byte chunks may split multi-byte UTF-8 characters, direct Encoding.GetString per chunk can break decoding. Use a Decoder that preserves state across chunks and handles partial characters.
```

#### Visible code / API shape

```csharp
Decoder decoder = Encoding.UTF8.GetDecoder();
```

---

### PDS02D-S002 / S-013 - `843188ffb7`

Metadata:
- status: `verified-from-source-image`
- readability: `medium-high`
- cut off: `no`
- confidence: `high`
- theme: Decoder.Convert for streaming text

#### Visible meaning

```text
Decoder.Convert accepts a byte span and char span and reports bytes used, chars used and completion. It is useful for streaming text decoding where chunk boundaries are arbitrary.
```

#### Visible code / API shape

```csharp
decoder.Convert(bytes, chars, flush: false,
    out int bytesUsed,
    out int charsUsed,
    out bool completed);
```

---

## 3. Cleaned source notes

- Fetch reader.read returns Uint8Array chunks until done.
- Server WebSocket ReceiveAsync chunks must be accumulated until EndOfMessage.
- Browser WebSocket buffers complete messages for onmessage.
- Direct GetString per byte chunk can break split UTF-8 characters.
- Decoder.Convert preserves decoder state across chunks.

---

## 4. Question hooks

- How/why: Fetch reader.read returns Uint8Array chunks until done?
- How/why: Server WebSocket ReceiveAsync chunks must be accumulated until EndOfMessage?
- How/why: Browser WebSocket buffers complete messages for onmessage?
- How/why: Direct GetString per byte chunk can break split UTF-8 characters?
- How/why: Decoder.Convert preserves decoder state across chunks?