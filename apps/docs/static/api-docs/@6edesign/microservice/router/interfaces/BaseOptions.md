[**Documentation**](../../../../README.md)

***

[Documentation](../../../../README.md) / [@6edesign/microservice](../../README.md) / [router](../README.md) / BaseOptions

# Interface: BaseOptions&lt;TInput, TOutput&gt;

Defined in: [packages/microservice/lib/router.js:9](https://github.com/6eDesign/core/blob/ef308ef1da0dfc861a9d63a636d6f4c2bde822f8/packages/microservice/lib/router.js#L9)

## Type Parameters

### TInput

`TInput`

### TOutput

`TOutput`

## Properties

### input

```ts
input: 
  | Schema<TInput, ZodTypeDef, TInput>
  | ZodEffects<Schema<TInput, ZodTypeDef, TInput>, TInput, TInput>;
```

Defined in: [packages/microservice/lib/router.js:12](https://github.com/6eDesign/core/blob/ef308ef1da0dfc861a9d63a636d6f4c2bde822f8/packages/microservice/lib/router.js#L12)

***

### method?

```ts
optional method: Methods;
```

Defined in: [packages/microservice/lib/router.js:11](https://github.com/6eDesign/core/blob/ef308ef1da0dfc861a9d63a636d6f4c2bde822f8/packages/microservice/lib/router.js#L11)

***

### output

```ts
output: Schema<TOutput, ZodTypeDef, TOutput>;
```

Defined in: [packages/microservice/lib/router.js:13](https://github.com/6eDesign/core/blob/ef308ef1da0dfc861a9d63a636d6f4c2bde822f8/packages/microservice/lib/router.js#L13)

***

### path

```ts
path: string;
```

Defined in: [packages/microservice/lib/router.js:10](https://github.com/6eDesign/core/blob/ef308ef1da0dfc861a9d63a636d6f4c2bde822f8/packages/microservice/lib/router.js#L10)
