[**Documentation**](../../../../../README.md)

***

[Documentation](../../../../../README.md) / [@6edesign/microservice](../../../README.md) / [](../../../README.md) / [z](../README.md) / arrayOutputType

# Type Alias: arrayOutputType&lt;T, Cardinality&gt;

```ts
type arrayOutputType<T, Cardinality> = Cardinality extends "atleastone" ? [T["_output"], ...T["_output"][]] : T["_output"][];
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:486

## Type Parameters

### T

`T` *extends* [`ZodTypeAny`](ZodTypeAny.md)

### Cardinality

`Cardinality` *extends* [`ArrayCardinality`](ArrayCardinality.md) = `"many"`
