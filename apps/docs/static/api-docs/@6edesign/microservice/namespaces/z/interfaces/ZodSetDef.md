[**Documentation**](../../../../../README.md)

***

[Documentation](../../../../../README.md) / [@6edesign/microservice](../../../README.md) / [](../../../README.md) / [z](../README.md) / ZodSetDef

# Interface: ZodSetDef&lt;Value&gt;

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:686

## Extends

- [`ZodTypeDef`](ZodTypeDef.md)

## Type Parameters

### Value

`Value` *extends* [`ZodTypeAny`](../type-aliases/ZodTypeAny.md) = [`ZodTypeAny`](../type-aliases/ZodTypeAny.md)

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

### maxSize

```ts
maxSize: 
  | null
  | {
  message?: string;
  value: number;
};
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:693

***

### minSize

```ts
minSize: 
  | null
  | {
  message?: string;
  value: number;
};
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:689

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
typeName: ZodSet;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:688

***

### valueType

```ts
valueType: Value;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:687
