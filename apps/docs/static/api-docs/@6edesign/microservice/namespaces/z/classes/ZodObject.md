[**Documentation**](../../../../../README.md)

***

[Documentation](../../../../../README.md) / [@6edesign/microservice](../../../README.md) / [](../../../README.md) / [z](../README.md) / ZodObject

# Class: ZodObject&lt;T, UnknownKeys, Catchall, Output, Input&gt;

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:529

## Extends

- [`Schema`](Schema.md)&lt;`Output`, [`ZodObjectDef`](../interfaces/ZodObjectDef.md)&lt;`T`, `UnknownKeys`, `Catchall`&gt;, `Input`&gt;

## Type Parameters

### T

`T` *extends* [`ZodRawShape`](../type-aliases/ZodRawShape.md)

### UnknownKeys

`UnknownKeys` *extends* [`UnknownKeysParam`](../type-aliases/UnknownKeysParam.md) = [`UnknownKeysParam`](../type-aliases/UnknownKeysParam.md)

### Catchall

`Catchall` *extends* [`ZodTypeAny`](../type-aliases/ZodTypeAny.md) = [`ZodTypeAny`](../type-aliases/ZodTypeAny.md)

### Output

`Output` = [`objectOutputType`](../type-aliases/objectOutputType.md)&lt;`T`, `Catchall`, `UnknownKeys`&gt;

### Input

`Input` = [`objectInputType`](../type-aliases/objectInputType.md)&lt;`T`, `Catchall`, `UnknownKeys`&gt;

## Constructors

### Constructor

```ts
new ZodObject<T, UnknownKeys, Catchall, Output, Input>(def): ZodObject<T, UnknownKeys, Catchall, Output, Input>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:79

#### Parameters

##### def

[`ZodObjectDef`](../interfaces/ZodObjectDef.md)

#### Returns

`ZodObject`&lt;`T`, `UnknownKeys`, `Catchall`, `Output`, `Input`&gt;

#### Inherited from

[`Schema`](Schema.md).[`constructor`](Schema.md#constructor)

## Properties

### \_def

```ts
readonly _def: ZodObjectDef;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:52

#### Inherited from

[`Schema`](Schema.md).[`_def`](Schema.md#_def)

***

### \_input

```ts
readonly _input: Input;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:51

#### Inherited from

[`Schema`](Schema.md).[`_input`](Schema.md#_input)

***

### \_output

```ts
readonly _output: Output;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:50

#### Inherited from

[`Schema`](Schema.md).[`_output`](Schema.md#_output)

***

### \_type

```ts
readonly _type: Output;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:49

#### Inherited from

[`Schema`](Schema.md).[`_type`](Schema.md#_type)

***

### ~standard

```ts
~standard: Props<Input, Output>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:54

#### Inherited from

[`Schema`](Schema.md).[`~standard`](Schema.md#standard)

***

### ~~augment()~~

```ts
augment: <Augmentation>(augmentation) => ZodObject<extendShape<T, Augmentation>, UnknownKeys, Catchall>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:549

#### Type Parameters

##### Augmentation

`Augmentation` *extends* [`ZodRawShape`](../type-aliases/ZodRawShape.md)

#### Parameters

##### augmentation

`Augmentation`

#### Returns

`ZodObject`&lt;[`extendShape`](../namespaces/objectUtil/type-aliases/extendShape.md)&lt;`T`, `Augmentation`&gt;, `UnknownKeys`, `Catchall`&gt;

#### Deprecated

Use `.extend` instead

***

### ~~nonstrict()~~

```ts
nonstrict: () => ZodObject<T, "passthrough", Catchall>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:544

#### Returns

`ZodObject`&lt;`T`, `"passthrough"`, `Catchall`&gt;

#### Deprecated

In most cases, this is no longer needed - unknown properties are now silently stripped.
If you want to pass through unknown properties, use `.passthrough()` instead.

***

### spa()

```ts
spa: (data, params?) => Promise<SafeParseReturnType<Input, Output>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:70

Alias of safeParseAsync

#### Parameters

##### data

`unknown`

##### params?

[`InexactPartial`](../namespaces/util/type-aliases/InexactPartial.md)&lt;[`ParseParams`](../type-aliases/ParseParams.md)&gt;

#### Returns

`Promise`&lt;[`SafeParseReturnType`](../type-aliases/SafeParseReturnType.md)&lt;`Input`, `Output`&gt;&gt;

#### Inherited from

[`Schema`](Schema.md).[`spa`](Schema.md#spa)

***

### create()

```ts
static create: <Shape>(shape, params?) => ZodObject<Shape, "strip", ZodTypeAny, { [k in string | number | symbol]: addQuestionMarks<baseObjectOutputType<Shape>, any>[k] }, { [k in string | number | symbol]: baseObjectInputType<Shape>[k] }>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:587

#### Type Parameters

##### Shape

`Shape` *extends* [`ZodRawShape`](../type-aliases/ZodRawShape.md)

#### Parameters

##### shape

`Shape`

##### params?

[`RawCreateParams`](../type-aliases/RawCreateParams.md)

#### Returns

`ZodObject`&lt;`Shape`, `"strip"`, [`ZodTypeAny`](../type-aliases/ZodTypeAny.md), \{ \[k in string \| number \| symbol\]: addQuestionMarks\<baseObjectOutputType\<Shape\>, any\>\[k\] \}, \{ \[k in string \| number \| symbol\]: baseObjectInputType\<Shape\>\[k\] \}&gt;

***

### lazycreate()

```ts
static lazycreate: <Shape>(shape, params?) => ZodObject<Shape, "strip">;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:589

#### Type Parameters

##### Shape

`Shape` *extends* [`ZodRawShape`](../type-aliases/ZodRawShape.md)

#### Parameters

##### shape

() => `Shape`

##### params?

[`RawCreateParams`](../type-aliases/RawCreateParams.md)

#### Returns

`ZodObject`&lt;`Shape`, `"strip"`&gt;

***

### strictCreate()

```ts
static strictCreate: <Shape>(shape, params?) => ZodObject<Shape, "strict">;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:588

#### Type Parameters

##### Shape

`Shape` *extends* [`ZodRawShape`](../type-aliases/ZodRawShape.md)

#### Parameters

##### shape

`Shape`

##### params?

[`RawCreateParams`](../type-aliases/RawCreateParams.md)

#### Returns

`ZodObject`&lt;`Shape`, `"strict"`&gt;

## Accessors

### description

#### Get Signature

```ts
get description(): undefined | string;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:53

##### Returns

`undefined` \| `string`

#### Inherited from

[`Schema`](Schema.md).[`description`](Schema.md#description)

***

### shape

#### Get Signature

```ts
get shape(): T;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:536

##### Returns

`T`

## Methods

### \_getCached()

```ts
_getCached(): object;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:531

#### Returns

`object`

##### keys

```ts
keys: string[];
```

##### shape

```ts
shape: T;
```

***

### \_getOrReturnCtx()

```ts
_getOrReturnCtx(input, ctx?): ParseContext;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:57

#### Parameters

##### input

[`ParseInput`](../type-aliases/ParseInput.md)

##### ctx?

[`ParseContext`](../interfaces/ParseContext.md)

#### Returns

[`ParseContext`](../interfaces/ParseContext.md)

#### Inherited from

[`Schema`](Schema.md).[`_getOrReturnCtx`](Schema.md#_getorreturnctx)

***

### \_getType()

```ts
_getType(input): string;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:56

#### Parameters

##### input

[`ParseInput`](../type-aliases/ParseInput.md)

#### Returns

`string`

#### Inherited from

[`Schema`](Schema.md).[`_getType`](Schema.md#_gettype)

***

### \_parse()

```ts
_parse(input): ParseReturnType<Output>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:535

#### Parameters

##### input

[`ParseInput`](../type-aliases/ParseInput.md)

#### Returns

[`ParseReturnType`](../type-aliases/ParseReturnType.md)&lt;`Output`&gt;

#### Overrides

[`Schema`](Schema.md).[`_parse`](Schema.md#_parse)

***

### \_parseAsync()

```ts
_parseAsync(input): AsyncParseReturnType<Output>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:63

#### Parameters

##### input

[`ParseInput`](../type-aliases/ParseInput.md)

#### Returns

[`AsyncParseReturnType`](../type-aliases/AsyncParseReturnType.md)&lt;`Output`&gt;

#### Inherited from

[`Schema`](Schema.md).[`_parseAsync`](Schema.md#_parseasync)

***

### \_parseSync()

```ts
_parseSync(input): SyncParseReturnType<Output>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:62

#### Parameters

##### input

[`ParseInput`](../type-aliases/ParseInput.md)

#### Returns

[`SyncParseReturnType`](../type-aliases/SyncParseReturnType.md)&lt;`Output`&gt;

#### Inherited from

[`Schema`](Schema.md).[`_parseSync`](Schema.md#_parsesync)

***

### \_processInputParams()

```ts
_processInputParams(input): object;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:58

#### Parameters

##### input

[`ParseInput`](../type-aliases/ParseInput.md)

#### Returns

`object`

##### ctx

```ts
ctx: ParseContext;
```

##### status

```ts
status: ParseStatus;
```

#### Inherited from

[`Schema`](Schema.md).[`_processInputParams`](Schema.md#_processinputparams)

***

### \_refinement()

```ts
_refinement(refinement): ZodEffects<ZodObject<T, UnknownKeys, Catchall, Output, Input>, Output, Input>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:75

#### Parameters

##### refinement

(`arg`, `ctx`) => `any`

#### Returns

[`ZodEffects`](ZodEffects.md)&lt;`ZodObject`&lt;`T`, `UnknownKeys`, `Catchall`, `Output`, `Input`&gt;, `Output`, `Input`&gt;

#### Inherited from

[`Schema`](Schema.md).[`_refinement`](Schema.md#_refinement)

***

### ~validate()

```ts
~validate(data): Result<Output> | Promise<Result<Output>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:66

#### Parameters

##### data

`unknown`

#### Returns

`Result`&lt;`Output`&gt; \| `Promise`&lt;`Result`&lt;`Output`&gt;&gt;

#### Inherited from

[`Schema`](Schema.md).[`~validate`](Schema.md#validate)

***

### and()

```ts
and<T>(incoming): ZodIntersection<ZodObject<T, UnknownKeys, Catchall, Output, Input>, T>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:86

#### Type Parameters

##### T

`T` *extends* [`ZodTypeAny`](../type-aliases/ZodTypeAny.md)

#### Parameters

##### incoming

`T`

#### Returns

[`ZodIntersection`](ZodIntersection.md)&lt;`ZodObject`&lt;`T`, `UnknownKeys`, `Catchall`, `Output`, `Input`&gt;, `T`&gt;

#### Inherited from

[`Schema`](Schema.md).[`and`](Schema.md#and)

***

### array()

```ts
array(): ZodArray<ZodObject<T, UnknownKeys, Catchall, Output, Input>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:83

#### Returns

[`ZodArray`](ZodArray.md)&lt;`ZodObject`&lt;`T`, `UnknownKeys`, `Catchall`, `Output`, `Input`&gt;&gt;

#### Inherited from

[`Schema`](Schema.md).[`array`](Schema.md#array)

***

### brand()

```ts
brand<B>(brand?): ZodBranded<ZodObject<T, UnknownKeys, Catchall, Output, Input>, B>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:90

#### Type Parameters

##### B

`B` *extends* `string` \| `number` \| `symbol`

#### Parameters

##### brand?

`B`

#### Returns

[`ZodBranded`](ZodBranded.md)&lt;`ZodObject`&lt;`T`, `UnknownKeys`, `Catchall`, `Output`, `Input`&gt;, `B`&gt;

#### Inherited from

[`Schema`](Schema.md).[`brand`](Schema.md#brand)

***

### catch()

#### Call Signature

```ts
catch(def): ZodCatch<ZodObject<T, UnknownKeys, Catchall, Output, Input>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:91

##### Parameters

###### def

`Output`

##### Returns

[`ZodCatch`](ZodCatch.md)&lt;`ZodObject`&lt;`T`, `UnknownKeys`, `Catchall`, `Output`, `Input`&gt;&gt;

##### Inherited from

[`Schema`](Schema.md).[`catch`](Schema.md#catch)

#### Call Signature

```ts
catch(def): ZodCatch<ZodObject<T, UnknownKeys, Catchall, Output, Input>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:92

##### Parameters

###### def

(`ctx`) => `Output`

##### Returns

[`ZodCatch`](ZodCatch.md)&lt;`ZodObject`&lt;`T`, `UnknownKeys`, `Catchall`, `Output`, `Input`&gt;&gt;

##### Inherited from

[`Schema`](Schema.md).[`catch`](Schema.md#catch)

***

### catchall()

```ts
catchall<Index>(index): ZodObject<T, UnknownKeys, Index>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:559

#### Type Parameters

##### Index

`Index` *extends* [`ZodTypeAny`](../type-aliases/ZodTypeAny.md)

#### Parameters

##### index

`Index`

#### Returns

`ZodObject`&lt;`T`, `UnknownKeys`, `Index`&gt;

***

### ~~deepPartial()~~

```ts
deepPartial(): DeepPartial<ZodObject<T, UnknownKeys, Catchall, Output, Input>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:569

#### Returns

`DeepPartial`&lt;`ZodObject`&lt;`T`, `UnknownKeys`, `Catchall`, `Output`, `Input`&gt;&gt;

#### Deprecated

***

### default()

#### Call Signature

```ts
default(def): ZodDefault<ZodObject<T, UnknownKeys, Catchall, Output, Input>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:88

##### Parameters

###### def

[`noUndefined`](../namespaces/util/type-aliases/noUndefined.md)&lt;`Input`&gt;

##### Returns

[`ZodDefault`](ZodDefault.md)&lt;`ZodObject`&lt;`T`, `UnknownKeys`, `Catchall`, `Output`, `Input`&gt;&gt;

##### Inherited from

[`Schema`](Schema.md).[`default`](Schema.md#default)

#### Call Signature

```ts
default(def): ZodDefault<ZodObject<T, UnknownKeys, Catchall, Output, Input>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:89

##### Parameters

###### def

() => [`noUndefined`](../namespaces/util/type-aliases/noUndefined.md)&lt;`Input`&gt;

##### Returns

[`ZodDefault`](ZodDefault.md)&lt;`ZodObject`&lt;`T`, `UnknownKeys`, `Catchall`, `Output`, `Input`&gt;&gt;

##### Inherited from

[`Schema`](Schema.md).[`default`](Schema.md#default)

***

### describe()

```ts
describe(description): this;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:96

#### Parameters

##### description

`string`

#### Returns

`this`

#### Inherited from

[`Schema`](Schema.md).[`describe`](Schema.md#describe)

***

### extend()

```ts
extend<Augmentation>(augmentation): ZodObject<extendShape<T, Augmentation>, UnknownKeys, Catchall>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:545

#### Type Parameters

##### Augmentation

`Augmentation` *extends* [`ZodRawShape`](../type-aliases/ZodRawShape.md)

#### Parameters

##### augmentation

`Augmentation`

#### Returns

`ZodObject`&lt;[`extendShape`](../namespaces/objectUtil/type-aliases/extendShape.md)&lt;`T`, `Augmentation`&gt;, `UnknownKeys`, `Catchall`&gt;

***

### isNullable()

```ts
isNullable(): boolean;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:100

#### Returns

`boolean`

#### Inherited from

[`Schema`](Schema.md).[`isNullable`](Schema.md#isnullable)

***

### isOptional()

```ts
isOptional(): boolean;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:99

#### Returns

`boolean`

#### Inherited from

[`Schema`](Schema.md).[`isOptional`](Schema.md#isoptional)

***

### keyof()

```ts
keyof(): ZodEnum<CastToStringTuple<UnionToTuple<keyof T, []>>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:586

#### Returns

[`ZodEnum`](ZodEnum.md)&lt;`CastToStringTuple`&lt;`UnionToTuple`&lt;keyof `T`, \[\]&gt;&gt;&gt;

***

### merge()

```ts
merge<Incoming, Augmentation>(merging): ZodObject<extendShape<T, Augmentation>, Incoming["_def"]["unknownKeys"], Incoming["_def"]["catchall"]>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:555

Prior to zod@1.0.12 there was a bug in the
inferred type of merged objects. Please
upgrade if you are experiencing issues.

#### Type Parameters

##### Incoming

`Incoming` *extends* [`AnyZodObject`](../type-aliases/AnyZodObject.md)

##### Augmentation

`Augmentation` *extends* `any`

#### Parameters

##### merging

`Incoming`

#### Returns

`ZodObject`&lt;[`extendShape`](../namespaces/objectUtil/type-aliases/extendShape.md)&lt;`T`, `Augmentation`&gt;, `Incoming`\[`"_def"`\]\[`"unknownKeys"`\], `Incoming`\[`"_def"`\]\[`"catchall"`\]&gt;

***

### nullable()

```ts
nullable(): ZodNullable<ZodObject<T, UnknownKeys, Catchall, Output, Input>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:81

#### Returns

[`ZodNullable`](ZodNullable.md)&lt;`ZodObject`&lt;`T`, `UnknownKeys`, `Catchall`, `Output`, `Input`&gt;&gt;

#### Inherited from

[`Schema`](Schema.md).[`nullable`](Schema.md#nullable)

***

### nullish()

```ts
nullish(): ZodOptional<ZodNullable<ZodObject<T, UnknownKeys, Catchall, Output, Input>>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:82

#### Returns

[`ZodOptional`](ZodOptional.md)&lt;[`ZodNullable`](ZodNullable.md)&lt;`ZodObject`&lt;`T`, `UnknownKeys`, `Catchall`, `Output`, `Input`&gt;&gt;&gt;

#### Inherited from

[`Schema`](Schema.md).[`nullish`](Schema.md#nullish)

***

### omit()

```ts
omit<Mask>(mask): ZodObject<Omit<T, keyof Mask>, UnknownKeys, Catchall>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:563

#### Type Parameters

##### Mask

`Mask` *extends* [`Exactly`](../namespaces/util/type-aliases/Exactly.md)&lt;\{ \[k in string \| number \| symbol\]?: true \}, `Mask`&gt;

#### Parameters

##### mask

`Mask`

#### Returns

`ZodObject`&lt;`Omit`&lt;`T`, keyof `Mask`&gt;, `UnknownKeys`, `Catchall`&gt;

***

### openapi()

#### Call Signature

```ts
openapi<T>(this, metadata): T;
```

Defined in: node\_modules/.pnpm/@asteasolutions+zod-to-openapi@6.4.0\_zod@3.25.76/node\_modules/@asteasolutions/zod-to-openapi/dist/zod-extensions.d.ts:31

##### Type Parameters

###### T

`T` *extends* [`ZodTypeAny`](../type-aliases/ZodTypeAny.md)

##### Parameters

###### this

`T`

###### metadata

`Partial`&lt;`ZodOpenAPIMetadata`&lt;[`input`](../type-aliases/input.md)&lt;`T`&gt;&gt;&gt;

##### Returns

`T`

##### Inherited from

[`Schema`](Schema.md).[`openapi`](Schema.md#openapi)

#### Call Signature

```ts
openapi<T>(
   this, 
   refId, 
   metadata?): T;
```

Defined in: node\_modules/.pnpm/@asteasolutions+zod-to-openapi@6.4.0\_zod@3.25.76/node\_modules/@asteasolutions/zod-to-openapi/dist/zod-extensions.d.ts:32

##### Type Parameters

###### T

`T` *extends* [`ZodTypeAny`](../type-aliases/ZodTypeAny.md)

##### Parameters

###### this

`T`

###### refId

`string`

###### metadata?

`Partial`&lt;`ZodOpenAPIMetadata`&lt;[`input`](../type-aliases/input.md)&lt;`T`&gt;, `ExampleValue`&lt;[`input`](../type-aliases/input.md)&lt;`T`&gt;&gt;&gt;&gt;

##### Returns

`T`

##### Inherited from

[`Schema`](Schema.md).[`openapi`](Schema.md#openapi)

***

### optional()

```ts
optional(): ZodOptional<ZodObject<T, UnknownKeys, Catchall, Output, Input>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:80

#### Returns

[`ZodOptional`](ZodOptional.md)&lt;`ZodObject`&lt;`T`, `UnknownKeys`, `Catchall`, `Output`, `Input`&gt;&gt;

#### Inherited from

[`Schema`](Schema.md).[`optional`](Schema.md#optional)

***

### or()

```ts
or<T>(option): ZodUnion<[ZodObject<T, UnknownKeys, Catchall, Output, Input>, T]>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:85

#### Type Parameters

##### T

`T` *extends* [`ZodTypeAny`](../type-aliases/ZodTypeAny.md)

#### Parameters

##### option

`T`

#### Returns

[`ZodUnion`](ZodUnion.md)&lt;\[`ZodObject`&lt;`T`, `UnknownKeys`, `Catchall`, `Output`, `Input`&gt;, `T`\]&gt;

#### Inherited from

[`Schema`](Schema.md).[`or`](Schema.md#or)

***

### parse()

```ts
parse(data, params?): Output;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:64

#### Parameters

##### data

`unknown`

##### params?

[`InexactPartial`](../namespaces/util/type-aliases/InexactPartial.md)&lt;[`ParseParams`](../type-aliases/ParseParams.md)&gt;

#### Returns

`Output`

#### Inherited from

[`Schema`](Schema.md).[`parse`](Schema.md#parse)

***

### parseAsync()

```ts
parseAsync(data, params?): Promise<Output>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:67

#### Parameters

##### data

`unknown`

##### params?

[`InexactPartial`](../namespaces/util/type-aliases/InexactPartial.md)&lt;[`ParseParams`](../type-aliases/ParseParams.md)&gt;

#### Returns

`Promise`&lt;`Output`&gt;

#### Inherited from

[`Schema`](Schema.md).[`parseAsync`](Schema.md#parseasync)

***

### partial()

#### Call Signature

```ts
partial(): ZodObject<{ [k in string | number | symbol]: ZodOptional<T[k]> }, UnknownKeys, Catchall>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:570

##### Returns

`ZodObject`&lt;\{ \[k in string \| number \| symbol\]: ZodOptional\<T\[k\]\> \}, `UnknownKeys`, `Catchall`&gt;

#### Call Signature

```ts
partial<Mask>(mask): ZodObject<{ [k in string | number | symbol]: k extends keyof T ? { [k in string | number | symbol]: k extends keyof Mask ? ZodOptional<T[k<k>]> : T[k] }[k<k>] : never }, UnknownKeys, Catchall>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:573

##### Type Parameters

###### Mask

`Mask` *extends* [`Exactly`](../namespaces/util/type-aliases/Exactly.md)&lt;\{ \[k in string \| number \| symbol\]?: true \}, `Mask`&gt;

##### Parameters

###### mask

`Mask`

##### Returns

`ZodObject`&lt;\{ \[k in string \| number \| symbol\]: k extends keyof T ? \{ \[k in string \| number \| symbol\]: k extends keyof Mask ? ZodOptional\<T\[k\<k\>\]\> : T\[k\] \}\[k\<k\>\] : never \}, `UnknownKeys`, `Catchall`&gt;

***

### passthrough()

```ts
passthrough(): ZodObject<T, "passthrough", Catchall>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:539

#### Returns

`ZodObject`&lt;`T`, `"passthrough"`, `Catchall`&gt;

***

### pick()

```ts
pick<Mask>(mask): ZodObject<Pick<T, Extract<keyof T, keyof Mask>>, UnknownKeys, Catchall>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:560

#### Type Parameters

##### Mask

`Mask` *extends* [`Exactly`](../namespaces/util/type-aliases/Exactly.md)&lt;\{ \[k in string \| number \| symbol\]?: true \}, `Mask`&gt;

#### Parameters

##### mask

`Mask`

#### Returns

`ZodObject`&lt;`Pick`&lt;`T`, `Extract`&lt;keyof `T`, keyof `Mask`&gt;&gt;, `UnknownKeys`, `Catchall`&gt;

***

### pipe()

```ts
pipe<T>(target): ZodPipeline<ZodObject<T, UnknownKeys, Catchall, Output, Input>, T>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:97

#### Type Parameters

##### T

`T` *extends* [`ZodTypeAny`](../type-aliases/ZodTypeAny.md)

#### Parameters

##### target

`T`

#### Returns

[`ZodPipeline`](ZodPipeline.md)&lt;`ZodObject`&lt;`T`, `UnknownKeys`, `Catchall`, `Output`, `Input`&gt;, `T`&gt;

#### Inherited from

[`Schema`](Schema.md).[`pipe`](Schema.md#pipe)

***

### promise()

```ts
promise(): ZodPromise<ZodObject<T, UnknownKeys, Catchall, Output, Input>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:84

#### Returns

[`ZodPromise`](ZodPromise.md)&lt;`ZodObject`&lt;`T`, `UnknownKeys`, `Catchall`, `Output`, `Input`&gt;&gt;

#### Inherited from

[`Schema`](Schema.md).[`promise`](Schema.md#promise)

***

### readonly()

```ts
readonly(): ZodReadonly<ZodObject<T, UnknownKeys, Catchall, Output, Input>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:98

#### Returns

[`ZodReadonly`](ZodReadonly.md)&lt;`ZodObject`&lt;`T`, `UnknownKeys`, `Catchall`, `Output`, `Input`&gt;&gt;

#### Inherited from

[`Schema`](Schema.md).[`readonly`](Schema.md#readonly)

***

### refine()

#### Call Signature

```ts
refine<RefinedOutput>(check, message?): ZodEffects<ZodObject<T, UnknownKeys, Catchall, Output, Input>, RefinedOutput, Input>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:71

##### Type Parameters

###### RefinedOutput

`RefinedOutput`

##### Parameters

###### check

(`arg`) => `arg is RefinedOutput`

###### message?

`string` | `Partial`&lt;[`Omit`](../namespaces/util/type-aliases/Omit.md)&lt;[`ZodCustomIssue`](../interfaces/ZodCustomIssue.md), `"code"`&gt;&gt; | (`arg`) => [`CustomErrorParams`](../type-aliases/CustomErrorParams.md)

##### Returns

[`ZodEffects`](ZodEffects.md)&lt;`ZodObject`&lt;`T`, `UnknownKeys`, `Catchall`, `Output`, `Input`&gt;, `RefinedOutput`, `Input`&gt;

##### Inherited from

[`Schema`](Schema.md).[`refine`](Schema.md#refine)

#### Call Signature

```ts
refine(check, message?): ZodEffects<ZodObject<T, UnknownKeys, Catchall, Output, Input>, Output, Input>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:72

##### Parameters

###### check

(`arg`) => `unknown`

###### message?

`string` | `Partial`&lt;[`Omit`](../namespaces/util/type-aliases/Omit.md)&lt;[`ZodCustomIssue`](../interfaces/ZodCustomIssue.md), `"code"`&gt;&gt; | (`arg`) => [`CustomErrorParams`](../type-aliases/CustomErrorParams.md)

##### Returns

[`ZodEffects`](ZodEffects.md)&lt;`ZodObject`&lt;`T`, `UnknownKeys`, `Catchall`, `Output`, `Input`&gt;, `Output`, `Input`&gt;

##### Inherited from

[`Schema`](Schema.md).[`refine`](Schema.md#refine)

***

### refinement()

#### Call Signature

```ts
refinement<RefinedOutput>(check, refinementData): ZodEffects<ZodObject<T, UnknownKeys, Catchall, Output, Input>, RefinedOutput, Input>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:73

##### Type Parameters

###### RefinedOutput

`RefinedOutput`

##### Parameters

###### check

(`arg`) => `arg is RefinedOutput`

###### refinementData

[`IssueData`](../type-aliases/IssueData.md) | (`arg`, `ctx`) => [`IssueData`](../type-aliases/IssueData.md)

##### Returns

[`ZodEffects`](ZodEffects.md)&lt;`ZodObject`&lt;`T`, `UnknownKeys`, `Catchall`, `Output`, `Input`&gt;, `RefinedOutput`, `Input`&gt;

##### Inherited from

[`Schema`](Schema.md).[`refinement`](Schema.md#refinement)

#### Call Signature

```ts
refinement(check, refinementData): ZodEffects<ZodObject<T, UnknownKeys, Catchall, Output, Input>, Output, Input>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:74

##### Parameters

###### check

(`arg`) => `boolean`

###### refinementData

[`IssueData`](../type-aliases/IssueData.md) | (`arg`, `ctx`) => [`IssueData`](../type-aliases/IssueData.md)

##### Returns

[`ZodEffects`](ZodEffects.md)&lt;`ZodObject`&lt;`T`, `UnknownKeys`, `Catchall`, `Output`, `Input`&gt;, `Output`, `Input`&gt;

##### Inherited from

[`Schema`](Schema.md).[`refinement`](Schema.md#refinement)

***

### required()

#### Call Signature

```ts
required(): ZodObject<{ [k in string | number | symbol]: deoptional<T[k]> }, UnknownKeys, Catchall>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:578

##### Returns

`ZodObject`&lt;\{ \[k in string \| number \| symbol\]: deoptional\<T\[k\]\> \}, `UnknownKeys`, `Catchall`&gt;

#### Call Signature

```ts
required<Mask>(mask): ZodObject<{ [k in string | number | symbol]: k extends keyof T ? { [k in string | number | symbol]: k extends keyof Mask ? deoptional<T[k<k>]> : T[k] }[k<k>] : never }, UnknownKeys, Catchall>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:581

##### Type Parameters

###### Mask

`Mask` *extends* [`Exactly`](../namespaces/util/type-aliases/Exactly.md)&lt;\{ \[k in string \| number \| symbol\]?: true \}, `Mask`&gt;

##### Parameters

###### mask

`Mask`

##### Returns

`ZodObject`&lt;\{ \[k in string \| number \| symbol\]: k extends keyof T ? \{ \[k in string \| number \| symbol\]: k extends keyof Mask ? deoptional\<T\[k\<k\>\]\> : T\[k\] \}\[k\<k\>\] : never \}, `UnknownKeys`, `Catchall`&gt;

***

### safeParse()

```ts
safeParse(data, params?): SafeParseReturnType<Input, Output>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:65

#### Parameters

##### data

`unknown`

##### params?

[`InexactPartial`](../namespaces/util/type-aliases/InexactPartial.md)&lt;[`ParseParams`](../type-aliases/ParseParams.md)&gt;

#### Returns

[`SafeParseReturnType`](../type-aliases/SafeParseReturnType.md)&lt;`Input`, `Output`&gt;

#### Inherited from

[`Schema`](Schema.md).[`safeParse`](Schema.md#safeparse)

***

### safeParseAsync()

```ts
safeParseAsync(data, params?): Promise<SafeParseReturnType<Input, Output>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:68

#### Parameters

##### data

`unknown`

##### params?

[`InexactPartial`](../namespaces/util/type-aliases/InexactPartial.md)&lt;[`ParseParams`](../type-aliases/ParseParams.md)&gt;

#### Returns

`Promise`&lt;[`SafeParseReturnType`](../type-aliases/SafeParseReturnType.md)&lt;`Input`, `Output`&gt;&gt;

#### Inherited from

[`Schema`](Schema.md).[`safeParseAsync`](Schema.md#safeparseasync)

***

### setKey()

```ts
setKey<Key, Schema>(key, schema): ZodObject<T & { [k in string]: Schema }, UnknownKeys, Catchall>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:556

#### Type Parameters

##### Key

`Key` *extends* `string`

##### Schema

`Schema` *extends* [`ZodTypeAny`](../type-aliases/ZodTypeAny.md)

#### Parameters

##### key

`Key`

##### schema

`Schema`

#### Returns

`ZodObject`&lt;`T` & `{ [k in string]: Schema }`, `UnknownKeys`, `Catchall`&gt;

***

### strict()

```ts
strict(message?): ZodObject<T, "strict", Catchall>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:537

#### Parameters

##### message?

`ErrMessage`

#### Returns

`ZodObject`&lt;`T`, `"strict"`, `Catchall`&gt;

***

### strip()

```ts
strip(): ZodObject<T, "strip", Catchall>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:538

#### Returns

`ZodObject`&lt;`T`, `"strip"`, `Catchall`&gt;

***

### superRefine()

#### Call Signature

```ts
superRefine<RefinedOutput>(refinement): ZodEffects<ZodObject<T, UnknownKeys, Catchall, Output, Input>, RefinedOutput, Input>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:76

##### Type Parameters

###### RefinedOutput

`RefinedOutput`

##### Parameters

###### refinement

(`arg`, `ctx`) => `arg is RefinedOutput`

##### Returns

[`ZodEffects`](ZodEffects.md)&lt;`ZodObject`&lt;`T`, `UnknownKeys`, `Catchall`, `Output`, `Input`&gt;, `RefinedOutput`, `Input`&gt;

##### Inherited from

[`Schema`](Schema.md).[`superRefine`](Schema.md#superrefine)

#### Call Signature

```ts
superRefine(refinement): ZodEffects<ZodObject<T, UnknownKeys, Catchall, Output, Input>, Output, Input>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:77

##### Parameters

###### refinement

(`arg`, `ctx`) => `void`

##### Returns

[`ZodEffects`](ZodEffects.md)&lt;`ZodObject`&lt;`T`, `UnknownKeys`, `Catchall`, `Output`, `Input`&gt;, `Output`, `Input`&gt;

##### Inherited from

[`Schema`](Schema.md).[`superRefine`](Schema.md#superrefine)

#### Call Signature

```ts
superRefine(refinement): ZodEffects<ZodObject<T, UnknownKeys, Catchall, Output, Input>, Output, Input>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:78

##### Parameters

###### refinement

(`arg`, `ctx`) => `Promise`&lt;`void`&gt;

##### Returns

[`ZodEffects`](ZodEffects.md)&lt;`ZodObject`&lt;`T`, `UnknownKeys`, `Catchall`, `Output`, `Input`&gt;, `Output`, `Input`&gt;

##### Inherited from

[`Schema`](Schema.md).[`superRefine`](Schema.md#superrefine)

***

### transform()

```ts
transform<NewOut>(transform): ZodEffects<ZodObject<T, UnknownKeys, Catchall, Output, Input>, NewOut>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:87

#### Type Parameters

##### NewOut

`NewOut`

#### Parameters

##### transform

(`arg`, `ctx`) => `NewOut` \| `Promise`&lt;`NewOut`&gt;

#### Returns

[`ZodEffects`](ZodEffects.md)&lt;`ZodObject`&lt;`T`, `UnknownKeys`, `Catchall`, `Output`, `Input`&gt;, `NewOut`&gt;

#### Inherited from

[`Schema`](Schema.md).[`transform`](Schema.md#transform)
