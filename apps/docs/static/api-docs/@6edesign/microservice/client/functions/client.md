[**Documentation**](../../../../README.md)

***

[Documentation](../../../../README.md) / [@6edesign/microservice](../../README.md) / [client](../README.md) / client

# Function: client()

```ts
function client(sdkOptions): <TInput, TOutput>(route) => (input) => Promise<TOutput>;
```

Defined in: [packages/microservice/lib/client.js:44](https://github.com/6eDesign/core/blob/ef308ef1da0dfc861a9d63a636d6f4c2bde822f8/packages/microservice/lib/client.js#L44)

## Parameters

### sdkOptions

[`SDKOptions`](../interfaces/SDKOptions.md)

## Returns

```ts
<TInput, TOutput>(route): (input) => Promise<TOutput>;
```

### Type Parameters

#### TInput

`TInput`

#### TOutput

`TOutput`

### Parameters

#### route

[`BaseOptions`](../../router/interfaces/BaseOptions.md)&lt;`TInput`, `TOutput`&gt;

### Returns

```ts
(input): Promise<TOutput>;
```

#### Parameters

##### input

`TInput`

#### Returns

`Promise`&lt;`TOutput`&gt;
