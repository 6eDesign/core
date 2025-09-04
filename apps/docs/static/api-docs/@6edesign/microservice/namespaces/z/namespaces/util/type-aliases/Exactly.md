[**Documentation**](../../../../../../../README.md)

***

[Documentation](../../../../../../../README.md) / [@6edesign/microservice](../../../../../README.md) / [](../../../../../README.md) / [z](../../../README.md) / [util](../README.md) / Exactly

# Type Alias: Exactly&lt;T, X&gt;

```ts
type Exactly<T, X> = T & Record<Exclude<keyof X, keyof T>, never>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/helpers/util.d.cts:10

## Type Parameters

### T

`T`

### X

`X`
