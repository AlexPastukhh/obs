# FV04 - Custom validators, reusable validation logic and validator dependencies

Conspect: `fluent-validation`  
File type: **source-preserving region transcript**  
Stage: **2 / NEXT01 verified transcript v001**  
Generated: 2026-06-02 15:10:00 UTC

---

## 0.1 Area overview / key ideas / reading quality

Key ideas:
- Inject repositories/DbContext abstractions into validators through constructor DI, not IServiceProvider when avoidable.
- Custom((value, context) => ...) can translate domain/value-object failures into FluentValidation failures.
- Reusable IRuleBuilder extension methods can encapsulate domain/value-object validation.
- Mapping domain error codes to field names keeps validation errors attached to correct request fields.

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
S-019, S-020, S-021, S-022, S-023, S-024, S-025
```

Boundary decision:
```text
FV04 covers validator dependencies, custom validation, domain error mapping, and reusable FluentValidation extension methods.
S-019 is a boundary correction from Stage1 candidate FV01 to verified FV04.
```

Pending after this region:
```text
none inside NEXT01; after transcript, final closure/audit remains
```

---

## 1. Source inventory

| Region source | Source | Image use | fileId | Subregion | Status | Cut off | Theme |
|---|---|---|---|---|---|---|---|
| FV04A-S001 | S-019 | IU-019 | `b9d146705a` | FV04A | `verified-from-source-image` | no | Inject dependencies into validators via constructor DI |
| FV04A-S002 | S-020 | IU-020 | `9e51d04491` | FV04A | `verified-visible-partial-from-source-image` | right/bottom crop | Validator using reusable value-object extension rules |
| FV04A-S003 | S-021 | IU-021 | `80f78c806b` | FV04A | `verified-visible-partial-from-source-image` | bottom continues | Mapping address error codes to field names |
| FV04B-S001 | S-022 | IU-022 | `295ee79335` | FV04B | `verified-visible-partial-from-source-image` | top context cropped | Custom rule with context.AddFailure for null address |
| FV04B-S002 | S-023 | IU-023 | `ee4c63ffcb` | FV04B | `verified-visible-partial-from-source-image` | top/bottom continuation | Custom rule creates domain Address and maps failures |
| FV04B-S003 | S-024 | IU-024 | `0ba701a2b1` | FV04B | `verified-visible-partial-from-source-image` | outer code cropped | Reusable MustBeValueObject extension |
| FV04B-S004 | S-025 | IU-025 | `180b747d40` | FV04B | `verified-visible-partial-from-source-image` | outer code cropped | Reusable MustBeFullName extension |

---

## 2. Verified source transcript

## 2.1 FV04A

### FV04A-S001 / S-019 - `b9d146705a`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Inject dependencies into validators via constructor DI

#### Visible text

```text
Boundary correction from Stage1 candidate FV01 to verified FV04: this screenshot is not regex/basic validation; it is about dependency injection inside validators.

The source recommends injecting the repository/DbContext, or an interface over it, into the validator through constructor DI. It says not to inject IServiceProvider as a service locator unless there is no alternative.

Reasons shown:
- constructor DI is type-safe and testable
- IServiceProvider hides dependencies, makes tests harder, and can cause lifetime issues
```

---

### FV04A-S002 / S-020 - `9e51d04491`

Metadata:
- status: `verified-visible-partial-from-source-image`
- readability: `high`
- cut off: `right/bottom crop`
- confidence: `high-for-visible-code`
- theme: Validator using reusable value-object extension rules

#### Visible text

```text
A validator class ProvideIndividualClientsDataDtoValidator derives from AbstractValidator<ProvideIndividualClientsDataDto>. In the constructor, it uses custom/reusable extension methods:
- MustBeValueObject for PhoneNumber
- MustBeFullName for FullNameDto

This shows a pattern where FluentValidation rules delegate to domain/value-object creation rules.
```

#### Visible code

```csharp
public class ProvideIndividualClientsDataDtoValidator
    : AbstractValidator<ProvideIndividualClientsDataDto>
{
    public ProvideIndividualClientsDataDtoValidator()
    {
        RuleFor(dto => dto.PhoneNumber).MustBeValueObject(
            PhoneNumber.Create,
            SharedConst.ProvideIndividualClientsData.PhoneFieldName);

        RuleFor(dto => dto.FullNameDto)
            .MustBeFullName(SharedConst.ProvideIndividualClientsData.FullNameFieldName);
    }
}
```

---

### FV04A-S003 / S-021 - `80f78c806b`

Metadata:
- status: `verified-visible-partial-from-source-image`
- readability: `high`
- cut off: `bottom continues`
- confidence: `high-for-visible-part`
- theme: Mapping address error codes to field names

#### Visible text

```text
Helper method maps address error codes to request field names. This is part of converting domain validation errors into FluentValidation failures targeted at the correct field.
```

#### Visible code

```csharp
private string _mapAddressErrorToName(string errorCode)
{
    if (errorCode == Errors.AddressErrors.PostalCodeIsRequired.Code)
    {
        return SharedConst.IndividualRequestCnsts.PostalCodeFieldName;
    }
    if (errorCode == Errors.AddressErrors.RegionIsRequired.Code)
    {
        return SharedConst.IndividualRequestCnsts.RegionFieldName;
    }
    if (errorCode == Errors.AddressErrors.CityIsRequired.Code)
    {
        // continues...
    }
}
```

---

## 2.2 FV04B

### FV04B-S001 / S-022 - `295ee79335`

Metadata:
- status: `verified-visible-partial-from-source-image`
- readability: `high`
- cut off: `top context cropped`
- confidence: `high-for-visible-code`
- theme: Custom rule with context.AddFailure for null address

#### Visible text

```text
Custom validation rule for Address. It uses Custom((address, context) => ...) and adds a failure when address is null. The failure uses a shared field name and a domain error code.
```

#### Visible code

```csharp
RuleFor(dto => dto.Address)
    .Custom((address, context) =>
    {
        if (address is null)
        {
            context.AddFailure(
                SharedConst.IndividualRequestCnsts.AddressFieldName,
                Errors.AddressErrors.AddressIsRequired.Code);
        }
    });
```

---

### FV04B-S002 / S-023 - `ee4c63ffcb`

Metadata:
- status: `verified-visible-partial-from-source-image`
- readability: `high`
- cut off: `top/bottom continuation`
- confidence: `high-for-visible-code`
- theme: Custom rule creates domain Address and maps failures

#### Visible text

```text
Continuation of a CreateIndividualRequestDtoValidator. If the address DTO is not null, it tries to create a domain Address value/object. If creation fails, it iterates domain errors and calls context.AddFailure with a mapped field name and error code.
```

#### Visible code

```csharp
if (address != null)
{
    var createAddress = Address.Create(
        address.PostalCode,
        address.Region,
        address.City,
        address.Street,
        address.House,
        address.Building,
        address.Apartment);

    if (createAddress.IsFailure)
    {
        foreach (var error in createAddress.Error)
        {
            context.AddFailure(
                _mapAddressErrorToName(error.Code),
                error.Code);
        }
    }
}
```

---

### FV04B-S003 / S-024 - `0ba701a2b1`

Metadata:
- status: `verified-visible-partial-from-source-image`
- readability: `high`
- cut off: `outer code cropped`
- confidence: `high-for-visible-code`
- theme: Reusable MustBeValueObject extension

#### Visible text

```text
A reusable extension method MustBeValueObject<TDto,TValueObject> adds a Custom validator. It invokes a factory, and if the result is failure, it adds failures to the validation context.
```

#### Visible code

```csharp
public static IRuleBuilder<TDto, string>
    MustBeValueObject<TDto, TValueObject>(
        this IRuleBuilder<TDto, string> builder,
        Func<string, Result<TValueObject, IReadOnlyList<Error>>> factory,
        string mapErrorToName)
    where TDto : class
{
    return builder.Custom((str, context) =>
    {
        var result = factory.Invoke(str);
        if (result.IsFailure)
        {
            foreach (var error in result.Error)
            {
                context.AddFailure(mapErrorToName, error.Code);
            }
        }
    });
}
```

---

### FV04B-S004 / S-025 - `180b747d40`

Metadata:
- status: `verified-visible-partial-from-source-image`
- readability: `high`
- cut off: `outer code cropped`
- confidence: `high-for-visible-code`
- theme: Reusable MustBeFullName extension

#### Visible text

```text
A reusable extension method MustBeFullName<TDto> accepts an IRuleBuilder for FullNameDto and maps FullName.Create domain failures into context.AddFailure calls.
```

#### Visible code

```csharp
public static IRuleBuilder<TDto, FullNameDto>
    MustBeFullName<TDto>(
        this IRuleBuilder<TDto, FullNameDto> builder,
        string mapErrorToName)
where TDto : class
{
    return builder.Custom((dto, context) =>
    {
        var result = FullName.Create(dto.FirstName, dto.MiddleName, dto.LastName);
        if (result.IsFailure)
        {
            foreach (var error in result.Error)
            {
                context.AddFailure(mapErrorToName, error.Code);
            }
        }
    });
}
```

---

## 3. Cleaned source notes

- Constructor DI is preferred for dependencies inside validators.
- Custom validators can bridge domain value-object errors to FluentValidation failures.
- Reusable extension methods keep validator constructors cleaner.
- Avoid IServiceProvider/service-locator style unless there is no good alternative.

---

## 4. Question hooks

- Why inject a repository/DbContext abstraction directly instead of IServiceProvider?
- How does Custom add failures to specific fields?
- How do reusable IRuleBuilder extensions encapsulate domain validation?
