# Final semantic transcript — JsonDocument, JsonElement, JsonNode and Utf8JsonWriter

Authoritative source: `source/jsondocument, jsonnode, jsonelement, utf8jsonwriter.svg`

---

# R01 — `JsonDocument` and `JsonElement` fundamentals

## `JsonDocument`

`JsonDocument` is the read-only document owner for parsed JSON.

```csharp
using JsonDocument document =
    JsonDocument.Parse(json);

JsonElement root = document.RootElement;
```

Important properties:

```text
read-only DOM
optimized for inspection
owns pooled/native parsing state
implements IDisposable
RootElement is a JsonElement view over the document
```

Dispose the document when it is no longer needed:

```csharp
using var document = JsonDocument.Parse(json);
```

A `JsonElement` obtained from `RootElement` normally depends on the document lifetime. When an element must outlive the document, clone it:

```csharp
JsonElement detached;

using (var document = JsonDocument.Parse(json))
{
    detached = document.RootElement.Clone();
}
```

## `JsonElement`

`JsonElement` is a lightweight, read-only view of one JSON value.

It can represent:

```text
object
array
string
number
true
false
null
undefined
```

Inspect the kind before reading:

```csharp
if (element.ValueKind == JsonValueKind.Object)
{
    // object operations
}
```

Typed getters include:

```csharp
element.GetString();
element.GetInt32();
element.GetInt64();
element.GetDecimal();
element.GetDouble();
element.GetBoolean();
element.GetDateTime();
element.GetGuid();
```

A getter is a runtime assertion about the JSON type. Calling the wrong getter throws. For defensive code, check `ValueKind` or use `TryGet...` methods where available.

## Accessing properties

```csharp
JsonElement name =
    root.GetProperty("name");

string? value = name.GetString();
```

Safer lookup:

```csharp
if (root.TryGetProperty("name", out JsonElement name))
{
    string? value = name.GetString();
}
```

Object and array enumeration:

```csharp
foreach (JsonProperty property in root.EnumerateObject())
{
    Console.WriteLine(property.Name);
    Console.WriteLine(property.Value);
}

foreach (JsonElement item in root.EnumerateArray())
{
    Console.WriteLine(item);
}
```

Array helpers:

```csharp
int length = array.GetArrayLength();
JsonElement first = array[0];
```

## Parsing and deserialization

Use `JsonDocument.Parse` when a full document owner is useful:

```csharp
using var document = JsonDocument.Parse(json);
JsonElement root = document.RootElement;
```

A standalone element can also be produced through the framework's direct element parsing/deserialization APIs. When compatibility across target frameworks matters, `JsonDocument.Parse(...).RootElement.Clone()` is an explicit and portable pattern.

Both `JsonDocument` and `JsonElement` integrate with `JsonSerializer`:

```csharp
MyDto? dto =
    element.Deserialize<MyDto>();

JsonElement element =
    JsonSerializer.SerializeToElement(value);
```

## DTO constructor binding

`System.Text.Json` can create a DTO through:

```text
a public parameterless constructor plus writable members
a suitable parameterized constructor whose parameters bind to members
a constructor explicitly selected with JsonConstructor
```

Constructor parameter names must match the serializable members according to serializer binding rules. A registration DTO and a server-error DTO can therefore deserialize differently even when both look like ordinary classes.

## `ProblemDetails.Extensions`

`ProblemDetails.Extensions` is commonly represented as:

```csharp
IDictionary<string, object?>
```

After JSON deserialization, an `object` value may actually be a `JsonElement` at runtime:

```csharp
if (problemDetails.Extensions.TryGetValue(
        "errors",
        out object? value)
    && value is JsonElement errorsElement)
{
    var errors =
        errorsElement.Deserialize<List<ValidationError>>();
}
```

The compile-time type is `object`; the runtime value depends on the JSON shape and serializer behavior.

---

# R02 — model binding and choosing a read-only DOM type

## Controller model binding

ASP.NET Core can bind JSON request bodies to DOM types:

```csharp
[HttpPost]
public IActionResult Post(
    [FromBody] JsonElement body)
{
    return Ok();
}
```

```csharp
[HttpPost]
public IActionResult Post(
    [FromBody] JsonDocument body)
{
    return Ok();
}
```

```csharp
[HttpPost]
public IActionResult Post(
    [FromBody] JsonNode? body)
{
    return Ok();
}
```

Choose the type according to the operation:

```text
JsonElement
    read one JSON value
    lightweight read-only access
    no explicit document variable in the action signature

JsonDocument
    explicit owner/lifetime
    inspect RootElement
    useful when document ownership is meaningful

JsonNode
    mutable tree
    add, remove or replace JSON before forwarding/returning it

DTO
    stable known schema
    validation, documentation and compile-time types
```

For a stable API contract, a DTO is usually clearer than a raw DOM. DOM binding is useful for variable payloads, gateways, extensions, partial inspection and generic infrastructure.

## `JsonElement` versus `JsonDocument`

They share the same read-only DOM model, but their roles differ:

```text
JsonDocument
    owns parsed storage
    exposes RootElement
    disposable

JsonElement
    struct view of one value
    can refer to root or a nested value
    not independently disposable
```

Using `JsonElement` does not automatically mean that no pooled parsing storage exists. The framework still needs storage for parsed metadata. What changes is the API surface and ownership visible to the caller.

## `JsonProperty`

`JsonProperty` represents one name/value pair while enumerating a JSON object:

```csharp
foreach (JsonProperty property
         in element.EnumerateObject())
{
    string name = property.Name;
    JsonElement value = property.Value;
}
```

It is not a mutable dictionary entry. To modify object properties, use `JsonObject`/`JsonNode`.

---

# R03 — `JsonDocument` versus `JsonNode`

## Read-only inspection versus mutation

Use `JsonDocument`/`JsonElement` when:

```text
the payload is inspected but not modified
only several fields are needed
allocation-sensitive read paths matter
the JSON shape may vary
a DTO would add little value
```

Use `JsonNode` when:

```text
properties must be added or removed
array elements must be inserted or replaced
a gateway patches JSON before forwarding it
a subtree is built dynamically
mutable dictionary/list-like access is useful
```

Example read-only inspection:

```csharp
using var document =
    JsonDocument.Parse(payload);

JsonElement root = document.RootElement;

string? eventType =
    root.GetProperty("eventType").GetString();
```

Example mutable patch:

```csharp
JsonNode? node =
    JsonNode.Parse(payload);

node!["environment"] = "prod";
node["metadata"]!["processedBy"] = "gateway-1";

node.AsObject().Remove("debugInfo");

string output =
    node.ToJsonString();
```

## Serialization bridge

All DOM types can bridge to typed objects:

```csharp
MyDto? dto =
    element.Deserialize<MyDto>();

MyDto? dto =
    node.Deserialize<MyDto>();

JsonNode? node =
    JsonSerializer.SerializeToNode(value);

JsonElement element =
    JsonSerializer.SerializeToElement(value);
```

This is useful when only part of a payload is dynamic.

## Runtime values and `object`

When deserializing into:

```csharp
Dictionary<string, object?>
```

JSON values are not automatically transformed into arbitrary application classes. Nested values commonly appear as `JsonElement`.

Therefore:

```csharp
object value = dictionary["payload"]!;
```

may require:

```csharp
if (value is JsonElement element)
{
    ...
}
```

Use pattern matching because `is` checks the runtime type:

```csharp
if (value is JsonElement element)
{
    // runtime assertion succeeded
}
```

---

# R04 — mutable `JsonNode` APIs

## Node hierarchy

The mutable DOM contains:

```text
JsonNode
├─ JsonObject
├─ JsonArray
└─ JsonValue
```

Parse:

```csharp
JsonNode? root =
    JsonNode.Parse(json);
```

Convert to a specific shape:

```csharp
JsonObject obj = root!.AsObject();
JsonArray array = root["items"]!.AsArray();
```

## Indexers

Object property access:

```csharp
string? name =
    root["user"]?["name"]?
        .GetValue<string>();
```

Array access:

```csharp
JsonArray numbers =
    root["numbers"]!.AsArray();

JsonNode? first = numbers[0];
numbers[1] = 42;
```

Indexers are natural for known shapes, but null checks are still required when the input is untrusted.

## `JsonObject`

Create and mutate:

```csharp
var obj = new JsonObject
{
    ["name"] = "Tom",
    ["age"] = 30
};

obj["age"] = 31;
obj["city"] = "Paris";
obj.Remove("temporary");
```

Useful operations include:

```text
Add
Remove
ContainsKey
TryGetPropertyValue
indexer get/set
Insert
RemoveAt
IndexOf
```

`JsonObject` preserves property order, so positional operations can matter when producing a controlled output shape. JSON object order should not be treated as semantic identity, but it can matter for readability, deterministic output and some signing/canonicalization designs.

Enumerate:

```csharp
foreach ((string key, JsonNode? value) in obj)
{
    Console.WriteLine($"{key}: {value}");
}
```

## `JsonArray`

```csharp
var array = new JsonArray(
    "a",
    "b",
    "c");

array.Add("d");
array.Insert(1, "middle");
array.RemoveAt(0);
array[1] = "changed";
```

`JsonArray` behaves like a mutable list of `JsonNode?` values.

Enumerate:

```csharp
foreach (JsonNode? item in array)
{
    Console.WriteLine(item);
}
```

## `JsonValue`

Create scalar nodes:

```csharp
JsonNode number =
    JsonValue.Create(123)!;

JsonNode text =
    JsonValue.Create("hello")!;
```

Read a strongly typed value:

```csharp
int value =
    number.GetValue<int>();
```

Inspect the JSON kind when necessary:

```csharp
JsonValueKind kind =
    number.GetValueKind();
```

Object and array indexers are meaningful for containers. Treat `JsonValue` as a leaf node.

## Shared operations

Useful `JsonNode` operations include:

```text
ToJsonString
GetValueKind
DeepClone
ReplaceWith
Parent
Root
GetPath
```

Serialize a node:

```csharp
string json =
    node.ToJsonString(
        new JsonSerializerOptions
        {
            WriteIndented = true
        });
```

`ToString()` is a general object representation. `ToJsonString()` explicitly produces JSON text.

---

# R05 — `Utf8JsonWriter`

## Purpose

`Utf8JsonWriter` is a forward-only, low-level JSON writer. It writes UTF-8 JSON directly to:

```text
Stream
IBufferWriter<byte>
```

Typical creation:

```csharp
var options = new JsonWriterOptions
{
    Indented = true,
    SkipValidation = false
};

using var writer =
    new Utf8JsonWriter(stream, options);
```

Always flush before consuming the written bytes:

```csharp
writer.Flush();
```

## Structural methods

```csharp
writer.WriteStartObject();
writer.WriteEndObject();

writer.WriteStartArray();
writer.WriteEndArray();
```

Property/value example:

```csharp
writer.WriteStartObject();

writer.WriteString("name", "Ada");
writer.WriteNumber("age", 36);
writer.WriteBoolean("active", true);
writer.WriteNull("middleName");

writer.WriteEndObject();
writer.Flush();
```

Property-name methods can be separated from value methods:

```csharp
writer.WritePropertyName("items");
writer.WriteStartArray();
...
writer.WriteEndArray();
```

## Value categories

The writer provides methods for:

```text
strings and dates
numbers
booleans
null
property names
raw JSON fragments
comments
start/end object and array tokens
```

Use raw JSON methods only when the fragment is already trusted and valid. Bypassing validation with untrusted input can produce invalid JSON or injection vulnerabilities.

## `JsonEncodedText`

Frequently repeated property names can be pre-encoded:

```csharp
static readonly JsonEncodedText NameProperty =
    JsonEncodedText.Encode("name");

writer.WriteString(NameProperty, "Ada");
```

This can reduce repeated encoding work in hot paths.

## Writing HTTP responses directly

A response can be streamed without creating an intermediate DTO collection:

```csharp
Response.ContentType = "application/json";

await using Stream stream =
    Response.Body;

using var writer =
    new Utf8JsonWriter(stream);

writer.WriteStartArray();

await foreach (var row in rows)
{
    writer.WriteStartObject();
    writer.WriteNumber("id", row.Id);
    writer.WriteString("name", row.Name);
    writer.WriteEndObject();
}

writer.WriteEndArray();
writer.Flush();
```

This can reduce intermediate object/array allocations and support streaming large results.

It is not automatically zero-allocation:

```text
database/provider materialization may allocate
strings still allocate
async infrastructure may allocate
property-name encoding may allocate unless reused
buffers still exist
```

The main benefit is fewer intermediate representation layers.

## Valid use cases

```text
custom JSON shape that does not map cleanly to DTOs
streaming large arrays
writing directly to a response or buffer
strict control over property order
canonical output for hashing/signing
avoiding intermediate DOM/DTO graphs
special gateway or low-level protocol code
```

For ordinary object serialization, `JsonSerializer` is usually simpler and less error-prone.

## Serializer object walking

With:

```csharp
JsonSerializer.Serialize(writer, value);
```

the serializer walks the object graph according to metadata and serialization rules.

With manual writer calls, the application explicitly chooses every token and property.

Analogy:

```text
JsonSerializer
    a general recipe-driven object graph serializer

Utf8JsonWriter
    manual token-by-token plating
```

Manual writing offers control, but increases code volume and the risk of malformed output.

## Hashing and signing

For deterministic hashing/signing, output must be canonical according to the chosen protocol:

```text
stable property order
stable number formatting
stable escaping
no irrelevant whitespace differences
well-defined handling of nulls
well-defined Unicode normalization when required
```

Simply using `Utf8JsonWriter` does not by itself create a standard canonical JSON format; the caller must define and enforce the canonicalization rules.

## Testing

Test both syntax and semantics:

```csharp
byte[] bytes = buffer.WrittenSpan.ToArray();

using JsonDocument document =
    JsonDocument.Parse(bytes);

Assert.Equal(
    "Ada",
    document.RootElement
        .GetProperty("name")
        .GetString());
```

Also test exact bytes when property order or canonical output matters.

---

# Decision guide

```text
Known stable schema
    DTO + JsonSerializer

Read-only inspection
    JsonDocument / JsonElement

Mutable JSON tree
    JsonNode / JsonObject / JsonArray

Low-level streaming or exact token control
    Utf8JsonWriter
```

# Checklist

```text
[ ] dispose JsonDocument
[ ] clone JsonElement when it must outlive its document
[ ] check ValueKind before type-specific getters
[ ] use TryGetProperty for optional fields
[ ] prefer DTOs for stable public contracts
[ ] use JsonNode only when mutation is required
[ ] distinguish compile-time object from runtime JsonElement
[ ] validate raw JSON before WriteRawValue
[ ] flush Utf8JsonWriter
[ ] define canonicalization rules explicitly for hashing/signing
[ ] test writer output by parsing it back
```

# Coverage

```text
unique embedded screenshots: 164
image uses: 165
native SVG labels: 81
duplicate extra placements: 1

processed image uses: 165
processed text labels: 81
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
