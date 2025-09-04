[**Documentation**](../../../../../README.md)

***

[Documentation](../../../../../README.md) / [@6edesign/microservice](../../../README.md) / [](../../../README.md) / [z](../README.md) / typeToFlattenedError

# Type Alias: typeToFlattenedError&lt;T, U&gt;

```ts
type typeToFlattenedError<T, U> = object;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/ZodError.d.cts:6

## Type Parameters

### T

`T`

### U

`U` = `string`

## Properties

### fieldErrors

```ts
fieldErrors: { [P in allKeys<T>]?: U[] };
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/ZodError.d.cts:8

***

### formErrors

```ts
formErrors: U[];
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/ZodError.d.cts:7
