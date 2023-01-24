<script lang="ts">
    import { browser } from '$app/environment';
    import type { PageData } from './$types'
    import { getHassAuth } from '$lib/apistore';
    export let data: PageData;
    let auth;
    if (!(data.baseSettings?.token) && browser) {
        getHassAuth(data.baseSettings!.hassBaseUrl);
    }
</script>

{#if data.configurations.length > 0}
    <h2>Existing Configurations</h2>
    <br>
        {#each data.configurations as config}
            <div class="grid grid-cols-3 gap-2 items-center">
                <div>{config.name}</div>
                <a href={`/${config.uid}`} class="btn btn-filled-primary">
                  Load
                </a>
                <a href={`/config/${config.uid}`} class="btn btn-filled-primary">
                  Edit
                </a>
              </div>
        {/each}
{:else}
    <h2>No Existing Configurations</h2>
{/if}
<br><br>
<a class="btn btn-filled-primary" href="/config">Create New Configuration</a>