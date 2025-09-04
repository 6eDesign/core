<script lang="ts">
	import type { PageData } from './$types';

	let { data } = $props<{ data: PageData }>();
	let content = $derived(data.content);
	let meta = $derived(data.meta);
</script>

<div class="container py-8">
	{#if meta && meta.title}
		<h1 class="text-4xl font-bold mb-2">{meta.title}</h1>
		<p class="text-sm text-muted-foreground mb-8">
			{meta.date ? meta.date : 'No date'} by {meta.author || 'Unknown'}
		</p>
	{/if}
	<div class="prose dark:prose-invert">
		{@html content}
	</div>
</div>
