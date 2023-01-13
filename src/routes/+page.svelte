<script lang="ts">
    import type { PageData } from './$types'
    export let data: PageData;
</script>

<h1>Welcome to PhotoDash!</h1>
{#if data.configurations.length > 0}
    <h2>Load Existing Configuration</h2>
    <ul>
        {#each data.configurations as config}
            <li>{config.name}</li>
        {/each}
    </ul>
{:else}
    <h2>No Existing Configurations</h2>
{/if}
<a href="/config">Create New Configuration</a>