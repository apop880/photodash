<script lang="ts">
    import { browser } from '$app/environment';
    import type { PageData } from './$types'
    import { getHassAuth } from '$lib/apistore';
    export let data: PageData;
    let loaded = false;
    if (!(data.baseSettings?.token) && browser) {
        getHassAuth(data.baseSettings!.hassBaseUrl).then(res => {
          if (res.data) {
            loaded = true;
          }
        });
    }
    else if (browser) {
      loaded = true;
    }
</script>

<div class="grid grid-cols-6 gap-x-2 gap-y-4 items-center max-w-fit mx-auto">
  {#if loaded}
  <div class="text-lg font-bold col-span-5">Existing Configurations</div>
  <div><a class="btn btn-filled-primary" href="/config">Create New</a></div>
  <hr class="col-span-6 h-1 bg-gray-400 border-0">
  {#each data.configurations as config}
    <div class="col-span-3 font-semibold">{config.name}</div>
    <a href={`/${config.uid}`} class="btn btn-filled-primary">
      Load
    </a>
    <a href={`/config/${config.uid}`} class="btn btn-filled-primary">
      Edit
    </a>
    <div class="btn btn-disabled">Clone</div>
    <hr class="col-span-6 h-1 bg-gray-400 border-0">
  {/each}
  {:else}
  <div class="text-lg font-bold col-span-6 text-center">Connecting to Home Assistant...</div>
  {/if}
</div>