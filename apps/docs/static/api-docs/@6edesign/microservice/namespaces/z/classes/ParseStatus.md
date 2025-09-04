[**Documentation**](../../../../../README.md)

***

[Documentation](../../../../../README.md) / [@6edesign/microservice](../../../README.md) / [](../../../README.md) / [z](../README.md) / ParseStatus

# Class: ParseStatus

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/helpers/parseUtil.d.cts:39

## Constructors

### Constructor

```ts
new ParseStatus(): ParseStatus;
```

#### Returns

`ParseStatus`

## Properties

### value

```ts
value: "valid" | "dirty" | "aborted";
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/helpers/parseUtil.d.cts:40

## Methods

### abort()

```ts
abort(): void;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/helpers/parseUtil.d.cts:42

#### Returns

`void`

***

### dirty()

```ts
dirty(): void;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/helpers/parseUtil.d.cts:41

#### Returns

`void`

***

### mergeArray()

```ts
static mergeArray(status, results): SyncParseReturnType;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/helpers/parseUtil.d.cts:43

#### Parameters

##### status

`ParseStatus`

##### results

[`SyncParseReturnType`](../type-aliases/SyncParseReturnType.md)&lt;`any`&gt;[]

#### Returns

[`SyncParseReturnType`](../type-aliases/SyncParseReturnType.md)

***

### mergeObjectAsync()

```ts
static mergeObjectAsync(status, pairs): Promise<SyncParseReturnType<any>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/helpers/parseUtil.d.cts:44

#### Parameters

##### status

`ParseStatus`

##### pairs

`object`[]

#### Returns

`Promise`&lt;[`SyncParseReturnType`](../type-aliases/SyncParseReturnType.md)&lt;`any`&gt;&gt;

***

### mergeObjectSync()

```ts
static mergeObjectSync(status, pairs): SyncParseReturnType;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/helpers/parseUtil.d.cts:48

#### Parameters

##### status

`ParseStatus`

##### pairs

`object`[]

#### Returns

[`SyncParseReturnType`](../type-aliases/SyncParseReturnType.md)
