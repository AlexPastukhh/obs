# IVALIDATABLE OBJECT, VALIDATION ATTRIBUTES — final coverage transcript v001

Source SVG: `IVALIDATABLE OBJECT, VALIDATION ATTRIBUTES.svg`  
Conspect folder: `IVALIDATABLE OBJECT, VALIDATION ATTRIBUTES`  
Stage: combined final coverage transcript

## 0.1 Area overview / understanding / reading quality

This conspect compares two ways to express cross-property model validation with DataAnnotations and ASP.NET Core ModelState: implementing `IValidatableObject` directly on the model and creating a reusable class-level `ValidationAttribute`. The screenshots and code are readable; exact punctuation remains preserved in the source images.

## R01 — IValidatableObject class-level validation

Implement `IValidatableObject` when validation belongs naturally to one model and needs to inspect several of its properties together.

```csharp
public abstract class CourseFormManipulationDto : IValidatableObject
{
    [Required(ErrorMessage = "You should fill out a title.")]
    [MaxLength(100)]
    public string? Title { get; set; }

    [MaxLength(1500)]
    public string? Description { get; set; }

    public IEnumerable<ValidationResult> Validate(
        ValidationContext validationContext)
    {
        if (!string.IsNullOrWhiteSpace(Title)
            && !string.IsNullOrWhiteSpace(Description)
            && string.Equals(
                Title,
                Description,
                StringComparison.OrdinalIgnoreCase))
        {
            yield return new ValidationResult(
                "The provided description should be different from the title.",
                new[] { nameof(Description) });
        }
    }
}
```

ASP.NET Core model validation adds the returned `ValidationResult` objects to `ModelState`. `MemberNames` controls which field receives the error; omitting member names produces a model-level error.

DataAnnotation property attributes are evaluated before `IValidatableObject.Validate`. The class-level callback is intended for a model whose property-level validation has succeeded, so do not rely on it to repair or duplicate `[Required]`, `[StringLength]`, or similar property failures.

Use this option when:

```text
- the rule is specific to this model;
- the model owns the rule;
- multiple properties must be compared;
- reuse through an attribute is unnecessary.
```

## R02 — Reusable class-level ValidationAttribute

A custom class-level attribute is useful when the same declarative rule should be applied to several model types or when attribute-based configuration is preferred.

```csharp
[AttributeUsage(AttributeTargets.Class, AllowMultiple = false)]
public sealed class TitleMustBeDifferentFromDescriptionAttribute
    : ValidationAttribute
{
    protected override ValidationResult? IsValid(
        object? value,
        ValidationContext validationContext)
    {
        if (validationContext.ObjectInstance
            is not CourseFormManipulationDto dto)
        {
            throw new InvalidOperationException(
                $"{nameof(TitleMustBeDifferentFromDescriptionAttribute)} " +
                $"must be applied to {nameof(CourseFormManipulationDto)}.");
        }

        if (!string.IsNullOrWhiteSpace(dto.Title)
            && !string.IsNullOrWhiteSpace(dto.Description)
            && string.Equals(
                dto.Title,
                dto.Description,
                StringComparison.OrdinalIgnoreCase))
        {
            return new ValidationResult(
                "The provided description should be different from the title.",
                new[] { nameof(CourseFormManipulationDto.Description) });
        }

        return ValidationResult.Success;
    }
}
```

Apply it to the class:

```csharp
[TitleMustBeDifferentFromDescription]
public abstract class CourseFormManipulationDto
{
    // properties
}
```

`ValidationContext.ObjectInstance` provides the complete model being validated. The `value` argument also represents the class-level value, but using the context makes the intended model access explicit.

A reusable attribute should either be generic enough for its supported targets or clearly reject an incompatible type. Avoid database calls, network calls, and expensive business workflows in validation attributes; such rules belong in application/domain services where dependencies, cancellation, and error handling are explicit.

## Choosing between the two

```text
IValidatableObject
- fastest to add for one model;
- rule lives beside the properties;
- no custom attribute type required.

Class-level ValidationAttribute
- reusable and declarative;
- can be applied to multiple model classes;
- separates validation behavior from the DTO.
```

Both mechanisms feed `ValidationResult` into the same ASP.NET Core ModelState pipeline. Neither replaces authorization or deeper domain invariants.

## Coverage

```text
R01: 3 image uses / 2 text labels
R02: 4 image uses / 0 text labels
Remaining unclosed image uses: 0
Remaining unclosed text labels: 0
```
