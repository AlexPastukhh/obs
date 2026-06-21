# R01+R02 - HttpClient testing/create/jsonpatch/shortcuts + base usage/headers/dispose

Conspect: `httpclient,summary,theory,base usage,jsonoptions wrapper,handlers`  
File type: **source-preserving combined region transcript**  
Stage: **stage-1 / verified combined region transcript v001**  
Generated: 2026-06-02 00:20:00 UTC

---

## Direction check

Goal:
Convert the HttpClient Excalidraw conspect into source-preserving region text without losing screenshots.

Now:
Stage0 boundary review is done. This pass processes the first larger coherent area: R01 + R02.

This step:
Create a combined transcript for testing/custom handlers, create/update/delete/PATCH resource work, shortcuts, base usage, headers, content negotiation, reading content, and disposal.

Why:
The user allowed larger passes, and these two adjacent roads together describe practical HttpClient basics. Boundary review keeps typed clients/factory/handlers for later regions.

Next:
R03+R04 combined typed client / JsonOptions wrapper pass, if boundary review confirms it remains coherent.

---

## 0. You are here

Current region: `R01+R02 combined`  
Status: `verified visible-gist transcript from extracted SVG images`  
Source count: `73`  
Known limitation: this larger pass records source-preserving visible gists and selected code intent; exact punctuation for tiny code should be checked against `audit-assets/R01R02-source-images/`.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
```text
- Testing/custom handlers for HttpClient
- creating/updating/deleting resources
- JSON Patch and PATCH shortcuts
- base HttpClient request/response flow
- content negotiation, Accept and Content-Type headers
- reading response content as string/json/stream
- when to use HttpRequestMessage instead of shortcuts
- disposing request/response messages and connection reuse
```

Key ideas:
- HttpMessageHandler can be replaced/stubbed to test HttpClient code without real network calls.
- DelegatingHandler is outgoing middleware around an inner handler.
- EnsureSuccessStatusCode is a fail-fast guard before reading/deserializing success DTOs.
- Shortcuts like PostAsync/PutAsync/PatchAsync are convenient but limit per-request header/media-type control.
- HttpRequestMessage is preferred when per-request Accept headers, Content headers, or custom options matter.
- Content-Type describes request content; Accept describes desired response representation.
- Quality q values express relative preference for response media types.
- ReadAsStringAsync creates an intermediate string; streaming/deserializing from stream can avoid it for large content.
- Dispose HttpResponseMessage/HttpRequestMessage when you own them to release streams/connections.

Reading quality:
```text
overall_conceptual_understanding: high
source_readability: medium-high to high; contact sheets readable, exact small code punctuation should be checked against source images
limitations:
- 73 source images in one larger pass; transcript records visible gists plus selected code intent rather than every tiny line verbatim.
- Some screenshots are small code excerpts; images are included for exact review.
- Stage0 labels contain typos and are only used as checklist context.
confidence_summary: High for region ownership and concepts; medium-high for exact code punctuation in small screenshots.
```

---

## 0.2 Coverage / boundary review

Included R01 sources:
```text
S-001, S-002, S-003, S-005, S-009, S-010, S-011, S-012, S-013, S-017, S-020, S-021, S-022, S-032, S-036, S-050, S-060, S-073, S-089, S-094, S-102, S-112, S-120, S-129, S-131, S-137, S-143, S-147, S-150, S-152, S-156, S-165, S-169, S-174
```

Included R02 sources:
```text
S-006, S-008, S-019, S-026, S-029, S-031, S-034, S-039, S-040, S-044, S-053, S-056, S-062, S-065, S-067, S-068, S-078, S-081, S-085, S-088, S-096, S-107, S-114, S-116, S-121, S-125, S-133, S-139, S-144, S-146, S-151, S-157, S-158, S-160, S-161, S-162, S-166, S-167, S-170
```

Checked but not included:
```text
R03 samples -> typed client / theory / JsonOptions wrapper start, later region.
R04 samples -> JsonOptions wrapper / typed client methods, later region.
R05A/R05B samples -> HttpClientFactory, lifetime, DNS, named/typed clients, later region.
R06 samples -> global config / primary handler basics, later region.
```

Duplicate image-use note:
```text
c4bcad034a: S-008, S-157
e3c87ff97f: S-039, S-146
```

---

## 1. Original nearby Excalidraw labels
```text
TESTING
CREATE RESOURCE
quick
accept/contenttype headers
dispose requestmessage and especially response message
CAN READ AS STRING AND SERIALIZE
CAN READ AS JSON
ADD ACCEPT HEADERS
CHECK RESPONSE CONTENT-TYPE
Why not to use shortcuts all the time?
Need to use Json.Net for this
We need to return patch document of changes
setting response content and content related header
```

---

## 2. Source inventory

| Region source | Source | fileId | Band | Theme |
|---|---|---|---|---|
| R01-S001 | S-001 | `3fb4712723` | `R01` | Demo title: Creating a resource |
| R01-S002 | S-002 | `8f3371b543` | `R01` | HttpMessageHandler vs DelegatingHandler mental model for testing/custom handlers |
| R01-S003 | S-003 | `e3fca9bd34` | `R01` | Custom StubHttpMessageHandler for unit testing |
| R01-S004 | S-005 | `9976193b53` | `R01` | Why call response.EnsureSuccessStatusCode() |
| R01-S005 | S-009 | `51c71f9000` | `R01` | StringContent for string payloads |
| R01-S006 | S-010 | `53815676e5` | `R01` | DelegatingHandler as outgoing middleware wrapper |
| R01-S007 | S-011 | `759199bd50` | `R01` | CreateMovieAsync: serialize DTO, POST, StringContent, EnsureSuccessStatusCode, deserialize response |
| R01-S008 | S-012 | `899275bdc4` | `R01` | Fake handler in tests: header controls stub behavior |
| R01-S009 | S-013 | `eae241cd1a` | `R01` | JsonContent as often-best JSON content helper |
| R01-S010 | S-017 | `e7694c37c4` | `R01` | When not to use StringContent manually |
| R01-S011 | S-020 | `a390fb1d24` | `R01` | Key differences: purpose, position in chain, use cases for handlers |
| R01-S012 | S-021 | `02556c5bf1` | `R01` | Test setup using factory client with fake handler / test scenario header |
| R01-S013 | S-022 | `595c530b7e` | `R01` | Demo title: Updating a resource |
| R01-S014 | S-032 | `4d24af0060` | `R01` | Update resource with PUT using serialized content and response handling |
| R01-S015 | S-036 | `90f64b764a` | `R01` | Typed client update method with request message and response handling |
| R01-S016 | S-050 | `4790046314` | `R01` | Demo title: Deleting a resource |
| R01-S017 | S-060 | `a9ad00af65` | `R01` | Delete method: send DELETE and ensure success / return no content |
| R01-S018 | S-073 | `c581be05ae` | `R01` | Demo title: Using shortcuts |
| R01-S019 | S-089 | `9523f5e209` | `R01` | PostAsync shortcut example using StringContent |
| R01-S020 | S-094 | `d603550ef4` | `R01` | PutAsync shortcut example using StringContent |
| R01-S021 | S-102 | `26a5848998` | `R01` | PatchAsync shortcut example / media-type issue for JSON Patch |
| R01-S022 | S-112 | `1fd653dc23` | `R01` | Demo title: Partially updating resources |
| R01-S023 | S-120 | `1f8b489c03` | `R01` | JsonPatchDocument + operations / package setup |
| R01-S024 | S-129 | `9fb2a4e1c5` | `R01` | JSON Patch NuGet/package reference |
| R01-S025 | S-131 | `7b80c37d41` | `R01` | Patch typed client method skeleton / PatchAsync |
| R01-S026 | S-137 | `e3063a210c` | `R01` | Build JsonPatchDocument operations in code |
| R01-S027 | S-143 | `03f9ccd757` | `R01` | JSON Patch request content and content-type headers |
| R01-S028 | S-147 | `47d16f1da0` | `R01` | JSON Patch document example and add operation |
| R01-S029 | S-150 | `d86c57055a` | `R01` | Demo title: Partially updating resources with PatchAsync |
| R01-S030 | S-152 | `f2c7a70fa7` | `R01` | PATCH request content type: application/json-patch+json |
| R01-S031 | S-156 | `d6338a4b81` | `R01` | PatchResourceShortcutAsync with PatchAsync and Json.NET serialization |
| R01-S032 | S-165 | `5ddfc555b4` | `R01` | Advanced patch scenario example: JSON Patch operations |
| R01-S033 | S-169 | `86e05d2e78` | `R01` | Advanced Patch Scenarios / API support caveat |
| R01-S034 | S-174 | `8daea22e1b` | `R01` | Summary: PATCH preferred over PUT for partial updates |
| R02-S035 | S-006 | `51aa89fb6b` | `R02` | Content negotiation concept |
| R02-S036 | S-008 | `c4bcad034a` | `R02` | Use HttpRequestMessage per request instead of shared default headers |
| R02-S037 | S-019 | `08d487651c` | `R02` | Getting a resource demo: why JsonSerializerOptions needed |
| R02-S038 | S-026 | `78b1a7e45e` | `R02` | Serialize directly to bytes / stream positioning note |
| R02-S039 | S-029 | `b1eb8ee2ca` | `R02` | Default Accept behavior and content negotiation |
| R02-S040 | S-031 | `56bace4a62` | `R02` | Use request.Headers.Accept and media type quality values |
| R02-S041 | S-034 | `606f4408a0` | `R02` | Example DTO and deserialization setup |
| R02-S042 | S-039 | `e3c87ff97f` | `R02` | HttpClient GET + response content + manual deserialize flow |
| R02-S043 | S-040 | `ca3e87285a` | `R02` | Read response as string and deserialize / EnsureSuccessStatusCode |
| R02-S044 | S-044 | `718a612360` | `R02` | Input/output formatter fallback and 406 / content negotiation notes |
| R02-S045 | S-053 | `578166625d` | `R02` | ResponseHeadersRead / headers arrive / reading content later note |
| R02-S046 | S-056 | `fb5f1de2bb` | `R02` | The trash endpoint / if content exists, deserialize; otherwise no body |
| R02-S047 | S-062 | `662c286ca4` | `R02` | ReadAsStreamAsync / stream response content |
| R02-S048 | S-065 | `36a499917e` | `R02` | Main difference: ReadAsStringAsync vs ReadAsStreamAsync |
| R02-S049 | S-067 | `8534de729d` | `R02` | Download file / best streaming example |
| R02-S050 | S-068 | `ac018a01a6` | `R02` | Server-side strictness / client should specify Accept |
| R02-S051 | S-078 | `98a5e7211f` | `R02` | GET flow with Accept headers and response checks |
| R02-S052 | S-081 | `7a7c07d105` | `R02` | Content-Type header on request content |
| R02-S053 | S-085 | `5c497328bb` | `R02` | Server-side strictness optional / 406 Not Acceptable |
| R02-S054 | S-088 | `fa46d6b89b` | `R02` | Use HttpRequestMessage when request-specific content/headers are needed |
| R02-S055 | S-096 | `12ea3c6755` | `R02` | Accept quality parameter and explicit preference |
| R02-S056 | S-107 | `71ce8934ab` | `R02` | Accept header and q quality parameter |
| R02-S057 | S-114 | `87ece5e438` | `R02` | Example code: add Accept headers with quality values |
| R02-S058 | S-116 | `4d11b0dc3b` | `R02` | Indicating preference / Accept header examples |
| R02-S059 | S-121 | `c35fa352c0` | `R02` | Code sample with multiple Accept headers |
| R02-S060 | S-125 | `d96263ebb2` | `R02` | What q value means |
| R02-S061 | S-133 | `97784ae7c7` | `R02` | Demo title: indicating preference with relative quality parameter |
| R02-S062 | S-139 | `f484f5f995` | `R02` | DefaultRequestHeaders.Accept examples / quality values |
| R02-S063 | S-144 | `e77af20350` | `R02` | Demo using HttpClient.DefaultRequestHeaders and why it is shared |
| R02-S064 | S-146 | `e3c87ff97f` | `R02` | Content negotiation/client code duplicate placement |
| R02-S065 | S-151 | `e9a443a860` | `R02` | Why default request headers can be risky and should be cleared |
| R02-S066 | S-157 | `c4bcad034a` | `R02` | Better approach: HttpRequestMessage per request duplicate placement |
| R02-S067 | S-158 | `873ff8027f` | `R02` | Why not use HttpRequestMessage for every request / disposal basics |
| R02-S068 | S-160 | `43622b63f9` | `R02` | SendAsync with request message / headers and response |
| R02-S069 | S-161 | `49a249585e` | `R02` | Do you always need using? dispose safely when needed |
| R02-S070 | S-162 | `727a1fce3d` | `R02` | Why dispose matters: connection/resource cleanup |
| R02-S071 | S-166 | `6d4cbefff2` | `R02` | Convenience APIs handle disposal for you |
| R02-S072 | S-167 | `a38ac5b6aa` | `R02` | HttpResponseMessage should also be disposed |
| R02-S073 | S-170 | `de7e748290` | `R02` | Disposing response returns connection to pool / releases stream |

---

## 3. Source transcript

### R01-S001 / S-001 - `3fb4712723`

Metadata:
- initial band: `R01-left-testing-create-jsonpatch-shortcuts`
- decision: `R01`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: Demo title: Creating a resource

#### Verified visible text / source gist
```text
Demo: Creating a resource
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R01-S002 / S-002 - `8f3371b543`

Metadata:
- initial band: `R01-left-testing-create-jsonpatch-shortcuts`
- decision: `R01`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: HttpMessageHandler vs DelegatingHandler mental model for testing/custom handlers

#### Verified visible text / source gist
```text
Testing/custom-handler road: HttpClient can be tested by replacing the transport handler. HttpMessageHandler is the base handler that sends HttpRequestMessage and returns HttpResponseMessage; DelegatingHandler wraps another handler and behaves like outgoing middleware. Tests can use a stub handler and request headers to control canned responses.
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R01-S003 / S-003 - `e3fca9bd34`

Metadata:
- initial band: `R01-left-testing-create-jsonpatch-shortcuts`
- decision: `R01`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: Custom StubHttpMessageHandler for unit testing

#### Verified visible text / source gist
```text
Testing/custom-handler road: HttpClient can be tested by replacing the transport handler. HttpMessageHandler is the base handler that sends HttpRequestMessage and returns HttpResponseMessage; DelegatingHandler wraps another handler and behaves like outgoing middleware. Tests can use a stub handler and request headers to control canned responses.
```

#### Visible code / code intent
```csharp
public sealed class StubHttpMessageHandler : HttpMessageHandler
{
    private readonly Func<HttpRequestMessage, HttpResponseMessage> _handler;
    protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        => Task.FromResult(_handler(request));
}
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R01-S004 / S-005 - `9976193b53`

Metadata:
- initial band: `R01-left-testing-create-jsonpatch-shortcuts`
- decision: `R01`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: Why call response.EnsureSuccessStatusCode()

#### Verified visible text / source gist
```text
EnsureSuccessStatusCode checks HTTP 2xx and throws HttpRequestException for non-success. It fails fast before deserializing error bodies, centralizes error handling, and prevents silent null/default results.
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R01-S005 / S-009 - `51c71f9000`

Metadata:
- initial band: `R01-left-testing-create-jsonpatch-shortcuts`
- decision: `R01`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: StringContent for string payloads

#### Verified visible text / source gist
```text
Request/content construction road: use StringContent when you already have a JSON string, JsonContent when it is suitable, set Accept and Content-Type deliberately, send the request, ensure success, then read and deserialize response content. Avoid manual StringContent if a higher-level helper is clearer or if request-specific headers require HttpRequestMessage.
```

#### Visible code / code intent
```csharp
request.Content = new StringContent(json, Encoding.UTF8, "application/json");
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R01-S006 / S-010 - `53815676e5`

Metadata:
- initial band: `R01-left-testing-create-jsonpatch-shortcuts`
- decision: `R01`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: DelegatingHandler as outgoing middleware wrapper

#### Verified visible text / source gist
```text
Testing/custom-handler road: HttpClient can be tested by replacing the transport handler. HttpMessageHandler is the base handler that sends HttpRequestMessage and returns HttpResponseMessage; DelegatingHandler wraps another handler and behaves like outgoing middleware. Tests can use a stub handler and request headers to control canned responses.
```

#### Visible code / code intent
```csharp
public sealed class AddHeaderHandler : DelegatingHandler
{
    protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken ct)
    {
        request.Headers.Add("X-App", "MyService");
        return base.SendAsync(request, ct);
    }
}
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R01-S007 / S-011 - `759199bd50`

Metadata:
- initial band: `R01-left-testing-create-jsonpatch-shortcuts`
- decision: `R01`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: CreateMovieAsync: serialize DTO, POST, StringContent, EnsureSuccessStatusCode, deserialize response

#### Verified visible text / source gist
```text
Request/content construction road: use StringContent when you already have a JSON string, JsonContent when it is suitable, set Accept and Content-Type deliberately, send the request, ensure success, then read and deserialize response content. Avoid manual StringContent if a higher-level helper is clearer or if request-specific headers require HttpRequestMessage.
```

#### Visible code / code intent
```csharp
var jsonText = JsonSerializer.Serialize(dto, _json);
using var request = new HttpRequestMessage(HttpMethod.Post, "api/movies");
request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
request.Content = new StringContent(jsonText, Encoding.UTF8, "application/json");
using var response = await _http.SendAsync(request, ct);
response.EnsureSuccessStatusCode();
var responseJson = await response.Content.ReadAsStringAsync(ct);
return JsonSerializer.Deserialize<MovieDto>(responseJson, _json) ?? throw new InvalidOperationException("Server returned empty response.");
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R01-S008 / S-012 - `899275bdc4`

Metadata:
- initial band: `R01-left-testing-create-jsonpatch-shortcuts`
- decision: `R01`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: Fake handler in tests: header controls stub behavior

#### Verified visible text / source gist
```text
Testing/custom-handler road: HttpClient can be tested by replacing the transport handler. HttpMessageHandler is the base handler that sends HttpRequestMessage and returns HttpResponseMessage; DelegatingHandler wraps another handler and behaves like outgoing middleware. Tests can use a stub handler and request headers to control canned responses.
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R01-S009 / S-013 - `eae241cd1a`

Metadata:
- initial band: `R01-left-testing-create-jsonpatch-shortcuts`
- decision: `R01`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: JsonContent as often-best JSON content helper

#### Verified visible text / source gist
```text
Request/content construction road: use StringContent when you already have a JSON string, JsonContent when it is suitable, set Accept and Content-Type deliberately, send the request, ensure success, then read and deserialize response content. Avoid manual StringContent if a higher-level helper is clearer or if request-specific headers require HttpRequestMessage.
```

#### Visible code / code intent
```csharp
request.Content = JsonContent.Create(dto, options: jsonOptions, mediaType: "application/json");
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R01-S010 / S-017 - `e7694c37c4`

Metadata:
- initial band: `R01-left-testing-create-jsonpatch-shortcuts`
- decision: `R01`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: When not to use StringContent manually

#### Verified visible text / source gist
```text
Request/content construction road: use StringContent when you already have a JSON string, JsonContent when it is suitable, set Accept and Content-Type deliberately, send the request, ensure success, then read and deserialize response content. Avoid manual StringContent if a higher-level helper is clearer or if request-specific headers require HttpRequestMessage.
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R01-S011 / S-020 - `a390fb1d24`

Metadata:
- initial band: `R01-left-testing-create-jsonpatch-shortcuts`
- decision: `R01`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: Key differences: purpose, position in chain, use cases for handlers

#### Verified visible text / source gist
```text
Testing/custom-handler road: HttpClient can be tested by replacing the transport handler. HttpMessageHandler is the base handler that sends HttpRequestMessage and returns HttpResponseMessage; DelegatingHandler wraps another handler and behaves like outgoing middleware. Tests can use a stub handler and request headers to control canned responses.
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R01-S012 / S-021 - `02556c5bf1`

Metadata:
- initial band: `R01-left-testing-create-jsonpatch-shortcuts`
- decision: `R01`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: Test setup using factory client with fake handler / test scenario header

#### Verified visible text / source gist
```text
Testing/custom-handler road: HttpClient can be tested by replacing the transport handler. HttpMessageHandler is the base handler that sends HttpRequestMessage and returns HttpResponseMessage; DelegatingHandler wraps another handler and behaves like outgoing middleware. Tests can use a stub handler and request headers to control canned responses.
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R01-S013 / S-022 - `595c530b7e`

Metadata:
- initial band: `R01-left-testing-create-jsonpatch-shortcuts`
- decision: `R01`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: Demo title: Updating a resource

#### Verified visible text / source gist
```text
Demo: Updating a resource
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R01-S014 / S-032 - `4d24af0060`

Metadata:
- initial band: `R01-left-testing-create-jsonpatch-shortcuts`
- decision: `R01`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: Update resource with PUT using serialized content and response handling

#### Verified visible text / source gist
```text
Request/content construction road: use StringContent when you already have a JSON string, JsonContent when it is suitable, set Accept and Content-Type deliberately, send the request, ensure success, then read and deserialize response content. Avoid manual StringContent if a higher-level helper is clearer or if request-specific headers require HttpRequestMessage.
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R01-S015 / S-036 - `90f64b764a`

Metadata:
- initial band: `R01-left-testing-create-jsonpatch-shortcuts`
- decision: `R01`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: Typed client update method with request message and response handling

#### Verified visible text / source gist
```text
Request/content construction road: use StringContent when you already have a JSON string, JsonContent when it is suitable, set Accept and Content-Type deliberately, send the request, ensure success, then read and deserialize response content. Avoid manual StringContent if a higher-level helper is clearer or if request-specific headers require HttpRequestMessage.
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R01-S016 / S-050 - `4790046314`

Metadata:
- initial band: `R01-left-testing-create-jsonpatch-shortcuts`
- decision: `R01`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: Demo title: Deleting a resource

#### Verified visible text / source gist
```text
Demo: Deleting a resource
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R01-S017 / S-060 - `a9ad00af65`

Metadata:
- initial band: `R01-left-testing-create-jsonpatch-shortcuts`
- decision: `R01`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: Delete method: send DELETE and ensure success / return no content

#### Verified visible text / source gist
```text
Request/content construction road: use StringContent when you already have a JSON string, JsonContent when it is suitable, set Accept and Content-Type deliberately, send the request, ensure success, then read and deserialize response content. Avoid manual StringContent if a higher-level helper is clearer or if request-specific headers require HttpRequestMessage.
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R01-S018 / S-073 - `c581be05ae`

Metadata:
- initial band: `R01-left-testing-create-jsonpatch-shortcuts`
- decision: `R01`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: Demo title: Using shortcuts

#### Verified visible text / source gist
```text
Demo: Using shortcuts
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R01-S019 / S-089 - `9523f5e209`

Metadata:
- initial band: `R01-left-testing-create-jsonpatch-shortcuts`
- decision: `R01`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: PostAsync shortcut example using StringContent

#### Verified visible text / source gist
```text
Shortcut/PATCH road: PostAsync/PutAsync/PatchAsync convenience APIs can be concise, but specialized media types such as application/json-patch+json and per-request headers often require explicit HttpRequestMessage/request content setup.
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R01-S020 / S-094 - `d603550ef4`

Metadata:
- initial band: `R01-left-testing-create-jsonpatch-shortcuts`
- decision: `R01`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: PutAsync shortcut example using StringContent

#### Verified visible text / source gist
```text
Shortcut/PATCH road: PostAsync/PutAsync/PatchAsync convenience APIs can be concise, but specialized media types such as application/json-patch+json and per-request headers often require explicit HttpRequestMessage/request content setup.
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R01-S021 / S-102 - `26a5848998`

Metadata:
- initial band: `R01-left-testing-create-jsonpatch-shortcuts`
- decision: `R01`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: PatchAsync shortcut example / media-type issue for JSON Patch

#### Verified visible text / source gist
```text
Shortcut/PATCH road: PostAsync/PutAsync/PatchAsync convenience APIs can be concise, but specialized media types such as application/json-patch+json and per-request headers often require explicit HttpRequestMessage/request content setup.
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R01-S022 / S-112 - `1fd653dc23`

Metadata:
- initial band: `R01-left-testing-create-jsonpatch-shortcuts`
- decision: `R01`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: Demo title: Partially updating resources

#### Verified visible text / source gist
```text
Demo: Partially updating resources
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R01-S023 / S-120 - `1f8b489c03`

Metadata:
- initial band: `R01-left-testing-create-jsonpatch-shortcuts`
- decision: `R01`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: JsonPatchDocument + operations / package setup

#### Verified visible text / source gist
```text
JSON Patch road: partial updates use JsonPatchDocument operations and PATCH rather than replacing the whole resource. The source emphasizes Json.NET support, typed/untyped patch documents, patch operations such as replace/add, and the caveat that APIs must support advanced patch scenarios.
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R01-S024 / S-129 - `9fb2a4e1c5`

Metadata:
- initial band: `R01-left-testing-create-jsonpatch-shortcuts`
- decision: `R01`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: JSON Patch NuGet/package reference

#### Verified visible text / source gist
```text
JSON Patch road: partial updates use JsonPatchDocument operations and PATCH rather than replacing the whole resource. The source emphasizes Json.NET support, typed/untyped patch documents, patch operations such as replace/add, and the caveat that APIs must support advanced patch scenarios.
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R01-S025 / S-131 - `7b80c37d41`

Metadata:
- initial band: `R01-left-testing-create-jsonpatch-shortcuts`
- decision: `R01`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: Patch typed client method skeleton / PatchAsync

#### Verified visible text / source gist
```text
JSON Patch road: partial updates use JsonPatchDocument operations and PATCH rather than replacing the whole resource. The source emphasizes Json.NET support, typed/untyped patch documents, patch operations such as replace/add, and the caveat that APIs must support advanced patch scenarios.
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R01-S026 / S-137 - `e3063a210c`

Metadata:
- initial band: `R01-left-testing-create-jsonpatch-shortcuts`
- decision: `R01`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: Build JsonPatchDocument operations in code

#### Verified visible text / source gist
```text
JSON Patch road: partial updates use JsonPatchDocument operations and PATCH rather than replacing the whole resource. The source emphasizes Json.NET support, typed/untyped patch documents, patch operations such as replace/add, and the caveat that APIs must support advanced patch scenarios.
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R01-S027 / S-143 - `03f9ccd757`

Metadata:
- initial band: `R01-left-testing-create-jsonpatch-shortcuts`
- decision: `R01`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: JSON Patch request content and content-type headers

#### Verified visible text / source gist
```text
Shortcut/PATCH road: PostAsync/PutAsync/PatchAsync convenience APIs can be concise, but specialized media types such as application/json-patch+json and per-request headers often require explicit HttpRequestMessage/request content setup.
```

#### Visible code / code intent
```csharp
request.Content = new StringContent(serializedChanges);
request.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json-patch+json");
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R01-S028 / S-147 - `47d16f1da0`

Metadata:
- initial band: `R01-left-testing-create-jsonpatch-shortcuts`
- decision: `R01`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: JSON Patch document example and add operation

#### Verified visible text / source gist
```text
JSON Patch road: partial updates use JsonPatchDocument operations and PATCH rather than replacing the whole resource. The source emphasizes Json.NET support, typed/untyped patch documents, patch operations such as replace/add, and the caveat that APIs must support advanced patch scenarios.
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R01-S029 / S-150 - `d86c57055a`

Metadata:
- initial band: `R01-left-testing-create-jsonpatch-shortcuts`
- decision: `R01`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: Demo title: Partially updating resources with PatchAsync

#### Verified visible text / source gist
```text
Demo: Partially updating resources with PatchAsync
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R01-S030 / S-152 - `f2c7a70fa7`

Metadata:
- initial band: `R01-left-testing-create-jsonpatch-shortcuts`
- decision: `R01`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: PATCH request content type: application/json-patch+json

#### Verified visible text / source gist
```text
Shortcut/PATCH road: PostAsync/PutAsync/PatchAsync convenience APIs can be concise, but specialized media types such as application/json-patch+json and per-request headers often require explicit HttpRequestMessage/request content setup.
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R01-S031 / S-156 - `d6338a4b81`

Metadata:
- initial band: `R01-left-testing-create-jsonpatch-shortcuts`
- decision: `R01`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: PatchResourceShortcutAsync with PatchAsync and Json.NET serialization

#### Verified visible text / source gist
```text
Shortcut/PATCH road: PostAsync/PutAsync/PatchAsync convenience APIs can be concise, but specialized media types such as application/json-patch+json and per-request headers often require explicit HttpRequestMessage/request content setup.
```

#### Visible code / code intent
```csharp
var patchDoc = new JsonPatchDocument<MovieDtoForUpdate>();
patchDoc.Replace(m => m.Title, "Updated title");
var serializedPatchDoc = JsonConvert.SerializeObject(patchDoc);
var request = new HttpRequestMessage(HttpMethod.Patch, url);
request.Content = new StringContent(serializedPatchDoc, Encoding.UTF8, "application/json-patch+json");
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R01-S032 / S-165 - `5ddfc555b4`

Metadata:
- initial band: `R01-left-testing-create-jsonpatch-shortcuts`
- decision: `R01`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: Advanced patch scenario example: JSON Patch operations

#### Verified visible text / source gist
```text
JSON Patch road: partial updates use JsonPatchDocument operations and PATCH rather than replacing the whole resource. The source emphasizes Json.NET support, typed/untyped patch documents, patch operations such as replace/add, and the caveat that APIs must support advanced patch scenarios.
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R01-S033 / S-169 - `86e05d2e78`

Metadata:
- initial band: `R01-left-testing-create-jsonpatch-shortcuts`
- decision: `R01`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: Advanced Patch Scenarios / API support caveat

#### Verified visible text / source gist
```text
JSON Patch road: partial updates use JsonPatchDocument operations and PATCH rather than replacing the whole resource. The source emphasizes Json.NET support, typed/untyped patch documents, patch operations such as replace/add, and the caveat that APIs must support advanced patch scenarios.
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R01-S034 / S-174 - `8daea22e1b`

Metadata:
- initial band: `R01-left-testing-create-jsonpatch-shortcuts`
- decision: `R01`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: Summary: PATCH preferred over PUT for partial updates

#### Verified visible text / source gist
```text
JSON Patch road: partial updates use JsonPatchDocument operations and PATCH rather than replacing the whole resource. The source emphasizes Json.NET support, typed/untyped patch documents, patch operations such as replace/add, and the caveat that APIs must support advanced patch scenarios.
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R02-S035 / S-006 - `51aa89fb6b`

Metadata:
- initial band: `R02-base-usage-quick-headers-dispose`
- decision: `R02`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: Content negotiation concept

#### Verified visible text / source gist
```text
Content negotiation road: client/server negotiate representations using Accept headers and output formatters. If no Accept is provided, defaults may be used; strict servers may require explicit Accept and can return 406 Not Acceptable when no acceptable formatter exists.
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R02-S036 / S-008 - `c4bcad034a`

Metadata:
- initial band: `R02-base-usage-quick-headers-dispose`
- decision: `R02`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: Use HttpRequestMessage per request instead of shared default headers

#### Verified visible text / source gist
```text
Accept/default-header road: prefer request-specific HttpRequestMessage headers when preferences differ per request. Quality parameters q indicate relative preference. DefaultRequestHeaders are shared across requests, so clear/reset them carefully or avoid mutating them for per-request behavior.
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R02-S037 / S-019 - `08d487651c`

Metadata:
- initial band: `R02-base-usage-quick-headers-dispose`
- decision: `R02`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: Getting a resource demo: why JsonSerializerOptions needed

#### Verified visible text / source gist
```text
Content negotiation road: client/server negotiate representations using Accept headers and output formatters. If no Accept is provided, defaults may be used; strict servers may require explicit Accept and can return 406 Not Acceptable when no acceptable formatter exists.
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R02-S038 / S-026 - `78b1a7e45e`

Metadata:
- initial band: `R02-base-usage-quick-headers-dispose`
- decision: `R02`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: Serialize directly to bytes / stream positioning note

#### Verified visible text / source gist
```text
Reading/response-content road: after ensuring success, response content can be read as string and deserialized, read as JSON, or read as stream. ReadAsStreamAsync avoids the intermediate string and is better for large content/downloads. Content-Type belongs on request content, not bare request headers.
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R02-S039 / S-029 - `b1eb8ee2ca`

Metadata:
- initial band: `R02-base-usage-quick-headers-dispose`
- decision: `R02`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: Default Accept behavior and content negotiation

#### Verified visible text / source gist
```text
Content negotiation road: client/server negotiate representations using Accept headers and output formatters. If no Accept is provided, defaults may be used; strict servers may require explicit Accept and can return 406 Not Acceptable when no acceptable formatter exists.
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R02-S040 / S-031 - `56bace4a62`

Metadata:
- initial band: `R02-base-usage-quick-headers-dispose`
- decision: `R02`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: Use request.Headers.Accept and media type quality values

#### Verified visible text / source gist
```text
Accept/default-header road: prefer request-specific HttpRequestMessage headers when preferences differ per request. Quality parameters q indicate relative preference. DefaultRequestHeaders are shared across requests, so clear/reset them carefully or avoid mutating them for per-request behavior.
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R02-S041 / S-034 - `606f4408a0`

Metadata:
- initial band: `R02-base-usage-quick-headers-dispose`
- decision: `R02`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: Example DTO and deserialization setup

#### Verified visible text / source gist
```text
DTO/example setup source for resource retrieval and deserialization; supports the surrounding base-usage examples.
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R02-S042 / S-039 - `e3c87ff97f`

Metadata:
- initial band: `R02-base-usage-quick-headers-dispose`
- decision: `R02`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: HttpClient GET + response content + manual deserialize flow

#### Verified visible text / source gist
```text
Reading/response-content road: after ensuring success, response content can be read as string and deserialized, read as JSON, or read as stream. ReadAsStreamAsync avoids the intermediate string and is better for large content/downloads. Content-Type belongs on request content, not bare request headers.
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R02-S043 / S-040 - `ca3e87285a`

Metadata:
- initial band: `R02-base-usage-quick-headers-dispose`
- decision: `R02`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: Read response as string and deserialize / EnsureSuccessStatusCode

#### Verified visible text / source gist
```text
Reading/response-content road: after ensuring success, response content can be read as string and deserialized, read as JSON, or read as stream. ReadAsStreamAsync avoids the intermediate string and is better for large content/downloads. Content-Type belongs on request content, not bare request headers.
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R02-S044 / S-044 - `718a612360`

Metadata:
- initial band: `R02-base-usage-quick-headers-dispose`
- decision: `R02`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: Input/output formatter fallback and 406 / content negotiation notes

#### Verified visible text / source gist
```text
Content negotiation road: client/server negotiate representations using Accept headers and output formatters. If no Accept is provided, defaults may be used; strict servers may require explicit Accept and can return 406 Not Acceptable when no acceptable formatter exists.
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R02-S045 / S-053 - `578166625d`

Metadata:
- initial band: `R02-base-usage-quick-headers-dispose`
- decision: `R02`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: ResponseHeadersRead / headers arrive / reading content later note

#### Verified visible text / source gist
```text
Reading/response-content road: after ensuring success, response content can be read as string and deserialized, read as JSON, or read as stream. ReadAsStreamAsync avoids the intermediate string and is better for large content/downloads. Content-Type belongs on request content, not bare request headers.
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R02-S046 / S-056 - `fb5f1de2bb`

Metadata:
- initial band: `R02-base-usage-quick-headers-dispose`
- decision: `R02`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: The trash endpoint / if content exists, deserialize; otherwise no body

#### Verified visible text / source gist
```text
Reading/response-content road: after ensuring success, response content can be read as string and deserialized, read as JSON, or read as stream. ReadAsStreamAsync avoids the intermediate string and is better for large content/downloads. Content-Type belongs on request content, not bare request headers.
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R02-S047 / S-062 - `662c286ca4`

Metadata:
- initial band: `R02-base-usage-quick-headers-dispose`
- decision: `R02`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: ReadAsStreamAsync / stream response content

#### Verified visible text / source gist
```text
Reading/response-content road: after ensuring success, response content can be read as string and deserialized, read as JSON, or read as stream. ReadAsStreamAsync avoids the intermediate string and is better for large content/downloads. Content-Type belongs on request content, not bare request headers.
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R02-S048 / S-065 - `36a499917e`

Metadata:
- initial band: `R02-base-usage-quick-headers-dispose`
- decision: `R02`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: Main difference: ReadAsStringAsync vs ReadAsStreamAsync

#### Verified visible text / source gist
```text
Reading/response-content road: after ensuring success, response content can be read as string and deserialized, read as JSON, or read as stream. ReadAsStreamAsync avoids the intermediate string and is better for large content/downloads. Content-Type belongs on request content, not bare request headers.
```

#### Visible code / code intent
```csharp
// ReadAsStringAsync(): reads HTTP content as one string, then deserialize.
// ReadAsStreamAsync(): read HTTP content as a stream and deserialize from stream.
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R02-S049 / S-067 - `8534de729d`

Metadata:
- initial band: `R02-base-usage-quick-headers-dispose`
- decision: `R02`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: Download file / best streaming example

#### Verified visible text / source gist
```text
Reading/response-content road: after ensuring success, response content can be read as string and deserialized, read as JSON, or read as stream. ReadAsStreamAsync avoids the intermediate string and is better for large content/downloads. Content-Type belongs on request content, not bare request headers.
```

#### Visible code / code intent
```csharp
using var response = await client.GetAsync(url, HttpCompletionOption.ResponseHeadersRead, ct);
response.EnsureSuccessStatusCode();
await using var httpStream = await response.Content.ReadAsStreamAsync(ct);
await using var fileStream = File.Create(path);
await httpStream.CopyToAsync(fileStream, ct);
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R02-S050 / S-068 - `ac018a01a6`

Metadata:
- initial band: `R02-base-usage-quick-headers-dispose`
- decision: `R02`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: Server-side strictness / client should specify Accept

#### Verified visible text / source gist
```text
Content negotiation road: client/server negotiate representations using Accept headers and output formatters. If no Accept is provided, defaults may be used; strict servers may require explicit Accept and can return 406 Not Acceptable when no acceptable formatter exists.
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R02-S051 / S-078 - `98a5e7211f`

Metadata:
- initial band: `R02-base-usage-quick-headers-dispose`
- decision: `R02`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: GET flow with Accept headers and response checks

#### Verified visible text / source gist
```text
Reading/response-content road: after ensuring success, response content can be read as string and deserialized, read as JSON, or read as stream. ReadAsStreamAsync avoids the intermediate string and is better for large content/downloads. Content-Type belongs on request content, not bare request headers.
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R02-S052 / S-081 - `7a7c07d105`

Metadata:
- initial band: `R02-base-usage-quick-headers-dispose`
- decision: `R02`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: Content-Type header on request content

#### Verified visible text / source gist
```text
Reading/response-content road: after ensuring success, response content can be read as string and deserialized, read as JSON, or read as stream. ReadAsStreamAsync avoids the intermediate string and is better for large content/downloads. Content-Type belongs on request content, not bare request headers.
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R02-S053 / S-085 - `5c497328bb`

Metadata:
- initial band: `R02-base-usage-quick-headers-dispose`
- decision: `R02`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: Server-side strictness optional / 406 Not Acceptable

#### Verified visible text / source gist
```text
Content negotiation road: client/server negotiate representations using Accept headers and output formatters. If no Accept is provided, defaults may be used; strict servers may require explicit Accept and can return 406 Not Acceptable when no acceptable formatter exists.
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R02-S054 / S-088 - `fa46d6b89b`

Metadata:
- initial band: `R02-base-usage-quick-headers-dispose`
- decision: `R02`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: Use HttpRequestMessage when request-specific content/headers are needed

#### Verified visible text / source gist
```text
Reading/response-content road: after ensuring success, response content can be read as string and deserialized, read as JSON, or read as stream. ReadAsStreamAsync avoids the intermediate string and is better for large content/downloads. Content-Type belongs on request content, not bare request headers.
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R02-S055 / S-096 - `12ea3c6755`

Metadata:
- initial band: `R02-base-usage-quick-headers-dispose`
- decision: `R02`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: Accept quality parameter and explicit preference

#### Verified visible text / source gist
```text
Accept/default-header road: prefer request-specific HttpRequestMessage headers when preferences differ per request. Quality parameters q indicate relative preference. DefaultRequestHeaders are shared across requests, so clear/reset them carefully or avoid mutating them for per-request behavior.
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R02-S056 / S-107 - `71ce8934ab`

Metadata:
- initial band: `R02-base-usage-quick-headers-dispose`
- decision: `R02`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: Accept header and q quality parameter

#### Verified visible text / source gist
```text
Accept/default-header road: prefer request-specific HttpRequestMessage headers when preferences differ per request. Quality parameters q indicate relative preference. DefaultRequestHeaders are shared across requests, so clear/reset them carefully or avoid mutating them for per-request behavior.
```

#### Visible code / code intent
```csharp
request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/xml"));
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R02-S057 / S-114 - `87ece5e438`

Metadata:
- initial band: `R02-base-usage-quick-headers-dispose`
- decision: `R02`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: Example code: add Accept headers with quality values

#### Verified visible text / source gist
```text
Accept/default-header road: prefer request-specific HttpRequestMessage headers when preferences differ per request. Quality parameters q indicate relative preference. DefaultRequestHeaders are shared across requests, so clear/reset them carefully or avoid mutating them for per-request behavior.
```

#### Visible code / code intent
```csharp
var json = new MediaTypeWithQualityHeaderValue("application/json", 1.0);
var xml = new MediaTypeWithQualityHeaderValue("application/xml", 0.9);
request.Headers.Accept.Add(json);
request.Headers.Accept.Add(xml);
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R02-S058 / S-116 - `4d11b0dc3b`

Metadata:
- initial band: `R02-base-usage-quick-headers-dispose`
- decision: `R02`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: Indicating preference / Accept header examples

#### Verified visible text / source gist
```text
Accept/default-header road: prefer request-specific HttpRequestMessage headers when preferences differ per request. Quality parameters q indicate relative preference. DefaultRequestHeaders are shared across requests, so clear/reset them carefully or avoid mutating them for per-request behavior.
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R02-S059 / S-121 - `c35fa352c0`

Metadata:
- initial band: `R02-base-usage-quick-headers-dispose`
- decision: `R02`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: Code sample with multiple Accept headers

#### Verified visible text / source gist
```text
Accept/default-header road: prefer request-specific HttpRequestMessage headers when preferences differ per request. Quality parameters q indicate relative preference. DefaultRequestHeaders are shared across requests, so clear/reset them carefully or avoid mutating them for per-request behavior.
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R02-S060 / S-125 - `d96263ebb2`

Metadata:
- initial band: `R02-base-usage-quick-headers-dispose`
- decision: `R02`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: What q value means

#### Verified visible text / source gist
```text
Accept/default-header road: prefer request-specific HttpRequestMessage headers when preferences differ per request. Quality parameters q indicate relative preference. DefaultRequestHeaders are shared across requests, so clear/reset them carefully or avoid mutating them for per-request behavior.
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R02-S061 / S-133 - `97784ae7c7`

Metadata:
- initial band: `R02-base-usage-quick-headers-dispose`
- decision: `R02`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: Demo title: indicating preference with relative quality parameter

#### Verified visible text / source gist
```text
Demo: indicating preference with relative quality parameter
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R02-S062 / S-139 - `f484f5f995`

Metadata:
- initial band: `R02-base-usage-quick-headers-dispose`
- decision: `R02`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: DefaultRequestHeaders.Accept examples / quality values

#### Verified visible text / source gist
```text
Accept/default-header road: prefer request-specific HttpRequestMessage headers when preferences differ per request. Quality parameters q indicate relative preference. DefaultRequestHeaders are shared across requests, so clear/reset them carefully or avoid mutating them for per-request behavior.
```

#### Visible code / code intent
```csharp
httpClient.DefaultRequestHeaders.Clear();
httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R02-S063 / S-144 - `e77af20350`

Metadata:
- initial band: `R02-base-usage-quick-headers-dispose`
- decision: `R02`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: Demo using HttpClient.DefaultRequestHeaders and why it is shared

#### Verified visible text / source gist
```text
Accept/default-header road: prefer request-specific HttpRequestMessage headers when preferences differ per request. Quality parameters q indicate relative preference. DefaultRequestHeaders are shared across requests, so clear/reset them carefully or avoid mutating them for per-request behavior.
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R02-S064 / S-146 - `e3c87ff97f`

Metadata:
- initial band: `R02-base-usage-quick-headers-dispose`
- decision: `R02`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: Content negotiation/client code duplicate placement

#### Verified visible text / source gist
```text
Reading/response-content road: after ensuring success, response content can be read as string and deserialized, read as JSON, or read as stream. ReadAsStreamAsync avoids the intermediate string and is better for large content/downloads. Content-Type belongs on request content, not bare request headers.
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R02-S065 / S-151 - `e9a443a860`

Metadata:
- initial band: `R02-base-usage-quick-headers-dispose`
- decision: `R02`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: Why default request headers can be risky and should be cleared

#### Verified visible text / source gist
```text
Accept/default-header road: prefer request-specific HttpRequestMessage headers when preferences differ per request. Quality parameters q indicate relative preference. DefaultRequestHeaders are shared across requests, so clear/reset them carefully or avoid mutating them for per-request behavior.
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R02-S066 / S-157 - `c4bcad034a`

Metadata:
- initial band: `R02-base-usage-quick-headers-dispose`
- decision: `R02`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: Better approach: HttpRequestMessage per request duplicate placement

#### Verified visible text / source gist
```text
Accept/default-header road: prefer request-specific HttpRequestMessage headers when preferences differ per request. Quality parameters q indicate relative preference. DefaultRequestHeaders are shared across requests, so clear/reset them carefully or avoid mutating them for per-request behavior.
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R02-S067 / S-158 - `873ff8027f`

Metadata:
- initial band: `R02-base-usage-quick-headers-dispose`
- decision: `R02`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: Why not use HttpRequestMessage for every request / disposal basics

#### Verified visible text / source gist
```text
Disposal road: dispose HttpRequestMessage/HttpResponseMessage when you own them, especially when using SendAsync/request-message patterns. Convenience APIs handle request disposal for you, but response disposal is important to release streams and return pooled connections.
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R02-S068 / S-160 - `43622b63f9`

Metadata:
- initial band: `R02-base-usage-quick-headers-dispose`
- decision: `R02`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: SendAsync with request message / headers and response

#### Verified visible text / source gist
```text
Reading/response-content road: after ensuring success, response content can be read as string and deserialized, read as JSON, or read as stream. ReadAsStreamAsync avoids the intermediate string and is better for large content/downloads. Content-Type belongs on request content, not bare request headers.
```

#### Visible code / code intent
```csharp
using var request = new HttpRequestMessage(HttpMethod.Get, "/api/movies");
request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
using var response = await httpClient.SendAsync(request, ct);
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R02-S069 / S-161 - `49a249585e`

Metadata:
- initial band: `R02-base-usage-quick-headers-dispose`
- decision: `R02`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: Do you always need using? dispose safely when needed

#### Verified visible text / source gist
```text
Disposal road: dispose HttpRequestMessage/HttpResponseMessage when you own them, especially when using SendAsync/request-message patterns. Convenience APIs handle request disposal for you, but response disposal is important to release streams and return pooled connections.
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R02-S070 / S-162 - `727a1fce3d`

Metadata:
- initial band: `R02-base-usage-quick-headers-dispose`
- decision: `R02`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: Why dispose matters: connection/resource cleanup

#### Verified visible text / source gist
```text
Disposal road: dispose HttpRequestMessage/HttpResponseMessage when you own them, especially when using SendAsync/request-message patterns. Convenience APIs handle request disposal for you, but response disposal is important to release streams and return pooled connections.
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R02-S071 / S-166 - `6d4cbefff2`

Metadata:
- initial band: `R02-base-usage-quick-headers-dispose`
- decision: `R02`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: Convenience APIs handle disposal for you

#### Verified visible text / source gist
```text
Disposal road: dispose HttpRequestMessage/HttpResponseMessage when you own them, especially when using SendAsync/request-message patterns. Convenience APIs handle request disposal for you, but response disposal is important to release streams and return pooled connections.
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R02-S072 / S-167 - `a38ac5b6aa`

Metadata:
- initial band: `R02-base-usage-quick-headers-dispose`
- decision: `R02`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: HttpResponseMessage should also be disposed

#### Verified visible text / source gist
```text
Disposal road: dispose HttpRequestMessage/HttpResponseMessage when you own them, especially when using SendAsync/request-message patterns. Convenience APIs handle request disposal for you, but response disposal is important to release streams and return pooled connections.
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

### R02-S073 / S-170 - `de7e748290`

Metadata:
- initial band: `R02-base-usage-quick-headers-dispose`
- decision: `R02`
- readability: `high-or-medium-from-contact-sheet; source image included`
- theme: Disposing response returns connection to pool / releases stream

#### Verified visible text / source gist
```text
Disposal road: dispose HttpRequestMessage/HttpResponseMessage when you own them, especially when using SendAsync/request-message patterns. Convenience APIs handle request disposal for you, but response disposal is important to release streams and return pooled connections.
```

#### Notes
Combined R01/R02 pass. This is a source-preserving visible-gist transcript; inspect source image for exact tiny punctuation if needed.

---

## 4. Cleaned source notes

- HttpMessageHandler can be replaced/stubbed to test HttpClient code without real network calls.
- DelegatingHandler is outgoing middleware around an inner handler.
- EnsureSuccessStatusCode is a fail-fast guard before reading/deserializing success DTOs.
- Shortcuts like PostAsync/PutAsync/PatchAsync are convenient but limit per-request header/media-type control.
- HttpRequestMessage is preferred when per-request Accept headers, Content headers, or custom options matter.
- Content-Type describes request content; Accept describes desired response representation.
- Quality q values express relative preference for response media types.
- ReadAsStringAsync creates an intermediate string; streaming/deserializing from stream can avoid it for large content.
- Dispose HttpResponseMessage/HttpRequestMessage when you own them to release streams/connections.

---

## 5. Minimal interpretation

R01+R02 establish the practical HttpClient baseline. The left road covers testing and CRUD/PATCH mechanics: replacing the handler pipeline for unit tests, building requests and content explicitly, and using JSON Patch only when the server supports partial-update semantics. The central/base-usage road explains how HttpClient chooses/requests representations with Accept and Content-Type, why per-request HttpRequestMessage is safer than mutating shared default headers, how to read content as string/json/stream, and why request/response disposal matters for releasing streams and pooled connections.

---

## 6. Evidence table

| Claim | Evidence | Confidence |
|---|---|---|
| HttpClient code can be tested by replacing the transport handler with a fake HttpMessageHandler | R01 testing sources S-002/S-003/S-010/S-012/S-020/S-021 | high |
| EnsureSuccessStatusCode is used as a fail-fast guard before deserialization | S-005 and CRUD examples | high |
| HttpRequestMessage is needed when request-specific Accept/content headers matter | R02 header sources S-008/S-031/S-096/S-107/S-114/S-116/S-121/S-125/S-139/S-144/S-151/S-157 | high |
| Shortcuts are convenient but can hide header/media-type details | R01 shortcut/PATCH sources S-073/S-089/S-094/S-102/S-143/S-152/S-156 | high |
| JSON Patch requires patch document semantics and often Json.NET / application/json-patch+json | R01 JSON Patch sources S-120/S-129/S-131/S-137/S-147/S-165/S-169/S-174 | high |
| Content negotiation uses Accept/Content-Type and optional q quality values | R02 content negotiation sources S-006/S-019/S-029/S-044/S-068/S-085/S-096/S-107/S-114/S-116/S-121/S-125 | high |
| ReadAsStringAsync, JSON reading, and stream reading have different allocation/streaming behavior | R02 reading sources S-039/S-040/S-053/S-056/S-062/S-065/S-067/S-081/S-088 | medium-high |
| Disposing response/request matters for releasing resources/connections when using explicit messages | R02 disposal sources S-158/S-161/S-162/S-166/S-167/S-170 | high |

---

## 7. Question hooks

- What is the difference between HttpMessageHandler and DelegatingHandler?
- How can a StubHttpMessageHandler enable HttpClient unit testing?
- Why call EnsureSuccessStatusCode before deserializing?
- When is StringContent enough, and when is JsonContent better?
- Why can shortcuts be insufficient for request-specific headers?
- Why does JSON Patch require application/json-patch+json?
- What is the difference between Accept and Content-Type?
- What does the q quality parameter express?
- When should you prefer HttpRequestMessage over DefaultRequestHeaders?
- What should be disposed when using explicit request/response messages?

---

## 8. Open review issues

- Exact code punctuation for small screenshots should be checked in `audit-assets/R01R02-source-images/` if needed.
- R03/R04 typed-client/JsonOptions material was only neighbor-checked and remains pending.
- R05/R06 factory/lifetime/global-config material was only neighbor-checked and remains pending.
