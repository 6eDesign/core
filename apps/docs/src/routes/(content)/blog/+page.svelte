<script lang="ts">
  import type { PageData } from './$types';

  const { data } = $props<{ data: PageData }>();
  const { posts } = data;
</script>

<div class="container py-8">
  <h1 class="text-4xl font-bold mb-8">Blog</h1>

  {#if posts.length === 0}
    <p>No blog posts found.</p>
  {:else}
    <div class="grid gap-6">
      {#each posts as post}
        <a href="/blog/{post.slug}" class="block p-4 border rounded-lg hover:bg-muted">
          <h2 class="text-2xl font-semibold">{post.meta.title}</h2>
          <p class="text-sm text-muted-foreground">
            {post.meta.date ? post.meta.date : 'No date'} by {post.meta.author || 'Unknown'}
          </p>
        </a>
      {/each}
    </div>
  {/if}
</div>