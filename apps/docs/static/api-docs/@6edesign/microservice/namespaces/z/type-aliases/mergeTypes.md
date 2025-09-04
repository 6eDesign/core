[**Documentation**](../../../../../README.md)

***

[Documentation](../../../../../README.md) / [@6edesign/microservice](../../../README.md) / [](../../../README.md) / [z](../README.md) / mergeTypes

# Type Alias: mergeTypes&lt;A, B&gt;

```ts
type mergeTypes<A, B> = { [k in keyof A | keyof B]: k extends keyof B ? B[k] : k extends keyof A ? A[k] : never };
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:504

## Type Parameters

### A

`A`

### B

`B`
