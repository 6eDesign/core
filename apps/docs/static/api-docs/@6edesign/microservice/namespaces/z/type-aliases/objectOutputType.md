[**Documentation**](../../../../../README.md)

***

[Documentation](../../../../../README.md) / [@6edesign/microservice](../../../README.md) / [](../../../README.md) / [z](../README.md) / objectOutputType

# Type Alias: objectOutputType&lt;Shape, Catchall, UnknownKeys&gt;

```ts
type objectOutputType<Shape, Catchall, UnknownKeys> = flatten<addQuestionMarks<baseObjectOutputType<Shape>>> & CatchallOutput<Catchall> & PassthroughType<UnknownKeys>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:507

## Type Parameters

### Shape

`Shape` *extends* [`ZodRawShape`](ZodRawShape.md)

### Catchall

`Catchall` *extends* [`ZodTypeAny`](ZodTypeAny.md)

### UnknownKeys

`UnknownKeys` *extends* [`UnknownKeysParam`](UnknownKeysParam.md) = [`UnknownKeysParam`](UnknownKeysParam.md)
