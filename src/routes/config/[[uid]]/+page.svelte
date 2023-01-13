<script lang="ts">
    import type { PageData } from './$types';
    import { stateStore } from '$lib/apistore'
    import { AppShell, Button } from '@svelteuidev/core'
    export let data: PageData;
</script>

<AppShell><slot>
{#if $stateStore !== null}
<form method="POST">
    <label for="name">Configuration Name</label>
    <input type="text" id="name" name="name" required>
    <label for="weather-entity">Weather Entity</label>
    <select name="weatherEntity" id="weather-entity">
        <option value="" selected={data.configuration?.weatherEntity === null}> </option>
        {#each Object.keys($stateStore) as entity}
            {#if entity.startsWith('weather')}
                <option value={entity} selected={data.configuration?.weatherEntity === entity}>{entity}</option>
            {/if}
        {/each}
    </select><br>
    <label for="music-entity">Background Music Entity</label>
    <select name="backgroundMusicEntity" id="music-entity">
        <option value="" selected={data.configuration?.backgroundMusicEntity === null}> </option>
        {#each Object.keys($stateStore) as entity}
            {#if entity.startsWith('input_boolean')}
                <option value={entity} selected={data.configuration?.backgroundMusicEntity === entity}>{entity}</option>
            {/if}
        {/each}
    </select><br>
    <label for="music-file">Background Music File</label>
    <input type="text" id="music-file" name="backgroundMusicFile">
    <Button>Save</Button>
</form>
{/if}
</slot></AppShell>