[**Documentation**](../../../../../README.md)

***

[Documentation](../../../../../README.md) / [@6edesign/microservice](../../../README.md) / [](../../../README.md) / [z](../README.md) / ZodRecord

# Class: ZodRecord&lt;Key, Value&gt;

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:667

## Extends

- [`Schema`](Schema.md)&lt;[`RecordType`](../type-aliases/RecordType.md)&lt;`Key`\[`"_output"`\], `Value`\[`"_output"`\]&gt;, [`ZodRecordDef`](../interfaces/ZodRecordDef.md)&lt;`Key`, `Value`&gt;, [`RecordType`](../type-aliases/RecordType.md)&lt;`Key`\[`"_input"`\], `Value`\[`"_input"`\]&gt;&gt;

## Type Parameters

### Key

`Key` *extends* [`KeySchema`](../type-aliases/KeySchema.md) = [`ZodString`](ZodString.md)

### Value

`Value` *extends* [`ZodTypeAny`](../type-aliases/ZodTypeAny.md) = [`ZodTypeAny`](../type-aliases/ZodTypeAny.md)

## Constructors

### Constructor

```ts
new ZodRecord<Key, Value>(def): ZodRecord<Key, Value>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:79

#### Parameters

##### def

[`ZodRecordDef`](../interfaces/ZodRecordDef.md)

#### Returns

`ZodRecord`&lt;`Key`, `Value`&gt;

#### Inherited from

[`Schema`](Schema.md).[`constructor`](Schema.md#constructor)

## Properties

### \_def

```ts
readonly _def: ZodRecordDef;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:52

#### Inherited from

[`Schema`](Schema.md).[`_def`](Schema.md#_def)

***

### \_input

```ts
readonly _input: RecordType;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:51

#### Inherited from

[`Schema`](Schema.md).[`_input`](Schema.md#_input)

***

### \_output

```ts
readonly _output: RecordType;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:50

#### Inherited from

[`Schema`](Schema.md).[`_output`](Schema.md#_output)

***

### \_type

```ts
readonly _type: RecordType;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:49

#### Inherited from

[`Schema`](Schema.md).[`_type`](Schema.md#_type)

***

### ~standard

```ts
~standard: Props<RecordType<Key["_input"], Value["_input"]>, RecordType<Key["_output"], Value["_output"]>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:54

#### Inherited from

[`Schema`](Schema.md).[`~standard`](Schema.md#standard)

***

### spa()

```ts
spa: (data, params?) => Promise<SafeParseReturnType<RecordType<Key["_input"], Value["_input"]>, RecordType<Key["_output"], Value["_output"]>>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:70

Alias of safeParseAsync

#### Parameters

##### data

`unknown`

##### params?

[`InexactPartial`](../namespaces/util/type-aliases/InexactPartial.md)&lt;[`ParseParams`](../type-aliases/ParseParams.md)&gt;

#### Returns

`Promise`&lt;[`SafeParseReturnType`](../type-aliases/SafeParseReturnType.md)&lt;[`RecordType`](../type-aliases/RecordType.md)&lt;`Key`\[`"_input"`\], `Value`\[`"_input"`\]&gt;, [`RecordType`](../type-aliases/RecordType.md)&lt;`Key`\[`"_output"`\], `Value`\[`"_output"`\]&gt;&gt;&gt;

#### Inherited from

[`Schema`](Schema.md).[`spa`](Schema.md#spa)

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

### element

#### Get Signature

```ts
get element(): Value;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:671

##### Returns

`Value`

***

### keySchema

#### Get Signature

```ts
get keySchema(): Key;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:668

##### Returns

`Key`

***

### valueSchema

#### Get Signature

```ts
get valueSchema(): Value;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:669

##### Returns

`Value`

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
_parse(input): ParseReturnType<RecordType<Key["_output"], Value["_output"]>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:670

#### Parameters

##### input

[`ParseInput`](../type-aliases/ParseInput.md)

#### Returns

[`ParseReturnType`](../type-aliases/ParseReturnType.md)&lt;[`RecordType`](../type-aliases/RecordType.md)&lt;`Key`\[`"_output"`\], `Value`\[`"_output"`\]&gt;&gt;

#### Overrides

[`Schema`](Schema.md).[`_parse`](Schema.md#_parse)

***

### \_parseAsync()

```ts
_parseAsync(input): AsyncParseReturnType<RecordType<Key["_output"], Value["_output"]>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:63

#### Parameters

##### input

[`ParseInput`](../type-aliases/ParseInput.md)

#### Returns

[`AsyncParseReturnType`](../type-aliases/AsyncParseReturnType.md)&lt;[`RecordType`](../type-aliases/RecordType.md)&lt;`Key`\[`"_output"`\], `Value`\[`"_output"`\]&gt;&gt;

#### Inherited from

[`Schema`](Schema.md).[`_parseAsync`](Schema.md#_parseasync)

***

### \_parseSync()

```ts
_parseSync(input): SyncParseReturnType<RecordType<Key["_output"], Value["_output"]>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:62

#### Parameters

##### input

[`ParseInput`](../type-aliases/ParseInput.md)

#### Returns

[`SyncParseReturnType`](../type-aliases/SyncParseReturnType.md)&lt;[`RecordType`](../type-aliases/RecordType.md)&lt;`Key`\[`"_output"`\], `Value`\[`"_output"`\]&gt;&gt;

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
_refinement(refinement): ZodEffects<ZodRecord<Key, Value>, RecordType<Key["_output"], Value["_output"]>, RecordType<Key["_input"], Value["_input"]>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:75

#### Parameters

##### refinement

(`arg`, `ctx`) => `any`

#### Returns

[`ZodEffects`](ZodEffects.md)&lt;`ZodRecord`&lt;`Key`, `Value`&gt;, [`RecordType`](../type-aliases/RecordType.md)&lt;`Key`\[`"_output"`\], `Value`\[`"_output"`\]&gt;, [`RecordType`](../type-aliases/RecordType.md)&lt;`Key`\[`"_input"`\], `Value`\[`"_input"`\]&gt;&gt;

#### Inherited from

[`Schema`](Schema.md).[`_refinement`](Schema.md#_refinement)

***

### ~validate()

```ts
~validate(data): 
  | Result<RecordType<Key["_output"], Value["_output"]>>
  | Promise<Result<RecordType<Key["_output"], Value["_output"]>>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:66

#### Parameters

##### data

`unknown`

#### Returns

  \| `Result`&lt;[`RecordType`](../type-aliases/RecordType.md)&lt;`Key`\[`"_output"`\], `Value`\[`"_output"`\]&gt;&gt;
  \| `Promise`&lt;`Result`&lt;[`RecordType`](../type-aliases/RecordType.md)&lt;`Key`\[`"_output"`\], `Value`\[`"_output"`\]&gt;&gt;&gt;

#### Inherited from

[`Schema`](Schema.md).[`~validate`](Schema.md#validate)

***

### and()

```ts
and<T>(incoming): ZodIntersection<ZodRecord<Key, Value>, T>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:86

#### Type Parameters

##### T

`T` *extends* [`ZodTypeAny`](../type-aliases/ZodTypeAny.md)

#### Parameters

##### incoming

`T`

#### Returns

[`ZodIntersection`](ZodIntersection.md)&lt;`ZodRecord`&lt;`Key`, `Value`&gt;, `T`&gt;

#### Inherited from

[`Schema`](Schema.md).[`and`](Schema.md#and)

***

### array()

```ts
array(): ZodArray<ZodRecord<Key, Value>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:83

#### Returns

[`ZodArray`](ZodArray.md)&lt;`ZodRecord`&lt;`Key`, `Value`&gt;&gt;

#### Inherited from

[`Schema`](Schema.md).[`array`](Schema.md#array)

***

### brand()

```ts
brand<B>(brand?): ZodBranded<ZodRecord<Key, Value>, B>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:90

#### Type Parameters

##### B

`B` *extends* `string` \| `number` \| `symbol`

#### Parameters

##### brand?

`B`

#### Returns

[`ZodBranded`](ZodBranded.md)&lt;`ZodRecord`&lt;`Key`, `Value`&gt;, `B`&gt;

#### Inherited from

[`Schema`](Schema.md).[`brand`](Schema.md#brand)

***

### catch()

#### Call Signature

```ts
catch(def): ZodCatch<ZodRecord<Key, Value>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:91

##### Parameters

###### def

[`RecordType`](../type-aliases/RecordType.md)

##### Returns

[`ZodCatch`](ZodCatch.md)&lt;`ZodRecord`&lt;`Key`, `Value`&gt;&gt;

##### Inherited from

[`Schema`](Schema.md).[`catch`](Schema.md#catch)

#### Call Signature

```ts
catch(def): ZodCatch<ZodRecord<Key, Value>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:92

##### Parameters

###### def

(`ctx`) => [`RecordType`](../type-aliases/RecordType.md)

##### Returns

[`ZodCatch`](ZodCatch.md)&lt;`ZodRecord`&lt;`Key`, `Value`&gt;&gt;

##### Inherited from

[`Schema`](Schema.md).[`catch`](Schema.md#catch)

***

### default()

#### Call Signature

```ts
default(def): ZodDefault<ZodRecord<Key, Value>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:88

##### Parameters

###### def

[`noUndefined`](../namespaces/util/type-aliases/noUndefined.md)&lt;[`RecordType`](../type-aliases/RecordType.md)&lt;`Key`\[`"_input"`\], `Value`\[`"_input"`\]&gt;&gt;

##### Returns

[`ZodDefault`](ZodDefault.md)&lt;`ZodRecord`&lt;`Key`, `Value`&gt;&gt;

##### Inherited from

[`Schema`](Schema.md).[`default`](Schema.md#default)

#### Call Signature

```ts
default(def): ZodDefault<ZodRecord<Key, Value>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:89

##### Parameters

###### def

() => [`noUndefined`](../namespaces/util/type-aliases/noUndefined.md)&lt;[`RecordType`](../type-aliases/RecordType.md)&lt;`Key`\[`"_input"`\], `Value`\[`"_input"`\]&gt;&gt;

##### Returns

[`ZodDefault`](ZodDefault.md)&lt;`ZodRecord`&lt;`Key`, `Value`&gt;&gt;

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
nullable(): ZodNullable<ZodRecord<Key, Value>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:81

#### Returns

[`ZodNullable`](ZodNullable.md)&lt;`ZodRecord`&lt;`Key`, `Value`&gt;&gt;

#### Inherited from

[`Schema`](Schema.md).[`nullable`](Schema.md#nullable)

***

### nullish()

```ts
nullish(): ZodOptional<ZodNullable<ZodRecord<Key, Value>>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:82

#### Returns

[`ZodOptional`](ZodOptional.md)&lt;[`ZodNullable`](ZodNullable.md)&lt;`ZodRecord`&lt;`Key`, `Value`&gt;&gt;&gt;

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
optional(): ZodOptional<ZodRecord<Key, Value>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:80

#### Returns

[`ZodOptional`](ZodOptional.md)&lt;`ZodRecord`&lt;`Key`, `Value`&gt;&gt;

#### Inherited from

[`Schema`](Schema.md).[`optional`](Schema.md#optional)

***

### or()

```ts
or<T>(option): ZodUnion<[ZodRecord<Key, Value>, T]>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:85

#### Type Parameters

##### T

`T` *extends* [`ZodTypeAny`](../type-aliases/ZodTypeAny.md)

#### Parameters

##### option

`T`

#### Returns

[`ZodUnion`](ZodUnion.md)&lt;\[`ZodRecord`&lt;`Key`, `Value`&gt;, `T`\]&gt;

#### Inherited from

[`Schema`](Schema.md).[`or`](Schema.md#or)

***

### parse()

```ts
parse(data, params?): RecordType;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:64

#### Parameters

##### data

`unknown`

##### params?

[`InexactPartial`](../namespaces/util/type-aliases/InexactPartial.md)&lt;[`ParseParams`](../type-aliases/ParseParams.md)&gt;

#### Returns

[`RecordType`](../type-aliases/RecordType.md)

#### Inherited from

[`Schema`](Schema.md).[`parse`](Schema.md#parse)

***

### parseAsync()

```ts
parseAsync(data, params?): Promise<RecordType<Key["_output"], Value["_output"]>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:67

#### Parameters

##### data

`unknown`

##### params?

[`InexactPartial`](../namespaces/util/type-aliases/InexactPartial.md)&lt;[`ParseParams`](../type-aliases/ParseParams.md)&gt;

#### Returns

`Promise`&lt;[`RecordType`](../type-aliases/RecordType.md)&lt;`Key`\[`"_output"`\], `Value`\[`"_output"`\]&gt;&gt;

#### Inherited from

[`Schema`](Schema.md).[`parseAsync`](Schema.md#parseasync)

***

### pipe()

```ts
pipe<T>(target): ZodPipeline<ZodRecord<Key, Value>, T>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:97

#### Type Parameters

##### T

`T` *extends* [`ZodTypeAny`](../type-aliases/ZodTypeAny.md)

#### Parameters

##### target

`T`

#### Returns

[`ZodPipeline`](ZodPipeline.md)&lt;`ZodRecord`&lt;`Key`, `Value`&gt;, `T`&gt;

#### Inherited from

[`Schema`](Schema.md).[`pipe`](Schema.md#pipe)

***

### promise()

```ts
promise(): ZodPromise<ZodRecord<Key, Value>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:84

#### Returns

[`ZodPromise`](ZodPromise.md)&lt;`ZodRecord`&lt;`Key`, `Value`&gt;&gt;

#### Inherited from

[`Schema`](Schema.md).[`promise`](Schema.md#promise)

***

### readonly()

```ts
readonly(): ZodReadonly<ZodRecord<Key, Value>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:98

#### Returns

[`ZodReadonly`](ZodReadonly.md)&lt;`ZodRecord`&lt;`Key`, `Value`&gt;&gt;

#### Inherited from

[`Schema`](Schema.md).[`readonly`](Schema.md#readonly)

***

### refine()

#### Call Signature

```ts
refine<RefinedOutput>(check, message?): ZodEffects<ZodRecord<Key, Value>, RefinedOutput, RecordType<Key["_input"], Value["_input"]>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:71

##### Type Parameters

###### RefinedOutput

`RefinedOutput` *extends* 
  \| `Record`&lt;`Key`\[`"_output"`\], `Value`\[`"_output"`\]&gt;
  \| `Partial`&lt;`Record`&lt;`Key`\[`"_output"`\], `Value`\[`"_output"`\]&gt;&gt;

##### Parameters

###### check

(`arg`) => `arg is RefinedOutput`

###### message?

`string` | `Partial`&lt;[`Omit`](../namespaces/util/type-aliases/Omit.md)&lt;[`ZodCustomIssue`](../interfaces/ZodCustomIssue.md), `"code"`&gt;&gt; | (`arg`) => [`CustomErrorParams`](../type-aliases/CustomErrorParams.md)

##### Returns

[`ZodEffects`](ZodEffects.md)&lt;`ZodRecord`&lt;`Key`, `Value`&gt;, `RefinedOutput`, [`RecordType`](../type-aliases/RecordType.md)&lt;`Key`\[`"_input"`\], `Value`\[`"_input"`\]&gt;&gt;

##### Inherited from

[`Schema`](Schema.md).[`refine`](Schema.md#refine)

#### Call Signature

```ts
refine(check, message?): ZodEffects<ZodRecord<Key, Value>, RecordType<Key["_output"], Value["_output"]>, RecordType<Key["_input"], Value["_input"]>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:72

##### Parameters

###### check

(`arg`) => `unknown`

###### message?

`string` | `Partial`&lt;[`Omit`](../namespaces/util/type-aliases/Omit.md)&lt;[`ZodCustomIssue`](../interfaces/ZodCustomIssue.md), `"code"`&gt;&gt; | (`arg`) => [`CustomErrorParams`](../type-aliases/CustomErrorParams.md)

##### Returns

[`ZodEffects`](ZodEffects.md)&lt;`ZodRecord`&lt;`Key`, `Value`&gt;, [`RecordType`](../type-aliases/RecordType.md)&lt;`Key`\[`"_output"`\], `Value`\[`"_output"`\]&gt;, [`RecordType`](../type-aliases/RecordType.md)&lt;`Key`\[`"_input"`\], `Value`\[`"_input"`\]&gt;&gt;

##### Inherited from

[`Schema`](Schema.md).[`refine`](Schema.md#refine)

***

### refinement()

#### Call Signature

```ts
refinement<RefinedOutput>(check, refinementData): ZodEffects<ZodRecord<Key, Value>, RefinedOutput, RecordType<Key["_input"], Value["_input"]>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:73

##### Type Parameters

###### RefinedOutput

`RefinedOutput` *extends* 
  \| `Record`&lt;`Key`\[`"_output"`\], `Value`\[`"_output"`\]&gt;
  \| `Partial`&lt;`Record`&lt;`Key`\[`"_output"`\], `Value`\[`"_output"`\]&gt;&gt;

##### Parameters

###### check

(`arg`) => `arg is RefinedOutput`

###### refinementData

[`IssueData`](../type-aliases/IssueData.md) | (`arg`, `ctx`) => [`IssueData`](../type-aliases/IssueData.md)

##### Returns

[`ZodEffects`](ZodEffects.md)&lt;`ZodRecord`&lt;`Key`, `Value`&gt;, `RefinedOutput`, [`RecordType`](../type-aliases/RecordType.md)&lt;`Key`\[`"_input"`\], `Value`\[`"_input"`\]&gt;&gt;

##### Inherited from

[`Schema`](Schema.md).[`refinement`](Schema.md#refinement)

#### Call Signature

```ts
refinement(check, refinementData): ZodEffects<ZodRecord<Key, Value>, RecordType<Key["_output"], Value["_output"]>, RecordType<Key["_input"], Value["_input"]>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:74

##### Parameters

###### check

(`arg`) => `boolean`

###### refinementData

[`IssueData`](../type-aliases/IssueData.md) | (`arg`, `ctx`) => [`IssueData`](../type-aliases/IssueData.md)

##### Returns

[`ZodEffects`](ZodEffects.md)&lt;`ZodRecord`&lt;`Key`, `Value`&gt;, [`RecordType`](../type-aliases/RecordType.md)&lt;`Key`\[`"_output"`\], `Value`\[`"_output"`\]&gt;, [`RecordType`](../type-aliases/RecordType.md)&lt;`Key`\[`"_input"`\], `Value`\[`"_input"`\]&gt;&gt;

##### Inherited from

[`Schema`](Schema.md).[`refinement`](Schema.md#refinement)

***

### safeParse()

```ts
safeParse(data, params?): SafeParseReturnType<RecordType<Key["_input"], Value["_input"]>, RecordType<Key["_output"], Value["_output"]>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:65

#### Parameters

##### data

`unknown`

##### params?

[`InexactPartial`](../namespaces/util/type-aliases/InexactPartial.md)&lt;[`ParseParams`](../type-aliases/ParseParams.md)&gt;

#### Returns

[`SafeParseReturnType`](../type-aliases/SafeParseReturnType.md)&lt;[`RecordType`](../type-aliases/RecordType.md)&lt;`Key`\[`"_input"`\], `Value`\[`"_input"`\]&gt;, [`RecordType`](../type-aliases/RecordType.md)&lt;`Key`\[`"_output"`\], `Value`\[`"_output"`\]&gt;&gt;

#### Inherited from

[`Schema`](Schema.md).[`safeParse`](Schema.md#safeparse)

***

### safeParseAsync()

```ts
safeParseAsync(data, params?): Promise<SafeParseReturnType<RecordType<Key["_input"], Value["_input"]>, RecordType<Key["_output"], Value["_output"]>>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:68

#### Parameters

##### data

`unknown`

##### params?

[`InexactPartial`](../namespaces/util/type-aliases/InexactPartial.md)&lt;[`ParseParams`](../type-aliases/ParseParams.md)&gt;

#### Returns

`Promise`&lt;[`SafeParseReturnType`](../type-aliases/SafeParseReturnType.md)&lt;[`RecordType`](../type-aliases/RecordType.md)&lt;`Key`\[`"_input"`\], `Value`\[`"_input"`\]&gt;, [`RecordType`](../type-aliases/RecordType.md)&lt;`Key`\[`"_output"`\], `Value`\[`"_output"`\]&gt;&gt;&gt;

#### Inherited from

[`Schema`](Schema.md).[`safeParseAsync`](Schema.md#safeparseasync)

***

### superRefine()

#### Call Signature

```ts
superRefine<RefinedOutput>(refinement): ZodEffects<ZodRecord<Key, Value>, RefinedOutput, RecordType<Key["_input"], Value["_input"]>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:76

##### Type Parameters

###### RefinedOutput

`RefinedOutput` *extends* 
  \| `Record`&lt;`Key`\[`"_output"`\], `Value`\[`"_output"`\]&gt;
  \| `Partial`&lt;`Record`&lt;`Key`\[`"_output"`\], `Value`\[`"_output"`\]&gt;&gt;

##### Parameters

###### refinement

(`arg`, `ctx`) => `arg is RefinedOutput`

##### Returns

[`ZodEffects`](ZodEffects.md)&lt;`ZodRecord`&lt;`Key`, `Value`&gt;, `RefinedOutput`, [`RecordType`](../type-aliases/RecordType.md)&lt;`Key`\[`"_input"`\], `Value`\[`"_input"`\]&gt;&gt;

##### Inherited from

[`Schema`](Schema.md).[`superRefine`](Schema.md#superrefine)

#### Call Signature

```ts
superRefine(refinement): ZodEffects<ZodRecord<Key, Value>, RecordType<Key["_output"], Value["_output"]>, RecordType<Key["_input"], Value["_input"]>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:77

##### Parameters

###### refinement

(`arg`, `ctx`) => `void`

##### Returns

[`ZodEffects`](ZodEffects.md)&lt;`ZodRecord`&lt;`Key`, `Value`&gt;, [`RecordType`](../type-aliases/RecordType.md)&lt;`Key`\[`"_output"`\], `Value`\[`"_output"`\]&gt;, [`RecordType`](../type-aliases/RecordType.md)&lt;`Key`\[`"_input"`\], `Value`\[`"_input"`\]&gt;&gt;

##### Inherited from

[`Schema`](Schema.md).[`superRefine`](Schema.md#superrefine)

#### Call Signature

```ts
superRefine(refinement): ZodEffects<ZodRecord<Key, Value>, RecordType<Key["_output"], Value["_output"]>, RecordType<Key["_input"], Value["_input"]>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:78

##### Parameters

###### refinement

(`arg`, `ctx`) => `Promise`&lt;`void`&gt;

##### Returns

[`ZodEffects`](ZodEffects.md)&lt;`ZodRecord`&lt;`Key`, `Value`&gt;, [`RecordType`](../type-aliases/RecordType.md)&lt;`Key`\[`"_output"`\], `Value`\[`"_output"`\]&gt;, [`RecordType`](../type-aliases/RecordType.md)&lt;`Key`\[`"_input"`\], `Value`\[`"_input"`\]&gt;&gt;

##### Inherited from

[`Schema`](Schema.md).[`superRefine`](Schema.md#superrefine)

***

### transform()

```ts
transform<NewOut>(transform): ZodEffects<ZodRecord<Key, Value>, NewOut>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:87

#### Type Parameters

##### NewOut

`NewOut`

#### Parameters

##### transform

(`arg`, `ctx`) => `NewOut` \| `Promise`&lt;`NewOut`&gt;

#### Returns

[`ZodEffects`](ZodEffects.md)&lt;`ZodRecord`&lt;`Key`, `Value`&gt;, `NewOut`&gt;

#### Inherited from

[`Schema`](Schema.md).[`transform`](Schema.md#transform)

***

### create()

#### Call Signature

```ts
static create<Value>(valueType, params?): ZodRecord<ZodString, Value>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:672

##### Type Parameters

###### Value

`Value` *extends* [`ZodTypeAny`](../type-aliases/ZodTypeAny.md)

##### Parameters

###### valueType

`Value`

###### params?

[`RawCreateParams`](../type-aliases/RawCreateParams.md)

##### Returns

`ZodRecord`&lt;[`ZodString`](ZodString.md), `Value`&gt;

#### Call Signature

```ts
static create<Keys, Value>(
   keySchema, 
   valueType, 
   params?): ZodRecord<Keys, Value>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:673

##### Type Parameters

###### Keys

`Keys` *extends* [`KeySchema`](../type-aliases/KeySchema.md)

###### Value

`Value` *extends* [`ZodTypeAny`](../type-aliases/ZodTypeAny.md)

##### Parameters

###### keySchema

`Keys`

###### valueType

`Value`

###### params?

[`RawCreateParams`](../type-aliases/RawCreateParams.md)

##### Returns

`ZodRecord`&lt;`Keys`, `Value`&gt;
