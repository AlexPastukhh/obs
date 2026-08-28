# Encoding.UTF8, Decoder/Encoder, and chunk processing — source-preserving near-literal transcript

## Source identity

```text
uploaded source snapshot: encoding, utf8, chunk processing,.svg
SHA-256: 64be648e24f24d7af5cda1b560cc1b64c28ad47d1c55e431bfac33f1fcc95253
Git blob verified in repository: 5763263be84e2e28658314edf49351c6b07ec35e
embedded image definitions: 54
image uses: 55
SVG text nodes: 48
```

## Transcription method and boundary

- One `S-XXX` block is retained for every embedded image use, in SVG use order.
- Text is transcribed at a near-literal level; spelling, whitespace, and punctuation are lightly normalized.
- Screenshot UI chrome, copy icons, language badges, and source-site footers are omitted.
- Prose blocks marked `high` were cleanly readable. Code/symbol-heavy blocks are marked `medium` and remain traceable to the exact embedded image hash.
- Interpretation is not substituted for visible source text.

## SVG canvas text nodes

- `T-001`: chunk processing with encoding.utf8.getdecoder
- `T-002`: basics
- `T-003`: getstring /getbytes overloads
- `T-004`: can we decode here like this when we process in chunks
- `T-005`: and bytes can be incomplete
- `T-006`: they can, bettter to use decoder
- `T-007`: decoder.convert vs decoder.getchars
- `T-008`: decoder  mthods
- `T-009`: encoding.utf8.getdecoder
- `T-010`: convert vs getchars
- `T-011`: decoder methods
- `T-012`: we use do while here because we get final chunk with
- `T-013`: result.endofmessage = true
- `T-014`: !!!
- `T-015`: typical convert loop
- `T-016`: when char buffer may  be
- `T-017`: to little , but with convert we
- `T-018`: can process it
- `T-019`: when index of the start(incl)
- `T-020`: changes and we need do spec
- `T-021`: count == count - byteindex
- `T-022`: or final index(incl) +1 - start index
- `T-023`: or final index(not incl) (wich is the same
- `T-024`: as count if from 0 ) - start index incl
- `T-025`: [empty text node]
- `T-026`: getchars can throw
- `T-027`: if flush doesnt affect memory
- `T-028`: and just needed to "put a sign that
- `T-029`: w ecant produce the last char"
- `T-030`: why is it important
- `T-031`: flush
- `T-032`: !!!
- `T-033`: decoder getchars vs decoder.convert
- `T-034`: decoder methods
- `T-035`: getmaxcharcount vs
- `T-036`: decode.getcharcount
- `T-037`: !!!
- `T-038`: so we have getstring that allocates a new string
- `T-039`: and we have getchars
- `T-040`: [empty text node]
- `T-041`: we can pass spans as both src and dest
- `T-042`: so we dont need to specify source count
- `T-043`: when dont know byte count/
- `T-044`: when my buffer may be smaller
- `T-045`: getbytecount
- `T-046`: trygetbytes
- `T-047`: getencoder
- `T-048`: !!!

## Source transcript

### S-001 — Practical rule

Source image SHA-256: `4a315bd8f29c862488637f9a19157db42f2a7f8e2cd34443aa129ecbfa7b21a7`
Dimensions: `881 × 428`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
9. Practical rule

Encoding.UTF8.GetBytes(text)
Encoding.UTF8.GetString(bytes)

More advanced / chunked processing
Encoding.UTF8.GetEncoder()
Encoding.UTF8.GetDecoder()
```

### S-002 — Encoder / Decoder objects also exist

Source image SHA-256: `9deca1dcc2875a0a4166513a52eea9d49b30196854ff81055a2ee55d14dae822`
Dimensions: `917 × 553`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
8. Encoder / Decoder objects also exist
There are also lower-level APIs:
Encoding.UTF8.GetEncoder()
Encoding.UTF8.GetDecoder()
These are useful for incremental/chunked processing, similar to streaming decode ideas.
Because when bytes/chars come in chunks, the encoder/decoder object can preserve state across chunks.
This matters for cases where data may be split across boundaries.
Encoder encoder = Encoding.UTF8.GetEncoder();
Decoder decoder = Encoding.UTF8.GetDecoder();
These are the more stateful versions.
```

### S-003 — Span-based APIs in newer.NET

Source image SHA-256: `caf6be1063c048bb63a0aae2156d857ba3b594478d5a58d052fdbfb7c2674593`
Dimensions: `826 × 444`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
7. Span-based APIs in newer.NET
Modem.NET also has span-based APIs for lower allocations / more control.
Examples include overloads working with:
- ReadOnlySpan<byte>
- Span<byte>
- ReadOnlySpan<char>
- Span<char>
But the standard everyday API is still:
Encoding.UTF8.GetBytes(...)
Encoding.UTF8.GetString(...)
```

### S-004 — If you only want part of the byte array

Source image SHA-256: `1d6238505f0c973a23c455baffb846380296854592e330261cff72a0e9e090ca`
Dimensions: `813 × 396`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
6. If you only want part of the byte array

There are overloads like:
string text - Encoding.UTF8.GetString(bytes, index, count);

Example:
byte[] bytes - Encoding.UTF8.GetBytes("HelloWiorld");
string text - Encoding.UTF8.GetString(bytes, 0, 5); // Hello

So yes, NET also has the "decode some portion of bytes" idea.
```

### S-005 — Example with non-ASCII

Source image SHA-256: `0be7e7246ccb1a6e0f8d494adc934b88d0f458b45bd8fbac4f8cdf1112377348`
Dimensions: `813 × 318`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
5. Example with non-ASCII
using System.Text;
string text - "6®";
byte[] bytes - Encoding.UTF8.GetBytes(text);
string decoded - Encoding.UTF8.GetString(bytes);
decoded) will be the original string again.
This works because UTF-8 handles multi-byte characters.
```

### S-006 — Other encodings also exist

Source image SHA-256: `fefe6bbfe776f1b080fdb9c57ec7e44f3fec6a12e2788235d758f8939712f085`
Dimensions: `826 × 286`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
4. Other encodings also exist
Examples:
Encoding.ASCIT
Encoding.Unicode
Encoding.BigEndianUnicode
Encoding.UTF32
But in most modern code, UTF-8 is what you want.
```

### S-007 — Most common encoding

Source image SHA-256: `094d828c5704ca9723d002f5971672d0bc8b2c3341c8ba80b67fabb4d800af7e`
Dimensions: `809 × 398`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
3. Most common encoding
Usually use:
Encoding.UTFS
because UTF-8 is the normal default choice for:
- APIs
- JSON
- files
° HTTP
- web data
```

### S-008 — Bytes -> string

Source image SHA-256: `8141cde4e9f00eb74d71e21ef4791d7bc01814694ed21ddd9ae913b10df2519d`
Dimensions: `826 × 491`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
2. Bytes -> string
Use:
string text - Encoding.UTF8.GetString(bytes);
Example:
using System.Text;
byte[] bytes - new byte[] { 72, 101, 108, 108, 111 };
string text - Encoding.UTF8.GetString(bytes);
This gives:
```

### S-009 — String -> bytes

Source image SHA-256: `aab5132423c6cc5feafc315e2ec5a6014e2f7b5fca41890d61fac03b0254fc5e`
Dimensions: `846 × 406`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
1. String -> bytes

Use:
byte[] bytes - Encoding.UTF8.GetBytes("Hello");

Example:
using System.Text;
string text = "Hello";
byte[] bytes - Encoding.UTF8.GetBytes(text);

This converts the string into UTF-8 bytes.
```

### S-010 — In.NET /.NET Core, you usually use Encoding from System.Text.

Source image SHA-256: `0bc8b48ab393266ae2d4f8f2614cd4bb6ad6bcb8c9140ea8ac6bc26699b497e5`
Dimensions: `884 × 421`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
In.NET /.NET Core, you usually use Encoding from System.Text.

Most commonly:
using System.Text;

and then:
Encoding.UTF8

That is the standard way to encode/decode text.
```

### S-011 — 7/ flush any buffered partial character

Source image SHA-256: `c31415ad1b8ef8a98fcc6e9f0f7d6bfc2d206aebecf504ff2238cd7713721407`
Dimensions: `858 × 344`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
7/ flush any buffered partial character

decoder.Convert(
Array.Empty<byte>(), ©, @,
charBuffer, 0, charBuffer.Length,
lush: true,
out _,
out int finalCharsUsed,
out _);.

if(finalcharsUsed > 0)

string tail = new string(charBuffer, @, finalCharsUsed);
Console.Write(tail);

es 7
```

### S-012 — static async Task ReadUtfSTextAsync(Stream stream, CancellationToken ct = default)

Source image SHA-256: `5a76e4bd06b8555ebf2d6a467835aaf136aa9fde3e7988fb3a7ac472e4241ddd`
Dimensions: `835 × 497`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
using System.Text;
static async Task ReadUtfSTextAsync(Stream stream, CancellationToken ct = default)
byte[] byteBuffer = new byte[1024];
char[] charBuffer = new char[Encoding.UTF8.GetMaxCharCount(byteBuffer.Length)];
Decoder decoder = Encoding.UTF8.GetDecoder();
int bytesRead;
while((bytesRead = await stream.ReadAsync(byteBuffer.AsMemory(2, byteBuffer.Length), ct)) >
byteBuffer, @, bytesRead,
charBuffer, 0, charBuffer.Length,
flush: false,
out int bytesUsed,
out int charsUsed,
out bool completed);
string textChunk = new string(charBuffer, @, charsUsed);
71 process decoded text chunk here
Console. Write(textChunk);
```

### S-013 — Where a(Decoder does make sense is when you receive bytes in chunks and need to turn them into t…

Source image SHA-256: `6eea89846e6d9a282fbbace92d8f6bfd715e3ec49e288f1f0e7a82059c3e43cb`
Dimensions: `829 × 249`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
Where a(Decoder does make sense is when you receive bytes in chunks and need to turn them into text
incrementally — for example, reading a request body, a socket stream, a file stream, or an upstream HTTP

stream where a multibyte UTF-8 character may be split across chunk boundaries. In that case, using
Encoding.UTF8.GetDecoder() preserves partial character state between chunks, which plain
Encoding.UTF8.GetString(chunk) does not. The.NET encoding docs explicitly separate Encoding from

stateful Encoder / Decoder objects for this purpose.

Example of chunked decoding with Decoder:
```

### S-014 — Decoder.Convert(...) takes bytes in, chars out, and tells you how much it consumed/produced and

Source image SHA-256: `48ddec8901813d42cab07d0f69ebf0332bcc3e491fb0137fb823fa49d52d68e1`
Dimensions: `900 × 366`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
Decoder.Convert(...) takes bytes in, chars out, and tells you how much it consumed/produced and
whether the operation fit/completed.
The common overload is:
decoder.Convert(
bytes, byteIndex, byteCount,
chars, charIndex, charCount,
flush,
out bytesUsed,
out charsUsed,
out completed);
```

### S-015 — "Can | use Memory?"

Source image SHA-256: `f2bb4ac492893ffd587be5417d328cf5bb9dea150331f7a8bc003a3897b3f00d`
Dimensions: `846 × 359`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
4. "Can | use Memory?"
Usually you pass 'Span<T> / ReadOnlySpan<T> to these APIs. If you have |Memory<T>, call | Span.
Example:
Memory<byte> memory = new byte[100];
ReadOnlySpan<char> text = "hello".AsSpan();
int written = Encoding.UTF8.GetBytes(text, memory Span);
GetBytes / GetChars are span-based APIs, not Memory<T> -based APIs directly. The docs expose span
overloads.
```

### S-016 — C. New span API for decoded chars

Source image SHA-256: `5ff9cb58d22575041331822344f02d718b7badcc722edc65b7a9f2c1eb86d62f`
Dimensions: `864 × 315`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
C. New span API for decoded chars
This writes decoded characters into a Span<char>:
ReadonlySpan<byte> src = utf8Bytes;
Span<char> dest = stackalloc char[Encoding.UTF8.GetCharCount(src)];
int charsWiritten = Encoding.UTF8.GetChars(src, dest);
GetChars(ReadonlySpan<byte>, Span<char>) is the span-based decode-into-buffer API. Use GetCharCount
first to size the destination. —
```

### S-017 — B. Old array + indexes API for decoded chars

Source image SHA-256: `29431421e8121c52658cc70613a26b8915f7c8d38e008585ed834adc50687115`
Dimensions: `880 × 598`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
B. Old array + indexes API for decoded chars
This writes decoded characters into an existing 'char[]:
int charsbiritten = Encoding.UTF8.GetChars(
bytes,
byteIndex,
byteCount,
chars,
)3
Example:
byte[] utf8 = Encoding.UTF8.GetBytes("hé1lo");
char[] chars = new char[20];
int charshiritten = Encoding.UTF8.GetChars(
utfs,
e,
utf8.Length,
chars,
5)
```

### S-018 — Decode UTF-8 bytes to text

Source image SHA-256: `b81b123cd632e80146ed9eeccc535f288fbeb10720ed604797b07b258c32eafd`
Dimensions: `816 × 480`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
2. Decode UTF-8 bytes to text
A. Allocate a new string
These create and return a new string:
string s1 - Encoding.UTF8.GetString(bytes);
string s2 - Encoding.UTF8.GetString(bytes, index, count);
string s3 = Encoding.UTF8.GetString(byteSpan);
The docs list GetString(byte[]), GetString(byte[], int, int), and GetString(ReadOnlySpan<byte>).
Important: GetString does not fill an existing char array
If you want to decode into an existing text buffer, use GetChars, not GetString.The docs list
GetChars(byte[], int, int, char[], int) and GetChars(ReadOnlySpan<byte>, Span<char>).
```

### S-019 — C. New span API

Source image SHA-256: `36cd90b6d32147265a19e3c1ffb64794edad67f820e53bc84c9fcfc49569f8ff`
Dimensions: `882 × 659`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
C. New span API
This writes into an existing 'Span<byte>:
ReadOnlySpan<char> src = "héllo".AsSpan();
Span<byte> dest = stackalloc byte[Encoding.UTF8.GetByteCount(src)];
int written = Encoding.UTF8.GetBytes(src, dest);
GetBytes(ReadOnlySpan<char>, Span<byte>) encodes from a char span into a byte span and returns how
many bytes were written. wicesotieam +1
This is the modern replacement for many index-based cases. You can create spans over arrays, slices of
arrays, stack memory, or rented buffers.
Example with slices:
char[] chars = ['h", "6", "1", 'l', 'o']5
byte[] bytes = new byte[100];
int written = Encoding.UTF8.GetBytes(
chars.AsSpan(1, 3), // "611"
bytes.AsSpan(20) // start at bytes[20]
)3
That writes the UTF-8 for "é11" starting at bytes[20].
```

### S-020 — B. Old array + indexes API

Source image SHA-256: `8027f8304ad9ba542c5bd21706b3c5f1a58f7cd13cbc2d6caf54110cc9ae65eb`
Dimensions: `918 × 546`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
B. Old array + indexes API
These write into an existing byte[]:
int written - Encoding.UTF8.GetBytes(
chars, W char[]
charIndex,
charCount,
bytes, // byte[]
int written? - Encoding.UTF8.GetBytes(
str,
charIndex,
charCount,
bytes,
Those are the classic "source array/string + source index/count + destination array + destination start index"
overloads. They do not allocate the destination array for you; you provide it. Microsoftisan
```

### S-021 — Encode text to UTF-8 bytes

Source image SHA-256: `4946b3581a8587d0f0aa7b1dd7c8029af877649cc1dd8ddbdab880cefaa32e4c`
Dimensions: `866 × 298`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
1. Encode text to UTF-8 bytes

A. Allocate a new byte[]

These create and return a new array:
var bytes1 = Encoding.UTF8.GetBytes("hello");
var bytes? = Encoding.UTF8.GetBytes(charArray);

The docs list GetBytes(string) and GetBytes(char[]) among the overloads. Nicos team
```

### S-022 — Yes. Think of the APIs in three groups

Source image SHA-256: `51247e3e61d096855bb8e0a8eb80f4e4f725042cbfa5b29e27a0561a1318d5ee`
Dimensions: `844 × 187`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
Yes. Think of the APIs in three groups:

1. allocate a new result

2. write into an existing array using indexes

3. write into an existing span
For Encoding.UTF8 / UTF8Encoding, GetBytes has all three styles. GetString only returns a string; if you
want to write decoded text into an existing character buffer, the API is GetChars, not GetString.
```

### S-023 — sb.Clear();

Source image SHA-256: `bf36e0658763d59c35d7b61412f349496ba014696e5af287a821a8f0efdff31e`
Dimensions: `998 × 553`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
while(!ct.IsCancellationRequested && ws.State == WebSocketState.Open)
sb.Clear();
WebSocketReceiveResult result;
result = await ws.ReceiveAsync(buffer, ct);
if(result.MessageType == WebSocketMessageType.Close)
return;
sb. Append(Encoding.UTF8.GetString(buffer, 0, result.Count));
while(!result.EndOfMessage);
if(result.MessageType == WebSocketMessageType.Text)
await onTextMessage(sb.ToString());
```

### S-024 — GetChars, decodes bytes into chars.

Source image SHA-256: `7062576c291bfb1d5c93abf55bf590755d5dffc72a2937096d02adc330b78d1d`
Dimensions: `818 × 548`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
GetChars, decodes bytes into chars.
You give it:
- abyte buffer
- achar buffer
- optionally flush
and it writes decoded characters.
Conceptually:
int charsWiritten = decoder.GetChars(bytes, @, byteCount, chars, 9, flush);
Use it when:
- you already know the destination char buffer is big enough
- you just want to decode this chunk
Itretums only how many chars were produced.
```

### S-025 — Convert is for incremental decoding with limited output space.

Source image SHA-256: `242d8bcba65470345b193f18f8eebd6f4c7fd7314a1a3adc31ca1a84b7cb296c`
Dimensions: `815 × 654`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
Convert is for incremental decoding with limited output space.
It does the same kind of decoding, but also tells you:
- how many bytes it consumed
- how many chars it produced
- whether it finished the input chunk
Example:
decoder.Convert(
byteBuffer, 0, bytesRead,
charBuffer, 0, charBuffer.Length,
flush: false,
out int bytesUsed,
out int charsUsed,
'cut bool completed);
So(Convert: is better when:
- your char buffer may be too small
- you want to loop safely without overflow
- you need precise control over partial progress
It is basically the "streaming / buffer-management friendly" API.
```

### S-026 — simpler

Source image SHA-256: `a3e7b6b4ec883fff204563e2bfd495f894e6777474eea245faa1a3012aa63332`
Dimensions: `675 × 330`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
- simpler
- returns only charswiritten
assumes your output buffer can hold the decoded chars
- more advanced
- returns bytesUsed, charsUsed, completed
- useful when either input or output may be only partially processed
```

### S-027 — Suppose you have

Source image SHA-256: `fc99fe73fc15f0b17c3d49fff44c77b90eefa66264709a94e65ac1219170ba9e`
Dimensions: `767 × 204`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
Suppose you have:
- 500 input bytes
- output char buffer can only hold 100 chars
GetChars_ may not be enough if the destination is too small for the decoded output.
```

### S-028 — Convert lets you do this safely

Source image SHA-256: `a5730a69fee816af1bef5857d91452f20c7570747c12f142e9b077b207d86855`
Dimensions: `816 × 558`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
Convert lets you do this safely:
- decode as much as fits
learn exactly how much input was consumed
- continue with the rest
Typical loop:
int byteIndex = 0;
while(byteIndex < bytesRead)
decoder.Convert(
byteBuffer, byteIndex, bytesRead - byteIndex,
charBuffer, 0, charBuffer.Length,
flush: false,
out int bytesUsed,
out int charsused,
out bool completed);
sb.Append(charBuffer, @, charsUsed);
byteIndex += bytesUsed;
```

### S-029 — The important instance methods are

Source image SHA-256: `42ea1a0e15a066f98869611dfb172d5bb980bc39963f73c4b5ff458c5e106112`
Dimensions: `519 × 253`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
The important instance methods are:
- GetCharCount(...)
- GetChars(...)
- Convert(...)
- Reset()
What they do:
```

### S-030 — Tells you how many chars would be produced from a given byte range.

Source image SHA-256: `939f40deac1a86f822721fe96b8b425aeae06d450df21e2631ebfbd7fe72c489`
Dimensions: `817 × 229`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
Tells you how many chars would be produced from a given byte range.
int count - decoder.GetCharCount(bytes, 9, byteCount, flush);

Useful when you want to size a char buffer first.
```

### S-031 — Actually decodes bytes to chars.

Source image SHA-256: `6d0ffc8776f6263e6741a1cde290e22e579287c218195c94e9370de1556aafb2`
Dimensions: `880 × 231`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
Actually decodes bytes to chars.
int charshiritten = decoder.GetChars(bytes, ©, byteCount, chars, @, flush);
```

### S-032 — Decodes as much as possible into a bounded char buffer and tells you progress.

Source image SHA-256: `591d461ecfe981d3fbb45909f7ecf635258b2afe316309fc86103f550c7fa154`
Dimensions: `881 × 239`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
Decodes as much as possible into a bounded char buffer and tells you progress.
decoder.Convert(..., out bytesUsed, out charsUsed, out completed);
```

### S-033 — Clears any saved decoder state.

Source image SHA-256: `9e48db50207e86fbf32e215a562bc16f4541358b28447d9ae23439a8d84a621e`
Dimensions: `900 × 256`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
Clears any saved decoder state.

Important for streamed encodings like UTF-8, where part of a multibyte character may be buffered internally.
decoder-Reset();
```

### S-034 — flush tells the decoder

Source image SHA-256: `fa77122ad1e4a3a3606515b95279d5059ce6b6db2c6de5df3d16c3cafab55f3e`
Dimensions: `631 × 338`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
flush tells the decoder:
"This is the end of the data stream for now. Do not expect more bytes after this."
That matters because the decoder may be holding incomplete byte sequences internall
Example with UTF-8:

- acharacter may need 3 bytes

- current chunk ends after only 2 bytes

- decoder cannot emit the char yet

- it stores the partial bytes internally
```

### S-035 — If more bytes are coming, use

Source image SHA-256: `823cdf9c16c89a6a0d0f2932a77eaa65cc3acb6d51fe3b0e71ce7789719789e6`
Dimensions: `838 × 513`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
If more bytes are coming, use:
flush: false
That means:
keep partial state, more input will arrive later
If this is the final chunk, use:
flush: true
That means:
this is the end, finish decoding now
If the decoder is still holding an incomplete sequence at 'flush: true, it will resolve that according to
fallback rules, often producing a replacement character or error behavior depending on configuration.
```

### S-036 — In WebSocket/message chunking terms

Source image SHA-256: `10272286af4cc5d08c0056c43a5bd8739d9348be26345696f72efdfb894a7351`
Dimensions: `822 × 329`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
In WebSocket/message chunking terms
While reading message fragments:
- use flush: false for intermediate chunks
use flush: true on the final chunk of the message(EndOfMessage == true)
Example:
bool flush = result. EndofMessage;
because only then do you know no more bytes for that message are coming.
```

### S-037 — Use

Source image SHA-256: `27b6dada93837bec4488e58f007a66b8c2971b554ed9f19d1162525378077fef`
Dimensions: `862 × 401`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
Use:
GetChars when the output buffer is definitely large enough and you want simpler code
Convert' when you want robust streaming logic and careful buffer management
flush: false while more bytes are expected
- flush: true on the final chunk
Reset() when starting a completely new independent stream/message and you do not want leftover
- GetChars = "decode this"
Convert = "decode as much as fits, and tell me how far you got"
- flush = "this is the last chunk, don't wait for more bytes"
```

### S-038 — sb.Clear();

Source image SHA-256: `bf36e0658763d59c35d7b61412f349496ba014696e5af287a821a8f0efdff31e`
Dimensions: `998 × 553`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
while(!ct.IsCancellationRequested && ws.State == WebSocketState.Open)
sb.Clear();
WebSocketReceiveResult result;
result = await ws.ReceiveAsync(buffer, ct);
if(result.MessageType == WebSocketMessageType.Close)
return;
sb. Append(Encoding.UTF8.GetString(buffer, 0, result.Count));
while(!result.EndOfMessage);
if(result.MessageType == WebSocketMessageType.Text)
await onTextMessage(sb.ToString());
```

### S-039 — Yes, for the input slice you passed into that Convert call.

Source image SHA-256: `eeab19675f6b59afc7cbaedd6d9017749d4e7b09d5547022e9000dd3945d8376`
Dimensions: `843 × 355`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
Yes, for the input slice you passed into that Convert call.
More precisely, completed == true means:
- there are no more bytes left from that provided range to process right now
- the decoder finished that chunk as far as it can in this call
So this is the right intuition:
"there are no more bytes in the provided input segment left to decode for now"
But not:
"the whole stream has ended"
"the byte array is empty"
```

### S-040 — int byteIndex = 0;

Source image SHA-256: `a6b4a88a1649484bd00bdd09fa275dd35924852e0a7a843496ce82c4239e2bf6`
Dimensions: `855 × 434`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
int byteIndex = 0;
while(byteIndex < bytesRead)
byteBuffer, byteIndex, bytesRead - byteIndex,
charBuffer, 0, charBuffer.Length,
flush: false,
out int bytesUsed,
out int charsUsed,
out bool completed);
sb.Append(charBuffer, @, charsUsed);
byteIndex += bytesUsed;
if(completed)
break;
```

### S-041 — Yes. |GetChars can fail if the destination 'char[] is too small for the decoded output.

Source image SHA-256: `0cc9b9735314a6778bb50024172e969587b70b283a30a2809c9ea0f3926415f0`
Dimensions: `869 × 296`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
1. Yes. |GetChars can fail if the destination 'char[] is too small for the decoded output.
Example shape:
int charsWiritten = decoder.GetChars(bytes, @, byteCount, chars, 9, flush);
If chars does not have enough room from the given index onward, it can throw, typically an
ArgumentException.
That is one big reason Convert exists: it lets you decode only what fits instead of failing.
```

### S-042 — Replacement fallback

Source image SHA-256: `64ed06b76c2e5515f6931b0f543d1a0f828374e6a10479e03f9b5352808ed82c`
Dimensions: `841 × 415`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
1. Replacement fallback
Invalid or incomplete data is replaced with a replacement character.
For decoding, that is usually:
° o
So bad UTF-8 bytes do not throw; they become replacement chars.
2. Exception fallback
Instead of replacing, throw an exception.
This is useful when invalid text must be treated as an error.
```

### S-043 — You can also create encodings with explicit fallback objects.

Source image SHA-256: `76cc03038bd6d866017343634e8b71c9fc89b8a6ce5f4425a0c2d1ef418ac898`
Dimensions: `900 × 563`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
You can also create encodings with explicit fallback objects.
Example idea:
Encoding enc = Encoding.GetEncoding(
wutf-8",
EncoderFal lback.ExceptionFallback,
DecoderFal back. ExceptionFallback
)3
Or for replacement:
Encoding enc = Encoding.GetEncoding(
wutf-8",
new EncoderReplacementFallback("?),
new DecoderReplacementFallback("4")
)3
Then get the decoder from that encoding.
```

### S-044 — If final bytes are invalid/incomplete and you flush, you will usually get replacement output.

Source image SHA-256: `3ca2c23512834ab3f1fa7bbef2662df09167be460bc2e4c12e48c4190a76f133`
Dimensions: `892 × 487`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
var enc = new UTF8Encoding(false, false); // do not throw
var decoder = enc.GetDecoder();

If final bytes are invalid/incomplete and you flush, you will usually get replacement output.

var enc = new UTF8Encoding(false, true); // throw on invalid bytes
var decoder = enc.GetDecoder();

If final bytes are invalid/incomplete and you flush, you can get a DecoderFallbackException.
```

### S-045 — If you end the method and throw the decoder away, there is no runtime "hanging" problem.

Source image SHA-256: `86391350fa32b0b15fc50111f14f9ca52ccffced98d7a0cfaee10a748c1b41e0`
Dimensions: `740 × 104`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
If you end the method and throw the decoder away, there is no runtime "hanging" problem.
The problem is correctness of the decoded text.
```

### S-046 — What happens without flush: true

Source image SHA-256: `23fb2a985554407f3d04ff25ed4efa5b0cbcbb229b63296dc07898ad11a421c5`
Dimensions: `733 × 534`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
What happens without flush: true
Suppose decoder has buffered an incomplete UTF-8 sequence at the end.
Example:
got first 2 bytes of a 3-byte character
- third byte never arrived
If you never call flush: true and just stop:
- the decoder keeps waiting internally
- then your method ends
- decoder instance becomes irrelevant / can be collected
- those buffered bytes are effectively discarded
no replacement char is emitted
So the issue is not "decoder is stuck forever".
The issue is:
you never gave it the chance to finalize the last partial input.
```

### S-047 — Why flush: true changes things

Source image SHA-256: `d5162e1c31853dffd64bca7c0d245387da9f898a3c48afb1c6de88cb12cac581`
Dimensions: `771 × 414`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
Why flush: true changes things
flush: true tells the decoder:
input is over, decide now
Now it must handle the buffered partial bytes.
Depending on fallback configuration:
replacement fallback — emit @
exception fallback — throw
So with flush: true, the truncated ending becomes visible as either:
replacement output, or
- anerror
Without flush: true, it may just disappear.
```

### S-048 — So if the data is already corrupted, what is the difference?

Source image SHA-256: `f143c8ae9ec2eb6e1cccc8b4ad5b201414dfc1cc5a13a866acccf5253603b27f`
Dimensions: `870 × 526`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
So if the data is already corrupted, what is the difference?
Big difference:
The corruption may be silently dropped.
Example outcome:
The corruption is resolved explicitly.
Possible outcome:
Hell® o
'or an exception is thrown.
That is better because it reflects reality: input ended with an invalid/incomplete sequence.
```

### S-049 — Why "waiting state" matters only if you continue

Source image SHA-256: `55ffec1321e9df42d4d34ce64da827a170905ebdd3e50a8d9cebb2a23e8b0d6d`
Dimensions: `932 × 355`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
Why "waiting state" matters only if you continue
The decoder's waiting state only matters if:

- more bytes may come later, or

you want a correct final result
If you abandon the decoder and do not care about the trailing partial sequence, then practically nothing bad
happens to execution.
But semantically, you have done this:

"Ignore any incomplete character at the end."

Sometimes that is acceptable. Often it is not.
```

### S-050 — The practical difference

Source image SHA-256: `c80f2c40e3aa32c49abae52a9e6b2e902eccf39b195eb05ed5dc5340a00a1207`
Dimensions: `1010 × 169`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
The practical difference:
- ~GetMaxCharCount = "How big should | make the char buffer so it is guaranteed to fit?"
- Decoder.GetCharCount = "Given these exact bytes, and any partial multibyte sequence | already
buffered from a previous chunk, how many chars will | really get?" —
```

### S-051 — Example

Source image SHA-256: `e9d25e2925dda7bd22317d9abdd0caace1329225fa813bbc3bc7f862244015c3`
Dimensions: `1071 × 397`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
Example:
byte[] chunk1 = new byte[] { 0xE2, 0x82 }; // first 2 bytes of '€*
byte[] chunk2 = new byte[] { 0xAC }; // last byte of '€'
Decoder d = Encoding.UTF8.GetDecoder();
int cl = d.GetCharCount(chunk1, ®, chunki.Length, flush: false); // @
int c2 = d.GetCharCount(chunk2, ®, chunk2.Length, flush: true); // 1
That happens because the decoder keeps the incomplete UTF-8 sequence from the first chunk and
completes it with the second chunk. This is exactly the stream-decoding scenario Decoder is for.
```

### S-052 — Performance tradeoff

Source image SHA-256: `36bf23fddef5a2936b97c947c138a75d55a9f0865d743100a25dcbab7d39ccbf`
Dimensions: `1003 × 173`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
Performance tradeoff:
- GetCharCount generally gives the exact size, so it can help you allocate less memory.
- GetMaxCharCount generally runs faster, but may over-allocate because it returns a safe upper bound.
the remarks for the encoding APIs. _
```

### S-053 — What if | do not know the exact byte count?

Source image SHA-256: `ed6cec324d5eb419dc9ab7b799dd7deb46dfae04da5514a3eb64b9445643a22f`
Dimensions: `971 × 389`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
What if | do not know the exact byte count?
You have a few options.
Option 1: call GetByteCount first
This is the cleanest when the full text is already available.
int byteCount = Encoding.UTF8.GetByteCount(text);
Span<byte> dest = writer.GetSpan(byteCount);
int written = Encoding.UTF8.GetBytes(text.AsSpan(), dest);
writer. Advance(written);
This gives you an exact fit. Microsoftteam «
```

### S-054 — Option 2: use TryGetBytes

Source image SHA-256: `bda40a68ebfcc2b54949b2b0479f2906211e807e084a0998705b368510bd369b`
Dimensions: `1050 × 472`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
Option 2: use TryGetBytes
If you want a "did it fit?" pattern, TryGetBytes writes into the destination span only if it is large enough and
reports bytesWritten.Microsof Lean ~
Span<byte> dest = writer.GetSpan(32);
if(Encoding.UTF8.TryGetBytes(text.AsSpan(), dest, out int written))
writer. Advance(written);
await writer.FlushAsync(ct);
// ask for a bigger span or fall back to GetByteCount first
```

### S-055 — Option 3: use an Encoder for chunked / stateful text encoding

Source image SHA-256: `298a4dfea71713e042bff3a60ca7f6d6c0507f25cdb4de9fbec2dd905688f74b`
Dimensions: `899 × 199`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
Option 3: use an Encoder for chunked / stateful text encoding

If you are encoding text in pieces and characters may span boundaries, use Encoding.GetDecoder /
GetEncoder style stateful APIs rather than assuming each chunk is a complete conversion. The encoding
docs distinguish Encoding.GetBytes for discrete conversions from Encoder.GetBytes, which handles
multiple conversions on a single input stream and preserves state across calls. _
```

## Closure

```text
image uses transcribed: 55 / 55
SVG text nodes indexed: 48 / 48
semantic-only regional summary used as authoritative transcript: no
source reconstruction required: no
```
