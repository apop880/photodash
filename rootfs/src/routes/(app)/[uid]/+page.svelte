<script lang="ts">
    import type { PageData } from './$types';
    import { stateStore } from '$lib/apistore'
    import MusicPlayer from './bgmusic.svelte';
	import Slideshow from './Slideshow.svelte';
	import Topbar from './topbar.svelte';
    export let data: PageData;
    let curview = null;
    let showSlideShow = true;
    let showMenu = false;
    let timer: string | number | NodeJS.Timeout | undefined;

    const mainClick = () => {
        console.log("mainClick")
        clearTimeout(timer);
        showMenu == true;
        timer = setTimeout(() => {
            showMenu = false;
            curview = null;
        })
    }

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

<!-- svelte-ignore a11y-click-events-have-key-events -->
<main class="h-screen w-screen overflow-y-hidden bg-transparent" on:click={mainClick}>
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
    {:else}
        <div class="btn loading mx-auto container m-5 text-2xl">Connecting...</div>
    {/if}
</main>