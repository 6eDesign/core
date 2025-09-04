[**Documentation**](../../../../../../../README.md)

***

[Documentation](../../../../../../../README.md) / [@6edesign/microservice](../../../../../README.md) / [](../../../../../README.md) / [z](../../../README.md) / [util](../README.md) / Omit

# Type Alias: Omit&lt;T, K&gt;

```ts
type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/helpers/util.d.cts:7

## Type Parameters

### T

`T`

### K

`K` *extends* keyof `T`
