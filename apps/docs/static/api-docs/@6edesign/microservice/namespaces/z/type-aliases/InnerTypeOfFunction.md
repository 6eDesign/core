[**Documentation**](../../../../../README.md)

***

[Documentation](../../../../../README.md) / [@6edesign/microservice](../../../README.md) / [](../../../README.md) / [z](../README.md) / InnerTypeOfFunction

# Type Alias: InnerTypeOfFunction&lt;Args, Returns&gt;

```ts
type InnerTypeOfFunction<Args, Returns> = Args["_output"] extends any[] ? (...args) => Returns["_input"] : never;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:712

## Type Parameters

### Args

`Args` *extends* [`ZodTuple`](../classes/ZodTuple.md)&lt;`any`, `any`&gt;

### Returns

`Returns` *extends* [`ZodTypeAny`](ZodTypeAny.md)
