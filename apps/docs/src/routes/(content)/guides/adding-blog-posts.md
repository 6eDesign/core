---
title: "How to Add a New Blog Post"
date: "2025-09-03"
author: "Gemini"
---

# How to Add a New Blog Post

This guide explains how to add a new blog post to the website.

## Creating the Blog Post File

To add a new blog post, you need to create a new Markdown file in the `core/apps/docs/src/routes/(content)/blog` directory.

The filename of the Markdown file will be used as the URL slug for the blog post. For example, if you create a file named `my-awesome-post.md`, the blog post will be available at `/blog/my-awesome-post`.

## Writing the Blog Post

You can use standard Markdown syntax to write your blog post. You can also use HTML in your Markdown file.

### Adding Metadata

It is **required** to add frontmatter to each blog post to include metadata such as the author, publication date, and title. For example:

```markdown
---
title: "My Awesome Post"
author: "John Doe"
date: "2025-09-03"
tags:
  - svelte
  - documentation
---

# My Awesome Post

This is the content of my blog post.
```