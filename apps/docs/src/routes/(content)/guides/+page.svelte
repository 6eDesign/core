<script lang="ts">
  import type { PageData } from './$types';

  const { data } = $props<{ data: PageData }>();
  const { guides } = data;
</script>

<div class="container py-8">
  <h1 class="text-4xl font-bold mb-8">Guides</h1>
  {#if guides.length === 0}
    <p>No guides found.</p>
  {:else}
    <div class="grid gap-6">
      {#each guides as guide}
        <a href="/guides/{guide.slug}" class="block p-4 border rounded-lg hover:bg-muted">
          <h2 class="text-2xl font-semibold">{guide.meta.title}</h2>
          <p class="text-sm text-muted-foreground">
            {guide.meta.date ? guide.meta.date : 'No date'} by {guide.meta.author || 'Unknown'}
          </p>
        </a>
      {/each}
    </div>
  {/if}
</div>