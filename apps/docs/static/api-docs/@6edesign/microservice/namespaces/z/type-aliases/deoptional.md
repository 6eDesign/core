[**Documentation**](../../../../../README.md)

***

[Documentation](../../../../../README.md) / [@6edesign/microservice](../../../README.md) / [](../../../README.md) / [z](../README.md) / deoptional

# Type Alias: deoptional&lt;T&gt;

```ts
type deoptional<T> = T extends ZodOptional<infer U> ? deoptional<U> : T extends ZodNullable<infer U> ? ZodNullable<deoptional<U>> : T;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:524

## Type Parameters

### T

`T` *extends* [`ZodTypeAny`](ZodTypeAny.md)
