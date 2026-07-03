# Site-key configuration endpoint and placement audit

Generated: 2026-07-02

## Transcript policy

- Every unique embedded screenshot has one source block.
- Visible C#, Razor, JavaScript, JSX, JSON, routes, field names, actions, and thresholds are retained.
- Cropped screenshots are explicitly marked.
- Explanation is separated from the normalized source layer.
- Every source includes recall questions.

## S-073 — API endpoint for exposing only the site key

**Known limits:** none

### Near-literal normalized transcript

```csharp
[ApiController]
[Route("api/config")]
public class ConfigController : ControllerBase
{
    private readonly GoogleReCaptchaOptions _options;

    public ConfigController(
        IOptions<GoogleReCaptchaOptions> options)
    {
        _options = options.Value;
    }

    [HttpGet("recaptcha-site-key")]
    public IActionResult GetRecaptchaSiteKey()
    {
        return Ok(new
        {
            siteKey = _options.SiteKey
        });
    }
}
```

### Study meaning

A frontend may fetch the public site key from a configuration endpoint. The secret key must never be included.

### Recall questions

1. What route exposes the site key?
2. Which options type is injected?
3. What JSON property is returned?
4. Which key must not be returned?
