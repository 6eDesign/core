[**Documentation**](../../../../../README.md)

***

[Documentation](../../../../../README.md) / [@6edesign/microservice](../../../README.md) / [](../../../README.md) / [z](../README.md) / InputTypeOfTupleWithRest

# Type Alias: InputTypeOfTupleWithRest&lt;T, Rest&gt;

```ts
type InputTypeOfTupleWithRest<T, Rest> = Rest extends ZodTypeAny ? [...InputTypeOfTuple<T>, ...Rest["_input"][]] : InputTypeOfTuple<T>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:647

## Type Parameters

### T

`T` *extends* [`ZodTupleItems`](ZodTupleItems.md) \| \[\]

### Rest

`Rest` *extends* [`ZodTypeAny`](ZodTypeAny.md) \| `null` = `null`
