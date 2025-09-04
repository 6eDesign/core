<script lang="ts">
	import { page } from '$app/state';
	import type { PageData } from './$types';
	import { Marked } from 'marked'; // Import marked
	import { highlighter, shiki } from '$lib/marked-shiki';
	import markedShiki from 'marked-shiki';
	import {
		transformerNotationDiff,
		transformerNotationHighlight,
		transformerNotationWordHighlight,
		transformerNotationFocus,
		transformerNotationErrorLevel,
		transformerMetaHighlight,
		transformerMetaWordHighlight
	} from '@shikijs/transformers';
	import { copyCode } from '$lib/actions/copy-code';

	let { data } = $props<{ data: PageData }>();

	let segments = $derived(data.segments);
	let apiContent = $derived(data.apiContent);

	// Render markdown to HTML
	const renderedHtml = $derived(
		new Marked()
			.use(
				markedShiki({
					highlight(code, lang, props) {
						return highlighter.codeToHtml(code, {
							lang,
							theme: 'github-dark-dimmed',
							meta: { __raw: props.join(' ') }, // required by `transformerMeta*`
							transformers: [
								transformerNotationDiff({
									matchAlgorithm: 'v3'
								}),
								transformerNotationHighlight({
									matchAlgorithm: 'v3'
								}),
								transformerNotationWordHighlight({
									matchAlgorithm: 'v3'
								}),
								transformerNotationFocus({
									matchAlgorithm: 'v3'
								}),
								transformerNotationErrorLevel({
									matchAlgorithm: 'v3'
								}),
								transformerMetaHighlight(),
								transformerMetaWordHighlight()
							]
						});
					}
				})
			)
			.parse(apiContent)
	);

	let baseHref = $derived(
		page.url.pathname.match(/\.[a-z]+$/i)
			? page.url.pathname.split('/').slice(0, -1).join('/') + '/'
			: page.url.pathname + '/'
	);
</script>

<base href={baseHref} />
<div class="container py-8">
	<h1 class="text-4xl font-bold mb-8">API: {segments.join('/') || 'Root API'}</h1>
	{#await renderedHtml then html}
		<div class="prose dark:prose-invert" use:copyCode={{ html }}>
			{@html html}
		</div>
	{/await}
</div>

<style>
	.container :global(pre) {
		position: relative;
		padding: 1rem;
		margin: 8px 0;
	}
</style>
