<script lang="ts">
  import { Check, Copy } from "lucide-svelte";

  let copied = false;
  export let code = "";

  const copy = () => {
    navigator.clipboard.writeText(code);
    copied = true;
    setTimeout(() => (copied = false), 2000);
  };
</script>

<button on:click={copy} class="absolute top-2 right-2 p-1 rounded-md bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white">
  {#if copied}
    <Check class="w-4 h-4" />
  {:else}
    <Copy class="w-4 h-4" />
  {/if}
</button>