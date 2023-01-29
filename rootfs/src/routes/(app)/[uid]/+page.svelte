<script lang="ts">
    import type { PageData } from './$types';
    import { page } from '$app/stores';
    import { stateStore } from '$lib/apistore'
    import { swipe } from 'svelte-gestures';
    //import Grid from 'svelte-grid-extended';
    import Navbar from '$lib/components/Navbar.svelte';
    import MusicPlayer from './bgmusic.svelte';
	import Slideshow from './Slideshow.svelte';
	import Topbar from './topbar.svelte';
	import Menu from './Menu.svelte';
    export let data: PageData;
    let curView = null;
    let showMenu = false;
    let showNavbar = false;
    let timer: string | number | NodeJS.Timeout | undefined;

    /*let items = [
		{ id: '0', x: 0, y: 0, w: 1, h: 1 },
		{ id: '1', x: 0, y: 1, w: 3, h: 1 }
	];
    let itemSize = {height: 70}*/

    const handleClick = () => {
        console.log("click!")
        clearTimeout(timer);
        showMenu = true;
        timer = setTimeout(() => {
            showMenu = false;
            curView = null;
        }, 30000)
    }

    const handleSwipe = (e: CustomEvent) => {
        if (e.detail.direction === "bottom") {
            showNavbar = true;
        }
        else {
            showNavbar = false;
        }
    }

    const handleAddView = (e) => {
        data.configuration.views = [...data.configuration.views, {icon: e.detail.newView}]
        fetch("api/saveViews", {
            method: "POST",
            body: JSON.stringify({
                uid: $page.params.uid,
                views: data.configuration.views
            })
        })
    }

    function handleMessage(e) {
		clearTimeout(timer);
		if(curView === e.detail.newView) {
			curView = null;
			timer = setTimeout(() => showMenu = false, 3000)
		}
		else {
			timer = setTimeout(() => {
				showMenu = false;
				curView = null;
			}, 30000)
			curView = e.detail.newView;
		}
	}

    $: console.log("showMenu",showMenu)
</script>

{#if showNavbar}
    <Navbar absolute={true} currentConfig={data.configuration.name} />
{/if}
{#if $stateStore !== null}
<!-- svelte-ignore a11y-click-events-have-key-events -->
<main class="h-screen w-screen overflow-y-hidden bg-transparent grid grid-rows-[80px_1fr_100px] relative z-10" on:click={handleClick} use:swipe={{ timeframe: 300, minSwipeDistance: 50, touchAction: 'none' }} on:swipe={handleSwipe}>
    <Topbar />
    <div> </div>
    <Menu {showMenu} {curView} views={data.configuration.views} on:addview={handleAddView} on:message={handleMessage} />
    
    <!--<Grid class="relative z-30" cols={10} rows={8} bind:items={items} {itemSize} let:item>
        <div class="bg-primary h-full">{item.id}</div>
    </Grid>-->
</main>
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
    <main class="flex w-screen h-screen items-center justify-center">
        <div class="btn loading btn-lg">Connecting...</div>
    </main>
{/if}