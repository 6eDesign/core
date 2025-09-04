[**Documentation**](../../../../../README.md)

***

[Documentation](../../../../../README.md) / [@6edesign/microservice](../../../README.md) / [](../../../README.md) / [z](../README.md) / ZodInvalidTypeIssue

# Interface: ZodInvalidTypeIssue

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/ZodError.d.cts:35

## Extends

- [`ZodIssueBase`](../type-aliases/ZodIssueBase.md)

## Properties

### code

```ts
code: "invalid_type";
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/ZodError.d.cts:36

***

### expected

```ts
expected: 
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

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/ZodError.d.cts:37

***

### message?

```ts
optional message: string;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/ZodError.d.cts:33

#### Inherited from

[`ZodIssueBase`](../type-aliases/ZodIssueBase.md).[`message`](../type-aliases/ZodIssueBase.md#message)

***

### path

```ts
path: (string | number)[];
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/ZodError.d.cts:32

#### Inherited from

[`ZodIssueBase`](../type-aliases/ZodIssueBase.md).[`path`](../type-aliases/ZodIssueBase.md#path)

***

### received

```ts
received: 
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

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/ZodError.d.cts:38
