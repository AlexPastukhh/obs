# Regional transcript — R05: Accept selection with q values, specificity, wildcards, preference and HATEOAS

Conspect: `FULL CONTENT NEG + VALIDATION FLOW`  
Generated: 2026-06-27 10:00:00 UTC

## Coverage

```text
text elements represented: 152 / 152
image uses processed: 40 / 40
unique screenshots represented: 40
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

A custom selector is useful when one action can produce several vendor
representations and the API needs deterministic tie-breaking.

### Supported representations

Maintain an explicit server preference list, for example:

```text
application/vnd.marvin.author.full.hateoas+json
application/vnd.marvin.author.full+json
application/vnd.marvin.author.friendly.hateoas+json
application/vnd.marvin.author.friendly+json
application/json
```

The final response must use a concrete media type. Wildcards are client matching
rules, not response `Content-Type` values.

### Candidate model

For each parsed `Accept` item retain:

- media type;
- q quality, defaulting to 1.0;
- specificity;
- original header index.

Exclude q=0 because the client explicitly marks that representation
unacceptable.

### Matching and winner order

- exact media type matches the same type/subtype;
- `type/*` matches supported subtypes of the same type;
- `*/*` matches any supported representation.

Sort candidates by:

```text
q descending
specificity descending: exact > type/* > */*
server preference rank
original Accept-header order
```

### Result shape

A structured result can carry selected media type, primary representation and
an `IncludeLinks` flag. A subtype ending in `.hateoas+json` enables links; the
primary representation can remove the `.hateoas` marker and `+json` suffix.

Return distinct outcomes for:

- malformed list → 400;
- valid list with no overlap → 406;
- successful selection → representation metadata.

A single boolean loses the reason for failure and makes correct 400/406 handling
harder.

## Representative source labels

- can framework handle this by itslef?
- checking that there is a
- body
- transfer encoding with chunked
- transfer
- middleware
- !!!
- in controller
- .Where(c => c.Q > 0) // q=0 means "not acceptable"
- .ToList();
- if (candidates.Count == 0)
- {
- return false;
- }
- // For each Accept candidate, find best supported match based on:
- // - exact match in SupportedByPreference
- // - or "application/*" / "*/*" wildcard
- var supportedMatches = new List<SupportedMatch>();
- foreach (var c in candidates)
- foreach (var supported in SupportedByPreference)
- if (Matches(c, supported))
- supportedMatches.Add(new SupportedMatch(
- supportedMediaType: Normalize(supported),
- q: c.Q,
- specificity: c.Specificity,
- supportedPreferenceRank: Array.IndexOf(SupportedByPreference, supported),
- acceptHeaderIndex: c.Index));
- if (supportedMatches.Count == 0)
- // No overlap between Accept and what we can produce -> 406 scenario
- var winner = supportedMatches

## Covered text elements

```text
T-266, T-267, T-268, T-269, T-270, T-271, T-278, T-279, T-328, T-329, T-330, T-331, T-332, T-333, T-334
T-335, T-336, T-337, T-338, T-339, T-340, T-341, T-342, T-343, T-344, T-345, T-346, T-347, T-348, T-349
T-350, T-351, T-352, T-353, T-354, T-355, T-356, T-357, T-358, T-359, T-360, T-361, T-362, T-363, T-364
T-365, T-366, T-367, T-368, T-369, T-370, T-371, T-372, T-373, T-374, T-375, T-376, T-377, T-378, T-379
T-380, T-381, T-382, T-383, T-384, T-385, T-386, T-387, T-388, T-389, T-390, T-391, T-392, T-393, T-394
T-395, T-396, T-397, T-398, T-399, T-400, T-401, T-402, T-403, T-404, T-405, T-406, T-407, T-408, T-409
T-410, T-411, T-412, T-413, T-414, T-415, T-416, T-417, T-418, T-419, T-420, T-421, T-422, T-423, T-424
T-425, T-426, T-427, T-428, T-429, T-430, T-431, T-432, T-433, T-434, T-435, T-436, T-437, T-438, T-439
T-440, T-441, T-442, T-443, T-444, T-445, T-446, T-447, T-448, T-449, T-450, T-451, T-452, T-453, T-454
T-455, T-456, T-457, T-458, T-459, T-460, T-461, T-462, T-463, T-464, T-465, T-466, T-467, T-468, T-469
T-470, T-471
```

## Covered screenshot uses

```text
IU-073, IU-074, IU-075, IU-076, IU-077, IU-078, IU-079, IU-080, IU-081, IU-082, IU-083, IU-084, IU-085
IU-096, IU-097, IU-099, IU-100, IU-101, IU-102, IU-103, IU-104, IU-105, IU-106, IU-107, IU-108, IU-109
IU-110, IU-111, IU-112, IU-113, IU-114, IU-115, IU-116, IU-117, IU-118, IU-119, IU-120, IU-123, IU-125
IU-126
```

## Audit note

Every listed text element and screenshot placement is closed in the final ledgers.
The complete SVG and extracted screenshots remain authoritative for exact code punctuation.
