<script lang="ts">
    import type { PageData } from './$types'
    import { AppShell, Stack, Button, Group, Text } from '@svelteuidev/core'
    export let data: PageData;
</script>

<AppShell><slot>
<Stack>
<h1>Welcome to PhotoDash!</h1>
{#if data.configurations.length > 0}
    <h2>Existing Configurations</h2>
        {#each data.configurations as config}
            <Group grow>
                <Text>{config.name}</Text>
                <Button href={`/${config.uid}`}>Load</Button>
                <Button href={`/config/${config.uid}`}>Edit</Button>
            </Group>
        {/each}
{:else}
    <h2>No Existing Configurations</h2>
{/if}
<Button href="/config">Create New Configuration</Button>
</Stack>
</slot></AppShell>