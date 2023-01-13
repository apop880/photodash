<script lang="ts">
    import type { PageData } from './$types'
    import { Container, Button } from '@svelteuidev/core'
    export let data: PageData;
</script>

<Container>
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
<Button href="/config">Create New Configuration</Button>
</Container>