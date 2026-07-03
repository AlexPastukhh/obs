# Route nesting — ASP.NET Core code patterns v002

## Pattern A — Course is independently addressable

### Canonical single-resource controller

```csharp
[ApiController]
[Route("api/courses")]
public sealed class CoursesController
    : ControllerBase
{
    [HttpGet("{courseId:guid}",
        Name = "GetCourse")]
    public async Task<IActionResult> GetCourse(
        Guid courseId)
    {
        var course = await _repository
            .GetCourseAsync(courseId);

        return course is null
            ? NotFound()
            : Ok(course);
    }

    [HttpPatch("{courseId:guid}")]
    public async Task<IActionResult> PatchCourse(
        Guid courseId,
        JsonPatchDocument<CourseUpdateDto> patch)
    {
        // Load by globally unique courseId,
        // authorize, validate, apply and save.
        return NoContent();
    }
}
```

### Parent-scoped collection controller

```csharp
[ApiController]
[Route(
    "api/authors/{authorId:guid}/courses")]
public sealed class AuthorCoursesController
    : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetForAuthor(
        Guid authorId)
    {
        if (!await _repository
                .AuthorExistsAsync(authorId))
        {
            return NotFound();
        }

        var courses = await _repository
            .GetCoursesForAuthorAsync(authorId);

        return Ok(courses);
    }

    [HttpPost]
    public async Task<IActionResult> CreateForAuthor(
        Guid authorId,
        CourseForCreationDto input)
    {
        var author = await _repository
            .GetAuthorAsync(authorId);

        if (author is null)
        {
            return NotFound();
        }

        if (!author.IsActive)
        {
            return Conflict(
                "Inactive author cannot receive courses.");
        }

        var course = CreateCourse(
            authorId,
            input);

        await _repository.AddCourseAsync(course);
        await _repository.SaveChangesAsync();

        // Independent Course: canonical Location is top-level.
        return CreatedAtRoute(
            "GetCourse",
            new { courseId = course.Id },
            course);
    }

    [HttpGet("{courseId:guid}",
        Name = "GetCourseForAuthor")]
    public async Task<IActionResult>
        GetForAuthor(
            Guid authorId,
            Guid courseId)
    {
        var course = await _repository
            .GetCourseForAuthorAsync(
                authorId,
                courseId);

        // Missing and wrong-parent are both 404.
        return course is null
            ? NotFound()
            : Ok(course);
    }
}
```

Important: `GetCourseForAuthorAsync(authorId, courseId)` should include both predicates in the query. Do not rely on the URL to enforce membership.

## Pattern B — Course is a true child

```csharp
[ApiController]
[Route(
    "api/authors/{authorId:guid}/courses")]
public sealed class ChildCoursesController
    : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Create(
        Guid authorId,
        CourseForCreationDto input)
    {
        var course = await _service
            .CreateChildCourseAsync(
                authorId,
                input);

        return CreatedAtRoute(
            "GetChildCourse",
            new
            {
                authorId,
                courseId = course.Id
            },
            course);
    }

    [HttpGet("{courseId:guid}",
        Name = "GetChildCourse")]
    public async Task<IActionResult> Get(
        Guid authorId,
        Guid courseId)
    {
        var course = await _repository
            .GetCourseForAuthorAsync(
                authorId,
                courseId);

        return course is null
            ? NotFound()
            : Ok(course);
    }
}
```

A separate convenience endpoint may call a global index while lifecycle-changing commands remain under the parent.

## Filtering the global collection

```csharp
[HttpGet]
public async Task<IActionResult> GetCourses(
    [FromQuery] Guid? authorId,
    [FromQuery] string? level)
{
    return Ok(await _repository.GetCoursesAsync(
        authorId,
        level));
}
```

Request:

```http
GET /api/courses?authorId=...&level=beginner
```

## Reparenting relationship

When Course is independent, model reassignment as a course command or relationship operation rather than changing its canonical URI:

```http
PUT /api/courses/{courseId}/author
```

```json
{
  "authorId": "..."
}
```

For many-to-many ownership, use a membership/relationship resource instead of pretending one parent is canonical.

## Failure policy

```text
404 -> missing child or child not in visible parent scope
403 -> caller knows resource exists but lacks permission
```

Select one policy intentionally and test that logs/telemetry can still distinguish internal causes without exposing them publicly.
