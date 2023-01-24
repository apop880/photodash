<script lang="ts">
    import type { PageData } from './$types';
    import { stateStore } from '$lib/apistore'
    import MusicPlayer from './bgmusic.svelte';
	import Slideshow from './Slideshow.svelte';
	import Topbar from './topbar.svelte';
    export let data: PageData;
    let showSlideShow = true;
    $: {
        data.configuration.disableSlideShow.some((d, idx) => {
            if ($stateStore?.[d.entity].state === d.state) {
                showSlideShow = false;
                return true; //short-circuit the evaluation if any criteria met for disabling
            }
            else if (idx === data.configuration.disableSlideShow.length - 1) {
                showSlideShow = true; //we are at the end of the array and no criteria met to disable, so make sure it's enabled
            }
        })
    }
</script>

<main>
<Topbar />
{#if $stateStore !== null}
    {#if data.configuration?.backgroundMusicEntity && data.configuration?.backgroundMusicFile}
        <MusicPlayer entity={data.configuration.backgroundMusicEntity} url={data.configuration.backgroundMusicFile} />
    {/if}
    {#if 
        (data.configuration?.useLocalPhotos || data.configuration?.googleAlbumId)
        &&
        showSlideShow
    }
        <Slideshow name={data.configuration.name} googleAlbumId={data.configuration.googleAlbumId} />
    {/if}
{/if}
</main>