[**Documentation**](../../../../../README.md)

***

[Documentation](../../../../../README.md) / [@6edesign/microservice](../../../README.md) / [](../../../README.md) / [z](../README.md) / ZodTupleDef

# Interface: ZodTupleDef&lt;T, Rest&gt;

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:648

## Extends

- [`ZodTypeDef`](ZodTypeDef.md)

## Type Parameters

### T

`T` *extends* [`ZodTupleItems`](../type-aliases/ZodTupleItems.md) \| \[\] = [`ZodTupleItems`](../type-aliases/ZodTupleItems.md)

### Rest

`Rest` *extends* [`ZodTypeAny`](../type-aliases/ZodTypeAny.md) \| `null` = `null`

## Properties

### description?

```ts
optional description: string;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:24

#### Inherited from

[`ZodTypeDef`](ZodTypeDef.md).[`description`](ZodTypeDef.md#description)

***

### errorMap?

```ts
optional errorMap: ZodErrorMap;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:23

#### Inherited from

[`ZodTypeDef`](ZodTypeDef.md).[`errorMap`](ZodTypeDef.md#errormap)

***

### items

```ts
items: T;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:649

***

### openapi?

```ts
optional openapi: ZodOpenApiFullMetadata<any>;
```

Defined in: node\_modules/.pnpm/@asteasolutions+zod-to-openapi@6.4.0\_zod@3.25.76/node\_modules/@asteasolutions/zod-to-openapi/dist/zod-extensions.d.ts:28

#### Inherited from

```ts
ZodTypeDef.openapi
```

***

### rest

```ts
rest: Rest;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:650

***

### typeName

```ts
typeName: ZodTuple;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:651
