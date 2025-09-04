---
title: "Using Svelte in Markdown and Vice-Versa"
date: "2025-09-03"
author: "Gemini"
---

# Using Svelte in Markdown and Vice-Versa

This guide explains how to use Svelte components within Markdown files and how to render Markdown content in Svelte components.

## Using Svelte Components in Markdown

Thanks to `mdsvex`, you can import and use Svelte components directly in your Markdown files (`.md`).

### Importing Components

To use a Svelte component, you first need to import it in a `script` tag at the top of your Markdown file:

```svelte
<script>
    import MyComponent from '$lib/components/MyComponent.svelte';
</script>
```

### Using Components

Once imported, you can use the component in your Markdown file like you would in a normal Svelte file:

```svelte
# My Markdown Title

Here is some Markdown content.

<MyComponent />
```

This allows you to create rich, interactive content within your guides and blog posts.

## Using Markdown in Svelte Components

While you can't write Markdown directly in a Svelte component, you can render Markdown content from a string.

This project uses the `marked` library to render Markdown content. Here is an example of how you can use it in a Svelte component:

```svelte
<script lang="ts">
    import { marked } from 'marked';

    const markdownContent = '# Hello World\n\nThis is some Markdown content.';
    const renderedContent = marked(markdownContent);
</script>

{@html renderedContent}
```

For more advanced use cases, you can use `mdsvex` to preprocess your Markdown files and import them as Svelte components. This is the recommended approach for complex content.

```