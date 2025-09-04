[**Documentation**](../../../../../README.md)

***

[Documentation](../../../../../README.md) / [@6edesign/microservice](../../../README.md) / [](../../../README.md) / [z](../README.md) / ZodReadonly

# Class: ZodReadonly&lt;T&gt;

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:909

## Extends

- [`Schema`](Schema.md)&lt;`MakeReadonly`&lt;`T`\[`"_output"`\]&gt;, [`ZodReadonlyDef`](../interfaces/ZodReadonlyDef.md)&lt;`T`&gt;, `MakeReadonly`&lt;`T`\[`"_input"`\]&gt;&gt;

## Type Parameters

### T

`T` *extends* [`ZodTypeAny`](../type-aliases/ZodTypeAny.md)

## Constructors

### Constructor

```ts
new ZodReadonly<T>(def): ZodReadonly<T>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:79

#### Parameters

##### def

[`ZodReadonlyDef`](../interfaces/ZodReadonlyDef.md)

#### Returns

`ZodReadonly`&lt;`T`&gt;

#### Inherited from

[`Schema`](Schema.md).[`constructor`](Schema.md#constructor)

## Properties

### \_def

```ts
readonly _def: ZodReadonlyDef;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:52

#### Inherited from

[`Schema`](Schema.md).[`_def`](Schema.md#_def)

***

### \_input

```ts
readonly _input: MakeReadonly;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:51

#### Inherited from

[`Schema`](Schema.md).[`_input`](Schema.md#_input)

***

### \_output

```ts
readonly _output: MakeReadonly;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:50

#### Inherited from

[`Schema`](Schema.md).[`_output`](Schema.md#_output)

***

### \_type

```ts
readonly _type: MakeReadonly;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:49

#### Inherited from

[`Schema`](Schema.md).[`_type`](Schema.md#_type)

***

### ~standard

```ts
~standard: Props<MakeReadonly<T["_input"]>, MakeReadonly<T["_output"]>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:54

#### Inherited from

[`Schema`](Schema.md).[`~standard`](Schema.md#standard)

***

### spa()

```ts
spa: (data, params?) => Promise<SafeParseReturnType<MakeReadonly<T["_input"]>, MakeReadonly<T["_output"]>>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:70

Alias of safeParseAsync

#### Parameters

##### data

`unknown`

##### params?

[`InexactPartial`](../namespaces/util/type-aliases/InexactPartial.md)&lt;[`ParseParams`](../type-aliases/ParseParams.md)&gt;

#### Returns

`Promise`&lt;[`SafeParseReturnType`](../type-aliases/SafeParseReturnType.md)&lt;`MakeReadonly`&lt;`T`\[`"_input"`\]&gt;, `MakeReadonly`&lt;`T`\[`"_output"`\]&gt;&gt;&gt;

#### Inherited from

[`Schema`](Schema.md).[`spa`](Schema.md#spa)

***

### create()

```ts
static create: <Inner>(type, params?) => ZodReadonly<Inner>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:911

#### Type Parameters

##### Inner

`Inner` *extends* [`ZodTypeAny`](../type-aliases/ZodTypeAny.md)

#### Parameters

##### type

`Inner`

##### params?

[`RawCreateParams`](../type-aliases/RawCreateParams.md)

#### Returns

`ZodReadonly`&lt;`Inner`&gt;

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

## Methods

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
_parse(input): ParseReturnType<MakeReadonly<T["_output"]>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:910

#### Parameters

##### input

[`ParseInput`](../type-aliases/ParseInput.md)

#### Returns

[`ParseReturnType`](../type-aliases/ParseReturnType.md)&lt;`MakeReadonly`&lt;`T`\[`"_output"`\]&gt;&gt;

#### Overrides

[`Schema`](Schema.md).[`_parse`](Schema.md#_parse)

***

### \_parseAsync()

```ts
_parseAsync(input): AsyncParseReturnType<MakeReadonly<T["_output"]>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:63

#### Parameters

##### input

[`ParseInput`](../type-aliases/ParseInput.md)

#### Returns

[`AsyncParseReturnType`](../type-aliases/AsyncParseReturnType.md)&lt;`MakeReadonly`&lt;`T`\[`"_output"`\]&gt;&gt;

#### Inherited from

[`Schema`](Schema.md).[`_parseAsync`](Schema.md#_parseasync)

***

### \_parseSync()

```ts
_parseSync(input): SyncParseReturnType<MakeReadonly<T["_output"]>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:62

#### Parameters

##### input

[`ParseInput`](../type-aliases/ParseInput.md)

#### Returns

[`SyncParseReturnType`](../type-aliases/SyncParseReturnType.md)&lt;`MakeReadonly`&lt;`T`\[`"_output"`\]&gt;&gt;

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
_refinement(refinement): ZodEffects<ZodReadonly<T>, MakeReadonly<T["_output"]>, MakeReadonly<T["_input"]>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:75

#### Parameters

##### refinement

(`arg`, `ctx`) => `any`

#### Returns

[`ZodEffects`](ZodEffects.md)&lt;`ZodReadonly`&lt;`T`&gt;, `MakeReadonly`&lt;`T`\[`"_output"`\]&gt;, `MakeReadonly`&lt;`T`\[`"_input"`\]&gt;&gt;

#### Inherited from

[`Schema`](Schema.md).[`_refinement`](Schema.md#_refinement)

***

### ~validate()

```ts
~validate(data): 
  | Result<MakeReadonly<T["_output"]>>
  | Promise<Result<MakeReadonly<T["_output"]>>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:66

#### Parameters

##### data

`unknown`

#### Returns

  \| `Result`&lt;`MakeReadonly`&lt;`T`\[`"_output"`\]&gt;&gt;
  \| `Promise`&lt;`Result`&lt;`MakeReadonly`&lt;`T`\[`"_output"`\]&gt;&gt;&gt;

#### Inherited from

[`Schema`](Schema.md).[`~validate`](Schema.md#validate)

***

### and()

```ts
and<T>(incoming): ZodIntersection<ZodReadonly<T>, T>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:86

#### Type Parameters

##### T

`T` *extends* [`ZodTypeAny`](../type-aliases/ZodTypeAny.md)

#### Parameters

##### incoming

`T`

#### Returns

[`ZodIntersection`](ZodIntersection.md)&lt;`ZodReadonly`&lt;`T`&gt;, `T`&gt;

#### Inherited from

[`Schema`](Schema.md).[`and`](Schema.md#and)

***

### array()

```ts
array(): ZodArray<ZodReadonly<T>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:83

#### Returns

[`ZodArray`](ZodArray.md)&lt;`ZodReadonly`&lt;`T`&gt;&gt;

#### Inherited from

[`Schema`](Schema.md).[`array`](Schema.md#array)

***

### brand()

```ts
brand<B>(brand?): ZodBranded<ZodReadonly<T>, B>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:90

#### Type Parameters

##### B

`B` *extends* `string` \| `number` \| `symbol`

#### Parameters

##### brand?

`B`

#### Returns

[`ZodBranded`](ZodBranded.md)&lt;`ZodReadonly`&lt;`T`&gt;, `B`&gt;

#### Inherited from

[`Schema`](Schema.md).[`brand`](Schema.md#brand)

***

### catch()

#### Call Signature

```ts
catch(def): ZodCatch<ZodReadonly<T>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:91

##### Parameters

###### def

`MakeReadonly`

##### Returns

[`ZodCatch`](ZodCatch.md)&lt;`ZodReadonly`&lt;`T`&gt;&gt;

##### Inherited from

[`Schema`](Schema.md).[`catch`](Schema.md#catch)

#### Call Signature

```ts
catch(def): ZodCatch<ZodReadonly<T>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:92

##### Parameters

###### def

(`ctx`) => `MakeReadonly`

##### Returns

[`ZodCatch`](ZodCatch.md)&lt;`ZodReadonly`&lt;`T`&gt;&gt;

##### Inherited from

[`Schema`](Schema.md).[`catch`](Schema.md#catch)

***

### default()

#### Call Signature

```ts
default(def): ZodDefault<ZodReadonly<T>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:88

##### Parameters

###### def

[`noUndefined`](../namespaces/util/type-aliases/noUndefined.md)&lt;`MakeReadonly`&lt;`T`\[`"_input"`\]&gt;&gt;

##### Returns

[`ZodDefault`](ZodDefault.md)&lt;`ZodReadonly`&lt;`T`&gt;&gt;

##### Inherited from

[`Schema`](Schema.md).[`default`](Schema.md#default)

#### Call Signature

```ts
default(def): ZodDefault<ZodReadonly<T>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:89

##### Parameters

###### def

() => [`noUndefined`](../namespaces/util/type-aliases/noUndefined.md)&lt;`MakeReadonly`&lt;`T`\[`"_input"`\]&gt;&gt;

##### Returns

[`ZodDefault`](ZodDefault.md)&lt;`ZodReadonly`&lt;`T`&gt;&gt;

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

### nullable()

```ts
nullable(): ZodNullable<ZodReadonly<T>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:81

#### Returns

[`ZodNullable`](ZodNullable.md)&lt;`ZodReadonly`&lt;`T`&gt;&gt;

#### Inherited from

[`Schema`](Schema.md).[`nullable`](Schema.md#nullable)

***

### nullish()

```ts
nullish(): ZodOptional<ZodNullable<ZodReadonly<T>>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:82

#### Returns

[`ZodOptional`](ZodOptional.md)&lt;[`ZodNullable`](ZodNullable.md)&lt;`ZodReadonly`&lt;`T`&gt;&gt;&gt;

#### Inherited from

[`Schema`](Schema.md).[`nullish`](Schema.md#nullish)

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
optional(): ZodOptional<ZodReadonly<T>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:80

#### Returns

[`ZodOptional`](ZodOptional.md)&lt;`ZodReadonly`&lt;`T`&gt;&gt;

#### Inherited from

[`Schema`](Schema.md).[`optional`](Schema.md#optional)

***

### or()

```ts
or<T>(option): ZodUnion<[ZodReadonly<T>, T]>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:85

#### Type Parameters

##### T

`T` *extends* [`ZodTypeAny`](../type-aliases/ZodTypeAny.md)

#### Parameters

##### option

`T`

#### Returns

[`ZodUnion`](ZodUnion.md)&lt;\[`ZodReadonly`&lt;`T`&gt;, `T`\]&gt;

#### Inherited from

[`Schema`](Schema.md).[`or`](Schema.md#or)

***

### parse()

```ts
parse(data, params?): MakeReadonly;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:64

#### Parameters

##### data

`unknown`

##### params?

[`InexactPartial`](../namespaces/util/type-aliases/InexactPartial.md)&lt;[`ParseParams`](../type-aliases/ParseParams.md)&gt;

#### Returns

`MakeReadonly`

#### Inherited from

[`Schema`](Schema.md).[`parse`](Schema.md#parse)

***

### parseAsync()

```ts
parseAsync(data, params?): Promise<MakeReadonly<T["_output"]>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:67

#### Parameters

##### data

`unknown`

##### params?

[`InexactPartial`](../namespaces/util/type-aliases/InexactPartial.md)&lt;[`ParseParams`](../type-aliases/ParseParams.md)&gt;

#### Returns

`Promise`&lt;`MakeReadonly`&lt;`T`\[`"_output"`\]&gt;&gt;

#### Inherited from

[`Schema`](Schema.md).[`parseAsync`](Schema.md#parseasync)

***

### pipe()

```ts
pipe<T>(target): ZodPipeline<ZodReadonly<T>, T>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:97

#### Type Parameters

##### T

`T` *extends* [`ZodTypeAny`](../type-aliases/ZodTypeAny.md)

#### Parameters

##### target

`T`

#### Returns

[`ZodPipeline`](ZodPipeline.md)&lt;`ZodReadonly`&lt;`T`&gt;, `T`&gt;

#### Inherited from

[`Schema`](Schema.md).[`pipe`](Schema.md#pipe)

***

### promise()

```ts
promise(): ZodPromise<ZodReadonly<T>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:84

#### Returns

[`ZodPromise`](ZodPromise.md)&lt;`ZodReadonly`&lt;`T`&gt;&gt;

#### Inherited from

[`Schema`](Schema.md).[`promise`](Schema.md#promise)

***

### readonly()

```ts
readonly(): ZodReadonly<ZodReadonly<T>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:98

#### Returns

`ZodReadonly`&lt;`ZodReadonly`&lt;`T`&gt;&gt;

#### Inherited from

[`Schema`](Schema.md).[`readonly`](Schema.md#readonly)

***

### refine()

#### Call Signature

```ts
refine<RefinedOutput>(check, message?): ZodEffects<ZodReadonly<T>, RefinedOutput, MakeReadonly<T["_input"]>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:71

##### Type Parameters

###### RefinedOutput

`RefinedOutput` *extends* `any`

##### Parameters

###### check

(`arg`) => `arg is RefinedOutput`

###### message?

`string` | `Partial`&lt;[`Omit`](../namespaces/util/type-aliases/Omit.md)&lt;[`ZodCustomIssue`](../interfaces/ZodCustomIssue.md), `"code"`&gt;&gt; | (`arg`) => [`CustomErrorParams`](../type-aliases/CustomErrorParams.md)

##### Returns

[`ZodEffects`](ZodEffects.md)&lt;`ZodReadonly`&lt;`T`&gt;, `RefinedOutput`, `MakeReadonly`&lt;`T`\[`"_input"`\]&gt;&gt;

##### Inherited from

[`Schema`](Schema.md).[`refine`](Schema.md#refine)

#### Call Signature

```ts
refine(check, message?): ZodEffects<ZodReadonly<T>, MakeReadonly<T["_output"]>, MakeReadonly<T["_input"]>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:72

##### Parameters

###### check

(`arg`) => `unknown`

###### message?

`string` | `Partial`&lt;[`Omit`](../namespaces/util/type-aliases/Omit.md)&lt;[`ZodCustomIssue`](../interfaces/ZodCustomIssue.md), `"code"`&gt;&gt; | (`arg`) => [`CustomErrorParams`](../type-aliases/CustomErrorParams.md)

##### Returns

[`ZodEffects`](ZodEffects.md)&lt;`ZodReadonly`&lt;`T`&gt;, `MakeReadonly`&lt;`T`\[`"_output"`\]&gt;, `MakeReadonly`&lt;`T`\[`"_input"`\]&gt;&gt;

##### Inherited from

[`Schema`](Schema.md).[`refine`](Schema.md#refine)

***

### refinement()

#### Call Signature

```ts
refinement<RefinedOutput>(check, refinementData): ZodEffects<ZodReadonly<T>, RefinedOutput, MakeReadonly<T["_input"]>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:73

##### Type Parameters

###### RefinedOutput

`RefinedOutput` *extends* `any`

##### Parameters

###### check

(`arg`) => `arg is RefinedOutput`

###### refinementData

[`IssueData`](../type-aliases/IssueData.md) | (`arg`, `ctx`) => [`IssueData`](../type-aliases/IssueData.md)

##### Returns

[`ZodEffects`](ZodEffects.md)&lt;`ZodReadonly`&lt;`T`&gt;, `RefinedOutput`, `MakeReadonly`&lt;`T`\[`"_input"`\]&gt;&gt;

##### Inherited from

[`Schema`](Schema.md).[`refinement`](Schema.md#refinement)

#### Call Signature

```ts
refinement(check, refinementData): ZodEffects<ZodReadonly<T>, MakeReadonly<T["_output"]>, MakeReadonly<T["_input"]>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:74

##### Parameters

###### check

(`arg`) => `boolean`

###### refinementData

[`IssueData`](../type-aliases/IssueData.md) | (`arg`, `ctx`) => [`IssueData`](../type-aliases/IssueData.md)

##### Returns

[`ZodEffects`](ZodEffects.md)&lt;`ZodReadonly`&lt;`T`&gt;, `MakeReadonly`&lt;`T`\[`"_output"`\]&gt;, `MakeReadonly`&lt;`T`\[`"_input"`\]&gt;&gt;

##### Inherited from

[`Schema`](Schema.md).[`refinement`](Schema.md#refinement)

***

### safeParse()

```ts
safeParse(data, params?): SafeParseReturnType<MakeReadonly<T["_input"]>, MakeReadonly<T["_output"]>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:65

#### Parameters

##### data

`unknown`

##### params?

[`InexactPartial`](../namespaces/util/type-aliases/InexactPartial.md)&lt;[`ParseParams`](../type-aliases/ParseParams.md)&gt;

#### Returns

[`SafeParseReturnType`](../type-aliases/SafeParseReturnType.md)&lt;`MakeReadonly`&lt;`T`\[`"_input"`\]&gt;, `MakeReadonly`&lt;`T`\[`"_output"`\]&gt;&gt;

#### Inherited from

[`Schema`](Schema.md).[`safeParse`](Schema.md#safeparse)

***

### safeParseAsync()

```ts
safeParseAsync(data, params?): Promise<SafeParseReturnType<MakeReadonly<T["_input"]>, MakeReadonly<T["_output"]>>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:68

#### Parameters

##### data

`unknown`

##### params?

[`InexactPartial`](../namespaces/util/type-aliases/InexactPartial.md)&lt;[`ParseParams`](../type-aliases/ParseParams.md)&gt;

#### Returns

`Promise`&lt;[`SafeParseReturnType`](../type-aliases/SafeParseReturnType.md)&lt;`MakeReadonly`&lt;`T`\[`"_input"`\]&gt;, `MakeReadonly`&lt;`T`\[`"_output"`\]&gt;&gt;&gt;

#### Inherited from

[`Schema`](Schema.md).[`safeParseAsync`](Schema.md#safeparseasync)

***

### superRefine()

#### Call Signature

```ts
superRefine<RefinedOutput>(refinement): ZodEffects<ZodReadonly<T>, RefinedOutput, MakeReadonly<T["_input"]>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:76

##### Type Parameters

###### RefinedOutput

`RefinedOutput` *extends* `any`

##### Parameters

###### refinement

(`arg`, `ctx`) => `arg is RefinedOutput`

##### Returns

[`ZodEffects`](ZodEffects.md)&lt;`ZodReadonly`&lt;`T`&gt;, `RefinedOutput`, `MakeReadonly`&lt;`T`\[`"_input"`\]&gt;&gt;

##### Inherited from

[`Schema`](Schema.md).[`superRefine`](Schema.md#superrefine)

#### Call Signature

```ts
superRefine(refinement): ZodEffects<ZodReadonly<T>, MakeReadonly<T["_output"]>, MakeReadonly<T["_input"]>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:77

##### Parameters

###### refinement

(`arg`, `ctx`) => `void`

##### Returns

[`ZodEffects`](ZodEffects.md)&lt;`ZodReadonly`&lt;`T`&gt;, `MakeReadonly`&lt;`T`\[`"_output"`\]&gt;, `MakeReadonly`&lt;`T`\[`"_input"`\]&gt;&gt;

##### Inherited from

[`Schema`](Schema.md).[`superRefine`](Schema.md#superrefine)

#### Call Signature

```ts
superRefine(refinement): ZodEffects<ZodReadonly<T>, MakeReadonly<T["_output"]>, MakeReadonly<T["_input"]>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:78

##### Parameters

###### refinement

(`arg`, `ctx`) => `Promise`&lt;`void`&gt;

##### Returns

[`ZodEffects`](ZodEffects.md)&lt;`ZodReadonly`&lt;`T`&gt;, `MakeReadonly`&lt;`T`\[`"_output"`\]&gt;, `MakeReadonly`&lt;`T`\[`"_input"`\]&gt;&gt;

##### Inherited from

[`Schema`](Schema.md).[`superRefine`](Schema.md#superrefine)

***

### transform()

```ts
transform<NewOut>(transform): ZodEffects<ZodReadonly<T>, NewOut>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:87

#### Type Parameters

##### NewOut

`NewOut`

#### Parameters

##### transform

(`arg`, `ctx`) => `NewOut` \| `Promise`&lt;`NewOut`&gt;

#### Returns

[`ZodEffects`](ZodEffects.md)&lt;`ZodReadonly`&lt;`T`&gt;, `NewOut`&gt;

#### Inherited from

[`Schema`](Schema.md).[`transform`](Schema.md#transform)

***

### unwrap()

```ts
unwrap(): T;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:912

#### Returns

`T`
