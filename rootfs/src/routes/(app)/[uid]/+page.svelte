<script lang="ts">
    import type { PageData } from './$types';
    import { stateStore } from '$lib/apistore'
    import { swipe } from 'svelte-gestures';
    import MusicPlayer from './bgmusic.svelte';
	import Slideshow from './Slideshow.svelte';
	import Topbar from './topbar.svelte';
    export let data: PageData;
    let curview = null;
    let showMenu = false;
    let showToolbar = false;
    let timer: string | number | NodeJS.Timeout | undefined;

    const handleClick = () => {
        clearTimeout(timer);
        showMenu == true;
        timer = setTimeout(() => {
            showMenu = false;
            curview = null;
        })
    }

    const handleSwipe = (e: CustomEvent) => {
        if (e.detail.direction === "bottom") {
            showToolbar = true;
        }
        else {
            showToolbar = false;
        }
    }
</script>

{#if showToolbar}
<div class="navbar bg-primary shadow-lg shadow-primary-content z-50 absolute">
	<div class="flex-1">
	  <a href="/" class="btn btn-ghost normal-case text-xl text-primary-content">Photodash</a>
	</div>
	<div class="flex-none">
	  <a href="/settings" class="btn btn-square btn-ghost text-primary-content">
		<iconify-icon icon="ion:settings-outline" height="36"></iconify-icon>
	  </a>
	</div>
  </div>
  {/if}
<!-- svelte-ignore a11y-click-events-have-key-events -->
<main class="h-screen w-screen overflow-y-hidden bg-transparent" on:click={handleClick} use:swipe={{ timeframe: 300, minSwipeDistance: 50, touchAction: 'none' }} on:swipe={handleSwipe}>
    <Topbar />
    {#if $stateStore !== null}
        {#if data.configuration?.backgroundMusicEntity && data.configuration?.backgroundMusicFile}
            <MusicPlayer entity={data.configuration.backgroundMusicEntity} url={data.configuration.backgroundMusicFile} />
        {/if}
        {#if 
            (data.configuration?.useLocalPhotos || data.configuration?.googleAlbumId)
            &&
            data.configuration.disableSlideShow.every(d => $stateStore?.[d.entity].state !== d.state)
        }
            <Slideshow name={data.configuration.name} googleAlbumId={data.configuration.googleAlbumId} />
        {/if}
    {:else}
        <div class="flex w-full h-full items-center justify-center">
            <div class="btn loading btn-lg">Connecting...</div>
        </div>
    {/if}
</main>