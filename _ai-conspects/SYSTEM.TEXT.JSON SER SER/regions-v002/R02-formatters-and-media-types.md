# MVC formatters and media types

## S-003 — MVC formatters, 406 responses, and vendor media types

**Known limits:** none

### Near-literal normalized transcript

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.Net.Http.Headers;

builder.Services.AddControllers(options =>
{
    // Optional: return 406 if client asks for an unsupported Accept
    options.ReturnHttpNotAcceptable = true;
})
.AddMvcOptions(options =>
{
    // OUTPUT: add vendor JSON
    var jsonOutput = options.OutputFormatters
        .OfType<SystemTextJsonOutputFormatter>()
        .First();

    jsonOutput.SupportedMediaTypes.Add(
        MediaTypeHeaderValue.Parse(
            "application/vnd.myapp+json"));

    // INPUT: add vendor JSON
    var jsonInput = options.InputFormatters
        .OfType<SystemTextJsonInputFormatter>()
        .First();

    jsonInput.SupportedMediaTypes.Add(
        MediaTypeHeaderValue.Parse(
            "application/vnd.myapp+json"));
});
```

### Study meaning

Serializer options control JSON representation. MVC formatters additionally control content negotiation and which media types are accepted or produced.

### Recall questions

1. What does `ReturnHttpNotAcceptable = true` enable?
2. Which formatter handles JSON output?
3. Which formatter handles JSON input?
4. What vendor media type is registered?
5. Why is formatter configuration separate from serializer configuration?
