[**Documentation**](../../../../../README.md)

***

[Documentation](../../../../../README.md) / [@6edesign/microservice](../../../README.md) / [](../../../README.md) / [z](../README.md) / ZodRecordDef

# Interface: ZodRecordDef&lt;Key, Value&gt;

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:660

## Extends

- [`ZodTypeDef`](ZodTypeDef.md)

## Type Parameters

### Key

`Key` *extends* [`KeySchema`](../type-aliases/KeySchema.md) = [`ZodString`](../classes/ZodString.md)

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

### keyType

```ts
keyType: Key;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:662

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
typeName: ZodRecord;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:663

***

### valueType

```ts
valueType: Value;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:661
