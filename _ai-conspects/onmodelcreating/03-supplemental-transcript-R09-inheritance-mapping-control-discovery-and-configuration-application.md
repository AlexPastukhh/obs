# Supplemental screenshot transcript — R09: Inheritance mapping control, discovery and applying configurations

Conspect: `onmodelcreating`  
Generated: 2026-06-27 02:00:00 UTC

## Coverage

```text
region: R09
image uses reviewed: 19
unique screenshots represented: 19
duplicate placements retained: 0
remaining image uses in region: 0
```

## Semantic transcript

This region explains how EF discovers hierarchies and relationships, how to detach a CLR type from mapped inheritance, and how configuration discovery can accidentally bring a type into the model.

## Default inheritance discovery

- When mapped CLR types have a base/derived relationship, EF Core normally maps them as one inheritance hierarchy, using TPH unless another strategy is selected.
- The discriminator is a shadow property by default and discriminator values commonly derive from entity-type names unless configured.
- Registering only a base type does not automatically map every possible CLR-derived type; each entity type still needs to enter the model through discovery or explicit registration.

## HasBaseType and removing inheritance

- `HasBaseType` explicitly controls the EF model hierarchy.
- `HasBaseType((Type?)null)` detaches an entity type from the mapped base, allowing separate persistence even when the CLR classes still share inheritance.
- This is useful when inheritance exists for domain-code reuse but the database aggregates or lifecycle models are independent.
- After detaching, inherited CLR properties may need explicit mapping because EF no longer obtains them through the mapped hierarchy.

## Different persisted models for similar CLR shapes

- Domain inheritance does not force identical persistence inheritance.
- Different entities that share a CLR base can be mapped independently when they belong to different modules, lifecycles or database schemas.
- Shared base members can also be represented through owned types, interfaces or duplicated explicit configuration when that better matches persistence boundaries.

## How types enter the model

- `DbSet<T>` properties, relationship/navigation discovery and explicit `Entity<T>` calls can add entity types.
- A navigation to a derived type can accidentally introduce that type and therefore affect hierarchy mapping.
- An explicit relationship configuration can bring a referenced entity into the model even without a `DbSet<T>`.
- `ApplyConfiguration` maps the entity targeted by the configuration class.
- `ApplyConfigurationsFromAssembly` scans and applies every matching configuration, so accidental configurations can add unexpected entity types.
- Shared-type entity configuration uses a name plus a CLR type and must be introduced deliberately.

## Caveats

- Inspect the final model when assembly scanning or navigation discovery appears to create an unexpected hierarchy.
- CLR inheritance, aggregate boundaries and relational inheritance are related design choices but are not the same thing.

## Nearby SVG labels used for orientation

- things that can map shared base class
- when to use hasbasetype(type null)
- !!!
- default tph behavior, discriminator
- dbset
- rel/navigation discovery
- how to say this entity shouldnt
- be part of inheritance
- has... configurations
- changing from tph to independent tables
- applyconfiguration
- in c# you have some domain inheritance for
- buisness rules, but you dont want to persist
- with this hierarchy
- shared type entity config
- apply config from ass

## Covered screenshot uses

```text
IU-198, IU-199, IU-200, IU-201, IU-202, IU-203, IU-204, IU-205, IU-206, IU-207, IU-208, IU-209, IU-210, IU-211
IU-212, IU-213, IU-214, IU-215, IU-216
```

## Audit note

Every listed use is closed in `data/supplemental-image-uses-v002-closed.*`.
Exact punctuation and provider-specific code remain governed by the recovered screenshots and complete SVG under `source/`.
