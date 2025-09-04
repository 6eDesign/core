<script lang="ts">
	import '../app.css';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import * as NavigationMenu from '$lib/components/ui/navigation-menu/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="flex flex-col min-h-screen items-center">
	<header
		class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
	>
		<div class="container flex h-14 items-center">
			<NavigationMenu.Root class="flex items-center">
				<NavigationMenu.List class="flex items-center gap-4">
					<NavigationMenu.Item>
						<a href="/" class="font-bold"> 6eDesign </a>
					</NavigationMenu.Item>
					<NavigationMenu.Item>
						<NavigationMenu.Link href="/guides">Guides</NavigationMenu.Link>
					</NavigationMenu.Item>
					<NavigationMenu.Item>
						<NavigationMenu.Link href="/api">API</NavigationMenu.Link>
					</NavigationMenu.Item>
					<NavigationMenu.Item>
						<NavigationMenu.Link href="/blog">Blog</NavigationMenu.Link>
					</NavigationMenu.Item>
				</NavigationMenu.List>
			</NavigationMenu.Root>
		</div>
	</header>

	{@render children?.()}

	<footer class="py-6 w-full">
		<div class="container text-center text-sm text-muted-foreground">
			<p>&copy; {new Date().getFullYear()} 6eDesign. All rights reserved.</p>
		</div>
	</footer>
</div>
