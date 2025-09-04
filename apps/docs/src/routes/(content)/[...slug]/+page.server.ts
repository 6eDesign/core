import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { render } from 'svelte/server';

// Glob all markdown files within the (content) route group
const allMarkdownModules = import.meta.glob('../**/*.md', { eager: true });

export const load: PageLoad = async ({ params }) => {
  const slug = params.slug;
  let content = '';
  let meta = {};

  // Try to find the module based on the slug
  // This needs to account for the nested structure of API docs
  // Example: slug = 'api/@6edesign/zrpc'
  // Expected glob key: '../api/generated-docs/@6edesign/zrpc/README.md'
  // Or: '../api/generated-docs/@6edesign/microservice/classes/MicroService.md'

  let module = null;
  const possibleModuleKeys = [
    `../${slug}.md`, // For blog/guides
    `../${slug}/README.md`, // For nested READMEs (e.g., package root)
    `../${slug}/index.md`, // For nested index files
    `../api/generated-docs/${slug}.md`, // For direct API files
    `../api/generated-docs/${slug}/README.md`, // For API package READMEs
    `../api/generated-docs/${slug}/index.md` // For API package index files
  ];

  for (const key of possibleModuleKeys) {
    if (allMarkdownModules[key]) {
      module = allMarkdownModules[key];
      break;
    }
  }

  if (!module) {
    console.error(`Could not find module for slug: ${slug}. Tried: ${possibleModuleKeys.join(', ')}`);
    throw error(404, 'Content not found');
  }

  try {
    const { html } = render(module.default);
    content = html;
    meta = module.metadata;
  } catch (e) {
    console.error(`Could not load content for ${module.path}:`, e);
    throw error(404, 'Content not found');
  }

  return {
    content,
    meta
  };
};