# Банк вопросов для повторения — ALL ABOUT REQ RES ,,,,,,,TYPES OF REQUEST CONTENT httpclient part,  server part, pipereader pipewriter stream reader stream writer

Generated: 2026-06-29 05:48:53 UTC

Вопросы построены по semantic transcript. Они проверяют не узнавание строки, а способность объяснить API, причинно-следственные связи, память, lifetime и ошибки.

## R01 — HttpClient content types and ASP.NET Core binding quick map

1. Почему `Content-Type` относится к `HttpContent.Headers`, а `Authorization` — к request headers?
2. Когда `StringContent` создаёт лишнее представление payload в памяти?
3. Чем `JsonContent` отличается от предварительного `JsonSerializer.Serialize`?
4. Когда `ByteArrayContent` является честным выбором, а когда он скрывает лишнюю materialization?
5. Кто закрывает underlying stream после disposal `StreamContent`?
6. Чем `FormUrlEncodedContent` отличается от `MultipartFormDataContent`?
7. Как имя multipart part связывается с серверной моделью?
8. Почему `ObjectContent` не следует брать как современный default?

## R02 — JSON request content, Content-Length, chunked transfer and compression

1. Какие условия необходимы, чтобы отправитель знал точный `Content-Length`?
2. Почему нельзя установить приблизительный `Content-Length`?
3. Как выглядит один HTTP/1.1 chunk на wire?
4. Почему JSON token может пересекать границу chunks?
5. Как `MemoryStream` меняет представления данных, но не устраняет whole-body buffering?
6. Можно ли совместить gzip и chunked transfer?
7. Почему HTTP/2 нельзя описывать как HTTP/1.1 chunked framing?

## R03 — Response reading, file download, deserialization and disposal

1. В какой момент завершится обычный `GetAsync`?
2. Что реально экономит `DeserializeAsync` из response stream?
3. Почему итоговый DTO всё равно занимает память целиком?
4. Когда использовать `DeserializeAsyncEnumerable<T>`?
5. Почему response нужно держать живым до окончания `CopyToAsync`?
6. Что происходит с connection pool при забытом response body?
7. Чем `GetFromJsonAsync<T>` удобен и что он скрывает?

## R04 — ResponseHeadersRead, buffering, retry pipelines and decompression

1. Почему `ResponseHeadersRead` не делает `ReadAsStringAsync` streaming?
2. На каком этапе может возникнуть network error в headers-read режиме?
3. Зачем `EnableBuffering` и где может храниться buffered request?
4. Почему повторный Polly attempt требует нового request/content?
5. Когда лучше buffered byte array для retries, а когда fresh file stream?
6. Какие слои буферизации остаются даже при stream deserialization?
7. Как automatic decompression влияет на наблюдаемую длину body?

## R05 — Additional request media types and Base64 payloads

1. Почему `byte[]` в JSON превращается в Base64 string?
2. Какова приблизительная Base64 expansion?
3. Когда JSON с Base64 оправдан?
4. Почему multipart лучше большого Base64-файла?
5. Когда raw binary endpoint проще multipart?
6. Какая server binding модель соответствует multipart?

## R06 — ASP.NET Core response writing, raw downloads, plain text, NDJSON and SSE

1. Почему обычный DTO не нужно вручную писать через `BodyWriter`?
2. Когда `CopyToAsync` является лучшим server output API?
3. Как framing NDJSON отличается от JSON array?
4. Почему SSE event завершается пустой строкой?
5. Что означает `Advance` после записи binary frame?
6. Почему flush после каждого tiny fragment может ухудшить throughput?
7. Когда нужен `Utf8JsonWriter`, а когда достаточно `WriteAsJsonAsync`?

## R07 — ASP.NET Core request-body reading, model binding and PipeReader entry points

1. Почему `[FromBody]` не означает предварительный гигантский string?
2. Какие операции действительно выигрывают от raw `Request.Body`?
3. Когда выбирать `BodyReader` вместо `Body`?
4. Почему endpoint не должен закрывать framework-owned request body?
5. Как middleware безопасно прочитать body до model binding?
6. Что должны означать consumed и examined в базовом pipe loop?
7. Когда manual parsing не даёт выигрыша по памяти?

## R08 — StreamReader concepts, encodings, constructors and read APIs

1. Какие три основных слоя есть внутри `StreamReader`?
2. Чем `ReadAsync` отличается от `ReadBlockAsync`?
3. Почему `ReadLineAsync` может быть проблемой для огромной строки?
4. Что делает `detectEncodingFromByteOrderMarks`?
5. Когда нужен `leaveOpen: true`?
6. Почему после seek underlying stream нужен `DiscardBufferedData`?
7. Когда смешанный binary/text protocol требует byte-level parser?

## R09 — StreamWriter concepts, buffering, flush, disposal and BaseStream

1. Что именно буферизует `StreamWriter`?
2. Почему `AutoFlush=true` часто ухудшает throughput?
3. Что гарантирует `FlushAsync`, а что не гарантирует?
4. Почему с ASP.NET Core response обычно нужен `leaveOpen: true`?
5. Когда прямой `Response.WriteAsync` проще writer-а?
6. Почему direct `BaseStream` write может нарушить порядок данных?
7. Как выбрать flush policy для NDJSON/SSE?

## R10 — PipeWriter buffers, Advance, Flush, examples and tradeoffs

1. Что произойдёт, если `Advance` больше реально записанного количества?
2. Можно ли сохранить `Span<byte>` от `GetSpan` и использовать после await?
3. Что означает size hint для `GetSpan`?
4. Когда проверять `FlushResult.IsCompleted`?
5. Почему frequent flush не равен efficient streaming?
6. Как записать prefix и payload в один writer buffer?
7. Когда `PipeWriter` не оправдывает сложность?

## R11 — PipeReader fundamentals, ReadResult, ReadOnlySequence and AdvanceTo

1. Почему `IsCompleted` не означает пустой `Buffer`?
2. Чем `FirstSpan` отличается от всей sequence?
3. Почему `SequencePosition` нельзя трактовать как integer offset?
4. Когда `TryRead` полезнее `ReadAsync`?
5. Какие bytes освобождаются по `consumed`?
6. Зачем отдельно передавать `examined`?
7. Что случится, если consumed продвинуть дальше обработанных bytes?

## R12 — Advanced PipeReader parsing, delimiters, slicing and copy avoidance

1. Как сохранить incomplete line между pipe reads без собственного growing buffer?
2. Какие consumed/examined positions нужны после полной строки и partial suffix?
3. Когда допустим `ToArray()`?
4. Почему decoding каждого segment отдельно может повредить UTF-8?
5. Когда stackalloc header copy проще `SequenceReader`?
6. Что делает `CancelPendingRead` и чего не делает?
7. Почему parser state является главным преимуществом `PipeReader`?

## R13 — SequenceReader cursor API and segmented protocol parsing

1. Почему `SequenceReader<T>` нельзя хранить в class field или переносить через await?
2. Как `TryCopyTo` помогает прочитать header через границу segments?
3. Когда использовать snapshot/restore reader-а?
4. Как прочитать length-prefixed frame без потери partial header?
5. Почему endianness определяется протоколом, а не процессором?
6. Как искать delimiter, который пересекает segment boundary?
7. Почему frame нужно сначала выделить в bytes, а затем декодировать?
8. Как связать final `SequenceReader.Position` с `PipeReader.AdvanceTo`?
