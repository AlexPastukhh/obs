# FV01 - Regex and built-in string/basic validators

Conspect: `fluent-validation`  
File type: **source-preserving region transcript**  
Stage: **2 / NEXT01 verified transcript v001**  
Generated: 2026-06-02 15:10:00 UTC

---

## 0.1 Area overview / key ideas / reading quality

Key ideas:
- NotEmpty behavior depends on property type and does not necessarily reject whitespace-only strings.
- Use a whitespace-specific validator or Must(!IsNullOrWhiteSpace) when whitespace should fail.
- ApplyConditionTo.CurrentValidator makes When apply only to the immediately previous validator.
- Matches is simpler than Must(Regex.IsMatch) for ordinary regex validation.

Reading quality:
```text
Overall: high.
Cropped/narrow IDE screenshots are marked as partial in source metadata.
Confidence: high for concepts; medium-high for exact code where screenshot is cropped.
```

---

## 0.2 Coverage / boundary review

Included source IDs:
```text
S-015, S-016, S-017, S-018
```

Boundary decision:
```text
FV01 covers NotEmpty/whitespace behavior, regex validation, Matches, and ApplyConditionTo.CurrentValidator.
```

Pending after this region:
```text
none inside NEXT01; after transcript, final closure/audit remains
```

---

## 1. Source inventory

| Region source | Source | Image use | fileId | Subregion | Status | Cut off | Theme |
|---|---|---|---|---|---|---|---|
| FV01A-S001 | S-015 | IU-015 | `3756bb6215` | FV01A | `verified-from-source-image` | no | NotEmpty does not cover whitespace-only strings |
| FV01A-S002 | S-016 | IU-016 | `6a72ffbcc9` | FV01A | `verified-from-source-image` | no | NotEmpty behavior depends on property type |
| FV01B-S001 | S-017 | IU-017 | `6199245af5` | FV01B | `verified-from-source-image` | no | ApplyConditionTo.CurrentValidator |
| FV01B-S002 | S-018 | IU-018 | `dac66fe248` | FV01B | `verified-from-source-image` | no | Use Matches instead of Must Regex.IsMatch |

---

## 2. Verified source transcript

## 2.1 FV01A

### FV01A-S001 / S-015 - `3756bb6215`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: NotEmpty does not cover whitespace-only strings

#### Visible text

```text
For strings, if code needs “not null / not empty / not whitespace”, the source recommends adding an explicit whitespace check. FluentValidation's NotEmpty() catches null and empty string, but whitespace-only strings require NotWhiteSpace() in newer FluentValidation versions or a custom Must predicate.
```

#### Visible code

```csharp
RuleFor(x => x.Email)
    .NotEmpty()
    .Must(s => !string.IsNullOrWhiteSpace(s))
    .WithMessage("Email is required");
```

---

### FV01A-S002 / S-016 - `6a72ffbcc9`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: NotEmpty behavior depends on property type

#### Visible text

```text
NotEmpty() depends on the property type:
- string: fails if null or empty string, but does not treat whitespace-only as empty.
- collections: fails if the collection is null or has 0 items.
- nullable value types: fails if null.
- non-nullable value types: fails if equal to the default value for that type.

The screenshot notes that for whitespace you need NotWhiteSpace() where available, or Must(s => !string.IsNullOrWhiteSpace(s)).
```

---

## 2.2 FV01B

### FV01B-S001 / S-017 - `6199245af5`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: ApplyConditionTo.CurrentValidator

#### Visible text

```text
When a condition should apply only to the immediately previous validator, use ApplyConditionTo.CurrentValidator. The screenshot shows a phone rule where the condition applies only to the Must/regex check rather than all previous checks in the chain.
```

#### Visible code

```csharp
RuleFor(x => x.Phone)
    .NotEmpty()
    .Must(x => Regex.IsMatch(x, "^[2-9][0-9]{9}$"))
    .When(x => x.Phone != null, ApplyConditionTo.CurrentValidator)
    .WithMessage("The phone number is incorrect");
```

---

### FV01B-S002 / S-018 - `dac66fe248`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Use Matches instead of Must Regex.IsMatch

#### Visible text

```text
The source notes that FluentValidation's Matches validator can replace a longer combination of Must(Regex.IsMatch), condition, and custom message. It is preferable when the goal is simply “this property must match this regex.”
```

#### Visible code

```csharp
RuleFor(x => x.Phone)
    .NotEmpty()
    .Matches("^[2-9][0-9]{9}$");

// replaces:
// .Must(x => Regex.IsMatch(x, "^[2-9][0-9]{9}$"))
// .When(x => x.Phone != null, ApplyConditionTo.CurrentValidator)
// .WithMessage("The phone number is incorrect");
```

---

## 3. Cleaned source notes

- Use Matches for simple regex validation.
- Use ApplyConditionTo.CurrentValidator when When must affect only the previous validator.
- For “not null, not empty, not whitespace”, NotEmpty alone is not enough for strings.

---

## 4. Question hooks

- When does NotEmpty fail for strings, collections, and value types?
- Why does whitespace require an extra check?
- When is Matches better than Must(Regex.IsMatch)?
- What problem does ApplyConditionTo.CurrentValidator solve?
