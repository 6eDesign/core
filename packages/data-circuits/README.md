# @6edesign/data-circuits

This package provides a robust set of utilities for managing data flows, including powerful circuit breakers, flexible data persistence layers, and distributed promise pooling. It's designed to enhance the reliability and efficiency of data handling in distributed systems.

## Installation

```bash
pnpm add @6edesign/data-circuits
# or
npm install @6edesign/data-circuits
# or
yarn add @6edesign/data-circuits
```

## Usage

The `@6edesign/data-circuits` package offers different entry points optimized for various environments (Node.js and browser).

### Node.js Usage

For Node.js environments, you can import the full functionality, including Redis-backed persistence and distributed promise pooling.

```javascript
import {
	createCircuit,
	createAggregateCircuit,
	createRedisStore,
	getDistributedPoolFactory
} from '@6edesign/data-circuits';
// ... rest of your Node.js code
```

### Browser Usage

For browser environments, use the dedicated `circuit` export which excludes Node.js-specific dependencies like Redis. The default store is in-memory.

```javascript
import { createCircuit, createAggregateCircuit } from '@6edesign/data-circuits/circuit';
// ... rest of your browser code
```

## Core Concepts

### Circuits

Circuits are the central abstraction for managing data. They encapsulate the logic for fetching, caching, refreshing, and subscribing to data.

- **`createCircuit(options)`**: Creates a circuit for a single data entity.

  - `options.name` (string, required): Unique name for the circuit.
  - `options.getter` (() => Promise<T>, required): Function to fetch the data.
  - `options.initialValue` (T, optional): Initial data value.
  - `options.store` (PersistenceLayer<T>, optional): Custom storage. **Defaults to an in-memory store.**
  - `options.bad` (number, optional): Time (ms) after which data is considered "bad" and re-fetched.
  - `options.stale` (number, optional): Time (ms) after which data is "stale" but can be returned while refreshing.
  - `options.staleOnError` (boolean, optional): Return stale data on getter errors.
  - `options.staleOnRefresh` (boolean, optional): Return stale data immediately on refresh.
  - `options.equalityChecker` ((a, b) => boolean, optional): Function to compare data for changes.
  - `options.setter` ((val) => Promise<T>, optional): Transform value before setting.
  - `options.poolCreator` (PoolCreator, optional): Custom promise pool creator.
  - `options.poolTimeout` (number, optional): Timeout for pool operations.
  - `options.live` (boolean, optional): Subscribe to cache stream for real-time updates (requires a store that supports streaming, like `createRedisStore`).

  **Circuit Instance Methods:**

  - `get()`: Retrieves the data, fetching if necessary.
  - `set(value)`: Sets the circuit's data.
  - `refresh()`: Forces a data refresh.
  - `subscribe(callback)`: Subscribes to data changes. Returns an unsubscribe function.
  - `on(eventName, callback)`: Subscribes to internal circuit events (`"active"`, `"inactive"`).

- **`createAggregateCircuit(options)`**: Creates a circuit that derives its data from multiple other circuits.
  - `options.name` (string, required): Unique name for the aggregate circuit.
  - `options.sources` (Record<string, Circuit>, required): An object of source circuits.
  - `options.deriver` ((sources) => Promise<T>, required): Function to combine data from sources.
  - Inherits other options and methods from `createCircuit`.

### Persistence Layers

Circuits can use various storage mechanisms by implementing the `PersistenceLayer` interface.

- **In-Memory Store (Default)**: By default, `createCircuit` uses an in-memory store. This is suitable for client-side applications or simple server-side caching where persistence across restarts is not required.

  ```javascript
  import { createCircuit } from '@6edesign/data-circuits'; // Or from '@6edesign/data-circuits/circuit' for browser

  const userCircuit = createCircuit({
  	name: 'userProfile',
  	getter: async () => {
  		console.log('Fetching user data...');
  		return new Promise((resolve) => setTimeout(() => resolve({ id: 1, name: 'Alice' }), 500));
  	},
  	stale: 5000, // Data is stale after 5 seconds
  	bad: 10000 // Data is bad after 10 seconds
  });

  // Top-level await for demonstration purposes
  console.log('First get:', await userCircuit.get()); // Fetches and uses in-memory cache
  console.log('Second get (from cache):', await userCircuit.get()); // Returns from in-memory cache

  await new Promise((resolve) => setTimeout(resolve, 6000)); // Wait for data to become stale
  console.log('Third get (stale, refreshes in background):', await userCircuit.get());

  await userCircuit.refresh(); // Force refresh
  console.log('After forced refresh:', await userCircuit.get());

  const unsubscribe = userCircuit.subscribe((data) => {
  	console.log('User data updated:', data);
  });
  await userCircuit.set({ id: 1, name: 'Bob' }); // Will trigger subscriber
  unsubscribe();
  ```

- **Redis Store**: For Node.js environments, a Redis-backed store is available for persistent and distributed caching.

  ```javascript
  import { createCircuit, createRedisStore } from '@6edesign/data-circuits';
  import Redis from 'ioredis';

  const redisClient = new Redis(); // Connect to your Redis instance

  const productCircuit = createCircuit({
  	name: 'productDetails',
  	getter: async () => {
  		console.log('Fetching product data from external API...');
  		return new Promise((resolve) =>
  			setTimeout(() => resolve({ id: 101, name: 'Widget', price: 29.99 }), 700)
  		);
  	},
  	store: createRedisStore({ redis: redisClient, namespace: 'app:cache' }),
  	stale: 10000, // 10 seconds
  	bad: 30000, // 30 seconds
  	live: true // Enable real-time updates via Redis streams
  });

  // Top-level await for demonstration purposes
  console.log('Product:', await productCircuit.get());
  // In another process, if you set the same key in Redis, this circuit would update
  ```

- **Custom Store**: You can implement your own `PersistenceLayer` to integrate with other storage solutions (e.g., IndexedDB, local storage, other databases).

  ```javascript
  // Example: IndexedDB store using localforage (browser-only)
  import localforage from 'localforage';

  const createIndexedDBStore = () => {
  	const store = localforage.createInstance({
  		name: 'data-circuits-indexeddb',
  		storeName: 'circuits'
  	});

  	return {
  		async get(key) {
  			const value = await store.getItem(key);
  			return value ? JSON.parse(value) : undefined;
  		},
  		async set(key, value) {
  			await store.setItem(key, JSON.stringify(value));
  		},
  		async delete(key) {
  			await store.removeItem(key);
  		},
  		// For custom stores, 'on' and 'subscribe' methods might be no-ops or
  		// implement custom event/subscription logic if your store supports it.
  		on: () => () => {}, // No-op for this example
  		subscribe: () => () => {} // No-op for this example
  	};
  };

  // Usage with a circuit
  import { createCircuit } from '@6edesign/data-circuits/circuit'; // For browser usage

  const browserDataCircuit = createCircuit({
  	name: 'browserSettings',
  	getter: async () => {
  		console.log('Fetching browser settings...');
  		return { theme: 'dark', notifications: true };
  	},
  	store: createIndexedDBStore(),
  	stale: 60000
  });

  // Top-level await for demonstration purposes
  console.log('Browser settings:', await browserDataCircuit.get());
  ```

### Concurrency and Distributed Promise Pooling

In distributed systems, multiple instances of your application might try to fetch the same data concurrently, leading to redundant work or race conditions. `data-circuits` provides a distributed promise pooling mechanism to coalesce these requests into a single invocation.

The `getDistributedPoolFactory` function returns a factory for creating distributed promise pools using Redis and Redlock. This pool can then be passed to a `createCircuit` instance via its `poolCreator` option, ensuring that the circuit's `getter` is executed only once across multiple application instances for a given data request.

```javascript
import { createCircuit, getDistributedPoolFactory } from '@6edesign/data-circuits';
import Redis from 'ioredis';

const redisClient = new Redis(); // Connect to your Redis instance
const createDistributedPool = getDistributedPoolFactory(redisClient);

async function fetchExpensiveData(id) {
	console.log(`[${process.pid}] Fetching expensive data for ID: ${id}...`);
	// Simulate a network call or heavy computation
	return new Promise((resolve) =>
		setTimeout(() => resolve(`Data for ${id} from PID ${process.pid}`), 1000)
	);
}

const expensiveDataCircuit = createCircuit({
	name: 'expensiveData',
	getter: () => fetchExpensiveData('some-unique-key'), // The getter function
	poolCreator: createDistributedPool, // Use the distributed pool factory
	poolTimeout: 5000 // Timeout for acquiring lock and Redis operations
});

// Top-level await for demonstration purposes
console.log(`[${process.pid}] Requesting expensive data...`);
// If multiple processes call expensiveDataCircuit.get() concurrently,
// only one will actually execute fetchExpensiveData, others will wait for the result via Redis.
const result = await expensiveDataCircuit.get();
console.log(`[${process.pid}] Received: ${result}`);
```

**How it works:**
When `expensiveDataCircuit.get()` is called:

1.  The circuit's `poolCreator` (which is `createDistributedPool` in this case) is invoked.
2.  It attempts to acquire a distributed lock using Redlock for the circuit's `getter` execution.
3.  If the lock is acquired, it means this instance is the "leader" for this operation. It executes the `fetchExpensiveData` function (the circuit's getter).
4.  Once `fetchExpensiveData` completes, the result is published to a Redis stream.
5.  The lock is released.
6.  If the lock cannot be acquired (another instance is already the leader), this instance subscribes to the Redis stream and waits for the result to be published by the leader.
    This mechanism effectively coalesces multiple concurrent requests for the same data into a single execution, reducing load on external services and ensuring data consistency across distributed instances.
