# Карта повторения — ALL ABOUT REQ RES ,,,,,,,TYPES OF REQUEST CONTENT httpclient part,  server part, pipereader pipewriter stream reader stream writer

Generated: 2026-06-29 05:48:53 UTC

## Как использовать

1. Закрой regional transcript и попробуй объяснить пункты региона вслух.
2. Открой transcript и отметь пропущенные API, ownership rules и edge cases.
3. Ответь на вопросы из `17-question-bank.md` без просмотра ответа.
4. Для сложных регионов воспроизведи representative code из памяти.
5. Повтори через интервалы, не перечитывая весь combined transcript подряд.

## Политика дедупликации

- Повторяющиеся подписи и одинаковые строки не копируются дословно несколько раз.
- Одна идея объясняется один раз, но достаточно подробно.
- Различающиеся overloads, lifecycle rules и edge cases не объединяются.
- Все screenshot placements сохранены в ledger, поэтому дедупликация текста не уменьшает coverage.

## R01 — HttpClient content types and ASP.NET Core binding quick map

- Выбрать `HttpContent` по уже существующей форме данных, а не по абстрактному правилу.
- Объяснить разницу между request headers и content headers.
- Сравнить `JsonContent`, `StringContent`, `ByteArrayContent` и `StreamContent` по памяти.
- Связать media type с `[FromBody]`, `[FromForm]`, `IFormFile` и raw body.
- Объяснить ownership потока внутри `StreamContent`.
- Объяснить, почему `ObjectContent` является legacy-API.

## R02 — JSON request content, Content-Length, chunked transfer and compression

- Разделить prebuffering приложения, HTTP framing и compression.
- Объяснить, почему `JsonContent` может не знать `Content-Length` заранее.
- Описать формат одного HTTP/1.1 chunk и завершающего zero chunk.
- Объяснить, почему chunk boundary не является JSON boundary.
- Сравнить JSON string, `MemoryStream` и непосредственную сериализацию.
- Различать `Content-Encoding` и способ определения длины сообщения.

## R03 — Response reading, file download, deserialization and disposal

- Объяснить разницу `ResponseContentRead` и `ResponseHeadersRead`.
- Сравнить `ReadAsStringAsync`, `ReadFromJsonAsync` и `DeserializeAsync` по памяти.
- Объяснить, что streaming не устраняет итоговый DTO graph.
- Использовать `DeserializeAsyncEnumerable` для большого JSON-массива.
- Скопировать большой response stream напрямую в файл.
- Объяснить связь disposal response с возвратом соединения в pool.

## R04 — ResponseHeadersRead, buffering, retry pipelines and decompression

- Перечислить APIs, которые всё равно полностью materialize body.
- Объяснить, когда ошибки появляются после возврата `GetAsync`.
- Правильно применять `EnableBuffering` и возвращать `Position` к нулю.
- Сравнить fresh stream per retry и заранее buffered replayable bytes.
- Объяснить, почему один `HttpRequestMessage` нельзя безопасно пересылать повторно.
- Разделить automatic decompression и application parsing.

## R05 — Additional request media types and Base64 payloads

- Объяснить Base64 expansion и дополнительные представления в памяти.
- Отличить JSON `byte[]` от raw binary body.
- Выбрать между Base64 JSON, multipart и raw `StreamContent`.
- Связать multipart part name с `[FromForm]` property.
- Объяснить, почему Base64 неудобен для большого файла.

## R06 — ASP.NET Core response writing, raw downloads, plain text, NDJSON and SSE

- Выбрать между `Results.Ok`, `WriteAsJsonAsync`, `WriteAsync`, `StreamWriter` и `BodyWriter`.
- Организовать raw upload/download через `CopyToAsync`.
- Объяснить framing NDJSON и SSE.
- Понимать цену flush per record/event.
- Записать length-prefixed binary frame через `PipeWriter`.
- Объяснить, когда `Utf8JsonWriter` оправдан.

## R07 — ASP.NET Core request-body reading, model binding and PipeReader entry points

- Объяснить, почему normal model binding уже читает body потоково.
- Назвать реальные случаи, когда manual body access снижает память.
- Выбрать между `Request.Body` и `Request.BodyReader`.
- Правильно учитывать ownership request body.
- Объяснить одноразовое чтение и multiple-read buffering.
- Построить базовый `PipeReader` loop с `AdvanceTo`.

## R08 — StreamReader concepts, encodings, constructors and read APIs

- Объяснить byte buffer, decoder и char buffer внутри `StreamReader`.
- Сравнить `ReadAsync` и `ReadBlockAsync`.
- Объяснить стоимость `ReadLineAsync` и `ReadToEndAsync`.
- Использовать `leaveOpen` и `CurrentEncoding`.
- Объяснить опасность прямого чтения `BaseStream`.
- Объяснить назначение `DiscardBufferedData`.

## R09 — StreamWriter concepts, buffering, flush, disposal and BaseStream

- Объяснить внутренний char buffer и encoding в `StreamWriter`.
- Выбрать разумный flush boundary.
- Объяснить `AutoFlush` и его влияние на throughput.
- Правильно использовать `leaveOpen` с ASP.NET Core response.
- Не смешивать direct `BaseStream` writes с непромытыми chars.
- Выбрать `StreamWriter` только для текстовой композиции.

## R10 — PipeWriter buffers, Advance, Flush, examples and tradeoffs

- Выполнить цикл `GetSpan/GetMemory` → initialize → `Advance` → `FlushAsync`.
- Объяснить срок жизни памяти, возвращённой writer-ом.
- Объяснить, почему `Advance` обязан совпадать с числом записанных байтов.
- Обработать `FlushResult.IsCanceled` и `IsCompleted`.
- Выбрать batching threshold вместо flush после каждого фрагмента.
- Решить, когда `PipeWriter` сложнее, чем необходимый API.

## R11 — PipeReader fundamentals, ReadResult, ReadOnlySequence and AdvanceTo

- Объяснить `ReadResult.Buffer`, `IsCompleted` и `IsCanceled`.
- Работать с multi-segment `ReadOnlySequence<byte>`.
- Понимать `SequencePosition` как opaque cursor.
- Отличить `ReadAsync` от `TryRead`.
- Объяснить `AdvanceTo(consumed)` и двухпозиционный overload.
- Не терять оставшиеся bytes при завершении producer-а.

## R12 — Advanced PipeReader parsing, delimiters, slicing and copy avoidance

- Написать delimiter parser без growing temporary array.
- Выставить consumed/examined при неполной записи.
- Использовать `IsSingleSegment` только как fast path.
- Избегать необязательного `ToArray` в hot path.
- Выбрать bounded header copy, когда он проще segment-aware кода.
- Объяснить роль `CancelPendingRead`.

## R13 — SequenceReader cursor API and segmented protocol parsing

- Объяснить stack-only природу `SequenceReader<T>`.
- Использовать `TryRead`, `TryPeek`, `Advance`, `Rewind` и `TryCopyTo`.
- Читать integer с протокольным endianness.
- Парсить single и multi-byte delimiters через sequence-aware API.
- Восстановить cursor при incomplete length-prefixed frame.
- Передать `reader.Position` в `PipeReader.AdvanceTo` без переноса reader через `await`.
