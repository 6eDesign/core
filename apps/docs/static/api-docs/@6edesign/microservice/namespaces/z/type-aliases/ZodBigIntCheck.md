[**Documentation**](../../../../../README.md)

***

[Documentation](../../../../../README.md) / [@6edesign/microservice](../../../README.md) / [](../../../README.md) / [z](../README.md) / ZodBigIntCheck

# Type Alias: ZodBigIntCheck

```ts
type ZodBigIntCheck = 
  | {
  inclusive: boolean;
  kind: "min";
  message?: string;
  value: bigint;
}
  | {
  inclusive: boolean;
  kind: "max";
  message?: string;
  value: bigint;
}
  | {
  kind: "multipleOf";
  message?: string;
  value: bigint;
};
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:340
