[**Documentation**](../../../../README.md)

***

[Documentation](../../../../README.md) / [@6edesign/microservice](../../README.md) / [router](../README.md) / createHTTPResolver

# Function: createHTTPResolver()

```ts
function createHTTPResolver<TInput, TOutput>(options): any;
```

Defined in: [packages/microservice/lib/router.js:57](https://github.com/6eDesign/core/blob/ef308ef1da0dfc861a9d63a636d6f4c2bde822f8/packages/microservice/lib/router.js#L57)

## Type Parameters

### TInput

`TInput`

### TOutput

`TOutput`

## Parameters

### options

#### resolver

(`input`) => `Promise`&lt;`TOutput`&gt;

#### route

[`BaseOptions`](../interfaces/BaseOptions.md)&lt;`TInput`, `TOutput`&gt;

#### tracer

`Tracer`

## Returns

`any`
