[**Documentation**](../../../../../README.md)

***

[Documentation](../../../../../README.md) / [@6edesign/microservice](../../../README.md) / [](../../../README.md) / [z](../README.md) / InputTypeOfTuple

# Type Alias: InputTypeOfTuple&lt;T&gt;

```ts
type InputTypeOfTuple<T> = AssertArray<{ [k in keyof T]: T[k] extends Schema<any, any, any> ? T[k]["_input"] : never }>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:644

## Type Parameters

### T

`T` *extends* [`ZodTupleItems`](ZodTupleItems.md) \| \[\]
