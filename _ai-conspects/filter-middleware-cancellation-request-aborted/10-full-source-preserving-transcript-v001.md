# Full source-preserving transcript v001 — Filter, Middleware cancellation, RequestAborted

    Generated: 2026-07-04 UTC

    ```text
    source SVG: source/FILTER,MIDDLEWARE CANCELLATION,REQUEST ABORTED.svg
    SHA-256: a394ec2cbdbbc8c5bc77db3e828fa5c52bf83d4413bd17c60e70d90cbbc9edb0
    Git blob SHA: 57aa65e0b618f209c6481f5ae786e9776bd553a6
    viewBox: 0 0 1123.3740989608007 4032.8244050261287
    unique embedded screenshots: 10 / 10
    image uses: 10 / 10
    duplicate extra placements: 0
    native SVG text lines: 6 / 6
    source blocks: 10 / 10
    ```

    This transcript is near-literal normalized and OCR-assisted. Obvious OCR noise is corrected where clear; exact punctuation, indentation and version-specific API spelling remain authoritative in the preserved screenshots.

    ## Integrated map

    Конспект показывает, что middleware/filter не «убивает» операцию напрямую, а передаёт
`RequestAborted` в async work, проверяет token, ловит `OperationCanceledException` и может
short-circuit pipeline, не записывая response после disconnect.

    ## Source-by-source transcript

## S-001 — 1) Middlewar- example: cancel async work when client

        ```text
        source_id: S-001
        image_hash: 842b390a3e92
        placements: 1
        image_file: source/images-near-literal-v001/S-001__842b390a3e92.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        1) Middlewar- example: cancel async work when client
disconnects
Key points

- Token is context.RequestAborted

- Pass it into your async calls: SendAsync(..., ct) , ReadAsStringAsync(ct) ,

ToListAsync(ct) , etc.
- If ct.IsCancellationRequested , stop doing work and don't writ- a response.
- Catch OperationCanceledException when it's caused by that token.
        ```

        ### Смысл

        Конспект показывает, что middleware/filter не «убивает» операцию напрямую, а передаёт
`RequestAborted` в async work, проверяет token, ловит `OperationCanceledException` и может
short-circuit pipeline, не записывая response после disconnect.

        ### Вопросы
1. Откуда брать cancellation token в middleware/filter?
2. Почему отмена должна быть cooperative?
3. Когда можно short-circuit request pipeline?


---

## S-002 — 14 public async Task InvokeAsync(HttpContext context)

        ```text
        source_id: S-002
        image_hash: e1cf54b8e2ed
        placements: 1
        image_file: source/images-near-literal-v001/S-002__e1cf54b8e2ed.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        iz St

13

14 public async Task InvokeAsync(HttpContext context)

15 {

16 CancellationToken ct = context.RequestAborted;

17

18 // If th- client already disconnected, stop immediately.

19 if (ct.IsCancellationRequested)

28 return;

21

22 try

23 {

24 // Exampl- "async work" that supports cancellation: outgoing HTTP call

25 var client = _httpClientFactory.CreateClient("“MoviesAPIClient");

26

27 using var request = new HttpRequestMessage(HttpMethod.Get, “api/health”) ;

28 request.Headers.Accept.Add(new
MediaTypeWithQualityHeaderValue("application/json"));

29

30 using var respons- = await client.SendAsync(request, ct);

31 response. EnsureSuccessStatusCode();

32

33 // Mor- cancellabl- async work

34 var body = await response.Content.ReadAsStringAsync(ct);

35
        ```

        ### Смысл

        Конспект показывает, что middleware/filter не «убивает» операцию напрямую, а передаёт
`RequestAborted` в async work, проверяет token, ловит `OperationCanceledException` и может
short-circuit pipeline, не записывая response после disconnect.

        ### Вопросы
1. Откуда брать cancellation token в middleware/filter?
2. Почему отмена должна быть cooperative?
3. Когда можно short-circuit request pipeline?


---

## S-003 — 36 // If client disconnected during th- work, stop; don't try to write.

        ```text
        source_id: S-003
        image_hash: e5784f04dcbe
        placements: 1
        image_file: source/images-near-literal-v001/S-003__e5784f04dcbe.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        35

36 // If client disconnected during th- work, stop; don't try to write.
37 if (ct.IsCancellationRequested)

33 return;

39

48 // Put something into HttpContext for downstream components

41 context. Items["UpstreamHealth"] = body;

42

43 // Continu- pipeline

44 await _next(context);

45 }

46 catch (OperationCanceledException) when (ct.IsCancellationRequested)

47 {

48 // Normal: client disconnected. Don’t log as error and don't writ- response.
49 return;

58 }

51 }
        ```

        ### Смысл

        Конспект показывает, что middleware/filter не «убивает» операцию напрямую, а передаёт
`RequestAborted` в async work, проверяет token, ловит `OperationCanceledException` и может
short-circuit pipeline, не записывая response после disconnect.

        ### Вопросы
1. Откуда брать cancellation token в middleware/filter?
2. Почему отмена должна быть cooperative?
3. Когда можно short-circuit request pipeline?


---

## S-004 — Registration:

        ```text
        source_id: S-004
        image_hash: cf7b4916a780
        placements: 1
        image_file: source/images-near-literal-v001/S-004__cf7b4916a780.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        Registration:
<> Program.cs v16 ”
app.UseMiddleware<OutgoingCallMiddleware>();

Can middlewar- short-circuit th- whol- request?

Yes. If you return without calling await _next(context) , th- rest of th- pipelin- won't run.
        ```

        ### Смысл

        Конспект показывает, что middleware/filter не «убивает» операцию напрямую, а передаёт
`RequestAborted` в async work, проверяет token, ловит `OperationCanceledException` и может
short-circuit pipeline, не записывая response после disconnect.

        ### Вопросы
1. Откуда брать cancellation token в middleware/filter?
2. Почему отмена должна быть cooperative?
3. Когда можно short-circuit request pipeline?


---

## S-005 — 2) Middlewar- example: cancel a long loop cooperatively

        ```text
        source_id: S-005
        image_hash: ce74d0a79694
        placements: 1
        image_file: source/images-near-literal-v001/S-005__ce74d0a79694.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        2) Middlewar- example: cancel a long loop cooperatively
If you hav- CPU-ish work in a loop, cancellation only works if you check th- token:
        ```

        ### Смысл

        Конспект показывает, что middleware/filter не «убивает» операцию напрямую, а передаёт
`RequestAborted` в async work, проверяет token, ловит `OperationCanceledException` и может
short-circuit pipeline, не записывая response после disconnect.

        ### Вопросы
1. Откуда брать cancellation token в middleware/filter?
2. Почему отмена должна быть cooperative?
3. Когда можно short-circuit request pipeline?


---

## S-006 — public async Task InvokeAsync(HttpContext context)

        ```text
        source_id: S-006
        image_hash: 8ce397d9ac69
        placements: 1
        image_file: source/images-near-literal-v001/S-006__8ce397d9ac69.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        public async Task InvokeAsync(HttpContext context)
{
var ct = context.RequestAborted;
for (var i = 0; i < 10 000; i++)
{
ct.ThrowIfCancellationRequested(); // stops promptly on disconnect
// simulat- async work
await Task.Delay(10, ct);
}
await _next(context) ;
}
r
        ```

        ### Смысл

        Конспект показывает, что middleware/filter не «убивает» операцию напрямую, а передаёт
`RequestAborted` в async work, проверяет token, ловит `OperationCanceledException` и может
short-circuit pipeline, не записывая response после disconnect.

        ### Вопросы
1. Откуда брать cancellation token в middleware/filter?
2. Почему отмена должна быть cooperative?
3. Когда можно short-circuit request pipeline?


---

## S-007 — 3) Action filter example: cancel async work + short-circuit

        ```text
        source_id: S-007
        image_hash: 31f1f8e8d3aa
        placements: 1
        image_file: source/images-near-literal-v001/S-007__31f1f8e8d3aa.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        3) Action filter example: cancel async work + short-circuit
MVC
Key points
- Token is context.HttpContext .RequestAborted
- You can short-circuit by:
- setting context.Result = ...
- returning without calling await next()
        ```

        ### Смысл

        Конспект показывает, что middleware/filter не «убивает» операцию напрямую, а передаёт
`RequestAborted` в async work, проверяет token, ловит `OperationCanceledException` и может
short-circuit pipeline, не записывая response после disconnect.

        ### Вопросы
1. Откуда брать cancellation token в middleware/filter?
2. Почему отмена должна быть cooperative?
3. Когда можно short-circuit request pipeline?


---

## S-008 — 11 public async Task OnActionExecutionAsync(ActionExecutingContext context,

        ```text
        source_id: S-008
        image_hash: 243d6d811d55
        placements: 1
        image_file: source/images-near-literal-v001/S-008__243d6d811d55.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        18

11 public async Task OnActionExecutionAsync(ActionExecutingContext context,
ActionExecutionDelegat- next)

12 {

13 var ct = context.HttpContext.RequestAborted;

14

15 // If client disconnected, do nothing (don't execut- action).

16 if (ct.IsCancellationRequested)

17 return;

18

19 // Example: short-circuit on missing header (this cancels th- action execution)

2- if (!context.HttpContext.Request.Headers.TryGetValue("X-Api-Key", out var apikey)
II

21 string.IsNullOrWhiteSpace(apikey) )

22 {

23 context.Result = new UnauthorizedObjectResult (new

24 {

25 error = “Missing X-Api-Key header."

26 })3

27 return; // no next() => action will not run

28 }

29
        ```

        ### Смысл

        Конспект показывает, что middleware/filter не «убивает» операцию напрямую, а передаёт
`RequestAborted` в async work, проверяет token, ловит `OperationCanceledException` и может
short-circuit pipeline, не записывая response после disconnect.

        ### Вопросы
1. Откуда брать cancellation token в middleware/filter?
2. Почему отмена должна быть cooperative?
3. Когда можно short-circuit request pipeline?


---

## S-009 — 30 // Exampl- cancellabl- async work insid- a filter (outgoing call)

        ```text
        source_id: S-009
        image_hash: e11bdb9dcdf3
        placements: 1
        image_file: source/images-near-literal-v001/S-009__e11bdb9dcdf3.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        29

30 // Exampl- cancellabl- async work insid- a filter (outgoing call)
31 try

32 {

33 var client = _httpClientFactory.CreateClient("“AuthClient”) ;
34 using var resp = await client.GetAsync(“api/validate-key?key=" + apikey, ct);
35

36 if (!resp.IsSuccessStatusCode)

37 {

38 context.Result = new ForbidResult();

39 return;

40 }

41 }

42 catch (OperationCanceledException) when (ct.IsCancellationRequested)
43 {

44 // client disconnected mid-filter; stop

4s return;

46 }

47

48 // Continu- MVC pipelin- (action executes)

49 await next();

58 }

51 }
        ```

        ### Смысл

        Конспект показывает, что middleware/filter не «убивает» операцию напрямую, а передаёт
`RequestAborted` в async work, проверяет token, ловит `OperationCanceledException` и может
short-circuit pipeline, не записывая response после disconnect.

        ### Вопросы
1. Откуда брать cancellation token в middleware/filter?
2. Почему отмена должна быть cooperative?
3. Когда можно short-circuit request pipeline?


---

## S-010 — Registration:

        ```text
        source_id: S-010
        image_hash: bab0cdd9faee
        placements: 1
        image_file: source/images-near-literal-v001/S-010__bab0cdd9faee.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        Registration:
<> Program.cs vi7 a
builder .Services.AddControllers(options =>
{
options.Filters .Add<DisconnectAwareHeaderValidationFilter>();
})3
Can a filter short-circuit th- whol- request by not calling next() ?
- It can short-circuit th- rest of th- MVC action pipelin- (th- action + later filters + result).
- Th- hosting pipelin- earlier/later middlewar- is still in control, but for practical purposes:
yes, you prevent th- action from running.
Best practice: set context.Result when you short-circuit, unless th- client has disconnected
(then just return).
        ```

        ### Смысл

        Конспект показывает, что middleware/filter не «убивает» операцию напрямую, а передаёт
`RequestAborted` в async work, проверяет token, ловит `OperationCanceledException` и может
short-circuit pipeline, не записывая response после disconnect.

        ### Вопросы
1. Откуда брать cancellation token в middleware/filter?
2. Почему отмена должна быть cooperative?
3. Когда можно short-circuit request pipeline?

