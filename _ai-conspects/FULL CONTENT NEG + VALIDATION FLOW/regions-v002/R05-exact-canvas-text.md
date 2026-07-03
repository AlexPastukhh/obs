# R05 — q values, specificity, wildcards, server preference, and HATEOAS

Exact non-empty SVG text elements in this region: 152

The following is a literal canvas-text evidence layer. Original spelling is retained; no semantic correction is silently applied here.

## T-328

Canvas position: `x=6469.199`, `y=10009.676`

~~~text
.Where(c => c.Q > 0) // q=0 means "not acceptable"
~~~

## T-329

Canvas position: `x=6469.199`, `y=10034.676`

~~~text
.ToList();
~~~

## T-330

Canvas position: `x=6469.199`, `y=10084.676`

~~~text
if (candidates.Count == 0)
~~~

## T-331

Canvas position: `x=6469.199`, `y=10109.676`

~~~text
{
~~~

## T-332

Canvas position: `x=6469.199`, `y=10134.676`

~~~text
return false;
~~~

## T-333

Canvas position: `x=6469.199`, `y=10159.676`

~~~text
}
~~~

## T-334

Canvas position: `x=6469.199`, `y=10209.676`

~~~text
// For each Accept candidate, find best supported match based on:
~~~

## T-335

Canvas position: `x=6469.199`, `y=10234.676`

~~~text
// - exact match in SupportedByPreference
~~~

## T-336

Canvas position: `x=6469.199`, `y=10259.676`

~~~text
// - or "application/*" / "*/*" wildcard
~~~

## T-337

Canvas position: `x=6469.199`, `y=10284.676`

~~~text
var supportedMatches = new List<SupportedMatch>();
~~~

## T-338

Canvas position: `x=6469.199`, `y=10334.676`

~~~text
foreach (var c in candidates)
~~~

## T-339

Canvas position: `x=6469.199`, `y=10359.676`

~~~text
{
~~~

## T-340

Canvas position: `x=6469.199`, `y=10384.676`

~~~text
foreach (var supported in SupportedByPreference)
~~~

## T-341

Canvas position: `x=6469.199`, `y=10409.676`

~~~text
{
~~~

## T-342

Canvas position: `x=6469.199`, `y=10434.676`

~~~text
if (Matches(c, supported))
~~~

## T-343

Canvas position: `x=6469.199`, `y=10459.676`

~~~text
{
~~~

## T-266

Canvas position: `x=1851.052`, `y=10474.168`

~~~text
can framework handle this by itslef?
~~~

## T-344

Canvas position: `x=6469.199`, `y=10484.676`

~~~text
supportedMatches.Add(new SupportedMatch(
~~~

## T-345

Canvas position: `x=6469.199`, `y=10509.676`

~~~text
supportedMediaType: Normalize(supported),
~~~

## T-346

Canvas position: `x=6469.199`, `y=10534.676`

~~~text
q: c.Q,
~~~

## T-347

Canvas position: `x=6469.199`, `y=10559.676`

~~~text
specificity: c.Specificity,
~~~

## T-348

Canvas position: `x=6469.199`, `y=10584.676`

~~~text
supportedPreferenceRank: Array.IndexOf(SupportedByPreference, supported),
~~~

## T-349

Canvas position: `x=6469.199`, `y=10609.676`

~~~text
acceptHeaderIndex: c.Index));
~~~

## T-350

Canvas position: `x=6469.199`, `y=10634.676`

~~~text
}
~~~

## T-351

Canvas position: `x=6469.199`, `y=10659.676`

~~~text
}
~~~

## T-352

Canvas position: `x=6469.199`, `y=10684.676`

~~~text
}
~~~

## T-353

Canvas position: `x=6469.199`, `y=10734.676`

~~~text
if (supportedMatches.Count == 0)
~~~

## T-354

Canvas position: `x=6469.199`, `y=10759.676`

~~~text
{
~~~

## T-355

Canvas position: `x=6469.199`, `y=10784.676`

~~~text
// No overlap between Accept and what we can produce -> 406 scenario
~~~

## T-356

Canvas position: `x=6469.199`, `y=10809.676`

~~~text
return false;
~~~

## T-357

Canvas position: `x=6469.199`, `y=10834.676`

~~~text
}
~~~

## T-358

Canvas position: `x=6469.199`, `y=10884.676`

~~~text
var winner = supportedMatches
~~~

## T-359

Canvas position: `x=6469.199`, `y=10909.676`

~~~text
.OrderByDescending(m => m.Q)
~~~

## T-360

Canvas position: `x=6469.199`, `y=10934.676`

~~~text
.ThenByDescending(m => m.Specificity)
~~~

## T-361

Canvas position: `x=6469.199`, `y=10959.676`

~~~text
.ThenBy(m => m.SupportedPreferenceRank)
~~~

## T-362

Canvas position: `x=6469.199`, `y=10984.676`

~~~text
.ThenBy(m => m.AcceptHeaderIndex)
~~~

## T-363

Canvas position: `x=6469.199`, `y=11009.676`

~~~text
.First();
~~~

## T-364

Canvas position: `x=6469.199`, `y=11059.676`

~~~text
result = BuildResult(winner.SupportedMediaType);
~~~

## T-365

Canvas position: `x=6469.199`, `y=11084.676`

~~~text
return true;
~~~

## T-366

Canvas position: `x=6469.199`, `y=11109.676`

~~~text
}
~~~

## T-367

Canvas position: `x=6469.199`, `y=11159.676`

~~~text
private static NegotiationResult BuildResult(string mediaType)
~~~

## T-368

Canvas position: `x=6469.199`, `y=11184.676`

~~~text
{
~~~

## T-369

Canvas position: `x=6469.199`, `y=11209.676`

~~~text
// your course logic: include links if subtype ends with "hateoas"
~~~

## T-370

Canvas position: `x=6469.199`, `y=11234.676`

~~~text
var includeLinks = mediaType.Contains("hateoas", StringComparison.OrdinalIgnoreCase);
~~~

## T-371

Canvas position: `x=6469.199`, `y=11284.676`

~~~text
// derive "primary" type similar to course:
~~~

## T-372

Canvas position: `x=6469.199`, `y=11309.676`

~~~text
// application/vnd.marvin.author.full.hateoas+json -> vnd.marvin.author.full
~~~

## T-373

Canvas position: `x=6469.199`, `y=11334.676`

~~~text
// application/vnd.marvin.author.friendly+json -> vnd.marvin.author.friendly
~~~

## T-374

Canvas position: `x=6469.199`, `y=11359.676`

~~~text
// application/json -> application
~~~

## T-375

Canvas position: `x=6469.199`, `y=11384.676`

~~~text
var parsed = MediaTypeHeaderValue.Parse(mediaType);
~~~

## T-376

Canvas position: `x=6469.199`, `y=11409.676`

~~~text
var subType = parsed.SubTypeWithoutSuffix.Value; // e.g. vnd.marvin.author.full.hateoas or json
~~~

## T-377

Canvas position: `x=6469.199`, `y=11434.676`

~~~text
var primary = subType.EndsWith(".hateoas", StringComparison.OrdinalIgnoreCase)
~~~

## T-378

Canvas position: `x=6469.199`, `y=11459.676`

~~~text
? subType[..^(".hateoas".Length)]
~~~

## T-379

Canvas position: `x=6469.199`, `y=11484.676`

~~~text
: subType;
~~~

## T-380

Canvas position: `x=6469.199`, `y=11534.676`

~~~text
return new NegotiationResult(mediaType, primary, includeLinks);
~~~

## T-381

Canvas position: `x=6469.199`, `y=11559.676`

~~~text
}
~~~

## T-382

Canvas position: `x=6469.199`, `y=11609.676`

~~~text
private static string Normalize(string mediaType) => mediaType.Trim();
~~~

## T-383

Canvas position: `x=6469.199`, `y=11659.676`

~~~text
private sealed record Candidate(MediaTypeHeaderValue Value, int Index)
~~~

## T-384

Canvas position: `x=6469.199`, `y=11684.676`

~~~text
{
~~~

## T-385

Canvas position: `x=6469.199`, `y=11709.676`

~~~text
public double Q
~~~

## T-386

Canvas position: `x=6469.199`, `y=11734.676`

~~~text
{
~~~

## T-267

Canvas position: `x=576.386`, `y=11756.834`

~~~text
checking that there is a
~~~

## T-387

Canvas position: `x=6469.199`, `y=11759.676`

~~~text
get
~~~

## T-388

Canvas position: `x=6469.199`, `y=11784.676`

~~~text
{
~~~

## T-389

Canvas position: `x=6469.199`, `y=11809.676`

~~~text
// If q is absent => 1.0
~~~

## T-390

Canvas position: `x=6469.199`, `y=11834.676`

~~~text
var qParam = Value.Parameters.FirstOrDefault(p =>
~~~

## T-391

Canvas position: `x=6469.199`, `y=11859.676`

~~~text
string.Equals(p.Name.Value, "q", StringComparison.OrdinalIgnoreCase));
~~~

## T-268

Canvas position: `x=576.386`, `y=11896.120`

~~~text
body
~~~

## T-392

Canvas position: `x=6469.199`, `y=11909.676`

~~~text
if (qParam?.Value is null) return 1.0;
~~~

## T-393

Canvas position: `x=6469.199`, `y=11959.676`

~~~text
// q is a StringSegment like "0.9"
~~~

## T-278

Canvas position: `x=10501.695`, `y=11968.531`

~~~text
!!!
~~~

## T-394

Canvas position: `x=6469.199`, `y=11984.676`

~~~text
if (double.TryParse(qParam.Value.Value, System.Globalization.NumberStyles.AllowDecimalPoint,
~~~

## T-395

Canvas position: `x=6469.199`, `y=12009.676`

~~~text
System.Globalization.CultureInfo.InvariantCulture, out var q))
~~~

## T-396

Canvas position: `x=6469.199`, `y=12034.676`

~~~text
{
~~~

## T-269

Canvas position: `x=576.386`, `y=12035.406`

~~~text
transfer encoding with chunked
~~~

## T-397

Canvas position: `x=6469.199`, `y=12059.676`

~~~text
return q;
~~~

## T-271

Canvas position: `x=2578.608`, `y=12065.723`

~~~text
middleware
~~~

## T-398

Canvas position: `x=6469.199`, `y=12084.676`

~~~text
}
~~~

## T-399

Canvas position: `x=6469.199`, `y=12134.676`

~~~text
// Malformed q -> treat as invalid by making it unacceptable
~~~

## T-400

Canvas position: `x=6469.199`, `y=12159.676`

~~~text
return 0;
~~~

## T-270

Canvas position: `x=576.386`, `y=12174.692`

~~~text
transfer
~~~

## T-401

Canvas position: `x=6469.199`, `y=12184.676`

~~~text
}
~~~

## T-402

Canvas position: `x=6469.199`, `y=12209.676`

~~~text
}
~~~

## T-403

Canvas position: `x=6469.199`, `y=12259.676`

~~~text
// exact = 2, type/* = 1, */* = 0
~~~

## T-404

Canvas position: `x=6469.199`, `y=12284.676`

~~~text
public int Specificity =>
~~~

## T-405

Canvas position: `x=6469.199`, `y=12309.676`

~~~text
Value.MediaType?.Value == "*/*" ? 0 :
~~~

## T-406

Canvas position: `x=6469.199`, `y=12334.676`

~~~text
Value.SubType?.Value == "*" ? 1 :
~~~

## T-407

Canvas position: `x=6469.199`, `y=12359.676`

~~~text
2;
~~~

## T-408

Canvas position: `x=6469.199`, `y=12384.676`

~~~text
}
~~~

## T-409

Canvas position: `x=6469.199`, `y=12434.676`

~~~text
private sealed record SupportedMatch(
~~~

## T-410

Canvas position: `x=6469.199`, `y=12459.676`

~~~text
string SupportedMediaType,
~~~

## T-411

Canvas position: `x=6469.199`, `y=12484.676`

~~~text
double Q,
~~~

## T-412

Canvas position: `x=6469.199`, `y=12509.676`

~~~text
int Specificity,
~~~

## T-413

Canvas position: `x=6469.199`, `y=12534.676`

~~~text
int SupportedPreferenceRank,
~~~

## T-414

Canvas position: `x=6469.199`, `y=12559.676`

~~~text
int AcceptHeaderIndex);
~~~

## T-415

Canvas position: `x=6469.199`, `y=12609.676`

~~~text
private static bool Matches(Candidate accept, string supported)
~~~

## T-416

Canvas position: `x=6469.199`, `y=12634.676`

~~~text
{
~~~

## T-417

Canvas position: `x=6469.199`, `y=12659.676`

~~~text
supported = Normalize(supported);
~~~

## T-418

Canvas position: `x=6469.199`, `y=12709.676`

~~~text
// wildcard supported entries are just there for preference list;
~~~

## T-419

Canvas position: `x=6469.199`, `y=12734.676`

~~~text
// treat them as matching in the obvious way.
~~~

## T-420

Canvas position: `x=6469.199`, `y=12759.676`

~~~text
if (supported == "*/*")
~~~

## T-421

Canvas position: `x=6469.199`, `y=12784.676`

~~~text
return true;
~~~

## T-422

Canvas position: `x=6469.199`, `y=12834.676`

~~~text
// Parse supported into type/subtype
~~~

## T-423

Canvas position: `x=6469.199`, `y=12859.676`

~~~text
if (!MediaTypeHeaderValue.TryParse(supported, out var supportedMt))
~~~

## T-424

Canvas position: `x=6469.199`, `y=12884.676`

~~~text
{
~~~

## T-425

Canvas position: `x=6469.199`, `y=12909.676`

~~~text
// developer error; should never happen because SupportedByPreference is ours
~~~

## T-426

Canvas position: `x=6469.199`, `y=12934.676`

~~~text
return false;
~~~

## T-427

Canvas position: `x=6469.199`, `y=12959.676`

~~~text
}
~~~

## T-428

Canvas position: `x=6469.199`, `y=13009.676`

~~~text
// If accept is */* it matches anything
~~~

## T-429

Canvas position: `x=6469.199`, `y=13034.676`

~~~text
if (accept.Value.MediaType?.Value == "*/*")
~~~

## T-430

Canvas position: `x=6469.199`, `y=13059.676`

~~~text
return true;
~~~

## T-431

Canvas position: `x=6469.199`, `y=13109.676`

~~~text
// If accept is type/* it matches any subtype for that type
~~~

## T-432

Canvas position: `x=6469.199`, `y=13134.676`

~~~text
if (accept.Value.SubType?.Value == "*")
~~~

## T-433

Canvas position: `x=6469.199`, `y=13159.676`

~~~text
{
~~~

## T-434

Canvas position: `x=6469.199`, `y=13184.676`

~~~text
return string.Equals(
~~~

## T-435

Canvas position: `x=6469.199`, `y=13209.676`

~~~text
accept.Value.Type?.Value,
~~~

## T-436

Canvas position: `x=6469.199`, `y=13234.676`

~~~text
supportedMt!.Type?.Value,
~~~

## T-437

Canvas position: `x=6469.199`, `y=13259.676`

~~~text
StringComparison.OrdinalIgnoreCase);
~~~

## T-438

Canvas position: `x=6469.199`, `y=13284.676`

~~~text
}
~~~

## T-439

Canvas position: `x=6469.199`, `y=13334.676`

~~~text
// Otherwise exact compare by media type (ignore parameters)
~~~

## T-440

Canvas position: `x=6469.199`, `y=13359.676`

~~~text
return string.Equals(
~~~

## T-441

Canvas position: `x=6469.199`, `y=13384.676`

~~~text
accept.Value.MediaType?.Value,
~~~

## T-442

Canvas position: `x=6469.199`, `y=13409.676`

~~~text
supportedMt!.MediaType?.Value,
~~~

## T-443

Canvas position: `x=6469.199`, `y=13434.676`

~~~text
StringComparison.OrdinalIgnoreCase);
~~~

## T-444

Canvas position: `x=6469.199`, `y=13459.676`

~~~text
}
~~~

## T-445

Canvas position: `x=6469.199`, `y=13484.676`

~~~text
}
~~~

## T-279

Canvas position: `x=8111.947`, `y=13633.828`

~~~text
in controller
~~~

## T-446

Canvas position: `x=6538.384`, `y=13718.437`

~~~text
using Microsoft.AspNetCore.Mvc;
~~~

## T-447

Canvas position: `x=6538.384`, `y=13768.437`

~~~text
[ApiController]
~~~

## T-448

Canvas position: `x=6538.384`, `y=13793.437`

~~~text
[Route("api/authors")]
~~~

## T-449

Canvas position: `x=6538.384`, `y=13818.437`

~~~text
public class AuthorsController : ControllerBase
~~~

## T-450

Canvas position: `x=6538.384`, `y=13843.437`

~~~text
{
~~~

## T-451

Canvas position: `x=6538.384`, `y=13868.437`

~~~text
[HttpGet("{authorId}")]
~~~

## T-452

Canvas position: `x=6538.384`, `y=13893.437`

~~~text
public IActionResult GetAuthor(Guid authorId, [FromHeader(Name = "Accept")] string? accept)
~~~

## T-453

Canvas position: `x=6538.384`, `y=13918.437`

~~~text
{
~~~

## T-471

Canvas position: `x=3021.593`, `y=13934.051`

~~~text
better
~~~

## T-454

Canvas position: `x=6538.384`, `y=13943.437`

~~~text
if (!AcceptHeaderSelectionHelper.TrySelect(accept, out var selected))
~~~

## T-455

Canvas position: `x=6538.384`, `y=13968.437`

~~~text
{
~~~

## T-456

Canvas position: `x=6538.384`, `y=13993.437`

~~~text
// Could be invalid Accept syntax (400) OR no supported match (406).
~~~

## T-457

Canvas position: `x=6538.384`, `y=14018.437`

~~~text
// If you want to distinguish, check TryParseList separately.
~~~

## T-458

Canvas position: `x=6538.384`, `y=14043.437`

~~~text
return StatusCode(StatusCodes.Status406NotAcceptable);
~~~

## T-459

Canvas position: `x=6538.384`, `y=14068.437`

~~~text
}
~~~

## T-460

Canvas position: `x=6538.384`, `y=14118.437`

~~~text
// selected.IncludeLinks -> add HATEOAS
~~~

## T-461

Canvas position: `x=6538.384`, `y=14143.437`

~~~text
// selected.PrimaryMediaType -> "vnd.marvin.author.full" / "vnd.marvin.author.friendly"
~~~

## T-462

Canvas position: `x=6538.384`, `y=14168.437`

~~~text
if (string.Equals(selected!.PrimaryMediaType, "vnd.marvin.author.full", StringComparison.OrdinalIgnoreCase))
~~~

## T-463

Canvas position: `x=6538.384`, `y=14193.437`

~~~text
{
~~~

## T-464

Canvas position: `x=6538.384`, `y=14218.437`

~~~text
// build full representation
~~~

## T-465

Canvas position: `x=6538.384`, `y=14243.437`

~~~text
return Ok(new { kind = "full", links = selected.IncludeLinks });
~~~

## T-466

Canvas position: `x=6538.384`, `y=14268.437`

~~~text
}
~~~

## T-467

Canvas position: `x=6538.384`, `y=14318.437`

~~~text
// build friendly representation
~~~

## T-468

Canvas position: `x=6538.384`, `y=14343.437`

~~~text
return Ok(new { kind = "friendly", links = selected.IncludeLinks });
~~~

## T-469

Canvas position: `x=6538.384`, `y=14368.437`

~~~text
}
~~~

## T-470

Canvas position: `x=6538.384`, `y=14393.437`

~~~text
}
~~~
