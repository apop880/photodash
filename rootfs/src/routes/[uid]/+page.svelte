<script lang="ts">
    import type { PageData } from './$types';
    import { stateStore } from '$lib/apistore'
    import MusicPlayer from './bgmusic.svelte';
    import { AppShell } from '@svelteuidev/core'
    export let data: PageData;
</script>

<AppShell><slot>
{#if $stateStore !== null}
    {#if data.configuration?.backgroundMusicEntity && data.configuration?.backgroundMusicFile}
        <MusicPlayer entity={data.configuration.backgroundMusicEntity} url={data.configuration.backgroundMusicFile} />
    {/if}
{/if}
</slot></AppShell>