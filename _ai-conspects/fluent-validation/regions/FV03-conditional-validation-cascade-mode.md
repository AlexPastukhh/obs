# FV03 - Conditional validation, dependent rules and cascade mode

Conspect: `fluent-validation`  
File type: **source-preserving region transcript**  
Stage: **2 / NEXT01 verified transcript v001**  
Generated: 2026-06-02 15:10:00 UTC

---

## 0.1 Area overview / key ideas / reading quality

Key ideas:
- Conditional validation is useful when only one of email or phone is required.
- A naive condition can skip validation of an invalid present field.
- A safer pattern separates presence rules from format rules.
- CascadeMode.Stop can apply inside a rule chain or, at class level, between rule chains.

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
S-007, S-008, S-009, S-010, S-011, S-012
```

Boundary decision:
```text
FV03 covers conditional validation for email/phone and cascade mode.
```

Pending after this region:
```text
none inside NEXT01; after transcript, final closure/audit remains
```

---

## 1. Source inventory

| Region source | Source | Image use | fileId | Subregion | Status | Cut off | Theme |
|---|---|---|---|---|---|---|---|
| FV03A-S001 | S-007 | IU-007 | `e92c885480` | FV03A | `verified-from-source-image` | no | Conditional validation concept |
| FV03A-S002 | S-008 | IU-008 | `4578130756` | FV03A | `verified-from-source-image` | no | Conditional email/phone rules |
| FV03A-S003 | S-009 | IU-009 | `57caf514a8` | FV03A | `verified-from-source-image` | no | Phone present but not valid can still pass in weak conditional approach |
| FV03A-S004 | S-010 | IU-010 | `0ee88add0e` | FV03A | `verified-from-source-image` | no | Otherwise pattern for either email or phone |
| FV03A-S005 | S-011 | IU-011 | `246c92ff2a` | FV03A | `verified-from-source-image` | no | Separate presence and format rules |
| FV03B-S001 | S-012 | IU-012 | `54259fe134` | FV03B | `verified-visible-partial-from-source-image` | bottom video-control overlay | Cascade mode recap |

---

## 2. Verified source transcript

## 2.1 FV03A

### FV03A-S001 / S-007 - `e92c885480`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Conditional validation concept

#### Visible text

```text
Conditional Validation.

The slide shows a “Contact method” that can be either phone number or email address. The visible note says the user can indicate just one method. This introduces validation that depends on the presence/absence of another property.
```

---

### FV03A-S002 / S-008 - `4578130756`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Conditional email/phone rules

#### Visible text

```text
The first conditional approach:
- Email is validated only when Phone is null.
- Phone is validated only when Email is null.

This can support “provide at least one contact method”, but it has edge cases when both are present or one is invalid.
```

#### Visible code

```csharp
RuleFor(x => x.Email)
    .NotEmpty()
    .Length(0, 150)
    .EmailAddress()
    .When(x => x.Phone == null);

RuleFor(x => x.Phone)
    .NotEmpty()
    .Matches("^[2-9][0-9]{9}$")
    .When(x => x.Email == null);
```

---

### FV03A-S003 / S-009 - `57caf514a8`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Phone present but not valid can still pass in weak conditional approach

#### Visible text

```text
The request example includes both email and a phone number. The status is 200 OK. The nearby canvas note says the phone is checked only when email is null, so an invalid phone can pass if email exists. This demonstrates the weakness of the naive conditional rule.
```

#### Visible code

```csharp
{
  "email": "carl@gmail.com",
  "phone": "2021234567",
  "name": "Carl Carlson",
  "addresses": [{
    "street": "3456 3rd St",
    "city": "Carlington",
    "state": "VA",
    "zipCode": "22203"
  }]
}
```

---

### FV03A-S004 / S-010 - `0ee88add0e`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Otherwise pattern for either email or phone

#### Visible text

```text
This pattern uses When(...).Otherwise(...):
- If Email is not null, validate Email and require Phone to be null.
- Otherwise validate Phone and require Email to be null.

It represents an exclusive “only one contact method” approach.
```

#### Visible code

```csharp
When(x => x.Email != null, () =>
{
    RuleFor(x => x.Email)
        .NotEmpty()
        .Length(0, 150)
        .EmailAddress();

    RuleFor(x => x.Phone).Null();
}).Otherwise(() =>
{
    RuleFor(x => x.Phone)
        .NotEmpty()
        .Matches("^[2-9][0-9]{9}$");

    RuleFor(x => x.Email).Null();
});
```

---

### FV03A-S005 / S-011 - `246c92ff2a`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Separate presence and format rules

#### Visible text

```text
The source shows a more robust split:
- if Email is null, Phone must be not empty
- if Phone is null, Email must be not empty
- if Email is present, validate email format/length
- if Phone is present, validate phone format

This avoids validating only one side and lets each present contact method be checked.
```

#### Visible code

```csharp
When(x => x.Email == null, () =>
{
    RuleFor(x => x.Phone).NotEmpty();
});
When(x => x.Phone == null, () =>
{
    RuleFor(x => x.Email).NotEmpty();
});

RuleFor(x => x.Email)
    .NotEmpty()
    .Length(0, 150)
    .EmailAddress()
    .When(x => x.Email != null);

RuleFor(x => x.Phone)
    .NotEmpty()
    .Matches("^[2-9][0-9]{9}$")
    .When(x => x.Phone != null);
```

---

## 2.2 FV03B

### FV03B-S001 / S-012 - `54259fe134`

Metadata:
- status: `verified-visible-partial-from-source-image`
- readability: `high`
- cut off: `bottom video-control overlay`
- confidence: `high-for-visible-part`
- theme: Cascade mode recap

#### Visible text

```text
Recap: Changing the Cascade Mode.

The slide distinguishes:
- Rule-level Cascade(CascadeMode.Stop): stops validation inside the rule chain.
- Class-level CascadeMode = CascadeMode.Stop: stops validation both inside and between rule chains.

The lower code is partly obscured by video controls, but the visible part shows CascadeMode = CascadeMode.Stop before multiple RuleFor chains.
```

#### Visible code

```csharp
RuleFor(x => x.Email)
    .Cascade(CascadeMode.Stop)
    .NotEmpty()
    .Length(1, 150);

// class-level example:
CascadeMode = CascadeMode.Stop;
RuleFor(x => x.Email).NotEmpty().Length(0, 150).EmailAddress();
RuleFor(x => x.Phone).NotEmpty().Matches("^[2-9][0-9]{9}$");
```

---

## 3. Cleaned source notes

- Naive conditional validation can skip validation of an invalid present value.
- Separate presence rules from format rules when email/phone is optional but any present value must be valid.
- Cascade mode can stop inside a chain or between chains depending on where it is configured.

---

## 4. Question hooks

- Why can naive email/phone conditional validation accept an invalid phone?
- How do presence rules differ from format rules?
- What is the difference between rule-level and class-level cascade stop?
