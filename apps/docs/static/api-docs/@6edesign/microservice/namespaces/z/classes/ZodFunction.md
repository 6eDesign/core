[**Documentation**](../../../../../README.md)

***

[Documentation](../../../../../README.md) / [@6edesign/microservice](../../../README.md) / [](../../../README.md) / [z](../README.md) / ZodFunction

# Class: ZodFunction&lt;Args, Returns&gt;

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:713

## Extends

- [`Schema`](Schema.md)&lt;[`OuterTypeOfFunction`](../type-aliases/OuterTypeOfFunction.md)&lt;`Args`, `Returns`&gt;, [`ZodFunctionDef`](../interfaces/ZodFunctionDef.md)&lt;`Args`, `Returns`&gt;, [`InnerTypeOfFunction`](../type-aliases/InnerTypeOfFunction.md)&lt;`Args`, `Returns`&gt;&gt;

## Type Parameters

### Args

`Args` *extends* [`ZodTuple`](ZodTuple.md)&lt;`any`, `any`&gt;

### Returns

`Returns` *extends* [`ZodTypeAny`](../type-aliases/ZodTypeAny.md)

## Constructors

### Constructor

```ts
new ZodFunction<Args, Returns>(def): ZodFunction<Args, Returns>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:79

#### Parameters

##### def

[`ZodFunctionDef`](../interfaces/ZodFunctionDef.md)

#### Returns

`ZodFunction`&lt;`Args`, `Returns`&gt;

#### Inherited from

[`Schema`](Schema.md).[`constructor`](Schema.md#constructor)

## Properties

### \_def

```ts
readonly _def: ZodFunctionDef;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:52

#### Inherited from

[`Schema`](Schema.md).[`_def`](Schema.md#_def)

***

### \_input

```ts
readonly _input: InnerTypeOfFunction;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:51

#### Inherited from

[`Schema`](Schema.md).[`_input`](Schema.md#_input)

***

### \_output

```ts
readonly _output: OuterTypeOfFunction;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:50

#### Inherited from

[`Schema`](Schema.md).[`_output`](Schema.md#_output)

***

### \_type

```ts
readonly _type: OuterTypeOfFunction;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:49

#### Inherited from

[`Schema`](Schema.md).[`_type`](Schema.md#_type)

***

### ~standard

```ts
~standard: Props<InnerTypeOfFunction<Args, Returns>, OuterTypeOfFunction<Args, Returns>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:54

#### Inherited from

[`Schema`](Schema.md).[`~standard`](Schema.md#standard)

***

### spa()

```ts
spa: (data, params?) => Promise<SafeParseReturnType<InnerTypeOfFunction<Args, Returns>, OuterTypeOfFunction<Args, Returns>>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:70

Alias of safeParseAsync

#### Parameters

##### data

`unknown`

##### params?

[`InexactPartial`](../namespaces/util/type-aliases/InexactPartial.md)&lt;[`ParseParams`](../type-aliases/ParseParams.md)&gt;

#### Returns

`Promise`&lt;[`SafeParseReturnType`](../type-aliases/SafeParseReturnType.md)&lt;[`InnerTypeOfFunction`](../type-aliases/InnerTypeOfFunction.md)&lt;`Args`, `Returns`&gt;, [`OuterTypeOfFunction`](../type-aliases/OuterTypeOfFunction.md)&lt;`Args`, `Returns`&gt;&gt;&gt;

#### Inherited from

[`Schema`](Schema.md).[`spa`](Schema.md#spa)

***

### validate()

```ts
validate: <F>(func) => ReturnType<F> extends Returns["_output"] ? (...args) => ReturnType<ReturnType<F>> : OuterTypeOfFunction<Args, Returns>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:721

#### Type Parameters

##### F

`F` *extends* (...`args`) => `Returns`\[`"_input"`\]

#### Parameters

##### func

`F`

#### Returns

`ReturnType`&lt;`F`&gt; *extends* `Returns`\[`"_output"`\] ? (...`args`) => `ReturnType`&lt;`ReturnType`&lt;`F`&gt;&gt; : [`OuterTypeOfFunction`](../type-aliases/OuterTypeOfFunction.md)&lt;`Args`, `Returns`&gt;

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
_parse(input): ParseReturnType<any>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:714

#### Parameters

##### input

[`ParseInput`](../type-aliases/ParseInput.md)

#### Returns

[`ParseReturnType`](../type-aliases/ParseReturnType.md)&lt;`any`&gt;

#### Overrides

[`Schema`](Schema.md).[`_parse`](Schema.md#_parse)

***

### \_parseAsync()

```ts
_parseAsync(input): AsyncParseReturnType<OuterTypeOfFunction<Args, Returns>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:63

#### Parameters

##### input

[`ParseInput`](../type-aliases/ParseInput.md)

#### Returns

[`AsyncParseReturnType`](../type-aliases/AsyncParseReturnType.md)&lt;[`OuterTypeOfFunction`](../type-aliases/OuterTypeOfFunction.md)&lt;`Args`, `Returns`&gt;&gt;

#### Inherited from

[`Schema`](Schema.md).[`_parseAsync`](Schema.md#_parseasync)

***

### \_parseSync()

```ts
_parseSync(input): SyncParseReturnType<OuterTypeOfFunction<Args, Returns>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:62

#### Parameters

##### input

[`ParseInput`](../type-aliases/ParseInput.md)

#### Returns

[`SyncParseReturnType`](../type-aliases/SyncParseReturnType.md)&lt;[`OuterTypeOfFunction`](../type-aliases/OuterTypeOfFunction.md)&lt;`Args`, `Returns`&gt;&gt;

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
_refinement(refinement): ZodEffects<ZodFunction<Args, Returns>, OuterTypeOfFunction<Args, Returns>, InnerTypeOfFunction<Args, Returns>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:75

#### Parameters

##### refinement

(`arg`, `ctx`) => `any`

#### Returns

[`ZodEffects`](ZodEffects.md)&lt;`ZodFunction`&lt;`Args`, `Returns`&gt;, [`OuterTypeOfFunction`](../type-aliases/OuterTypeOfFunction.md)&lt;`Args`, `Returns`&gt;, [`InnerTypeOfFunction`](../type-aliases/InnerTypeOfFunction.md)&lt;`Args`, `Returns`&gt;&gt;

#### Inherited from

[`Schema`](Schema.md).[`_refinement`](Schema.md#_refinement)

***

### ~validate()

```ts
~validate(data): 
  | Result<OuterTypeOfFunction<Args, Returns>>
  | Promise<Result<OuterTypeOfFunction<Args, Returns>>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:66

#### Parameters

##### data

`unknown`

#### Returns

  \| `Result`&lt;[`OuterTypeOfFunction`](../type-aliases/OuterTypeOfFunction.md)&lt;`Args`, `Returns`&gt;&gt;
  \| `Promise`&lt;`Result`&lt;[`OuterTypeOfFunction`](../type-aliases/OuterTypeOfFunction.md)&lt;`Args`, `Returns`&gt;&gt;&gt;

#### Inherited from

[`Schema`](Schema.md).[`~validate`](Schema.md#validate)

***

### and()

```ts
and<T>(incoming): ZodIntersection<ZodFunction<Args, Returns>, T>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:86

#### Type Parameters

##### T

`T` *extends* [`ZodTypeAny`](../type-aliases/ZodTypeAny.md)

#### Parameters

##### incoming

`T`

#### Returns

[`ZodIntersection`](ZodIntersection.md)&lt;`ZodFunction`&lt;`Args`, `Returns`&gt;, `T`&gt;

#### Inherited from

[`Schema`](Schema.md).[`and`](Schema.md#and)

***

### args()

```ts
args<Items>(...items): ZodFunction<ZodTuple<Items, ZodUnknown>, Returns>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:717

#### Type Parameters

##### Items

`Items` *extends* 
  \| \[\]
  \| \[[`ZodTypeAny`](../type-aliases/ZodTypeAny.md), `...ZodTypeAny[]`\]

#### Parameters

##### items

...`Items`

#### Returns

`ZodFunction`&lt;[`ZodTuple`](ZodTuple.md)&lt;`Items`, [`ZodUnknown`](ZodUnknown.md)&gt;, `Returns`&gt;

***

### array()

```ts
array(): ZodArray<ZodFunction<Args, Returns>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:83

#### Returns

[`ZodArray`](ZodArray.md)&lt;`ZodFunction`&lt;`Args`, `Returns`&gt;&gt;

#### Inherited from

[`Schema`](Schema.md).[`array`](Schema.md#array)

***

### brand()

```ts
brand<B>(brand?): ZodBranded<ZodFunction<Args, Returns>, B>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:90

#### Type Parameters

##### B

`B` *extends* `string` \| `number` \| `symbol`

#### Parameters

##### brand?

`B`

#### Returns

[`ZodBranded`](ZodBranded.md)&lt;`ZodFunction`&lt;`Args`, `Returns`&gt;, `B`&gt;

#### Inherited from

[`Schema`](Schema.md).[`brand`](Schema.md#brand)

***

### catch()

#### Call Signature

```ts
catch(def): ZodCatch<ZodFunction<Args, Returns>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:91

##### Parameters

###### def

[`OuterTypeOfFunction`](../type-aliases/OuterTypeOfFunction.md)

##### Returns

[`ZodCatch`](ZodCatch.md)&lt;`ZodFunction`&lt;`Args`, `Returns`&gt;&gt;

##### Inherited from

[`Schema`](Schema.md).[`catch`](Schema.md#catch)

#### Call Signature

```ts
catch(def): ZodCatch<ZodFunction<Args, Returns>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:92

##### Parameters

###### def

(`ctx`) => [`OuterTypeOfFunction`](../type-aliases/OuterTypeOfFunction.md)

##### Returns

[`ZodCatch`](ZodCatch.md)&lt;`ZodFunction`&lt;`Args`, `Returns`&gt;&gt;

##### Inherited from

[`Schema`](Schema.md).[`catch`](Schema.md#catch)

***

### default()

#### Call Signature

```ts
default(def): ZodDefault<ZodFunction<Args, Returns>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:88

##### Parameters

###### def

[`noUndefined`](../namespaces/util/type-aliases/noUndefined.md)&lt;[`InnerTypeOfFunction`](../type-aliases/InnerTypeOfFunction.md)&lt;`Args`, `Returns`&gt;&gt;

##### Returns

[`ZodDefault`](ZodDefault.md)&lt;`ZodFunction`&lt;`Args`, `Returns`&gt;&gt;

##### Inherited from

[`Schema`](Schema.md).[`default`](Schema.md#default)

#### Call Signature

```ts
default(def): ZodDefault<ZodFunction<Args, Returns>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:89

##### Parameters

###### def

() => [`noUndefined`](../namespaces/util/type-aliases/noUndefined.md)&lt;[`InnerTypeOfFunction`](../type-aliases/InnerTypeOfFunction.md)&lt;`Args`, `Returns`&gt;&gt;

##### Returns

[`ZodDefault`](ZodDefault.md)&lt;`ZodFunction`&lt;`Args`, `Returns`&gt;&gt;

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

### implement()

```ts
implement<F>(func): ReturnType<F> extends Returns["_output"] ? (...args) => ReturnType<ReturnType<F>> : OuterTypeOfFunction<Args, Returns>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:719

#### Type Parameters

##### F

`F` *extends* (...`args`) => `Returns`\[`"_input"`\]

#### Parameters

##### func

`F`

#### Returns

`ReturnType`&lt;`F`&gt; *extends* `Returns`\[`"_output"`\] ? (...`args`) => `ReturnType`&lt;`ReturnType`&lt;`F`&gt;&gt; : [`OuterTypeOfFunction`](../type-aliases/OuterTypeOfFunction.md)&lt;`Args`, `Returns`&gt;

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
nullable(): ZodNullable<ZodFunction<Args, Returns>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:81

#### Returns

[`ZodNullable`](ZodNullable.md)&lt;`ZodFunction`&lt;`Args`, `Returns`&gt;&gt;

#### Inherited from

[`Schema`](Schema.md).[`nullable`](Schema.md#nullable)

***

### nullish()

```ts
nullish(): ZodOptional<ZodNullable<ZodFunction<Args, Returns>>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:82

#### Returns

[`ZodOptional`](ZodOptional.md)&lt;[`ZodNullable`](ZodNullable.md)&lt;`ZodFunction`&lt;`Args`, `Returns`&gt;&gt;&gt;

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
optional(): ZodOptional<ZodFunction<Args, Returns>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:80

#### Returns

[`ZodOptional`](ZodOptional.md)&lt;`ZodFunction`&lt;`Args`, `Returns`&gt;&gt;

#### Inherited from

[`Schema`](Schema.md).[`optional`](Schema.md#optional)

***

### or()

```ts
or<T>(option): ZodUnion<[ZodFunction<Args, Returns>, T]>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:85

#### Type Parameters

##### T

`T` *extends* [`ZodTypeAny`](../type-aliases/ZodTypeAny.md)

#### Parameters

##### option

`T`

#### Returns

[`ZodUnion`](ZodUnion.md)&lt;\[`ZodFunction`&lt;`Args`, `Returns`&gt;, `T`\]&gt;

#### Inherited from

[`Schema`](Schema.md).[`or`](Schema.md#or)

***

### parameters()

```ts
parameters(): Args;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:715

#### Returns

`Args`

***

### parse()

```ts
parse(data, params?): OuterTypeOfFunction;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:64

#### Parameters

##### data

`unknown`

##### params?

[`InexactPartial`](../namespaces/util/type-aliases/InexactPartial.md)&lt;[`ParseParams`](../type-aliases/ParseParams.md)&gt;

#### Returns

[`OuterTypeOfFunction`](../type-aliases/OuterTypeOfFunction.md)

#### Inherited from

[`Schema`](Schema.md).[`parse`](Schema.md#parse)

***

### parseAsync()

```ts
parseAsync(data, params?): Promise<OuterTypeOfFunction<Args, Returns>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:67

#### Parameters

##### data

`unknown`

##### params?

[`InexactPartial`](../namespaces/util/type-aliases/InexactPartial.md)&lt;[`ParseParams`](../type-aliases/ParseParams.md)&gt;

#### Returns

`Promise`&lt;[`OuterTypeOfFunction`](../type-aliases/OuterTypeOfFunction.md)&lt;`Args`, `Returns`&gt;&gt;

#### Inherited from

[`Schema`](Schema.md).[`parseAsync`](Schema.md#parseasync)

***

### pipe()

```ts
pipe<T>(target): ZodPipeline<ZodFunction<Args, Returns>, T>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:97

#### Type Parameters

##### T

`T` *extends* [`ZodTypeAny`](../type-aliases/ZodTypeAny.md)

#### Parameters

##### target

`T`

#### Returns

[`ZodPipeline`](ZodPipeline.md)&lt;`ZodFunction`&lt;`Args`, `Returns`&gt;, `T`&gt;

#### Inherited from

[`Schema`](Schema.md).[`pipe`](Schema.md#pipe)

***

### promise()

```ts
promise(): ZodPromise<ZodFunction<Args, Returns>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:84

#### Returns

[`ZodPromise`](ZodPromise.md)&lt;`ZodFunction`&lt;`Args`, `Returns`&gt;&gt;

#### Inherited from

[`Schema`](Schema.md).[`promise`](Schema.md#promise)

***

### readonly()

```ts
readonly(): ZodReadonly<ZodFunction<Args, Returns>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:98

#### Returns

[`ZodReadonly`](ZodReadonly.md)&lt;`ZodFunction`&lt;`Args`, `Returns`&gt;&gt;

#### Inherited from

[`Schema`](Schema.md).[`readonly`](Schema.md#readonly)

***

### refine()

#### Call Signature

```ts
refine<RefinedOutput>(check, message?): ZodEffects<ZodFunction<Args, Returns>, RefinedOutput, InnerTypeOfFunction<Args, Returns>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:71

##### Type Parameters

###### RefinedOutput

`RefinedOutput` *extends* (...`args`) => `Returns`\[`"_output"`\]

##### Parameters

###### check

(`arg`) => `arg is RefinedOutput`

###### message?

`string` | `Partial`&lt;[`Omit`](../namespaces/util/type-aliases/Omit.md)&lt;[`ZodCustomIssue`](../interfaces/ZodCustomIssue.md), `"code"`&gt;&gt; | (`arg`) => [`CustomErrorParams`](../type-aliases/CustomErrorParams.md)

##### Returns

[`ZodEffects`](ZodEffects.md)&lt;`ZodFunction`&lt;`Args`, `Returns`&gt;, `RefinedOutput`, [`InnerTypeOfFunction`](../type-aliases/InnerTypeOfFunction.md)&lt;`Args`, `Returns`&gt;&gt;

##### Inherited from

[`Schema`](Schema.md).[`refine`](Schema.md#refine)

#### Call Signature

```ts
refine(check, message?): ZodEffects<ZodFunction<Args, Returns>, OuterTypeOfFunction<Args, Returns>, InnerTypeOfFunction<Args, Returns>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:72

##### Parameters

###### check

(`arg`) => `unknown`

###### message?

`string` | `Partial`&lt;[`Omit`](../namespaces/util/type-aliases/Omit.md)&lt;[`ZodCustomIssue`](../interfaces/ZodCustomIssue.md), `"code"`&gt;&gt; | (`arg`) => [`CustomErrorParams`](../type-aliases/CustomErrorParams.md)

##### Returns

[`ZodEffects`](ZodEffects.md)&lt;`ZodFunction`&lt;`Args`, `Returns`&gt;, [`OuterTypeOfFunction`](../type-aliases/OuterTypeOfFunction.md)&lt;`Args`, `Returns`&gt;, [`InnerTypeOfFunction`](../type-aliases/InnerTypeOfFunction.md)&lt;`Args`, `Returns`&gt;&gt;

##### Inherited from

[`Schema`](Schema.md).[`refine`](Schema.md#refine)

***

### refinement()

#### Call Signature

```ts
refinement<RefinedOutput>(check, refinementData): ZodEffects<ZodFunction<Args, Returns>, RefinedOutput, InnerTypeOfFunction<Args, Returns>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:73

##### Type Parameters

###### RefinedOutput

`RefinedOutput` *extends* (...`args`) => `Returns`\[`"_output"`\]

##### Parameters

###### check

(`arg`) => `arg is RefinedOutput`

###### refinementData

[`IssueData`](../type-aliases/IssueData.md) | (`arg`, `ctx`) => [`IssueData`](../type-aliases/IssueData.md)

##### Returns

[`ZodEffects`](ZodEffects.md)&lt;`ZodFunction`&lt;`Args`, `Returns`&gt;, `RefinedOutput`, [`InnerTypeOfFunction`](../type-aliases/InnerTypeOfFunction.md)&lt;`Args`, `Returns`&gt;&gt;

##### Inherited from

[`Schema`](Schema.md).[`refinement`](Schema.md#refinement)

#### Call Signature

```ts
refinement(check, refinementData): ZodEffects<ZodFunction<Args, Returns>, OuterTypeOfFunction<Args, Returns>, InnerTypeOfFunction<Args, Returns>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:74

##### Parameters

###### check

(`arg`) => `boolean`

###### refinementData

[`IssueData`](../type-aliases/IssueData.md) | (`arg`, `ctx`) => [`IssueData`](../type-aliases/IssueData.md)

##### Returns

[`ZodEffects`](ZodEffects.md)&lt;`ZodFunction`&lt;`Args`, `Returns`&gt;, [`OuterTypeOfFunction`](../type-aliases/OuterTypeOfFunction.md)&lt;`Args`, `Returns`&gt;, [`InnerTypeOfFunction`](../type-aliases/InnerTypeOfFunction.md)&lt;`Args`, `Returns`&gt;&gt;

##### Inherited from

[`Schema`](Schema.md).[`refinement`](Schema.md#refinement)

***

### returns()

```ts
returns<NewReturnType>(returnType): ZodFunction<Args, NewReturnType>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:718

#### Type Parameters

##### NewReturnType

`NewReturnType` *extends* [`Schema`](Schema.md)&lt;`any`, `any`, `any`&gt;

#### Parameters

##### returnType

`NewReturnType`

#### Returns

`ZodFunction`&lt;`Args`, `NewReturnType`&gt;

***

### returnType()

```ts
returnType(): Returns;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:716

#### Returns

`Returns`

***

### safeParse()

```ts
safeParse(data, params?): SafeParseReturnType<InnerTypeOfFunction<Args, Returns>, OuterTypeOfFunction<Args, Returns>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:65

#### Parameters

##### data

`unknown`

##### params?

[`InexactPartial`](../namespaces/util/type-aliases/InexactPartial.md)&lt;[`ParseParams`](../type-aliases/ParseParams.md)&gt;

#### Returns

[`SafeParseReturnType`](../type-aliases/SafeParseReturnType.md)&lt;[`InnerTypeOfFunction`](../type-aliases/InnerTypeOfFunction.md)&lt;`Args`, `Returns`&gt;, [`OuterTypeOfFunction`](../type-aliases/OuterTypeOfFunction.md)&lt;`Args`, `Returns`&gt;&gt;

#### Inherited from

[`Schema`](Schema.md).[`safeParse`](Schema.md#safeparse)

***

### safeParseAsync()

```ts
safeParseAsync(data, params?): Promise<SafeParseReturnType<InnerTypeOfFunction<Args, Returns>, OuterTypeOfFunction<Args, Returns>>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:68

#### Parameters

##### data

`unknown`

##### params?

[`InexactPartial`](../namespaces/util/type-aliases/InexactPartial.md)&lt;[`ParseParams`](../type-aliases/ParseParams.md)&gt;

#### Returns

`Promise`&lt;[`SafeParseReturnType`](../type-aliases/SafeParseReturnType.md)&lt;[`InnerTypeOfFunction`](../type-aliases/InnerTypeOfFunction.md)&lt;`Args`, `Returns`&gt;, [`OuterTypeOfFunction`](../type-aliases/OuterTypeOfFunction.md)&lt;`Args`, `Returns`&gt;&gt;&gt;

#### Inherited from

[`Schema`](Schema.md).[`safeParseAsync`](Schema.md#safeparseasync)

***

### strictImplement()

```ts
strictImplement(func): InnerTypeOfFunction<Args, Returns>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:720

#### Parameters

##### func

[`InnerTypeOfFunction`](../type-aliases/InnerTypeOfFunction.md)&lt;`Args`, `Returns`&gt;

#### Returns

[`InnerTypeOfFunction`](../type-aliases/InnerTypeOfFunction.md)&lt;`Args`, `Returns`&gt;

***

### superRefine()

#### Call Signature

```ts
superRefine<RefinedOutput>(refinement): ZodEffects<ZodFunction<Args, Returns>, RefinedOutput, InnerTypeOfFunction<Args, Returns>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:76

##### Type Parameters

###### RefinedOutput

`RefinedOutput` *extends* (...`args`) => `Returns`\[`"_output"`\]

##### Parameters

###### refinement

(`arg`, `ctx`) => `arg is RefinedOutput`

##### Returns

[`ZodEffects`](ZodEffects.md)&lt;`ZodFunction`&lt;`Args`, `Returns`&gt;, `RefinedOutput`, [`InnerTypeOfFunction`](../type-aliases/InnerTypeOfFunction.md)&lt;`Args`, `Returns`&gt;&gt;

##### Inherited from

[`Schema`](Schema.md).[`superRefine`](Schema.md#superrefine)

#### Call Signature

```ts
superRefine(refinement): ZodEffects<ZodFunction<Args, Returns>, OuterTypeOfFunction<Args, Returns>, InnerTypeOfFunction<Args, Returns>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:77

##### Parameters

###### refinement

(`arg`, `ctx`) => `void`

##### Returns

[`ZodEffects`](ZodEffects.md)&lt;`ZodFunction`&lt;`Args`, `Returns`&gt;, [`OuterTypeOfFunction`](../type-aliases/OuterTypeOfFunction.md)&lt;`Args`, `Returns`&gt;, [`InnerTypeOfFunction`](../type-aliases/InnerTypeOfFunction.md)&lt;`Args`, `Returns`&gt;&gt;

##### Inherited from

[`Schema`](Schema.md).[`superRefine`](Schema.md#superrefine)

#### Call Signature

```ts
superRefine(refinement): ZodEffects<ZodFunction<Args, Returns>, OuterTypeOfFunction<Args, Returns>, InnerTypeOfFunction<Args, Returns>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:78

##### Parameters

###### refinement

(`arg`, `ctx`) => `Promise`&lt;`void`&gt;

##### Returns

[`ZodEffects`](ZodEffects.md)&lt;`ZodFunction`&lt;`Args`, `Returns`&gt;, [`OuterTypeOfFunction`](../type-aliases/OuterTypeOfFunction.md)&lt;`Args`, `Returns`&gt;, [`InnerTypeOfFunction`](../type-aliases/InnerTypeOfFunction.md)&lt;`Args`, `Returns`&gt;&gt;

##### Inherited from

[`Schema`](Schema.md).[`superRefine`](Schema.md#superrefine)

***

### transform()

```ts
transform<NewOut>(transform): ZodEffects<ZodFunction<Args, Returns>, NewOut>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:87

#### Type Parameters

##### NewOut

`NewOut`

#### Parameters

##### transform

(`arg`, `ctx`) => `NewOut` \| `Promise`&lt;`NewOut`&gt;

#### Returns

[`ZodEffects`](ZodEffects.md)&lt;`ZodFunction`&lt;`Args`, `Returns`&gt;, `NewOut`&gt;

#### Inherited from

[`Schema`](Schema.md).[`transform`](Schema.md#transform)

***

### create()

#### Call Signature

```ts
static create(): ZodFunction<ZodTuple<[], ZodUnknown>, ZodUnknown>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:722

##### Returns

`ZodFunction`&lt;[`ZodTuple`](ZodTuple.md)&lt;\[\], [`ZodUnknown`](ZodUnknown.md)&gt;, [`ZodUnknown`](ZodUnknown.md)&gt;

#### Call Signature

```ts
static create<T>(args): ZodFunction<T, ZodUnknown>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:723

##### Type Parameters

###### T

`T` *extends* [`AnyZodTuple`](../type-aliases/AnyZodTuple.md) = [`ZodTuple`](ZodTuple.md)&lt;\[\], [`ZodUnknown`](ZodUnknown.md)&gt;

##### Parameters

###### args

`T`

##### Returns

`ZodFunction`&lt;`T`, [`ZodUnknown`](ZodUnknown.md)&gt;

#### Call Signature

```ts
static create<T, U>(args, returns): ZodFunction<T, U>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:724

##### Type Parameters

###### T

`T` *extends* [`AnyZodTuple`](../type-aliases/AnyZodTuple.md)

###### U

`U` *extends* [`ZodTypeAny`](../type-aliases/ZodTypeAny.md)

##### Parameters

###### args

`T`

###### returns

`U`

##### Returns

`ZodFunction`&lt;`T`, `U`&gt;

#### Call Signature

```ts
static create<T, U>(
   args, 
   returns, 
   params?): ZodFunction<T, U>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:725

##### Type Parameters

###### T

`T` *extends* [`AnyZodTuple`](../type-aliases/AnyZodTuple.md) = [`ZodTuple`](ZodTuple.md)&lt;\[\], [`ZodUnknown`](ZodUnknown.md)&gt;

###### U

`U` *extends* [`ZodTypeAny`](../type-aliases/ZodTypeAny.md) = [`ZodUnknown`](ZodUnknown.md)

##### Parameters

###### args

`T`

###### returns

`U`

###### params?

[`RawCreateParams`](../type-aliases/RawCreateParams.md)

##### Returns

`ZodFunction`&lt;`T`, `U`&gt;
