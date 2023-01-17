<script lang="ts">
    import { browser } from '$app/environment';
    import type { PageData } from './$types'
    import { AppShell, Stack, Button, Group, Text } from '@svelteuidev/core'
    import { getHassAuth } from '$lib/apistore';
    export let data: PageData;
    let auth;
    if (!(data.token) && data.hassBaseUrl && browser) {
        auth = getHassAuth(data.hassBaseUrl);
    }
</script>

<AppShell><slot>
<Stack>
<h1>Welcome to PhotoDash!</h1>
{#if data.hassBaseUrl === null}
<form method="POST">
    <label for="hassBaseUrl">For Initial Setup, Please Provide the Base URL, including port, of your Home Assistant instance:</label>
    <input type="text" id="hassBaseUrl" name="hassBaseUrl" placeholder="e.g. http://192.168.1.1:8123" required><br>
    <label for="token">Optionally provide a long-lived token to use for auth:</label>
    <input type="text" id="token" name="token">
    <Button>Save</Button>
</form>
{:else}
<form method="POST">
    <label for="hassBaseUrl">For Initial Setup, Please Provide the Base URL, including port, of your Home Assistant instance:</label>
    <input type="text" id="hassBaseUrl" name="hassBaseUrl" placeholder="e.g. http://192.168.1.1:8123" required><br>
    <label for="token">Optionally provide a long-lived token to use for auth:</label>
    <input type="text" id="token" name="token">
    <Button>Save</Button>
</form>
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
{/if}
<Button href="/config">Create New Configuration</Button>
</Stack>
</slot></AppShell>