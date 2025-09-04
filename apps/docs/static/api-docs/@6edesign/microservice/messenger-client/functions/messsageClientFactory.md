[**Documentation**](../../../../README.md)

***

[Documentation](../../../../README.md) / [@6edesign/microservice](../../README.md) / [messenger-client](../README.md) / messsageClientFactory

# Function: messsageClientFactory()

```ts
function messsageClientFactory<T>(channel, fn): (sdkOptions) => T;
```

Defined in: [packages/microservice/lib/messageClient.js:45](https://github.com/6eDesign/core/blob/ef308ef1da0dfc861a9d63a636d6f4c2bde822f8/packages/microservice/lib/messageClient.js#L45)

## Type Parameters

### T

`T`

## Parameters

### channel

`string`

### fn

(`t`) => `T`

## Returns

```ts
(sdkOptions): T;
```

### Parameters

#### sdkOptions

[`SDKOptions`](../interfaces/SDKOptions.md)

### Returns

`T`
