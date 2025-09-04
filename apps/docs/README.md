# 6eDesign Documentation

This project is a SvelteKit website that serves as the documentation hub for the 6eDesign monorepo. It includes API documentation, guides, and a blog.

## Technologies Used

- **SvelteKit:** The web framework for building the site.
- **Typedoc:** Used to generate API documentation from TSDoc comments in the source code.
- **mdsvex:** A preprocessor that allows using Svelte components in Markdown files.
- **Marked:** Used for rendering Markdown content.
- **Tailwind CSS:** For styling the website.
- **pnpm:** As the package manager.
- **Turbo:** As the monorepo build tool.

## How to Contribute

### Adding or Maintaining API Documentation

The API documentation is generated automatically from the TSDoc comments in the source code of the packages in the `core` monorepo. To add or update the documentation, you need to:

1.  Add or update the TSDoc comments in the source code of the relevant package.
2.  Run `pnpm docs:api` in the `core/apps/docs` directory to regenerate the documentation.

### Adding a New Blog Post

To add a new blog post, you need to:

1.  Create a new `.md` file in the `core/apps/docs/static/blog` directory.
2.  The filename will be the slug of the blog post. For example, `my-new-post.md` will be available at `/blog/my-new-post`.
3.  Write the blog post in Markdown.

### Adding a New Guide

To add a new guide, you need to:

1.  Create a new `.md` file in the `core/apps/docs/static/guides` directory.
2.  The filename will be the slug of the guide. For example, `my-new-guide.md` will be available at `/guides/my-new-guide`.
3.  Write the guide in Markdown.

### Using Svelte in Markdown and Vice-Versa

**Using Svelte in Markdown:**

With `mdsvex`, you can import and use Svelte components directly in your `.md` files. For example:

```svelte
<script>
    import MyComponent from '$lib/components/MyComponent.svelte';
</script>

# My Markdown Title

Here is some Markdown content.

<MyComponent />
```
