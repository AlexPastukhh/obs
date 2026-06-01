---
excalidraw-plugin: parsed
tags:
  - excalidraw
excalidraw-autoexport: svg
---
==⚠  Switch to EXCALIDRAW VIEW in the MORE OPTIONS menu of this document. ⚠== You can decompress Drawing data with the command palette: 'Decompress current Excalidraw file'. For more info check in plugin settings under 'Saving'


# Excalidraw Data

## Text Elements
!!! ^uprxf7oj

in controller ^bJBqvOTb

using Microsoft.Net.Http.Headers;
using Microsoft.Extensions.Primitives;

public static class AcceptHeaderSelectionHelper
{
    // Define server preference order (first = most preferred when q ties)
    // Put the variants you support here in the exact preference order you want.
    private static readonly string[] SupportedByPreference =
    {
        "application/vnd.marvin.author.full.hateoas+json",
        "application/vnd.marvin.author.full+json",
        "application/vnd.marvin.author.friendly.hateoas+json",
        "application/vnd.marvin.author.friendly+json",
        "application/json",
        "application/*",
        "*/*"
    };

    public sealed record NegotiationResult(
        string MediaType,
        string PrimaryMediaType,  // e.g. vnd.marvin.author.full / vnd.marvin.author.friendly / application
        bool IncludeLinks          // true if hateoas requested
    );

    /// <summary>
    /// Picks the best matching media type from Accept header using:
    /// 1) q weight (descending)
    /// 2) specificity (exact > type/* > */*)
    /// 3) server preference order (SupportedByPreference)
    /// 4) header order as a final tie-breaker (stable by index)
    /// </summary>
    public static bool TrySelect(
        StringValues acceptHeader,
        out NegotiationResult? result)
    {
        result = null;

        // Missing Accept => treat as */* (client accepts anything)
        if (StringValues.IsNullOrEmpty(acceptHeader))
        {
            // choose your default representation here
            var defaultMt = "application/vnd.marvin.author.friendly+json";
            result = BuildResult(defaultMt);
            return true;
        }

        if (!MediaTypeHeaderValue.TryParseList(acceptHeader, out var parsedList))
        {
            return false; // invalid syntax -> caller should return 400 ProblemDetails
        }

        // Build candidates from Accept values
        var candidates = parsedList
            .Select((mt, index) => new Candidate(mt, index))
            .Where(c => c.Q > 0) // q=0 means "not acceptable"
            .ToList();

        if (candidates.Count == 0)
        {
            return false;
        }

        // For each Accept candidate, find best supported match based on:
        // - exact match in SupportedByPreference
        // - or "application/*" / "*/*" wildcard
        var supportedMatches = new List<SupportedMatch>();

        foreach (var c in candidates)
        {
            foreach (var supported in SupportedByPreference)
            {
                if (Matches(c, supported))
                {
                    supportedMatches.Add(new SupportedMatch(
                        supportedMediaType: Normalize(supported),
                        q: c.Q,
                        specificity: c.Specificity,
                        supportedPreferenceRank: Array.IndexOf(SupportedByPreference, supported),
                        acceptHeaderIndex: c.Index));
                }
            }
        }

        if (supportedMatches.Count == 0)
        {
            // No overlap between Accept and what we can produce -> 406 scenario
            return false;
        }

        var winner = supportedMatches
            .OrderByDescending(m => m.Q)
            .ThenByDescending(m => m.Specificity)
            .ThenBy(m => m.SupportedPreferenceRank)
            .ThenBy(m => m.AcceptHeaderIndex)
            .First();

        result = BuildResult(winner.SupportedMediaType);
        return true;
    }

    private static NegotiationResult BuildResult(string mediaType)
    {
        // your course logic: include links if subtype ends with "hateoas"
        var includeLinks = mediaType.Contains("hateoas", StringComparison.OrdinalIgnoreCase);

        // derive "primary" type similar to course:
        // application/vnd.marvin.author.full.hateoas+json -> vnd.marvin.author.full
        // application/vnd.marvin.author.friendly+json -> vnd.marvin.author.friendly
        // application/json -> application
        var parsed = MediaTypeHeaderValue.Parse(mediaType);
        var subType = parsed.SubTypeWithoutSuffix.Value; // e.g. vnd.marvin.author.full.hateoas or json
        var primary = subType.EndsWith(".hateoas", StringComparison.OrdinalIgnoreCase)
            ? subType[..^(".hateoas".Length)]
            : subType;

        return new NegotiationResult(mediaType, primary, includeLinks);
    }

    private static string Normalize(string mediaType) => mediaType.Trim();

    private sealed record Candidate(MediaTypeHeaderValue Value, int Index)
    {
        public double Q
        {
            get
            {
                // If q is absent => 1.0
                var qParam = Value.Parameters.FirstOrDefault(p =>
                    string.Equals(p.Name.Value, "q", StringComparison.OrdinalIgnoreCase));

                if (qParam?.Value is null) return 1.0;

                // q is a StringSegment like "0.9"
                if (double.TryParse(qParam.Value.Value, System.Globalization.NumberStyles.AllowDecimalPoint,
                        System.Globalization.CultureInfo.InvariantCulture, out var q))
                {
                    return q;
                }

                // Malformed q -> treat as invalid by making it unacceptable
                return 0;
            }
        }

        // exact = 2, type/* = 1, */* = 0
        public int Specificity =>
            Value.MediaType?.Value == "*/*" ? 0 :
            Value.SubType?.Value == "*" ? 1 :
            2;
    }

    private sealed record SupportedMatch(
        string SupportedMediaType,
        double Q,
        int Specificity,
        int SupportedPreferenceRank,
        int AcceptHeaderIndex);

    private static bool Matches(Candidate accept, string supported)
    {
        supported = Normalize(supported);

        // wildcard supported entries are just there for preference list;
        // treat them as matching in the obvious way.
        if (supported == "*/*")
            return true;

        // Parse supported into type/subtype
        if (!MediaTypeHeaderValue.TryParse(supported, out var supportedMt))
        {
            // developer error; should never happen because SupportedByPreference is ours
            return false;
        }

        // If accept is */* it matches anything
        if (accept.Value.MediaType?.Value == "*/*")
            return true;

        // If accept is type/* it matches any subtype for that type
        if (accept.Value.SubType?.Value == "*")
        {
            return string.Equals(
                accept.Value.Type?.Value,
                supportedMt!.Type?.Value,
                StringComparison.OrdinalIgnoreCase);
        }

        // Otherwise exact compare by media type (ignore parameters)
        return string.Equals(
            accept.Value.MediaType?.Value,
            supportedMt!.MediaType?.Value,
            StringComparison.OrdinalIgnoreCase);
    }
} ^jQqqrj1W

using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/authors")]
public class AuthorsController : ControllerBase
{
    [HttpGet("{authorId}")]
    public IActionResult GetAuthor(Guid authorId, [FromHeader(Name = "Accept")] string? accept)
    {
        if (!AcceptHeaderSelectionHelper.TrySelect(accept, out var selected))
        {
            // Could be invalid Accept syntax (400) OR no supported match (406).
            // If you want to distinguish, check TryParseList separately.
            return StatusCode(StatusCodes.Status406NotAcceptable);
        }

        // selected.IncludeLinks -> add HATEOAS
        // selected.PrimaryMediaType -> "vnd.marvin.author.full" / "vnd.marvin.author.friendly"
        if (string.Equals(selected!.PrimaryMediaType, "vnd.marvin.author.full", StringComparison.OrdinalIgnoreCase))
        {
            // build full representation
            return Ok(new { kind = "full", links = selected.IncludeLinks });
        }

        // build friendly representation
        return Ok(new { kind = "friendly", links = selected.IncludeLinks });
    }
} ^lkGXpEQZ

negotiationresult biuldresult ^aoqa2yD6

candidate ^COlJkxBr

matches ^69jg98b3

## Embedded Files
c2472bd871f0138d7a28b63122c267e63120d386: [[Pasted Image 20260219024030_328.png]]

368a68c1d0300f174ac00dd18125375e028e7fa7: [[Pasted Image 20260219024133_347.png]]

857e5e341cc5e3484c02bf3bd7f3a64b80c11de1: [[Pasted Image 20260219024200_960.png]]

7b3a3d2ac41295807cbde0ab21242e94164fcfbe: [[Pasted Image 20260219024210_120.png]]

80f9d68e3ebc015e799479933b61320c761a8ea7: [[Pasted Image 20260219024323_065.png]]

c7c9a9fa1563cfb7a5b1ad014969fb731727eb80: [[Pasted Image 20260219024335_181.png]]

81e8a6d18bebf72a2ef78d3a99e39827d0dc3b7d: [[Pasted Image 20260219024358_911.png]]

08253e3b616b6071a7c75fdd99295fda8a645ad7: [[Pasted Image 20260219024557_807.png]]

8eac95711c4f10609dbbda76f57451793b815ff5: [[Pasted Image 20260219024909_225.png]]

ff861a3a69ad0e7b4de2aab2af20928b1730e41d: [[Pasted Image 20260219025252_705.png]]

27dadd6791078f45898873a03b9d5a14bb04f459: [[Pasted Image 20260219025318_329.png]]

edd0db4800295b15788f88d062e076f8962d0bf1: [[Pasted Image 20260219025321_539.png]]

167d3d0173e2a9d1d66f03b053563391a870be6f: [[Pasted Image 20260219025353_357.png]]

ba12054f6f5ba9159257c210b49ed126a2465ad4: [[Pasted Image 20260219025357_017.png]]

86c2f1073c53257de307f7a15d55ac37fc0d80b9: [[Pasted Image 20260219025525_791.png]]

b9bfc30e8a109f576e9a65c613aa34bf6201c2c8: [[Pasted Image 20260219025528_634.png]]

08f228736a925d696c0fc773c373e611f288e727: [[Pasted Image 20260219025531_201.png]]

60fa8f321a8f59f96ad0fb020e1d03013792ab6c: [[Pasted Image 20260219025619_698.png]]

26db606e49d2fc3d9a4fe9fad1bb7bb335aecead: [[Pasted Image 20260219025657_777.png]]

2e81d491042633592cf074e8f91c59f742756b4d: [[Pasted Image 20260219025749_575.png]]

95b80fd356e1f38fa71260ae2854e6a2e1e93ff0: [[Pasted Image 20260219025928_424.png]]

27d8c580ac1392476ce47a248c0dfe6fa9d7f44d: [[Pasted Image 20260219030027_359.png]]

1563345f64e399a36d9a886d779e15a83cf0a1bd: [[Pasted Image 20260219031011_972.png]]

cf9ecf56f475cd3549bf0143c70705e76e2f44a2: [[Pasted Image 20260219031016_670.png]]

e092b4c3c07f232e91b8c0ba2b009cf070d27b4d: [[Pasted Image 20260219031021_745.png]]

c3e4b73053bda16692027165cde2ad4af4bf479d: [[Pasted Image 20260219031024_767.png]]

04a65e1f2b722ee10bbe80715d0008a4b577036b: [[Pasted Image 20260219031749_427.png]]

34132c2de62ef11143e5ed68f51db5733740e307: [[Pasted Image 20260219031752_093.png]]

3364cc70b6a4faf1f1f383224861cd6b3e9e8032: [[Pasted Image 20260219031754_413.png]]

1c60f7f4bee9451d3073f0a5d7b00f7602256399: [[Pasted Image 20260219031856_676.png]]

%%
## Drawing
```compressed-json
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
```
%%