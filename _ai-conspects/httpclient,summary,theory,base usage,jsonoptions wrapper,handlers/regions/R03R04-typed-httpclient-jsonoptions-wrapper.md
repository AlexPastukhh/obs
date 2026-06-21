# R03+R04 - Typed HttpClient / JsonOptions wrapper / typed client methods

Conspect: `httpclient,summary,theory,base usage,jsonoptions wrapper,handlers`  
File type: **source-preserving combined region transcript**  
Stage: **stage-2 / verified combined transcript v001**  
Generated: 2026-06-02 01:12:25 UTC

---

## Direction check

Goal:
Convert the HttpClient Excalidraw conspect into source-preserving region text without losing images.

Now:
R01/R02 basics are done. R03/R04 processes typed HttpClient, typed-client methods, handler theory, and JsonOptions wrapper.

This step:
Create combined R03/R04 transcript from 30 included sources after local boundary review.

Why:
Typed client structure and JsonOptions wrapper are adjacent implementation material, so they can be processed together as a larger but coherent pass.

Next:
R05A/R05B HttpClientFactory / lifetime / DNS / named and typed clients.

---

## 0. You are here

Current region: `R03+R04 - Typed HttpClient / JsonOptions wrapper`  
Status: `verified transcript from extracted SVG images`  
Source count: `30`  
Known limitations: several code screenshots are small; code blocks preserve visible intent and key lines.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
```text
- typed HttpClient instances and type-scoped configuration
- HttpClient request/response/message-handler theory
- wrapping HttpClient in API-specific client classes
- JsonSerializerOptions wrapper as a canonical options source
- using the wrapper in manual deserialization and typed-client methods
- why MVC JSON configuration is not enough for HttpClient/manual JsonSerializer calls
```

Key ideas:
- A typed client wraps HttpClient and API-specific operations behind a domain-specific class.
- AddHttpClient<TClient> creates/configures HttpClient instances through DI for that typed client.
- HttpClient works with HttpRequestMessage/HttpResponseMessage and a handler pipeline.
- Not every handler sends data over the network; handlers can log, cache, filter, add headers, or short-circuit.
- Typed clients become more useful when they expose specific methods such as GetMoviesAsync instead of exposing raw Client everywhere.
- A JsonSerializerOptionsWrapper keeps manual serialization/deserialization consistent across integration code.
- MVC/AddJsonOptions config does not automatically apply to manual JsonSerializer or ReadFromJsonAsync calls unless options are passed.

Reading quality:
```text
overall_conceptual_understanding: high
source_readability: mostly high; some code screenshots are small
limitations:
- Code blocks are preserved as visible intent/key lines, not guaranteed punctuation-perfect in every tiny screenshot.
- Several images are theory diagrams/text notes rather than full code.
- S-074/S-099/S-128/S-136 were visually/semantically checked and excluded to R05A.
confidence_summary: High for region ownership and concepts; medium-high for exact code punctuation in small screenshots.
```

---

## 0.2 Coverage / boundary review

Included R03 sources:
```text
S-004, S-007, S-014, S-018, S-025, S-028, S-041, S-043, S-054, S-058, S-066, S-075, S-080, S-084, S-093, S-095, S-106, S-115, S-124
```
Included R04 sources:
```text
S-015, S-016, S-023, S-024, S-030, S-033, S-046, S-047, S-051, S-064, S-076
```
Checked but not included:
```text
S-074, S-099, S-128, S-136 -> R05A factory/lifetime/network theory
```
Boundary decision:
```text
R03 and R04 are combined because typed-client implementation and JsonOptions wrapper are one adjacent road. Network/TLS/TCP/HttpClientFactory problem-summary neighbors are excluded to R05A.
```

---

## 1. Source inventory

| Region source | Global source | Assigned | fileId short | Status | Theme |
|---|---|---|---|---|---|
| R03R04-S001 | S-004 | R03 | `7bf2390123` | `verified-from-extracted-svg-image` | Demo: using typed HttpClient instances |
| R03R04-S002 | S-007 | R03 | `b65a03d109` | `verified-from-extracted-svg-image` | Basic HttpClient call flow |
| R03R04-S003 | S-014 | R03 | `63132f3c04` | `verified-from-extracted-svg-image` | MoviesAPIClient stores HttpClient |
| R03R04-S004 | S-018 | R03 | `aa57b2858b` | `verified-from-extracted-svg-image` | HttpClient integration message flow |
| R03R04-S005 | S-025 | R03 | `a9defbc143` | `verified-from-extracted-svg-image` | Register typed client and configure base address/timeout |
| R03R04-S006 | S-028 | R03 | `81fa18a583` | `verified-from-extracted-svg-image` | Default handler under HttpClient |
| R03R04-S007 | S-041 | R03 | `aa442ba0a4` | `verified-from-extracted-svg-image` | Typed client registration with JsonSerializerOptionsWrapper |
| R03R04-S008 | S-043 | R03 | `505aaab8bb` | `verified-from-extracted-svg-image` | Handler pipeline can contain multiple handlers |
| R03R04-S009 | S-054 | R03 | `ae9801c095` | `verified-from-extracted-svg-image` | Using typed client client property in service code |
| R03R04-S010 | S-058 | R03 | `9b584e4647` | `verified-from-extracted-svg-image` | Basic usage recap |
| R03R04-S011 | S-066 | R03 | `c6bc5c08c8` | `verified-from-extracted-svg-image` | Demo: type-scoped configuration for typed client |
| R03R04-S012 | S-075 | R03 | `b3acc09f16` | `verified-from-extracted-svg-image` | What is a message handler |
| R03R04-S013 | S-080 | R03 | `2c15b6f812` | `verified-from-extracted-svg-image` | MoviesAPIClient with BaseAddress and Timeout |
| R03R04-S014 | S-084 | R03 | `0c02f2b966` | `verified-from-extracted-svg-image` | Not all handlers send through the network |
| R03R04-S015 | S-093 | R03 | `a829e5da83` | `verified-from-extracted-svg-image` | Pipeline of handlers |
| R03R04-S016 | S-095 | R03 | `ab81d807e9` | `verified-from-extracted-svg-image` | Demo: extending typed HttpClient instances |
| R03R04-S017 | S-106 | R03 | `60bbfbc2b4` | `verified-from-extracted-svg-image` | Typed client with JsonOptionsWrapper fields |
| R03R04-S018 | S-115 | R03 | `1c60178e34` | `verified-from-extracted-svg-image` | GetMoviesAsync method on typed client |
| R03R04-S019 | S-124 | R03 | `a84be9c6b4` | `verified-from-extracted-svg-image` | Calling typed client method |
| R03R04-S020 | S-015 | R04 | `16a7615910` | `verified-from-extracted-svg-image` | Why a canonical JsonSerializerOptions wrapper is needed |
| R03R04-S021 | S-016 | R04 | `c18f77f29d` | `verified-from-extracted-svg-image` | JsonSerializerOptionsWrapper class |
| R03R04-S022 | S-023 | R04 | `8dc7cd5bb8` | `verified-from-extracted-svg-image` | Common global JSON options: naming/casing |
| R03R04-S023 | S-024 | R04 | `9cb8f585c2` | `verified-from-extracted-svg-image` | Register JsonSerializerOptionsWrapper in DI |
| R03R04-S024 | S-030 | R04 | `5125d7d35c` | `verified-from-extracted-svg-image` | Enum/null/number options |
| R03R04-S025 | S-033 | R04 | `21589d7eb7` | `verified-from-extracted-svg-image` | Service class injects factory and options wrapper |
| R03R04-S026 | S-046 | R04 | `2d92d09ce1` | `verified-from-extracted-svg-image` | Date/time, reference handling, performance knobs |
| R03R04-S027 | S-047 | R04 | `3626ffdf9f` | `verified-from-extracted-svg-image` | Deserialize List<Movie> with wrapper options |
| R03R04-S028 | S-051 | R04 | `5a0ef35823` | `verified-from-extracted-svg-image` | Deserialize IEnumerable<Movie> with wrapper options |
| R03R04-S029 | S-064 | R04 | `018ea05bc7` | `verified-from-extracted-svg-image` | Why MVC configuration is not enough |
| R03R04-S030 | S-076 | R04 | `c84560f23a` | `verified-from-extracted-svg-image` | Manual serialization does not automatically use MVC options |

---

## 2. Source transcript

### R03R04-S001 / S-004 - `7bf2390123`

Metadata:
- assigned_region: `R03`
- status: `verified-from-extracted-svg-image`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Demo: using typed HttpClient instances

#### Verified visible text / code gist
```text
Demo slide: “Using typed HttpClient instances”. This starts the typed-client road: instead of passing raw HttpClient everywhere, the app creates a typed API client class that wraps HttpClient and API-specific operations.
```

#### Notes
Verified from extracted SVG image/contact sheet; code blocks preserve visible intent and key lines.

---

### R03R04-S002 / S-007 - `b65a03d109`

Metadata:
- assigned_region: `R03`
- status: `verified-from-extracted-svg-image`
- readability: `medium-high-code-small`
- cut_off: `no`
- confidence: `medium-high-for-code-exactness`
- theme: Basic HttpClient call flow

#### Verified visible text / code gist
```text
Code sample: create HttpClient, call GetAsync for the movies API, ensure success, read response content as string, then deserialize List<Movie>. It shows the low-level raw HttpClient workflow that typed clients will wrap.
```

#### Verified visible code / code intent
```csharp
var httpClient = new HttpClient();
var response = await httpClient.GetAsync("http://localhost:123/api/movies");
response.EnsureSuccessStatusCode();

var content = await response.Content.ReadAsStringAsync();
var movies = JsonSerializer.Deserialize<List<Movie>>(content);
```

#### Notes
Verified from extracted SVG image/contact sheet; code blocks preserve visible intent and key lines.

---

### R03R04-S003 / S-014 - `63132f3c04`

Metadata:
- assigned_region: `R03`
- status: `verified-from-extracted-svg-image`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: MoviesAPIClient stores HttpClient

#### Verified visible text / code gist
```text
Typed client skeleton: public class MoviesAPIClient has public HttpClient Client { get; } and constructor MoviesAPIClient(HttpClient client) { Client = client; }. It captures the injected HttpClient as a typed API client dependency.
```

#### Verified visible code / code intent
```csharp
public class MoviesAPIClient
{
    public HttpClient Client { get; }

    public MoviesAPIClient(HttpClient client)
    {
        Client = client;
    }
}
```

#### Notes
Verified from extracted SVG image/contact sheet; code blocks preserve visible intent and key lines.

---

### R03R04-S004 / S-018 - `aa57b2858b`

Metadata:
- assigned_region: `R03`
- status: `verified-from-extracted-svg-image`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: HttpClient integration message flow

#### Verified visible text / code gist
```text
Theory diagram: HttpClient sends HttpRequestMessage to API and receives HttpResponseMessage back. The diagram frames HttpClient as the integration boundary between app code and remote API.
```

#### Notes
Verified from extracted SVG image/contact sheet; code blocks preserve visible intent and key lines.

---

### R03R04-S005 / S-025 - `a9defbc143`

Metadata:
- assigned_region: `R03`
- status: `verified-from-extracted-svg-image`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Register typed client and configure base address/timeout

#### Verified visible text / code gist
```text
Program.cs / services example: AddHttpClient<MoviesAPIClient> configures the client with BaseAddress and Timeout. This links DI registration to the typed client class.
```

#### Verified visible code / code intent
```csharp
services.AddHttpClient<MoviesAPIClient>(configureClient =>
{
    configureClient.BaseAddress = new Uri("http://localhost:5010");
    configureClient.Timeout = new TimeSpan(0, 0, 30);
});
```

#### Notes
Verified from extracted SVG image/contact sheet; code blocks preserve visible intent and key lines.

---

### R03R04-S006 / S-028 - `81fa18a583`

Metadata:
- assigned_region: `R03`
- status: `verified-from-extracted-svg-image`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Default handler under HttpClient

#### Verified visible text / code gist
```text
Message handler diagram: HttpClient uses an HttpMessageHandler pipeline. The bottom/default handler is the real network-facing handler. This prepares later primary/delegating handler material.
```

#### Notes
Verified from extracted SVG image/contact sheet; code blocks preserve visible intent and key lines.

---

### R03R04-S007 / S-041 - `aa442ba0a4`

Metadata:
- assigned_region: `R03`
- status: `verified-from-extracted-svg-image`
- readability: `medium-high-code-small`
- cut_off: `no`
- confidence: `medium-high-for-code-exactness`
- theme: Typed client registration with JsonSerializerOptionsWrapper

#### Verified visible text / code gist
```text
Program.cs style code: registers MoviesAPIClient with HttpClient configuration, registers JsonSerializerOptionsWrapper singleton, then wires IntegrationService / CRUDAExamples with the factory and options wrapper. This bridges typed client registration and shared JSON options.
```

#### Verified visible code / code intent
```csharp
services.AddHttpClient<MoviesAPIClient>(configureClient => { ... });
services.AddSingleton<JsonSerializerOptionsWrapper>();
services.AddScoped<IntegrationService>();
services.AddScoped<CRUDAExamples>();
```

#### Notes
Verified from extracted SVG image/contact sheet; code blocks preserve visible intent and key lines.

---

### R03R04-S008 / S-043 - `505aaab8bb`

Metadata:
- assigned_region: `R03`
- status: `verified-from-extracted-svg-image`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Handler pipeline can contain multiple handlers

#### Verified visible text / code gist
```text
Diagram: HttpClient can have a chain/pipeline of handlers before the socket/primary handler. Not every handler represents a network call; some are logical middleware.
```

#### Notes
Verified from extracted SVG image/contact sheet; code blocks preserve visible intent and key lines.

---

### R03R04-S009 / S-054 - `ae9801c095`

Metadata:
- assigned_region: `R03`
- status: `verified-from-extracted-svg-image`
- readability: `medium-high-code-small`
- cut_off: `no`
- confidence: `medium-high-for-code-exactness`
- theme: Using typed client client property in service code

#### Verified visible text / code gist
```text
Code sample: method builds an HttpRequestMessage, adds Accept header, sends via _moviesAPIClient.Client.SendAsync(request), ensures success, reads string content, and deserializes movies using _jsonSerializerOptionsWrapper.Options.
```

#### Verified visible code / code intent
```csharp
private async Task GetMoviesWithTypedHttpClientAsync()
{
    var request = new HttpRequestMessage(HttpMethod.Get, "api/movies");
    request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
    var response = await _moviesAPIClient.Client.SendAsync(request);
    response.EnsureSuccessStatusCode();
    var content = await response.Content.ReadAsStringAsync();
    var movies = JsonSerializer.Deserialize<List<Movie>>(content, _jsonSerializerOptionsWrapper.Options);
}
```

#### Notes
Verified from extracted SVG image/contact sheet; code blocks preserve visible intent and key lines.

---

### R03R04-S010 / S-058 - `9b584e4647`

Metadata:
- assigned_region: `R03`
- status: `verified-from-extracted-svg-image`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Basic usage recap

#### Verified visible text / code gist
```text
Text explanation of the raw basic flow: create HttpClient, send request, ensure success, read response body as string/content, then deserialize. It marks this as the basic usage that typed clients are about to improve.
```

#### Notes
Verified from extracted SVG image/contact sheet; code blocks preserve visible intent and key lines.

---

### R03R04-S011 / S-066 - `c6bc5c08c8`

Metadata:
- assigned_region: `R03`
- status: `verified-from-extracted-svg-image`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Demo: type-scoped configuration for typed client

#### Verified visible text / code gist
```text
Demo slide: “Using typed HttpClient instances with type-scoped configuration”. It introduces moving per-API configuration such as base address and timeout into the typed-client registration.
```

#### Notes
Verified from extracted SVG image/contact sheet; code blocks preserve visible intent and key lines.

---

### R03R04-S012 / S-075 - `b3acc09f16`

Metadata:
- assigned_region: `R03`
- status: `verified-from-extracted-svg-image`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: What is a message handler

#### Verified visible text / code gist
```text
Explains HttpMessageHandler: the part that actually processes requests and returns responses. Handlers can be real network handlers or logical handlers such as caching/filtering/logging.
```

#### Notes
Verified from extracted SVG image/contact sheet; code blocks preserve visible intent and key lines.

---

### R03R04-S013 / S-080 - `2c15b6f812`

Metadata:
- assigned_region: `R03`
- status: `verified-from-extracted-svg-image`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: MoviesAPIClient with BaseAddress and Timeout

#### Verified visible text / code gist
```text
Typed client class version where constructor configures Client.BaseAddress and Client.Timeout. It shows type-scoped client configuration inside MoviesAPIClient.
```

#### Verified visible code / code intent
```csharp
public class MoviesAPIClient
{
    public HttpClient Client { get; }

    public MoviesAPIClient(HttpClient client)
    {
        Client = client;
        Client.BaseAddress = new Uri("http://localhost:5090");
        Client.Timeout = new TimeSpan(0, 0, 30);
    }
}
```

#### Notes
Verified from extracted SVG image/contact sheet; code blocks preserve visible intent and key lines.

---

### R03R04-S014 / S-084 - `0c02f2b966`

Metadata:
- assigned_region: `R03`
- status: `verified-from-extracted-svg-image`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Not all handlers send through the network

#### Verified visible text / code gist
```text
Text note: not all handlers send through the network. A handler can fake/log/cache/filter, add auth headers, or return canned responses. Only the bottom-most handler usually does real network I/O.
```

#### Notes
Verified from extracted SVG image/contact sheet; code blocks preserve visible intent and key lines.

---

### R03R04-S015 / S-093 - `a829e5da83`

Metadata:
- assigned_region: `R03`
- status: `verified-from-extracted-svg-image`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Pipeline of handlers

#### Verified visible text / code gist
```text
Text note: HttpClient can be configured with a chain of handlers: Handler A -> Handler B -> Handler C -> SocketHttpHandler. Each handler receives HttpRequestMessage and can modify, short-circuit, inspect, or modify the response on the way back.
```

#### Notes
Verified from extracted SVG image/contact sheet; code blocks preserve visible intent and key lines.

---

### R03R04-S016 / S-095 - `ab81d807e9`

Metadata:
- assigned_region: `R03`
- status: `verified-from-extracted-svg-image`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Demo: extending typed HttpClient instances

#### Verified visible text / code gist
```text
Demo slide: “Extending typed HttpClient instances with interaction methods”. It starts the move from exposing Client directly to adding API-specific methods inside the typed client.
```

#### Notes
Verified from extracted SVG image/contact sheet; code blocks preserve visible intent and key lines.

---

### R03R04-S017 / S-106 - `60bbfbc2b4`

Metadata:
- assigned_region: `R03`
- status: `verified-from-extracted-svg-image`
- readability: `medium-high-code-small`
- cut_off: `no`
- confidence: `medium-high-for-code-exactness`
- theme: Typed client with JsonOptionsWrapper fields

#### Verified visible text / code gist
```text
MoviesAPIClient now has private readonly JsonSerializerOptionsWrapper _jsonSerializerOptionsWrapper and constructor parameters HttpClient client + JsonSerializerOptionsWrapper. It stores the wrapper and configures Client.BaseAddress/Timeout.
```

#### Verified visible code / code intent
```csharp
public class MoviesAPIClient
{
    private readonly JsonSerializerOptionsWrapper _jsonSerializerOptionsWrapper;
    public HttpClient Client { get; }

    public MoviesAPIClient(HttpClient client, JsonSerializerOptionsWrapper jsonSerializerOptionsWrapper)
    {
        _jsonSerializerOptionsWrapper = jsonSerializerOptionsWrapper;
        Client = client;
        Client.BaseAddress = new Uri("http://localhost:5090");
        Client.Timeout = new TimeSpan(0, 0, 30);
    }
}
```

#### Notes
Verified from extracted SVG image/contact sheet; code blocks preserve visible intent and key lines.

---

### R03R04-S018 / S-115 - `1c60178e34`

Metadata:
- assigned_region: `R03`
- status: `verified-from-extracted-svg-image`
- readability: `medium-high-code-small`
- cut_off: `no`
- confidence: `medium-high-for-code-exactness`
- theme: GetMoviesAsync method on typed client

#### Verified visible text / code gist
```text
Typed client method: GetMoviesAsync creates request, adds Accept header, sends through Client, ensures success, reads content, and deserializes IEnumerable<Movie> with _jsonSerializerOptionsWrapper.Options.
```

#### Verified visible code / code intent
```csharp
public async Task<IEnumerable<Movie>?> GetMoviesAsync()
{
    var request = new HttpRequestMessage(HttpMethod.Get, "api/movies");
    request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
    var response = await Client.SendAsync(request);
    response.EnsureSuccessStatusCode();
    var content = await response.Content.ReadAsStringAsync();
    return JsonSerializer.Deserialize<IEnumerable<Movie>>(content, _jsonSerializerOptionsWrapper.Options);
}
```

#### Notes
Verified from extracted SVG image/contact sheet; code blocks preserve visible intent and key lines.

---

### R03R04-S019 / S-124 - `a84be9c6b4`

Metadata:
- assigned_region: `R03`
- status: `verified-from-extracted-svg-image`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Calling typed client method

#### Verified visible text / code gist
```text
Usage snippet: GetMoviesViaMoviesAPIClientAsync calls _moviesAPIClient.GetMoviesAsync(). This demonstrates the caller no longer knows request URI/header/deserialization details.
```

#### Verified visible code / code intent
```csharp
private async Task GetMoviesViaMoviesAPIClientAsync()
{
    var movies = await _moviesAPIClient.GetMoviesAsync();
}
```

#### Notes
Verified from extracted SVG image/contact sheet; code blocks preserve visible intent and key lines.

---

### R03R04-S020 / S-015 - `16a7615910`

Metadata:
- assigned_region: `R04`
- status: `verified-from-extracted-svg-image`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Why a canonical JsonSerializerOptions wrapper is needed

#### Verified visible text / code gist
```text
Explains JsonSerializer.Serialize/Deserialize uses either passed options or JsonSerializerOptions.Default. If options are repeated in many places, every repeated copy is inconsistent/expensive. Goal: one canonical options set for the app.
```

#### Notes
Verified from extracted SVG image/contact sheet; code blocks preserve visible intent and key lines.

---

### R03R04-S021 / S-016 - `c18f77f29d`

Metadata:
- assigned_region: `R04`
- status: `verified-from-extracted-svg-image`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: JsonSerializerOptionsWrapper class

#### Verified visible text / code gist
```text
Wrapper class with JsonSerializerOptions Options { get; } and constructor that initializes Options = new JsonSerializerOptions(JsonSerializerDefaults.Web). It centralizes JSON serializer options.
```

#### Verified visible code / code intent
```csharp
public class JsonSerializerOptionsWrapper
{
    public JsonSerializerOptions Options { get; }

    public JsonSerializerOptionsWrapper()
    {
        Options = new JsonSerializerOptions(JsonSerializerDefaults.Web);
    }
}
```

#### Notes
Verified from extracted SVG image/contact sheet; code blocks preserve visible intent and key lines.

---

### R03R04-S022 / S-023 - `8dc7cd5bb8`

Metadata:
- assigned_region: `R04`
- status: `verified-from-extracted-svg-image`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Common global JSON options: naming/casing

#### Verified visible text / code gist
```text
Explains common JSON options: PropertyNamingPolicy = JsonNamingPolicy.CamelCase serializes C# MovieTitle as movieTitle; PropertyNameCaseInsensitive = true helps integration clients tolerate casing differences.
```

#### Verified visible code / code intent
```csharp
Options.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
Options.PropertyNameCaseInsensitive = true;
```

#### Notes
Verified from extracted SVG image/contact sheet; code blocks preserve visible intent and key lines.

---

### R03R04-S023 / S-024 - `9cb8f585c2`

Metadata:
- assigned_region: `R04`
- status: `verified-from-extracted-svg-image`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Register JsonSerializerOptionsWrapper in DI

#### Verified visible text / code gist
```text
Program.cs snippet: services.AddSingleton<JsonSerializerOptionsWrapper>(); registered alongside other services.
```

#### Verified visible code / code intent
```csharp
services.AddSingleton<JsonSerializerOptionsWrapper>();
```

#### Notes
Verified from extracted SVG image/contact sheet; code blocks preserve visible intent and key lines.

---

### R03R04-S024 / S-030 - `5125d7d35c`

Metadata:
- assigned_region: `R04`
- status: `verified-from-extracted-svg-image`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Enum/null/number options

#### Verified visible text / code gist
```text
Explains JsonStringEnumConverter for string enums, DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull, and JsonNumberHandling.AllowReadingFromString for interop when upstream sends "123" instead of 123.
```

#### Verified visible code / code intent
```csharp
Converters.Add(new JsonStringEnumConverter());
DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
NumberHandling = JsonNumberHandling.AllowReadingFromString;
```

#### Notes
Verified from extracted SVG image/contact sheet; code blocks preserve visible intent and key lines.

---

### R03R04-S025 / S-033 - `21589d7eb7`

Metadata:
- assigned_region: `R04`
- status: `verified-from-extracted-svg-image`
- readability: `medium-high-code-small`
- cut_off: `no`
- confidence: `medium-high-for-code-exactness`
- theme: Service class injects factory and options wrapper

#### Verified visible text / code gist
```text
CRUDAExamples / IntegrationService class injects IHttpClientFactory and JsonSerializerOptionsWrapper via constructor. This allows service methods to create clients and deserialize with the same canonical options.
```

#### Verified visible code / code intent
```csharp
public class CRUDAExamples : IIntegrationService
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly JsonSerializerOptionsWrapper _jsonSerializerOptionsWrapper;

    public CRUDAExamples(IHttpClientFactory httpClientFactory, JsonSerializerOptionsWrapper jsonSerializerOptionsWrapper)
    {
        _jsonSerializerOptionsWrapper = jsonSerializerOptionsWrapper ?? throw new ArgumentNullException(nameof(jsonSerializerOptionsWrapper));
        _httpClientFactory = httpClientFactory ?? throw new ArgumentNullException(nameof(httpClientFactory));
    }
}
```

#### Notes
Verified from extracted SVG image/contact sheet; code blocks preserve visible intent and key lines.

---

### R03R04-S026 / S-046 - `2d92d09ce1`

Metadata:
- assigned_region: `R04`
- status: `verified-from-extracted-svg-image`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Date/time, reference handling, performance knobs

#### Verified visible text / code gist
```text
Explains more JSON options: DateOnly/TimeOnly/custom converters/Guid formats; ReferenceHandler.IgnoreCycles or Preserve for reference loops; WriteIndented mostly for debugging and MaxDepth for guarding against deeply nested payloads.
```

#### Notes
Verified from extracted SVG image/contact sheet; code blocks preserve visible intent and key lines.

---

### R03R04-S027 / S-047 - `3626ffdf9f`

Metadata:
- assigned_region: `R04`
- status: `verified-from-extracted-svg-image`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Deserialize List<Movie> with wrapper options

#### Verified visible text / code gist
```text
Code fragment: JsonSerializer.Deserialize<List<Movie>>(content, _jsonSerializerOptionsWrapper.Options). It shows using the wrapper in manual deserialization.
```

#### Verified visible code / code intent
```csharp
movies = JsonSerializer.Deserialize<List<Movie>>(content, _jsonSerializerOptionsWrapper.Options);
```

#### Notes
Verified from extracted SVG image/contact sheet; code blocks preserve visible intent and key lines.

---

### R03R04-S028 / S-051 - `5a0ef35823`

Metadata:
- assigned_region: `R04`
- status: `verified-from-extracted-svg-image`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Deserialize IEnumerable<Movie> with wrapper options

#### Verified visible text / code gist
```text
Code fragment: JsonSerializer.Deserialize<IEnumerable<Movie>>(content, _jsonSerializerOptionsWrapper.Options). Duplicate/continuation example of using wrapper options in typed-client methods.
```

#### Verified visible code / code intent
```csharp
var movies = JsonSerializer.Deserialize<IEnumerable<Movie>>(content, _jsonSerializerOptionsWrapper.Options);
```

#### Notes
Verified from extracted SVG image/contact sheet; code blocks preserve visible intent and key lines.

---

### R03R04-S029 / S-064 - `018ea05bc7`

Metadata:
- assigned_region: `R04`
- status: `verified-from-extracted-svg-image`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Why MVC configuration is not enough

#### Verified visible text / code gist
```text
Explains that MVC/Minimal API output formatting configured with AddJsonOptions/AddNewtonsoftJson affects controller/minimal API serialization/model binding, but not manual JsonSerializer.Deserialize or ReadFromJsonAsync unless options are passed.
```

#### Verified visible code / code intent
```csharp
builder.Services.AddControllers().AddJsonOptions(...);
AddNewtonsoftJson(...);
```

#### Notes
Verified from extracted SVG image/contact sheet; code blocks preserve visible intent and key lines.

---

### R03R04-S030 / S-076 - `c84560f23a`

Metadata:
- assigned_region: `R04`
- status: `verified-from-extracted-svg-image`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Manual serialization does not automatically use MVC options

#### Verified visible text / code gist
```text
Manual serialization such as JsonSerializer.Deserialize(jsonString) or response.Content.ReadFromJsonAsync<T>() does not automatically use MVC options unless explicitly passed. This can cause HttpClient integration deserialization failures due to casing/enum differences.
```

#### Verified visible code / code intent
```csharp
JsonSerializer.Deserialize<T>(jsonString);
await response.Content.ReadFromJsonAsync<T>();
```

#### Notes
Verified from extracted SVG image/contact sheet; code blocks preserve visible intent and key lines.

---

## 3. Cleaned source notes

- Typed clients wrap HttpClient configuration and API-specific behavior into a dedicated class.
- `AddHttpClient<MoviesAPIClient>` creates/configures a typed client through DI.
- A typed client can expose a raw `Client` property at first, but becomes cleaner when it exposes domain/API methods such as `GetMoviesAsync`.
- HttpClient is built around request/response messages and a handler pipeline.
- Handlers can be logical middleware: logging, caching, auth headers, filtering, faking, or returning canned responses; not every handler touches the network.
- `JsonSerializerOptionsWrapper` centralizes manual JSON serializer options for integration code.
- MVC/Minimal API JSON options do not automatically apply to manual `JsonSerializer.Deserialize` or `ReadFromJsonAsync` calls unless options are passed.
- Canonical options avoid inconsistent casing, enum handling, null handling, number handling, date/time handling, and reference handling across services.

---

## 4. Minimal interpretation

R03/R04 is the bridge from raw HttpClient usage to structured integration clients. First, a typed client holds/configures HttpClient and gradually moves raw request-building into specific methods. Second, the conspect introduces the HttpMessageHandler pipeline as the layer under HttpClient that can perform cross-cutting request/response work. Third, it creates a JsonSerializerOptionsWrapper so all manual serialization/deserialization in integration code uses the same canonical settings instead of relying on MVC output formatting or scattered options copies.

---

## 5. Evidence table

| Claim | Evidence | Source type | Confidence |
|---|---|---|---|
| Typed client wraps HttpClient and configuration | R03R04-S003/R03R04-S005/R03R04-S013 | extracted SVG image transcript/code | high |
| AddHttpClient registers/configures typed client through DI | R03R04-S005/R03R04-S007 | extracted SVG image transcript/code | high |
| Handlers form a request/response pipeline under HttpClient | R03R04-S004/R03R04-S006/R03R04-S008/R03R04-S014/R03R04-S015 | extracted SVG image transcript/diagram | high |
| Typed clients can expose API-specific methods | R03R04-S016/R03R04-S018/R03R04-S019 | extracted SVG image transcript/code | high |
| JsonSerializerOptionsWrapper centralizes JSON options | R03R04-S020/R03R04-S021/R03R04-S023/R03R04-S024 | extracted SVG image transcript/code | high |
| MVC JSON options are not enough for manual integration serialization | R03R04-S029/R03R04-S030 | extracted SVG image transcript | high |
| Network/TLS/factory-summary neighbors are excluded to R05A | R03R04 boundary review | boundary review | high |

---

## 6. Question hooks

- What does a typed HttpClient instance add over raw HttpClient usage?
- Where should base address/timeout configuration live for a typed client?
- Why is exposing raw `Client` less ideal than adding API-specific methods?
- What is an HttpMessageHandler pipeline?
- Why do not all handlers send through the network?
- Why wrap JsonSerializerOptions in an injectable class?
- Why are MVC/AddJsonOptions settings not enough for manual HttpClient integration code?
- Which JSON options are most common for integration clients?
- Why were S-074/S-099/S-128/S-136 left for R05A?

---

## 7. Open review issues

- R05A/R05B must process HttpClientFactory/lifetime/DNS/named clients and the network theory neighbors excluded here.
- Exact punctuation in small code screenshots can be checked against `audit-assets/R03R04-source-images/`.