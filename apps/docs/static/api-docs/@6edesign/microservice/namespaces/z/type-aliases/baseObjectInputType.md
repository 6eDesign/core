[**Documentation**](../../../../../README.md)

***

[Documentation](../../../../../README.md) / [@6edesign/microservice](../../../README.md) / [](../../../README.md) / [z](../README.md) / baseObjectInputType

# Type Alias: baseObjectInputType&lt;Shape&gt;

```ts
type baseObjectInputType<Shape> = addQuestionMarks<{ [k in keyof Shape]: Shape[k]["_input"] }>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:512

## Type Parameters

### Shape

`Shape` *extends* [`ZodRawShape`](ZodRawShape.md)
