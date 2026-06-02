# FV06 - Rule sets and validator reuse/data-contract cautions

Conspect: `fluent-validation`  
File type: **source-preserving region transcript**  
Stage: **2 / NEXT01 verified transcript v001**  
Generated: 2026-06-02 15:10:00 UTC

---

## 0.1 Area overview / key ideas / reading quality

Key ideas:
- RuleSet groups rules under names like Register or EditPersonalInfo.
- Rules outside any RuleSet are default rules.
- IncludeRuleSets selects named rule sets; IncludeRulesNotInRuleSet includes default rules.
- The source warns that reusing one validator/data contract across endpoints can point to CRUD-style design rather than task-based contracts.

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
S-028, S-029, S-030, S-031, S-033, S-034, S-035
```

Boundary decision:
```text
FV06 covers RuleSet/default rule set behavior and cautions about validator/data-contract reuse.
```

Pending after this region:
```text
none inside NEXT01; after transcript, final closure/audit remains
```

---

## 1. Source inventory

| Region source | Source | Image use | fileId | Subregion | Status | Cut off | Theme |
|---|---|---|---|---|---|---|---|
| FV06A-S001 | S-028 | IU-028 | `b0bdc4406b` | FV06A | `verified-from-source-image` | no | Demo: rule sets |
| FV06A-S002 | S-029 | IU-029 | `950afb724e` | FV06A | `verified-from-source-image` | no | StudentValidator with RuleSet Create and Update |
| FV06A-S003 | S-030 | IU-030 | `589298594d` | FV06A | `verified-visible-partial-from-source-image` | very narrow screenshot | IncludeRuleSets with default |
| FV06A-S004 | S-031 | IU-031 | `9d2ae61076` | FV06A | `verified-visible-partial-from-source-image` | very narrow screenshot | IncludeRuleSets plus IncludeRulesNotInRuleSet |
| FV06B-S001 | S-033 | IU-033 | `21c480edc6` | FV06B | `verified-from-source-image` | no | Recap: default rule set |
| FV06B-S002 | S-034 | IU-034 | `4f34a94297` | FV06B | `verified-from-source-image` | no | Recap: validating default, named, and combined rule sets |
| FV06B-S003 | S-035 | IU-035 | `552f5e90d7` | FV06B | `verified-from-source-image` | no | Caution: reusing validators and data contracts |

---

## 2. Verified source transcript

## 2.1 FV06A

### FV06A-S001 / S-028 - `b0bdc4406b`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Demo: rule sets

#### Visible text

```text
Demo slide: Rule sets.
```

---

### FV06A-S002 / S-029 - `950afb724e`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: StudentValidator with RuleSet Create and Update

#### Visible text

```text
StudentValidator defines named rule sets:
- Create: validates Email with NotEmpty, Length(0,150), EmailAddress.
- Update: placeholder.
Rules outside a RuleSet are default rules: Name and Addresses validation.
```

#### Visible code

```csharp
public class StudentValidator : AbstractValidator<StudentDto>
{
    public StudentValidator()
    {
        RuleSet("Create", () =>
        {
            RuleFor(x => x.Email).NotEmpty().Length(0, 150).EmailAddress();
        });
        RuleSet("Update", () =>
        {
            // ...
        });
        RuleFor(x => x.Name).NotEmpty().Length(0, 200);
        RuleFor(x => x.Addresses).NotNull().SetValidator(new AddressesValidator());
    }
}
```

---

### FV06A-S003 / S-030 - `589298594d`

Metadata:
- status: `verified-visible-partial-from-source-image`
- readability: `high`
- cut off: `very narrow screenshot`
- confidence: `high-for-visible-code`
- theme: IncludeRuleSets with default

#### Visible text

```text
Validate can include selected rule sets. The visible example includes Email and default rules.
```

#### Visible code

```csharp
var validator = new RegisterRequestValidator();
ValidationResult result = validator.Validate(request,
    options => options.IncludeRuleSets("Email", "default"));
```

---

### FV06A-S004 / S-031 - `9d2ae61076`

Metadata:
- status: `verified-visible-partial-from-source-image`
- readability: `high`
- cut off: `very narrow screenshot`
- confidence: `high-for-visible-code`
- theme: IncludeRuleSets plus IncludeRulesNotInRuleSet

#### Visible text

```text
Another Validate call includes a named rule set and rules not in any rule set. IncludeRulesNotInRuleSet() is the explicit way to include default/outside-rules.
```

#### Visible code

```csharp
ValidationResult result = validator.Validate(
    request,
    options => options.IncludeRuleSets("Email").IncludeRulesNotInRuleSet());
```

---

## 2.2 FV06B

### FV06B-S001 / S-033 - `21c480edc6`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Recap: default rule set

#### Visible text

```text
Recap slide: rules outside RuleSet blocks belong to the default rule set. The boxed rules are the default rules:
- Name NotEmpty Length
- Addresses NotNull SetValidator
```

#### Visible code

```csharp
public class StudentValidator : AbstractValidator<StudentDto> {
    public StudentValidator()
    {
        RuleSet("Register", () =>
        {
            RuleFor(x => x.Email).NotEmpty().Length(0, 150).EmailAddress();
        });
        RuleSet("EditPersonalInfo", () =>
        {
            // No separate rules for EditPersonalInfo API yet
        });
        RuleFor(x => x.Name).NotEmpty().Length(0, 200);
        RuleFor(x => x.Addresses).NotNull().SetValidator(new AddressesValidator());
    }
}
```

---

### FV06B-S002 / S-034 - `4f34a94297`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Recap: validating default, named, and combined rule sets

#### Visible text

```text
Recap slide:
- validator.Validate(request) validates the default rule set.
- IncludeRuleSets("Register") validates the Register rule set.
- IncludeRuleSets("Register").IncludeRulesNotInRuleSet() validates both the Register rules and default rules.
```

#### Visible code

```csharp
ValidationResult result = validator.Validate(request);

ValidationResult result = validator.Validate(request,
    options => options
        .IncludeRuleSets("Register"));

ValidationResult result = validator.Validate(request,
    options => options
        .IncludeRuleSets("Register")
        .IncludeRulesNotInRuleSet());
```

---

### FV06B-S003 / S-035 - `552f5e90d7`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Caution: reusing validators and data contracts

#### Visible text

```text
The recap slide warns:
- Reusing validators
- Don't reuse data contracts

It shows one validator with Register and EditPersonalInfo rule sets plus default rules. The nearby canvas note says using one StudentValidator for different endpoints can be a sign of CRUD-based interface rather than task-based API design.
```

#### Visible code

```csharp
public class StudentValidator : AbstractValidator<StudentDto> {
    public StudentValidator()
    {
        RuleSet("Register", () =>
        {
            RuleFor(x => x.Email).NotEmpty().Length(0, 150).EmailAddress();
        });
        RuleSet("EditPersonalInfo", () =>
        {
            // No separate rules for EditPersonalInfo API yet
        });
        RuleFor(x => x.Name).NotEmpty().Length(0, 200);
        RuleFor(x => x.Addresses).NotNull().SetValidator(new AddressesValidator());
    }
}
```

---

## 3. Cleaned source notes

- Named RuleSet blocks group rules for specific validation scenarios.
- Rules outside RuleSet blocks are default rules.
- IncludeRulesNotInRuleSet adds default rules alongside named rule sets.
- Too much validator reuse can indicate a CRUD-style DTO/API design problem.

---

## 4. Question hooks

- What is a default rule set?
- How do IncludeRuleSets and IncludeRulesNotInRuleSet combine?
- Why can reusing validators/data contracts be a design smell?
