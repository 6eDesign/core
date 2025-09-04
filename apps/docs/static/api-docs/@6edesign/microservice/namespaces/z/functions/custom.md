[**Documentation**](../../../../../README.md)

***

[Documentation](../../../../../README.md) / [@6edesign/microservice](../../../README.md) / [](../../../README.md) / [z](../README.md) / custom

# Function: custom()

```ts
function custom<T>(
   check?, 
   _params?, 
   fatal?): Schema<T, ZodTypeDef, T>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:917

## Type Parameters

### T

`T`

## Parameters

### check?

(`data`) => `any`

### \_params?

`string` | `CustomParams` | (`input`) => `CustomParams`

### fatal?

`boolean`

**Deprecated**

Pass `fatal` into the params object instead:

```ts
z.string().custom((val) => val.length > 5, { fatal: false })
```

## Returns

[`Schema`](../classes/Schema.md)&lt;`T`, [`ZodTypeDef`](../interfaces/ZodTypeDef.md), `T`&gt;
