[**Documentation**](../../../../../README.md)

***

[Documentation](../../../../../README.md) / [@6edesign/microservice](../../../README.md) / [](../../../README.md) / [z](../README.md) / ZodNumberCheck

# Type Alias: ZodNumberCheck

```ts
type ZodNumberCheck = 
  | {
  inclusive: boolean;
  kind: "min";
  message?: string;
  value: number;
}
  | {
  inclusive: boolean;
  kind: "max";
  message?: string;
  value: number;
}
  | {
  kind: "int";
  message?: string;
}
  | {
  kind: "multipleOf";
  message?: string;
  value: number;
}
  | {
  kind: "finite";
  message?: string;
};
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:287
