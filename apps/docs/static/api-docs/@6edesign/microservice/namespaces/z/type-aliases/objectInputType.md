[**Documentation**](../../../../../README.md)

***

[Documentation](../../../../../README.md) / [@6edesign/microservice](../../../README.md) / [](../../../README.md) / [z](../README.md) / objectInputType

# Type Alias: objectInputType&lt;Shape, Catchall, UnknownKeys&gt;

```ts
type objectInputType<Shape, Catchall, UnknownKeys> = flatten<baseObjectInputType<Shape>> & CatchallInput<Catchall> & PassthroughType<UnknownKeys>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:511

## Type Parameters

### Shape

`Shape` *extends* [`ZodRawShape`](ZodRawShape.md)

### Catchall

`Catchall` *extends* [`ZodTypeAny`](ZodTypeAny.md)

### UnknownKeys

`UnknownKeys` *extends* [`UnknownKeysParam`](UnknownKeysParam.md) = [`UnknownKeysParam`](UnknownKeysParam.md)
