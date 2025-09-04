[**Documentation**](../../../../../README.md)

***

[Documentation](../../../../../README.md) / [@6edesign/microservice](../../../README.md) / [](../../../README.md) / [z](../README.md) / ZodString

# Class: ZodString

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:210

## Extends

- [`Schema`](Schema.md)&lt;`string`, [`ZodStringDef`](../interfaces/ZodStringDef.md), `string`&gt;

## Constructors

### Constructor

```ts
new ZodString(def): ZodString;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:79

#### Parameters

##### def

[`ZodStringDef`](../interfaces/ZodStringDef.md)

#### Returns

`ZodString`

#### Inherited from

[`Schema`](Schema.md).[`constructor`](Schema.md#constructor)

## Properties

### \_def

```ts
readonly _def: ZodStringDef;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:52

#### Inherited from

[`Schema`](Schema.md).[`_def`](Schema.md#_def)

***

### \_input

```ts
readonly _input: string;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:51

#### Inherited from

[`Schema`](Schema.md).[`_input`](Schema.md#_input)

***

### \_output

```ts
readonly _output: string;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:50

#### Inherited from

[`Schema`](Schema.md).[`_output`](Schema.md#_output)

***

### \_type

```ts
readonly _type: string;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:49

#### Inherited from

[`Schema`](Schema.md).[`_type`](Schema.md#_type)

***

### ~standard

```ts
~standard: Props<string, string>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:54

#### Inherited from

[`Schema`](Schema.md).[`~standard`](Schema.md#standard)

***

### spa()

```ts
spa: (data, params?) => Promise<SafeParseReturnType<string, string>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:70

Alias of safeParseAsync

#### Parameters

##### data

`unknown`

##### params?

[`InexactPartial`](../namespaces/util/type-aliases/InexactPartial.md)&lt;[`ParseParams`](../type-aliases/ParseParams.md)&gt;

#### Returns

`Promise`&lt;[`SafeParseReturnType`](../type-aliases/SafeParseReturnType.md)&lt;`string`, `string`&gt;&gt;

#### Inherited from

[`Schema`](Schema.md).[`spa`](Schema.md#spa)

***

### create()

```ts
static create: (params?) => ZodString;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:283

#### Parameters

##### params?

`object` & `object`

#### Returns

`ZodString`

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

### isBase64

#### Get Signature

```ts
get isBase64(): boolean;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:279

##### Returns

`boolean`

***

### isBase64url

#### Get Signature

```ts
get isBase64url(): boolean;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:280

##### Returns

`boolean`

***

### isCIDR

#### Get Signature

```ts
get isCIDR(): boolean;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:278

##### Returns

`boolean`

***

### isCUID

#### Get Signature

```ts
get isCUID(): boolean;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:274

##### Returns

`boolean`

***

### isCUID2

#### Get Signature

```ts
get isCUID2(): boolean;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:275

##### Returns

`boolean`

***

### isDate

#### Get Signature

```ts
get isDate(): boolean;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:266

##### Returns

`boolean`

***

### isDatetime

#### Get Signature

```ts
get isDatetime(): boolean;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:265

##### Returns

`boolean`

***

### isDuration

#### Get Signature

```ts
get isDuration(): boolean;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:268

##### Returns

`boolean`

***

### isEmail

#### Get Signature

```ts
get isEmail(): boolean;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:269

##### Returns

`boolean`

***

### isEmoji

#### Get Signature

```ts
get isEmoji(): boolean;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:271

##### Returns

`boolean`

***

### isIP

#### Get Signature

```ts
get isIP(): boolean;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:277

##### Returns

`boolean`

***

### isNANOID

#### Get Signature

```ts
get isNANOID(): boolean;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:273

##### Returns

`boolean`

***

### isTime

#### Get Signature

```ts
get isTime(): boolean;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:267

##### Returns

`boolean`

***

### isULID

#### Get Signature

```ts
get isULID(): boolean;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:276

##### Returns

`boolean`

***

### isURL

#### Get Signature

```ts
get isURL(): boolean;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:270

##### Returns

`boolean`

***

### isUUID

#### Get Signature

```ts
get isUUID(): boolean;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:272

##### Returns

`boolean`

***

### maxLength

#### Get Signature

```ts
get maxLength(): null | number;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:282

##### Returns

`null` \| `number`

***

### minLength

#### Get Signature

```ts
get minLength(): null | number;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:281

##### Returns

`null` \| `number`

## Methods

### \_addCheck()

```ts
_addCheck(check): ZodString;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:213

#### Parameters

##### check

[`ZodStringCheck`](../type-aliases/ZodStringCheck.md)

#### Returns

`ZodString`

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
_parse(input): ParseReturnType<string>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:211

#### Parameters

##### input

[`ParseInput`](../type-aliases/ParseInput.md)

#### Returns

[`ParseReturnType`](../type-aliases/ParseReturnType.md)&lt;`string`&gt;

#### Overrides

[`Schema`](Schema.md).[`_parse`](Schema.md#_parse)

***

### \_parseAsync()

```ts
_parseAsync(input): AsyncParseReturnType<string>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:63

#### Parameters

##### input

[`ParseInput`](../type-aliases/ParseInput.md)

#### Returns

[`AsyncParseReturnType`](../type-aliases/AsyncParseReturnType.md)&lt;`string`&gt;

#### Inherited from

[`Schema`](Schema.md).[`_parseAsync`](Schema.md#_parseasync)

***

### \_parseSync()

```ts
_parseSync(input): SyncParseReturnType<string>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:62

#### Parameters

##### input

[`ParseInput`](../type-aliases/ParseInput.md)

#### Returns

[`SyncParseReturnType`](../type-aliases/SyncParseReturnType.md)&lt;`string`&gt;

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
_refinement(refinement): ZodEffects<ZodString, string, string>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:75

#### Parameters

##### refinement

(`arg`, `ctx`) => `any`

#### Returns

[`ZodEffects`](ZodEffects.md)&lt;`ZodString`, `string`, `string`&gt;

#### Inherited from

[`Schema`](Schema.md).[`_refinement`](Schema.md#_refinement)

***

### \_regex()

```ts
protected _regex(
   regex, 
   validation, 
   message?): ZodEffects<ZodString, string, string>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:212

#### Parameters

##### regex

`RegExp`

##### validation

[`StringValidation`](../type-aliases/StringValidation.md)

##### message?

`ErrMessage`

#### Returns

[`ZodEffects`](ZodEffects.md)&lt;`ZodString`, `string`, `string`&gt;

***

### ~validate()

```ts
~validate(data): Result<string> | Promise<Result<string>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:66

#### Parameters

##### data

`unknown`

#### Returns

`Result`&lt;`string`&gt; \| `Promise`&lt;`Result`&lt;`string`&gt;&gt;

#### Inherited from

[`Schema`](Schema.md).[`~validate`](Schema.md#validate)

***

### and()

```ts
and<T>(incoming): ZodIntersection<ZodString, T>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:86

#### Type Parameters

##### T

`T` *extends* [`ZodTypeAny`](../type-aliases/ZodTypeAny.md)

#### Parameters

##### incoming

`T`

#### Returns

[`ZodIntersection`](ZodIntersection.md)&lt;`ZodString`, `T`&gt;

#### Inherited from

[`Schema`](Schema.md).[`and`](Schema.md#and)

***

### array()

```ts
array(): ZodArray<ZodString>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:83

#### Returns

[`ZodArray`](ZodArray.md)&lt;`ZodString`&gt;

#### Inherited from

[`Schema`](Schema.md).[`array`](Schema.md#array)

***

### base64()

```ts
base64(message?): ZodString;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:222

#### Parameters

##### message?

`ErrMessage`

#### Returns

`ZodString`

***

### base64url()

```ts
base64url(message?): ZodString;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:223

#### Parameters

##### message?

`ErrMessage`

#### Returns

`ZodString`

***

### brand()

```ts
brand<B>(brand?): ZodBranded<ZodString, B>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:90

#### Type Parameters

##### B

`B` *extends* `string` \| `number` \| `symbol`

#### Parameters

##### brand?

`B`

#### Returns

[`ZodBranded`](ZodBranded.md)&lt;`ZodString`, `B`&gt;

#### Inherited from

[`Schema`](Schema.md).[`brand`](Schema.md#brand)

***

### catch()

#### Call Signature

```ts
catch(def): ZodCatch<ZodString>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:91

##### Parameters

###### def

`string`

##### Returns

[`ZodCatch`](ZodCatch.md)&lt;`ZodString`&gt;

##### Inherited from

[`Schema`](Schema.md).[`catch`](Schema.md#catch)

#### Call Signature

```ts
catch(def): ZodCatch<ZodString>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:92

##### Parameters

###### def

(`ctx`) => `string`

##### Returns

[`ZodCatch`](ZodCatch.md)&lt;`ZodString`&gt;

##### Inherited from

[`Schema`](Schema.md).[`catch`](Schema.md#catch)

***

### cidr()

```ts
cidr(options?): ZodString;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:232

#### Parameters

##### options?

`string` | \{
`message?`: `string`;
`version?`: [`IpVersion`](../type-aliases/IpVersion.md);
\}

#### Returns

`ZodString`

***

### cuid()

```ts
cuid(message?): ZodString;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:219

#### Parameters

##### message?

`ErrMessage`

#### Returns

`ZodString`

***

### cuid2()

```ts
cuid2(message?): ZodString;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:220

#### Parameters

##### message?

`ErrMessage`

#### Returns

`ZodString`

***

### date()

```ts
date(message?): ZodString;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:242

#### Parameters

##### message?

`string`

#### Returns

`ZodString`

***

### datetime()

```ts
datetime(options?): ZodString;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:236

#### Parameters

##### options?

`string` | \{
`local?`: `boolean`;
`message?`: `string`;
`offset?`: `boolean`;
`precision?`: `null` \| `number`;
\}

#### Returns

`ZodString`

***

### default()

#### Call Signature

```ts
default(def): ZodDefault<ZodString>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:88

##### Parameters

###### def

`string`

##### Returns

[`ZodDefault`](ZodDefault.md)&lt;`ZodString`&gt;

##### Inherited from

[`Schema`](Schema.md).[`default`](Schema.md#default)

#### Call Signature

```ts
default(def): ZodDefault<ZodString>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:89

##### Parameters

###### def

() => `string`

##### Returns

[`ZodDefault`](ZodDefault.md)&lt;`ZodString`&gt;

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

### duration()

```ts
duration(message?): ZodString;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:247

#### Parameters

##### message?

`ErrMessage`

#### Returns

`ZodString`

***

### email()

```ts
email(message?): ZodString;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:214

#### Parameters

##### message?

`ErrMessage`

#### Returns

`ZodString`

***

### emoji()

```ts
emoji(message?): ZodString;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:216

#### Parameters

##### message?

`ErrMessage`

#### Returns

`ZodString`

***

### endsWith()

```ts
endsWith(value, message?): ZodString;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:254

#### Parameters

##### value

`string`

##### message?

`ErrMessage`

#### Returns

`ZodString`

***

### includes()

```ts
includes(value, options?): ZodString;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:249

#### Parameters

##### value

`string`

##### options?

###### message?

`string`

###### position?

`number`

#### Returns

`ZodString`

***

### ip()

```ts
ip(options?): ZodString;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:228

#### Parameters

##### options?

`string` | \{
`message?`: `string`;
`version?`: [`IpVersion`](../type-aliases/IpVersion.md);
\}

#### Returns

`ZodString`

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

### jwt()

```ts
jwt(options?): ZodString;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:224

#### Parameters

##### options?

###### alg?

`string`

###### message?

`string`

#### Returns

`ZodString`

***

### length()

```ts
length(len, message?): ZodString;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:257

#### Parameters

##### len

`number`

##### message?

`ErrMessage`

#### Returns

`ZodString`

***

### max()

```ts
max(maxLength, message?): ZodString;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:256

#### Parameters

##### maxLength

`number`

##### message?

`ErrMessage`

#### Returns

`ZodString`

***

### min()

```ts
min(minLength, message?): ZodString;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:255

#### Parameters

##### minLength

`number`

##### message?

`ErrMessage`

#### Returns

`ZodString`

***

### nanoid()

```ts
nanoid(message?): ZodString;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:218

#### Parameters

##### message?

`ErrMessage`

#### Returns

`ZodString`

***

### nonempty()

```ts
nonempty(message?): ZodString;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:261

Equivalent to `.min(1)`

#### Parameters

##### message?

`ErrMessage`

#### Returns

`ZodString`

***

### nullable()

```ts
nullable(): ZodNullable<ZodString>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:81

#### Returns

[`ZodNullable`](ZodNullable.md)&lt;`ZodString`&gt;

#### Inherited from

[`Schema`](Schema.md).[`nullable`](Schema.md#nullable)

***

### nullish()

```ts
nullish(): ZodOptional<ZodNullable<ZodString>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:82

#### Returns

[`ZodOptional`](ZodOptional.md)&lt;[`ZodNullable`](ZodNullable.md)&lt;`ZodString`&gt;&gt;

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
optional(): ZodOptional<ZodString>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:80

#### Returns

[`ZodOptional`](ZodOptional.md)&lt;`ZodString`&gt;

#### Inherited from

[`Schema`](Schema.md).[`optional`](Schema.md#optional)

***

### or()

```ts
or<T>(option): ZodUnion<[ZodString, T]>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:85

#### Type Parameters

##### T

`T` *extends* [`ZodTypeAny`](../type-aliases/ZodTypeAny.md)

#### Parameters

##### option

`T`

#### Returns

[`ZodUnion`](ZodUnion.md)&lt;\[`ZodString`, `T`\]&gt;

#### Inherited from

[`Schema`](Schema.md).[`or`](Schema.md#or)

***

### parse()

```ts
parse(data, params?): string;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:64

#### Parameters

##### data

`unknown`

##### params?

[`InexactPartial`](../namespaces/util/type-aliases/InexactPartial.md)&lt;[`ParseParams`](../type-aliases/ParseParams.md)&gt;

#### Returns

`string`

#### Inherited from

[`Schema`](Schema.md).[`parse`](Schema.md#parse)

***

### parseAsync()

```ts
parseAsync(data, params?): Promise<string>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:67

#### Parameters

##### data

`unknown`

##### params?

[`InexactPartial`](../namespaces/util/type-aliases/InexactPartial.md)&lt;[`ParseParams`](../type-aliases/ParseParams.md)&gt;

#### Returns

`Promise`&lt;`string`&gt;

#### Inherited from

[`Schema`](Schema.md).[`parseAsync`](Schema.md#parseasync)

***

### pipe()

```ts
pipe<T>(target): ZodPipeline<ZodString, T>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:97

#### Type Parameters

##### T

`T` *extends* [`ZodTypeAny`](../type-aliases/ZodTypeAny.md)

#### Parameters

##### target

`T`

#### Returns

[`ZodPipeline`](ZodPipeline.md)&lt;`ZodString`, `T`&gt;

#### Inherited from

[`Schema`](Schema.md).[`pipe`](Schema.md#pipe)

***

### promise()

```ts
promise(): ZodPromise<ZodString>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:84

#### Returns

[`ZodPromise`](ZodPromise.md)&lt;`ZodString`&gt;

#### Inherited from

[`Schema`](Schema.md).[`promise`](Schema.md#promise)

***

### readonly()

```ts
readonly(): ZodReadonly<ZodString>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:98

#### Returns

[`ZodReadonly`](ZodReadonly.md)&lt;`ZodString`&gt;

#### Inherited from

[`Schema`](Schema.md).[`readonly`](Schema.md#readonly)

***

### refine()

#### Call Signature

```ts
refine<RefinedOutput>(check, message?): ZodEffects<ZodString, RefinedOutput, string>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:71

##### Type Parameters

###### RefinedOutput

`RefinedOutput` *extends* `string`

##### Parameters

###### check

(`arg`) => `arg is RefinedOutput`

###### message?

`string` | `Partial`&lt;[`Omit`](../namespaces/util/type-aliases/Omit.md)&lt;[`ZodCustomIssue`](../interfaces/ZodCustomIssue.md), `"code"`&gt;&gt; | (`arg`) => [`CustomErrorParams`](../type-aliases/CustomErrorParams.md)

##### Returns

[`ZodEffects`](ZodEffects.md)&lt;`ZodString`, `RefinedOutput`, `string`&gt;

##### Inherited from

[`Schema`](Schema.md).[`refine`](Schema.md#refine)

#### Call Signature

```ts
refine(check, message?): ZodEffects<ZodString, string, string>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:72

##### Parameters

###### check

(`arg`) => `unknown`

###### message?

`string` | `Partial`&lt;[`Omit`](../namespaces/util/type-aliases/Omit.md)&lt;[`ZodCustomIssue`](../interfaces/ZodCustomIssue.md), `"code"`&gt;&gt; | (`arg`) => [`CustomErrorParams`](../type-aliases/CustomErrorParams.md)

##### Returns

[`ZodEffects`](ZodEffects.md)&lt;`ZodString`, `string`, `string`&gt;

##### Inherited from

[`Schema`](Schema.md).[`refine`](Schema.md#refine)

***

### refinement()

#### Call Signature

```ts
refinement<RefinedOutput>(check, refinementData): ZodEffects<ZodString, RefinedOutput, string>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:73

##### Type Parameters

###### RefinedOutput

`RefinedOutput` *extends* `string`

##### Parameters

###### check

(`arg`) => `arg is RefinedOutput`

###### refinementData

[`IssueData`](../type-aliases/IssueData.md) | (`arg`, `ctx`) => [`IssueData`](../type-aliases/IssueData.md)

##### Returns

[`ZodEffects`](ZodEffects.md)&lt;`ZodString`, `RefinedOutput`, `string`&gt;

##### Inherited from

[`Schema`](Schema.md).[`refinement`](Schema.md#refinement)

#### Call Signature

```ts
refinement(check, refinementData): ZodEffects<ZodString, string, string>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:74

##### Parameters

###### check

(`arg`) => `boolean`

###### refinementData

[`IssueData`](../type-aliases/IssueData.md) | (`arg`, `ctx`) => [`IssueData`](../type-aliases/IssueData.md)

##### Returns

[`ZodEffects`](ZodEffects.md)&lt;`ZodString`, `string`, `string`&gt;

##### Inherited from

[`Schema`](Schema.md).[`refinement`](Schema.md#refinement)

***

### regex()

```ts
regex(regex, message?): ZodString;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:248

#### Parameters

##### regex

`RegExp`

##### message?

`ErrMessage`

#### Returns

`ZodString`

***

### safeParse()

```ts
safeParse(data, params?): SafeParseReturnType<string, string>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:65

#### Parameters

##### data

`unknown`

##### params?

[`InexactPartial`](../namespaces/util/type-aliases/InexactPartial.md)&lt;[`ParseParams`](../type-aliases/ParseParams.md)&gt;

#### Returns

[`SafeParseReturnType`](../type-aliases/SafeParseReturnType.md)&lt;`string`, `string`&gt;

#### Inherited from

[`Schema`](Schema.md).[`safeParse`](Schema.md#safeparse)

***

### safeParseAsync()

```ts
safeParseAsync(data, params?): Promise<SafeParseReturnType<string, string>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:68

#### Parameters

##### data

`unknown`

##### params?

[`InexactPartial`](../namespaces/util/type-aliases/InexactPartial.md)&lt;[`ParseParams`](../type-aliases/ParseParams.md)&gt;

#### Returns

`Promise`&lt;[`SafeParseReturnType`](../type-aliases/SafeParseReturnType.md)&lt;`string`, `string`&gt;&gt;

#### Inherited from

[`Schema`](Schema.md).[`safeParseAsync`](Schema.md#safeparseasync)

***

### startsWith()

```ts
startsWith(value, message?): ZodString;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:253

#### Parameters

##### value

`string`

##### message?

`ErrMessage`

#### Returns

`ZodString`

***

### superRefine()

#### Call Signature

```ts
superRefine<RefinedOutput>(refinement): ZodEffects<ZodString, RefinedOutput, string>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:76

##### Type Parameters

###### RefinedOutput

`RefinedOutput` *extends* `string`

##### Parameters

###### refinement

(`arg`, `ctx`) => `arg is RefinedOutput`

##### Returns

[`ZodEffects`](ZodEffects.md)&lt;`ZodString`, `RefinedOutput`, `string`&gt;

##### Inherited from

[`Schema`](Schema.md).[`superRefine`](Schema.md#superrefine)

#### Call Signature

```ts
superRefine(refinement): ZodEffects<ZodString, string, string>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:77

##### Parameters

###### refinement

(`arg`, `ctx`) => `void`

##### Returns

[`ZodEffects`](ZodEffects.md)&lt;`ZodString`, `string`, `string`&gt;

##### Inherited from

[`Schema`](Schema.md).[`superRefine`](Schema.md#superrefine)

#### Call Signature

```ts
superRefine(refinement): ZodEffects<ZodString, string, string>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:78

##### Parameters

###### refinement

(`arg`, `ctx`) => `Promise`&lt;`void`&gt;

##### Returns

[`ZodEffects`](ZodEffects.md)&lt;`ZodString`, `string`, `string`&gt;

##### Inherited from

[`Schema`](Schema.md).[`superRefine`](Schema.md#superrefine)

***

### time()

```ts
time(options?): ZodString;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:243

#### Parameters

##### options?

`string` | \{
`message?`: `string`;
`precision?`: `null` \| `number`;
\}

#### Returns

`ZodString`

***

### toLowerCase()

```ts
toLowerCase(): ZodString;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:263

#### Returns

`ZodString`

***

### toUpperCase()

```ts
toUpperCase(): ZodString;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:264

#### Returns

`ZodString`

***

### transform()

```ts
transform<NewOut>(transform): ZodEffects<ZodString, NewOut>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:87

#### Type Parameters

##### NewOut

`NewOut`

#### Parameters

##### transform

(`arg`, `ctx`) => `NewOut` \| `Promise`&lt;`NewOut`&gt;

#### Returns

[`ZodEffects`](ZodEffects.md)&lt;`ZodString`, `NewOut`&gt;

#### Inherited from

[`Schema`](Schema.md).[`transform`](Schema.md#transform)

***

### trim()

```ts
trim(): ZodString;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:262

#### Returns

`ZodString`

***

### ulid()

```ts
ulid(message?): ZodString;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:221

#### Parameters

##### message?

`ErrMessage`

#### Returns

`ZodString`

***

### url()

```ts
url(message?): ZodString;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:215

#### Parameters

##### message?

`ErrMessage`

#### Returns

`ZodString`

***

### uuid()

```ts
uuid(message?): ZodString;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:217

#### Parameters

##### message?

`ErrMessage`

#### Returns

`ZodString`
