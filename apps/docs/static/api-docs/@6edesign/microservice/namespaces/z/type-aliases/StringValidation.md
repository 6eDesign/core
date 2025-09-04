[**Documentation**](../../../../../README.md)

***

[Documentation](../../../../../README.md) / [@6edesign/microservice](../../../README.md) / [](../../../README.md) / [z](../README.md) / StringValidation

# Type Alias: StringValidation

```ts
type StringValidation = 
  | "email"
  | "url"
  | "emoji"
  | "uuid"
  | "nanoid"
  | "regex"
  | "cuid"
  | "cuid2"
  | "ulid"
  | "datetime"
  | "date"
  | "time"
  | "duration"
  | "ip"
  | "cidr"
  | "base64"
  | "jwt"
  | "base64url"
  | {
  includes: string;
  position?: number;
}
  | {
  startsWith: string;
}
  | {
  endsWith: string;
};
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/ZodError.d.cts:73
