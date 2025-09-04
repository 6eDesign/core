[**Documentation**](../../../../../README.md)

***

[Documentation](../../../../../README.md) / [@6edesign/microservice](../../../README.md) / [](../../../README.md) / [z](../README.md) / effect

# Variable: effect()

```ts
const effect: <I>(schema, effect, params?) => ZodEffects<I, I["_output"]>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:1015

## Type Parameters

### I

`I` *extends* [`ZodTypeAny`](../type-aliases/ZodTypeAny.md)

## Parameters

### schema

`I`

### effect

[`Effect`](../type-aliases/Effect.md)&lt;`I`\[`"_output"`\]&gt;

### params?

[`RawCreateParams`](../type-aliases/RawCreateParams.md)

## Returns

[`ZodEffects`](../classes/ZodEffects.md)&lt;`I`, `I`\[`"_output"`\]&gt;
