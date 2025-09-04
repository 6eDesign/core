[**Documentation**](../../../../../../../README.md)

***

[Documentation](../../../../../../../README.md) / [@6edesign/microservice](../../../../../README.md) / [](../../../../../README.md) / [z](../../../README.md) / [util](../README.md) / MakePartial

# Type Alias: MakePartial&lt;T, K&gt;

```ts
type MakePartial<T, K> = Omit<T, K> & Partial<Pick<T, K>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/helpers/util.d.cts:9

## Type Parameters

### T

`T`

### K

`K` *extends* keyof `T`
