[**Documentation**](../../../README.md)

***

[Documentation](../../../README.md) / [@6edesign/microservice](../README.md) / [](../README.md) / MicroService

# Class: MicroService

Defined in: [packages/microservice/lib/microservice.js:36](https://github.com/6eDesign/core/blob/ef308ef1da0dfc861a9d63a636d6f4c2bde822f8/packages/microservice/lib/microservice.js#L36)

## Constructors

### Constructor

```ts
new MicroService(options): MicroService;
```

Defined in: [packages/microservice/lib/microservice.js:42](https://github.com/6eDesign/core/blob/ef308ef1da0dfc861a9d63a636d6f4c2bde822f8/packages/microservice/lib/microservice.js#L42)

Creates an instance of MicroService.

#### Parameters

##### options

`MicroServiceOptions`

#### Returns

`MicroService`

#### Memberof

MicroService

## Properties

### app

```ts
app: any;
```

Defined in: [packages/microservice/lib/microservice.js:52](https://github.com/6eDesign/core/blob/ef308ef1da0dfc861a9d63a636d6f4c2bde822f8/packages/microservice/lib/microservice.js#L52)

***

### logger

```ts
logger: Logger;
```

Defined in: [packages/microservice/lib/microservice.js:55](https://github.com/6eDesign/core/blob/ef308ef1da0dfc861a9d63a636d6f4c2bde822f8/packages/microservice/lib/microservice.js#L55)

***

### name

```ts
name: string;
```

Defined in: [packages/microservice/lib/microservice.js:51](https://github.com/6eDesign/core/blob/ef308ef1da0dfc861a9d63a636d6f4c2bde822f8/packages/microservice/lib/microservice.js#L51)

***

### port

```ts
port: number;
```

Defined in: [packages/microservice/lib/microservice.js:50](https://github.com/6eDesign/core/blob/ef308ef1da0dfc861a9d63a636d6f4c2bde822f8/packages/microservice/lib/microservice.js#L50)

***

### resolverMap

```ts
resolverMap: object;
```

Defined in: [packages/microservice/lib/microservice.js:54](https://github.com/6eDesign/core/blob/ef308ef1da0dfc861a9d63a636d6f4c2bde822f8/packages/microservice/lib/microservice.js#L54)

***

### routes

```ts
routes: any[];
```

Defined in: [packages/microservice/lib/microservice.js:53](https://github.com/6eDesign/core/blob/ef308ef1da0dfc861a9d63a636d6f4c2bde822f8/packages/microservice/lib/microservice.js#L53)

## Methods

### addRoute()

```ts
addRoute<TInput, TOutput>(route, resolver): void;
```

Defined in: [packages/microservice/lib/microservice.js:111](https://github.com/6eDesign/core/blob/ef308ef1da0dfc861a9d63a636d6f4c2bde822f8/packages/microservice/lib/microservice.js#L111)

#### Type Parameters

##### TInput

`TInput`

##### TOutput

`TOutput`

#### Parameters

##### route

[`BaseOptions`](../router/interfaces/BaseOptions.md)&lt;`TInput`, `TOutput`&gt;

##### resolver

(`input`) => `Promise`&lt;`TOutput`&gt;

#### Returns

`void`

#### Memberof

MicroService

***

### generateOpenAPI()

```ts
generateOpenAPI(): OpenAPIObject;
```

Defined in: [packages/microservice/lib/microservice.js:177](https://github.com/6eDesign/core/blob/ef308ef1da0dfc861a9d63a636d6f4c2bde822f8/packages/microservice/lib/microservice.js#L177)

#### Returns

`OpenAPIObject`

***

### handleMessage()

```ts
handleMessage(msg): Promise<void>;
```

Defined in: [packages/microservice/lib/microservice.js:125](https://github.com/6eDesign/core/blob/ef308ef1da0dfc861a9d63a636d6f4c2bde822f8/packages/microservice/lib/microservice.js#L125)

#### Parameters

##### msg

###### input?

`any`

###### key?

`string` = `""`

#### Returns

`Promise`&lt;`void`&gt;

***

### start()

```ts
start(): Promise<any>;
```

Defined in: [packages/microservice/lib/microservice.js:158](https://github.com/6eDesign/core/blob/ef308ef1da0dfc861a9d63a636d6f4c2bde822f8/packages/microservice/lib/microservice.js#L158)

#### Returns

`Promise`&lt;`any`&gt;
