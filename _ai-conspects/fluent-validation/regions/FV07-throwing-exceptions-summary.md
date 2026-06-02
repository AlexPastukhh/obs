# FV07 - Throwing exceptions and final summary

Conspect: `fluent-validation`  
File type: **source-preserving region transcript**  
Stage: **2 / NEXT01 verified transcript v001**  
Generated: 2026-06-02 15:10:00 UTC

---

## 0.1 Area overview / key ideas / reading quality

Key ideas:
- ValidateAndThrow and ThrowOnFailures throw instead of returning ValidationResult.
- The source warns not to use exceptions for ordinary validation failures.
- Validation failures are expected input/business outcomes, not exceptional situations.
- The final summary recaps separate validator classes, RuleFor, complex properties, collections, inheritance validation, rule sets, and exceptions.

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
S-036, S-037, S-038, S-039, S-040
```

Boundary decision:
```text
FV07 covers throwing validation exceptions and the final summary.
```

Pending after this region:
```text
none inside NEXT01; after transcript, final closure/audit remains
```

---

## 1. Source inventory

| Region source | Source | Image use | fileId | Subregion | Status | Cut off | Theme |
|---|---|---|---|---|---|---|---|
| FV07A-S001 | S-036 | IU-036 | `64ecccb8c5` | FV07A | `verified-from-source-image` | no | Demo: throwing exceptions |
| FV07A-S002 | S-037 | IU-037 | `c7bff9e331` | FV07A | `verified-from-source-image` | no | ValidateAndThrow |
| FV07A-S003 | S-038 | IU-038 | `c6ef069605` | FV07A | `verified-visible-partial-from-source-image` | cropped screenshot | ThrowOnFailures option |
| FV07A-S004 | S-039 | IU-039 | `44b9ba8f21` | FV07A | `verified-from-source-image` | no | Do not use exceptions for validation |
| FV07B-S001 | S-040 | IU-040 | `7c8baa4b66` | FV07B | `verified-from-source-image` | no | Final summary |

---

## 2. Verified source transcript

## 2.1 FV07A

### FV07A-S001 / S-036 - `64ecccb8c5`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Demo: throwing exceptions

#### Visible text

```text
Demo slide: Throwing exceptions.
```

---

### FV07A-S002 / S-037 - `c7bff9e331`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: ValidateAndThrow

#### Visible text

```text
ValidateAndThrow throws an exception instead of returning a ValidationResult.
```

#### Visible code

```csharp
var validator = new RegisterRequestValidator();
validator.ValidateAndThrow(
    request);
```

---

### FV07A-S003 / S-038 - `c6ef069605`

Metadata:
- status: `verified-visible-partial-from-source-image`
- readability: `high`
- cut off: `cropped screenshot`
- confidence: `high-for-visible-code`
- theme: ThrowOnFailures option

#### Visible text

```text
ThrowOnFailures() can be added to Validate options. The source shows it together with IncludeRuleSets and IncludeRulesNotInRuleSet.
```

#### Visible code

```csharp
ValidationResult result = validator.Validate(
    request,
    options => options
        .IncludeRuleSets("Email")
        .IncludeRulesNotInRuleSet()
        .ThrowOnFailures());
```

---

### FV07A-S004 / S-039 - `44b9ba8f21`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Do not use exceptions for validation

#### Visible text

```text
Throwing Exceptions.

The slide warns: “Don't use exceptions for validation.” It explicitly contrasts:
- Validations
- Exceptional situation

Meaning: validation failures are expected business/input results and should normally be represented as validation results, not exceptions.
```

---

## 2.2 FV07B

### FV07B-S001 / S-040 - `7c8baa4b66`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Final summary

#### Visible text

```text
Summary:
- Using the FluentValidation library:
  - validation rules are defined in separate classes
  - rules are described fluently using the RuleFor method
- Validating complex properties
- Validating collections of objects:
  - used the ForEach method
- Inheritance validation
- Rule sets allow for combining validation rules
- Throwing exceptions
```

---

## 3. Cleaned source notes

- ValidateAndThrow and ThrowOnFailures convert validation failures into exceptions.
- The source warns not to use exceptions for normal validation failures.
- Prefer ValidationResult-style handling for expected input validation errors.

---

## 4. Question hooks

- What does ValidateAndThrow do?
- What does ThrowOnFailures do?
- Why are validation failures not exceptional situations?
