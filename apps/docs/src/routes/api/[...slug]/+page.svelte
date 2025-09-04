<script lang="ts">
	import { page } from '$app/state';
	import type { PageData } from './$types';
	import { marked } from 'marked'; // Import marked

	let { data } = $props<{ data: PageData }>();

	// Destructure data from props
	let segments = $derived(data.segments);
	let apiContent = $derived(data.apiContent);

	// Render markdown to HTML
	const renderedHtml = $derived(marked.parse(apiContent));

	let baseHref = $derived(
		page.url.pathname.match(/\.[a-z]+$/i)
			? page.url.pathname.split('/').slice(0, -1).join('/') + '/'
			: page.url.pathname + '/'
	);
</script>

<base href={baseHref} />
<div class="container py-8">
	<h1 class="text-4xl font-bold mb-8">API: {segments.join('/') || 'Root API'}</h1>
	<div class="prose dark:prose-invert">
		{@html renderedHtml} // Use renderedHtml
	</div>
</div>
