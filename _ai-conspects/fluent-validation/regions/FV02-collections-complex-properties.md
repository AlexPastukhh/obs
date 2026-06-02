# FV02 - Validating collections and complex child properties

Conspect: `fluent-validation`  
File type: **source-preserving region transcript**  
Stage: **2 / NEXT01 verified transcript v001**  
Generated: 2026-06-02 15:10:00 UTC

---

## 0.1 Area overview / key ideas / reading quality

Key ideas:
- Validate the collection itself separately from collection items.
- ForEach validates items but does not run when the collection is null.
- CascadeMode.Stop, CurrentValidator conditions, and DependentRules are alternative ways to prevent null-related follow-up failures.
- The same DependentRules screenshot appears as S-014 and S-041 and is tracked twice as two canvas uses.

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
S-001, S-002, S-003, S-004, S-005, S-006, S-013, S-014, S-041
```

Boundary decision:
```text
FV02 covers collection validation, RuleForEach/ForEach, null collection handling, and DependentRules/CurrentValidator alternatives.
S-014 and S-041 are duplicate image uses of the same embedded screenshot and are both processed.
```

Pending after this region:
```text
none inside NEXT01; after transcript, final closure/audit remains
```

---

## 1. Source inventory

| Region source | Source | Image use | fileId | Subregion | Status | Cut off | Theme |
|---|---|---|---|---|---|---|---|
| FV02A-S001 | S-001 | IU-001 | `3274c21815` | FV02A | `verified-from-source-image` | no | Recap: validating collections |
| FV02A-S002 | S-002 | IU-002 | `1cb010a781` | FV02A | `verified-from-source-image` | no | Cascade stop before collection validations |
| FV02A-S003 | S-003 | IU-003 | `c9b9abc85e` | FV02A | `verified-from-source-image` | no | Validate collection length only when collection exists |
| FV02A-S004 | S-004 | IU-004 | `067a246286` | FV02A | `verified-from-source-image` | no | ForEach does not run on null collection |
| FV02A-S005 | S-005 | IU-005 | `9ffa0cbc67` | FV02A | `verified-from-source-image` | no | Null addresses bug example |
| FV02A-S006 | S-006 | IU-006 | `0e8b2b0360` | FV02A | `verified-from-source-image` | no | When applies to all previous validators by default |
| FV02B-S001 | S-013 | IU-013 | `6b6a3a9244` | FV02B | `verified-from-source-image` | no | ApplyConditionTo.CurrentValidator for collection length |
| FV02B-S002 | S-014 | IU-014 | `c76db004b8` | FV02B | `verified-from-source-image` | no | DependentRules alternative for collection validation |
| FV02B-S003 | S-041 | IU-041 | `c76db004b8` | FV02B | `verified-from-source-image` | no | Duplicate image use of DependentRules alternative |

---

## 2. Verified source transcript

## 2.1 FV02A

### FV02A-S001 / S-001 - `3274c21815`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Recap: validating collections

#### Visible text

```text
Recap: Validating Collections.

The example validates both the collection itself and the collection items:
- RuleFor(x => x.Addresses).NotNull()
- Must checks that collection length is between 1 and 3
- ForEach validates each item: not null and uses AddressValidator

The slide explicitly marks:
- Validated the collection itself
- Validated collection items
- Extracted the rule into a separate validator
```

#### Visible code

```csharp
RuleFor(x => x.Addresses).NotNull()
    .Must(x => x?.Length >= 1 && x.Length <= 3)
    .WithMessage("The number of addresses must be between 1 and 3")
    .ForEach(x =>
    {
        x.NotNull();
        x.SetValidator(new AddressValidator());
    });
```

---

### FV02A-S002 / S-002 - `1cb010a781`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Cascade stop before collection validations

#### Visible text

```text
The source shows stopping cascading after the first failure. In a collection rule, Cascade(CascadeMode.Stop) prevents later validators in the same rule chain from running after an earlier failure, such as Addresses being null.
```

#### Visible code

```csharp
RuleFor(x => x.Addresses)
    .Cascade(CascadeMode.Stop)
    .NotNull().WithMessage("Addresses required")
    .Must(a => a.Length >= 1 && a.Length <= 3).WithMessage("The number of addresses must be between 1 and 3")
    .ForEach(x => { x.NotNull(); x.SetValidator(new AddressValidator()); });
```

---

### FV02A-S003 / S-003 - `c9b9abc85e`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Validate collection length only when collection exists

#### Visible text

```text
Alternative: validate the collection length only when the collection is present. Here NotNull still catches missing collection, but Must(length) has a When condition so it does not try to validate length when Addresses is null.
```

#### Visible code

```csharp
RuleFor(x => x.Addresses)
    .NotNull().WithMessage("Addresses required")
    .Must(a => a.Length >= 1 && a.Length <= 3)
        .When(a => a.Addresses != null)
    .WithMessage("The number of addresses must be between 1 and 3")
    .ForEach(x => { x.NotNull(); x.SetValidator(new AddressValidator()); });
```

#### Notes

Visible code uses a condition against x.Addresses; the local parameter names are partially inconsistent in the screenshot but the intent is clear.

---

### FV02A-S004 / S-004 - `067a246286`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: ForEach does not run on null collection

#### Visible text

```text
Per-item validators configured with ForEach will not run when the collection is null because there are no elements to iterate. That is why the collection itself still needs a NotNull/NotEmpty-style rule.
```

---

### FV02A-S005 / S-005 - `9ffa0cbc67`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Null addresses bug example

#### Visible text

```text
A request example has addresses: null and still returns 200 OK. The annotation says “Didn't check for null.” This illustrates why validating only items is not enough: the parent collection must be validated too.
```

#### Visible code

```csharp
{
  "email": "carl@gmail.com",
  "phone": null,
  "name": "Carl Carlson",
  "addresses": null
}
```

---

### FV02A-S006 / S-006 - `0e8b2b0360`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: When applies to all previous validators by default

#### Visible text

```text
The handwritten note says that by default When() applies to all previous checks in the same rule chain. If Phone is null, it does not check NotEmpty() or Must() in this example. This is the problem that ApplyConditionTo.CurrentValidator or separate rules can solve.
```

#### Visible code

```csharp
RuleFor(x => x.Phone)
    .NotEmpty()
    .Must(x => Regex.IsMatch(x, "^[2-9][0-9]{9}$"))
    .When(x => x.Phone != null)
    .WithMessage("The phone number is incorrect");
```

---

## 2.2 FV02B

### FV02B-S001 / S-013 - `6b6a3a9244`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: ApplyConditionTo.CurrentValidator for collection length

#### Visible text

```text
This collection rule uses ApplyConditionTo.CurrentValidator so the condition applies only to the Must(length) validator, not to NotNull or ForEach. That lets NotNull still fail when Addresses is absent.
```

#### Visible code

```csharp
RuleFor(x => x.Addresses)
    .NotNull().WithMessage("Addresses required")
    .Must(a => a.Length >= 1 && a.Length <= 3)
        .When(x => x.Addresses != null, ApplyConditionTo.CurrentValidator)
    .WithMessage("The number of addresses must be between 1 and 3")
    .ForEach(a => { a.NotNull(); a.SetValidator(new AddressValidator()); });
```

---

### FV02B-S002 / S-014 - `c76db004b8`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: DependentRules alternative for collection validation

#### Visible text

```text
Alternative fix: DependentRules runs only if the preceding rule succeeded. The source uses NotNull for Addresses, then nests the length check and per-item validation inside DependentRules, so they only run after NotNull passes.
```

#### Visible code

```csharp
RuleFor(x => x.Addresses)
    .NotNull().WithMessage("Addresses required")
    .DependentRules(() =>
    {
        RuleFor(x => x.Addresses)
            .Must(a => a.Length >= 1 && a.Length <= 3)
            .WithMessage("The number of addresses must be between 1 and 3")
            .ForEach(a => { a.NotNull(); a.SetValidator(new AddressValidator()); });
    });
```

#### Notes

Same embedded screenshot also appears as S-041 in another canvas position.

---

### FV02B-S003 / S-041 - `c76db004b8`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Duplicate image use of DependentRules alternative

#### Visible text

```text
Duplicate canvas use of the same DependentRules screenshot as S-014. It is tracked separately because it appears at another canvas position and may have local labels nearby.
```

#### Visible code

```csharp
RuleFor(x => x.Addresses)
    .NotNull().WithMessage("Addresses required")
    .DependentRules(() =>
    {
        RuleFor(x => x.Addresses)
            .Must(a => a.Length >= 1 && a.Length <= 3)
            .WithMessage("The number of addresses must be between 1 and 3")
            .ForEach(a => { a.NotNull(); a.SetValidator(new AddressValidator()); });
    });
```

#### Notes

fileId_short c76db004b8 is shared with S-014. This is a duplicate image use, not duplicate coverage.

---

## 3. Cleaned source notes

- For collections, validate the collection itself and its items separately.
- ForEach does not run when the collection is null.
- CascadeMode.Stop, CurrentValidator conditions, and DependentRules can prevent follow-up validators from running after NotNull fails.

---

## 4. Question hooks

- Why must you validate the collection itself separately?
- Why does ForEach not run for null collections?
- How do CascadeMode.Stop, When(CurrentValidator), and DependentRules differ?
- Why are S-014 and S-041 both tracked?
