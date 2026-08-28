# Optional nested owned values and requiredness

Knowledge ID: `ef-core.optional-nested-owned-values-and-requiredness`

Topic: `ef-core`

CLR nullable annotations and EF navigation requiredness are related but separate contracts. Configure an optional owned reference explicitly where version/API support requires it; a nullable C# property alone is not always the complete relational mapping decision.

```csharp
builder.OwnsOne(x => x.Contact, contact =>
{
    contact.Property(x => x.Email).IsRequired();
});
builder.Navigation(x => x.Contact).IsRequired(false);
```

With same-table splitting, all-null owned columns often mean “the optional owned value is absent.” This becomes ambiguous for nesting: if outer `Contact` is optional, a required inner member cannot be enforced with a simple `NOT NULL`, because every column must allow null when the entire outer value is absent.

Choose an explicit existence model:

- add a required discriminator/existence scalar for an outer value and a check constraint tying inner columns to it;
- store the optional value in a separate table, where row existence represents presence and columns in an existing row can be `NOT NULL`;
- enforce conditional requiredness in domain/application validation and mirror it with a database check where possible.

```text
outer absent  -> all outer/inner columns null
outer present -> existence marker set -> required inner columns non-null
```

Private/backing fields can preserve aggregate APIs, but migrations and materialization behavior still need tests. Owned and newer complex-value mappings differ by EF version, so confirm optional nested behavior against the exact provider/version before relying on conventions.

## Sources

- Workspace: `_ai-conspects/owned entity/`
- Authoritative processed source: `06-full-combined-final-transcript.md`, R02, R04 and R05
- Original SVG: `source/owned entity.svg`
