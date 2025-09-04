[**Documentation**](../../../../../README.md)

***

[Documentation](../../../../../README.md) / [@6edesign/microservice](../../../README.md) / [](../../../README.md) / [z](../README.md) / ZodDiscriminatedUnionDef

# Interface: ZodDiscriminatedUnionDef&lt;Discriminator, Options&gt;

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:605

## Extends

- [`ZodTypeDef`](ZodTypeDef.md)

## Type Parameters

### Discriminator

`Discriminator` *extends* `string`

### Options

`Options` *extends* readonly [`ZodDiscriminatedUnionOption`](../type-aliases/ZodDiscriminatedUnionOption.md)&lt;`string`&gt;[] = [`ZodDiscriminatedUnionOption`](../type-aliases/ZodDiscriminatedUnionOption.md)&lt;`string`&gt;[]

## Properties

### description?

```ts
optional description: string;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:24

#### Inherited from

[`ZodTypeDef`](ZodTypeDef.md).[`description`](ZodTypeDef.md#description)

***

### discriminator

```ts
discriminator: Discriminator;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:606

***

### errorMap?

```ts
optional errorMap: ZodErrorMap;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:23

#### Inherited from

[`ZodTypeDef`](ZodTypeDef.md).[`errorMap`](ZodTypeDef.md#errormap)

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

### options

```ts
options: Options;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:607

***

### optionsMap

```ts
optionsMap: Map<Primitive, ZodDiscriminatedUnionOption<any>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:608

***

### typeName

```ts
typeName: ZodDiscriminatedUnion;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:609
