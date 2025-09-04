[**Documentation**](../../../../../../../README.md)

***

[Documentation](../../../../../../../README.md) / [@6edesign/microservice](../../../../../README.md) / [](../../../../../README.md) / [z](../../../README.md) / [objectUtil](../README.md) / noNever

# Type Alias: noNever&lt;T&gt;

```ts
type noNever<T> = identity<{ [k in noNeverKeys<T>]: k extends keyof T ? T[k] : never }>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/helpers/util.d.cts:51

## Type Parameters

### T

`T`
