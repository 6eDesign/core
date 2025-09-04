[**Documentation**](../../../../../README.md)

***

[Documentation](../../../../../README.md) / [@6edesign/microservice](../../../README.md) / [](../../../README.md) / [z](../README.md) / OuterTypeOfFunction

# Type Alias: OuterTypeOfFunction&lt;Args, Returns&gt;

```ts
type OuterTypeOfFunction<Args, Returns> = Args["_input"] extends any[] ? (...args) => Returns["_output"] : never;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:711

## Type Parameters

### Args

`Args` *extends* [`ZodTuple`](../classes/ZodTuple.md)&lt;`any`, `any`&gt;

### Returns

`Returns` *extends* [`ZodTypeAny`](ZodTypeAny.md)
