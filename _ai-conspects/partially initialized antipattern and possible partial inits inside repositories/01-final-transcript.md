# Final transcript — partially initialized antipattern and possible partial inits inside repositories

## 0.1 Area overview / reading quality

This conspect explains a common DDD/repository design trap: returning a domain entity that looks fully usable even though only some of its state was loaded. The main distinction is not “partial data is always bad”; the distinction is whether the returned object is a projection/read model or a behavior-bearing aggregate expected to preserve invariants.

Reading quality is high. The screenshots are legible and the source SVG plus extracted images remain preserved for exact code wording.

## 1. Core rule

A repository may return partial data safely when it returns an explicitly limited shape:

- DTO;
- anonymous projection;
- read model;
- custom query result.

That is a normal projection. The caller knows the object is not a full domain aggregate.

The anti-pattern appears when a repository returns a domain entity such as `Student`, `Order`, or `Customer` while silently loading only a subset of the data needed to keep the entity valid. Such an object can:

- expose behavior that assumes missing state exists;
- violate invariants;
- mislead future maintainers;
- remain “partially valid” and fail only when some method is called later;
- blur the difference between a query projection and an aggregate root.

## 2. Why constructors are not enough

A constructor does not automatically solve the problem if the persistence framework materializes entities in ways that bypass or reconstruct state differently. The conspect raises the EF materialization caveat directly: constructor logic may not be the complete guarantee people assume.

Even when constructors run, a repository can still create danger by calling an alternate constructor, private constructor, reflection-based materialization, or by setting only some fields after construction. The safe design must therefore be enforced by the repository contract and the aggregate's API—not only by hoping the constructor prevents misuse.

## 3. Repository design guidance

Good repository APIs make partial loading explicit. Preferred approaches include:

- returning a DTO/read model for query scenarios;
- exposing methods whose names reveal the limited shape, such as a summary or lightweight view;
- using a dedicated query service or CQRS-style read side;
- loading the full aggregate before invoking domain behavior;
- preventing incomplete aggregates from escaping the repository boundary.

Bad APIs return an aggregate while quietly omitting required state, because callers cannot know which operations are safe.

## 4. Practical examples

Safe examples:

- `GetStudentSummary(...)` returns a summary object;
- a query returns only `Course` and `Grade` into a read model;
- a projection is clearly named and never exposes domain behavior.

Dangerous example:

- returning a `Student` aggregate with only a few fields populated while methods like enrollment, eligibility, or invariant checks remain callable.

## 5. Bottom line

The problem is not partial selection itself. The problem is pretending a partial selection is a fully initialized domain object. Keep projections as projections, aggregates as aggregates, and make repository contracts explicit. If a use case only needs some fields, return a read model. If domain behavior is required, load enough state to preserve invariants.