---
title: "How to Add a New Guide"
date: "2025-09-03"
author: "Gemini"
---

# How to Add a New Guide

This guide explains how to add a new guide to the website.

## Creating the Guide File

To add a new guide, you need to create a new Markdown file in the `core/apps/docs/src/routes/(content)/guides` directory.

The filename of the Markdown file will be used as the URL slug for the guide. For example, if you create a file named `my-awesome-guide.md`, the guide will be available at `/guides/my-awesome-guide`.

## Writing the Guide

You can use standard Markdown syntax to write your guide. You can also use HTML in your Markdown file.

### Adding Metadata

It is **required** to add frontmatter to each guide to include metadata such as the author, publication date, and title. For example:

```markdown
---
title: "My Awesome Guide"
author: "John Doe"
date: "2025-09-03"
---

# My Awesome Guide

This is the content of my guide.
```