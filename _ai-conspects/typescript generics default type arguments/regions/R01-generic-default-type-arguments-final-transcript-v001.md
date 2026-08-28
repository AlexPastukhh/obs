# Final source-reconstructed transcript - TypeScript generic default type arguments

Generated: 2026-07-07

Source: `source/typescript generics default type arguments.svg`, local source screenshots, and Stage0 source inventory.

## Coverage

```text
Source screenshots: 2 / 2 visually checked from complete canvas preview
Status before this file: regional transcripts not started
```

## Core idea

TypeScript generic type parameters can have default values. If the caller does not provide a type argument, TypeScript uses the default.

Source example:

```typescript
type ApiResponse<Data = { status: number }> = {
  data: Data;
  isError: boolean;
}
```

Here `Data` defaults to:

```typescript
{ status: number }
```

## How it works

### Using the default

If no type argument is passed, `Data` becomes `{ status: number }`:

```typescript
// Using default: Data becomes { status: number }
type Response1 = ApiResponse;
// Response1 = { data: { status: number }; isError: boolean; }
```

### Providing a custom type

If a type argument is provided, it replaces the default:

```typescript
// Providing custom type: Data becomes string[]
type Response2 = ApiResponse<string[]>;
// Response2 = { data: string[]; isError: boolean; }
```

### Providing a custom object type

The type argument can also be an object type:

```typescript
// Providing custom object type
type Response3 = ApiResponse<{ user: string; age: number }>;
// Response3 = { data: { user: string; age: number }; isError: boolean; }
```

## Practical rule

Use generic defaults when a type has a common default shape but still needs to be customizable.

```text
ApiResponse              -> uses default Data
ApiResponse<string[]>    -> overrides Data with string[]
ApiResponse<MyDto>       -> overrides Data with MyDto
```
