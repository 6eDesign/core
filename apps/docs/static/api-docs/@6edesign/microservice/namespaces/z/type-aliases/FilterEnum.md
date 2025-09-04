[**Documentation**](../../../../../README.md)

***

[Documentation](../../../../../README.md) / [@6edesign/microservice](../../../README.md) / [](../../../README.md) / [z](../README.md) / FilterEnum

# Type Alias: FilterEnum&lt;Values, ToExclude&gt;

```ts
type FilterEnum<Values, ToExclude> = Values extends [] ? [] : Values extends [infer Head, ...(infer Rest)] ? Head extends ToExclude ? FilterEnum<Rest, ToExclude> : [Head, ...FilterEnum<Rest, ToExclude>] : never;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:758

## Type Parameters

### Values

`Values`

### ToExclude

`ToExclude`
