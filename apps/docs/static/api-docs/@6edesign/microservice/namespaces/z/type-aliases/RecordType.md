[**Documentation**](../../../../../README.md)

***

[Documentation](../../../../../README.md) / [@6edesign/microservice](../../../README.md) / [](../../../README.md) / [z](../README.md) / RecordType

# Type Alias: RecordType&lt;K, V&gt;

```ts
type RecordType<K, V> = [string] extends [K] ? Record<K, V> : [number] extends [K] ? Record<K, V> : [symbol] extends [K] ? Record<K, V> : [BRAND<string | number | symbol>] extends [K] ? Record<K, V> : Partial<Record<K, V>>;
```

Defined in: node\_modules/.pnpm/zod@3.25.76/node\_modules/zod/v3/types.d.cts:666

## Type Parameters

### K

`K` *extends* `string` \| `number` \| `symbol`

### V

`V`
