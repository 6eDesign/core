<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import * as NavigationMenu from '$lib/components/ui/navigation-menu/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
</script>

<svelte:head>
	<title>6eDesign Framework</title>
	<meta name="description" content="A modern framework for building scalable applications." />
</svelte:head>

<main class="flex-1">
	<!-- Hero Section -->
	<section class="w-full py-20 md:py-32 lg:py-40">
		<div class="container px-4 md:px-6 text-center">
			<h1 class="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
				The Modern Framework for Scalable Apps
			</h1>
			<p class="mx-auto max-w-[700px] text-muted-foreground md:text-xl my-6">
				Discover a comprehensive suite of tools and packages designed for high-performance,
				scalable, and maintainable applications.
			</p>
			<Button size="lg">Get Started</Button>
		</div>
	</section>

	<Separator class="my-8" />

	<!-- Features Section -->
	<section class="w-full py-12 md:py-24">
		<div class="container grid gap-8 px-4 md:px-6 lg:grid-cols-3">
			<Card.Root>
				<Card.Header>
					<Card.Title>Code Generation</Card.Title>
					<Card.Description
						>Scaffold new projects, packages, and services in seconds with our powerful CLI.</Card.Description
					>
				</Card.Header>
				<Card.Content>
					<p>Bootstrap your next application with best practices built-in from day one.</p>
				</Card.Content>
			</Card.Root>
			<Card.Root>
				<Card.Header>
					<Card.Title>Shared Workflows</Card.Title>
					<Card.Description
						>Leverage battle-tested CI/CD pipelines for releases and deployments.</Card.Description
					>
				</Card.Header>
				<Card.Content>
					<p>
						Ensure consistency and reliability across all your projects with reusable GitHub
						Actions.
					</p>
				</Card.Content>
			</Card.Root>
			<Card.Root>
				<Card.Header>
					<Card.Title>TypeScript Packages</Card.Title>
					<Card.Description
						>A rich ecosystem of browser and server packages for any use case.</Card.Description
					>
				</Card.Header>
				<Card.Content>
					<p>From zRPC to data-circuits, build on a foundation of strongly-typed, modular code.</p>
				</Card.Content>
			</Card.Root>
		</div>
	</section>

	<Separator class="my-8" />

	<!-- FAQ Section -->
	<section class="w-full py-12 md:py-24">
		<div class="container max-w-3xl px-4 md:px-6">
			<h2 class="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
			<Accordion.Root collapsible>
				<Accordion.Item value="item-1">
					<Accordion.Trigger>What is the 6eDesign framework?</Accordion.Trigger>
					<Accordion.Content>
						It's an integrated collection of tools, packages, and workflows designed to streamline
						the development of modern, scalable web applications.
					</Accordion.Content>
				</Accordion.Item>
				<Accordion.Item value="item-2">
					<Accordion.Trigger>Is this open source?</Accordion.Trigger>
					<Accordion.Content>
						The `core` monorepo containing the shared packages and workflows is open source. The
						`stacker` monorepo, which contains applications built with the framework, is closed
						source.
					</Accordion.Content>
				</Accordion.Item>
				<Accordion.Item value="item-3">
					<Accordion.Trigger>How do I get started?</Accordion.Trigger>
					<Accordion.Content>
						Check out the "Guides" section to learn how to set up your first project and start using
						the available packages and tools.
					</Accordion.Content>
				</Accordion.Item>
			</Accordion.Root>
		</div>
	</section>
</main>
