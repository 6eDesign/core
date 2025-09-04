[**Documentation**](../../../../../README.md)

***

[Documentation](../../../../../README.md) / [@6edesign/microservice](../../../README.md) / [](../../../README.md) / [z](../README.md) / ZodCatchDef

# Interface: ZodCatchDef&lt;T&gt;

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:856

## Extends

- [`ZodTypeDef`](ZodTypeDef.md)

## Type Parameters

### T

`T` *extends* [`ZodTypeAny`](../type-aliases/ZodTypeAny.md) = [`ZodTypeAny`](../type-aliases/ZodTypeAny.md)

## Properties

### catchValue()

```ts
catchValue: (ctx) => T["_input"];
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:858

#### Parameters

##### ctx

###### error

[`ZodError`](../classes/ZodError.md)

###### input

`unknown`

#### Returns

`T`\[`"_input"`\]

***

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

### innerType

```ts
innerType: T;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:857

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

### typeName

```ts
typeName: ZodCatch;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:862
