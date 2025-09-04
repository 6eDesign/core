[**Documentation**](../../../../../README.md)

***

[Documentation](../../../../../README.md) / [@6edesign/microservice](../../../README.md) / [](../../../README.md) / [z](../README.md) / ParseContext

# Interface: ParseContext

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/helpers/parseUtil.d.cts:17

## Properties

### common

```ts
readonly common: object;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/helpers/parseUtil.d.cts:18

#### async

```ts
readonly async: boolean;
```

#### contextualErrorMap?

```ts
readonly optional contextualErrorMap: ZodErrorMap;
```

#### issues

```ts
readonly issues: ZodIssue[];
```

***

### data

```ts
readonly data: any;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/helpers/parseUtil.d.cts:26

***

### parent

```ts
readonly parent: null | ParseContext;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/helpers/parseUtil.d.cts:25

***

### parsedType

```ts
readonly parsedType: 
  | "string"
  | "number"
  | "bigint"
  | "boolean"
  | "symbol"
  | "undefined"
  | "object"
  | "function"
  | "map"
  | "integer"
  | "null"
  | "array"
  | "float"
  | "date"
  | "nan"
  | "unknown"
  | "promise"
  | "void"
  | "never"
  | "set";
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/helpers/parseUtil.d.cts:27

***

### path

```ts
readonly path: ParsePath;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/helpers/parseUtil.d.cts:23

***

### schemaErrorMap?

```ts
readonly optional schemaErrorMap: ZodErrorMap;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/helpers/parseUtil.d.cts:24
