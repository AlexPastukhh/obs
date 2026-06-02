# FV05 - Inheritance validation

Conspect: `fluent-validation`  
File type: **source-preserving region transcript**  
Stage: **2 / NEXT01 verified transcript v001**  
Generated: 2026-06-02 15:10:00 UTC

---

## 0.1 Area overview / key ideas / reading quality

Key ideas:
- SetInheritanceValidator configures different validators for derived DTO/domain types.
- This is useful for polymorphic validation.
- The recap marks it as applicable to domain-class-style hierarchies.

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
S-026, S-027, S-032
```

Boundary decision:
```text
FV05 covers inheritance validation and SetInheritanceValidator.
```

Pending after this region:
```text
none inside NEXT01; after transcript, final closure/audit remains
```

---

## 1. Source inventory

| Region source | Source | Image use | fileId | Subregion | Status | Cut off | Theme |
|---|---|---|---|---|---|---|---|
| FV05A-S001 | S-026 | IU-026 | `3289b8bda8` | FV05A | `verified-from-source-image` | no | Demo: inheritance validation |
| FV05A-S002 | S-027 | IU-027 | `44f32126f6` | FV05A | `verified-from-source-image` | no | Base and derived phone DTO types |
| FV05B-S001 | S-032 | IU-032 | `22668a8110` | FV05B | `verified-from-source-image` | no | Recap: SetInheritanceValidator |

---

## 2. Verified source transcript

## 2.1 FV05A

### FV05A-S001 / S-026 - `3289b8bda8`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Demo: inheritance validation

#### Visible text

```text
Demo slide: Inheritance validation.
```

---

### FV05A-S002 / S-027 - `44f32126f6`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Base and derived phone DTO types

#### Visible text

```text
The source defines a RegisterRequest with Name, Email, Phone, and Addresses. Phone is typed as PhoneNumberDto, with concrete derived classes USPhoneNumberDto and InternationalPhoneNumberDto.
```

#### Visible code

```csharp
public class RegisterRequest
{
    public string Name { get; set; }
    public string Email { get; set; }
    public PhoneNumberDto Phone { get; set; }
    public AddressDto[] Addresses { get; set; }
}

public abstract class PhoneNumberDto
{
    public string Number { get; set; }
}

public class USPhoneNumberDto : PhoneNumberDto
{
}

public class InternationalPhoneNumberDto : PhoneNumberDto
{
}
```

---

## 2.2 FV05B

### FV05B-S001 / S-032 - `22668a8110`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Recap: SetInheritanceValidator

#### Visible text

```text
Recap: Inheritance Validation.

SetInheritanceValidator configures polymorphic validation for a base property. The example adds separate validators for USPhoneNumberDto and InternationalPhoneNumberDto.

The slide marks this as:
- good for setting up rules polymorphically
- only applicable to domain classes
```

#### Visible code

```csharp
public abstract class PhoneNumberDto {
    public string Number { get; set; }
}
public class USPhoneNumberDto : PhoneNumberDto {}
public class InternationalPhoneNumberDto : PhoneNumberDto {}

RuleFor(x => x.Phone).SetInheritanceValidator(x =>
{
    x.Add<USPhoneNumberDto>(new USPhoneNumberValidator());
    x.Add<InternationalPhoneNumberDto>(new InternationalPhoneNumberValidator());
});
```

---

## 3. Cleaned source notes

- SetInheritanceValidator maps derived runtime types to their validators.
- It is useful for polymorphic validation.
- Use it for class hierarchies where the base property can contain derived objects.

---

## 4. Question hooks

- When do you use SetInheritanceValidator?
- What validators are registered for US and international phone DTOs?
- Why is this a polymorphic validation pattern?
