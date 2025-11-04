# @6edesign/cicd

**Type-safe deployment orchestration engine** for monorepo workspaces with automatic dependency resolution and parallel execution.

## ✨ Features

- **🔒 Type Safety** - Full type-safe workspace configuration with autocomplete for dependencies and output references
- **⚡ Parallel Execution** - Automatically deploys independent deployables concurrently while respecting dependencies
- **🔗 Dependency Management** - Reactive dependency resolution with promise-based coordination
- **📤 Output References** - Type-safe output passing between deployables
- **🧩 Plugin System** - Extensible plugin architecture with Zod schema validation
- **🏗️ Builder Pattern** - Fluent API with progressive type accumulation
- **🔍 Dry Run Mode** - Test deployments without making actual changes

## 📦 Installation

```bash
pnpm add @6edesign/cicd
```

## 🚀 Quick Start

### 1. Define Plugins

```typescript
import { createPlugin, z } from '@6edesign/cicd';

export const dockerImagePlugin = createPlugin({
  input: z.object({
    name: z.string(),
    imageName: z.string(),
    tag: z.string(),
    context: z.string().default('./'),
    dockerfile: z.string().default('Dockerfile')
  }),
  output: z.object({
    image: z.string(),
    digest: z.string()
  }),
  requiredSecrets: ['DOCKER_USERNAME', 'DOCKER_PASSWORD'] as const,
  deployHandler: async (config, context) => {
    const username = await context.secretProvider.getSecret('DOCKER_USERNAME');
    const password = await context.secretProvider.getSecret('DOCKER_PASSWORD');
    
    if (context.dryRun) {
      console.log(`[DRY RUN] Would build and push ${config.imageName}:${config.tag}`);
      return {
        image: `${config.imageName}:${config.tag}`,
        digest: 'sha256:mock'
      };
    }
    
    // Build image
    await context.$`docker build -t ${config.imageName}:${config.tag} \
      -f ${config.dockerfile} ${config.context}`;
    
    // Login and push
    await context.$`echo ${password} | docker login -u ${username} --password-stdin`;
    await context.$`docker push ${config.imageName}:${config.tag}`;
    
    // Get digest
    const digest = await context.$`docker inspect --format='{{.RepoDigests}}' \
      ${config.imageName}:${config.tag}`;
    
    return {
      image: `${config.imageName}:${config.tag}`,
      digest: digest.stdout.trim()
    };
  }
});
```

### 2. Create Engine

```typescript
import { Engine, createSecretProvider } from '@6edesign/cicd';
import { dockerImagePlugin } from './plugins';

export const engine = new Engine({
  plugins: {
    dockerImage: dockerImagePlugin
  },
  secretProvider: createSecretProvider(async (name) => {
    return process.env[name] || '';
  })
});
```

### 3. Define Workspace Configuration

Create `cicd.config.js` in your workspace:

```typescript
import { engine } from './cicd.engine.js';

export default engine
  .defineWorkspace()
  .add('api', (b) => 
    b.deployable('dockerImage', {
      name: 'api-image',
      imageName: 'myorg/api',
      tag: '1.0.0',
      context: './apps/api',
      dockerfile: './apps/api/Dockerfile'
    })
  )
  .add('worker', (b) => 
    b.deployable('dockerImage', {
      name: 'worker-image',
      imageName: 'myorg/worker',
      tag: '1.0.0',
      context: './apps/worker'
    }).dependsOn('api') // Ensures api builds first
  )
  .add('web', (b) => 
    b.deployable('dockerImage', {
      name: 'web-image',
      imageName: 'myorg/web',
      tag: '1.0.0',
      context: './apps/web',
      // Reference output from api deployment
      buildArgs: {
        API_IMAGE: engine.output('api', 'image')
      }
    }).dependsOn('api')
  );
```

### 4. Deploy

```typescript
// Deploy entire workspace
await engine.deploy({
  workspaceName: 'my-workspace',
  dryRun: false
});

// Deploy single deployable
await engine.deployWorkspaceDeployable({
  workspaceName: 'my-workspace',
  deployableName: 'api',
  dryRun: false
});
```

## 🏗️ Architecture

### Type-Safe Builder Pattern

The workspace builder progressively accumulates type information as you add deployables:

```typescript
const workspace = engine
  .defineWorkspace()
  .add('api', (b) => b.deployable('dockerImage', { ... }))
  //       ↑ autocomplete knows 'api' exists
  .add('worker', (b) => b.deployable('dockerImage', { ... }).dependsOn('api'))
  //                                                                      ↑ autocomplete: 'api' ✅
  .add('web', (b) => b.deployable('dockerImage', { ... }).dependsOn('api', 'worker'));
  //                                                                  ↑ autocomplete: 'api', 'worker' ✅
```

Output references are also type-safe based on plugin output schemas:

```typescript
engine.output('api', 'image')    // ✅ 'image' exists in dockerImagePlugin.output
engine.output('api', 'invalid')  // ❌ Type error
```

### Dependency Resolution

Deployables use a reactive promise-based pattern for dependency coordination. When you call `deploy()`, the engine:

1. Starts all deployables in parallel
2. Each deployable waits for its dependencies to complete
3. Once dependencies finish, the deployable executes
4. Dependent deployables are notified and can proceed

This enables maximum parallelism - independent deployables run concurrently without waiting for unrelated deployments.

## 📖 API Reference

### `Engine<TPlugins>`

Main orchestration engine.

```typescript
new Engine({
  plugins: PluginMap,
  secretProvider: ISecretProvider
})
```

**Methods:**
- `defineWorkspace(): WorkspaceBuilder` - Create a new workspace configuration
- `deploy(options: DeployOptions): Promise<void>` - Deploy entire workspace with dependency resolution
- `deployWorkspaceDeployable(options: DeployOptions & { deployableName: string }): Promise<Output>` - Deploy single deployable

### `createPlugin<TInput, TOutput, TSecrets>(options)`

Define a deployable plugin.

```typescript
createPlugin({
  input: z.Schema<TInput>,
  output?: z.Schema<TOutput>,
  requiredSecrets?: readonly string[],
  deployHandler: (config: TInput, context: DeployContext) => Promise<TOutput>
})
```

**Deploy Context:**
- `dryRun: boolean` - Dry-run mode flag
- `workspaceName: string` - Workspace name
- `version?: string` - Version being deployed
- `secretProvider: ISecretProvider` - Secret management
- `$: typeof $` - Shell command executor (zx)

### `WorkspaceBuilder<TPlugins, TDefined>`

Fluent workspace configuration builder.

**Methods:**
- `add<TName>(name: string, callback: (builder) => DeployableEntry): WorkspaceBuilder` - Add deployable
- `deployable<TPluginName>(pluginName: TPluginName, input: PluginInput): DeployableEntry` - Create deployable
- `output<TName, TKey>(deployableName: TName, outputKey: TKey): OutputReference` - Reference output

### `DeployableEntry<TAvailableDeps>`

Configured deployable with dependencies.

**Methods:**
- `dependsOn(...deps: TAvailableDeps[]): this` - Declare dependencies

## 📄 License

ISC
