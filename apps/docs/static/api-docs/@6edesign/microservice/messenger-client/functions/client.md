[**Documentation**](../../../../README.md)

***

[Documentation](../../../../README.md) / [@6edesign/microservice](../../README.md) / [messenger-client](../README.md) / client

# Function: client()

```ts
function client(channel, sdkOptions): <TInput, TOutput>(route) => (input) => Promise<void>;
```

Defined in: [packages/microservice/lib/messageClient.js:31](https://github.com/6eDesign/core/blob/ef308ef1da0dfc861a9d63a636d6f4c2bde822f8/packages/microservice/lib/messageClient.js#L31)

## Parameters

### channel

`string`

### sdkOptions

[`SDKOptions`](../interfaces/SDKOptions.md)

## Returns

```ts
<TInput, TOutput>(route): (input) => Promise<void>;
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
(input): Promise<void>;
```

#### Parameters

##### input

`TInput`

#### Returns

`Promise`&lt;`void`&gt;
