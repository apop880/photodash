<script lang="ts">
    import type { PageData } from './$types';
    import { page } from '$app/stores';
    import { stateStore } from '$lib/apistore'
    import { editMode } from '$lib/editorstore';
    import { swipe } from 'svelte-gestures';
    import Navbar from '$lib/components/Navbar.svelte';
    import MusicPlayer from './bgmusic.svelte';
	import Slideshow from './Slideshow.svelte';
	import Topbar from './topbar.svelte';
	import Menu from './Menu.svelte';
	import View from './View.svelte';
    export let data: PageData;
    let curView: null | number = null;
    let showMenu = false;
    let showNavbar = false;
    let timer: string | number | NodeJS.Timeout | undefined;

    $: if($editMode === false) {
        showMenu = false;
        curView = null;
    }

    const handleClick = () => {
        clearTimeout(timer);
        showMenu = true;
        if (curView === null) {
            curView = 0;
        }
        timer = setTimeout(() => {
            showMenu = false;
            if (!$editMode) curView = null;
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

    const handleAddView = async (e) => {
        const res = await fetch("api/views", {
            method: "POST",
            body: JSON.stringify({
                configId: $page.params.uid,
                icon: e.detail.newView,
                sortOrder: data.configuration.views.length
            })
        });
        const newView = await res.json();
        data.configuration.views = [...data.configuration.views, newView]
    }

    const handleDeleteView = async (e) => {
        const res = await fetch("api/views", {
            method: "DELETE",
            body: JSON.stringify({
                uid: e.detail.uid
            })
        });
        data.configuration.views = [...data.configuration.views.filter(v => v.uid !== e.detail.uid)]
        curView = null;
    }

    const handleSortViews = async (e) => {
        const res = await fetch("api/views", {
            method: "PUT",
            body: JSON.stringify({
                views: e.detail.sortableViews
            })
        });
        const newViews = await res.json();
        data.configuration.views = [data.configuration.views[0], ...newViews]
    }

    const handleEditView = async (e) => {
        console.log(e.detail.items);
        const res = await fetch("api/view", {
            method: "POST",
            body: JSON.stringify({
                viewId: data.configuration.views[curView!].uid,
                tiles: e.detail.items,
                toDelete: e.detail.itemsToDelete
            })
        });
        const json = await res.json();
        data.configuration.views[curView!].tiles = json;
    }

    const handleNavigateView = (e) => {
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
</script>

{#if showNavbar}
    <Navbar absolute={true} currentConfig={data.configuration.name} />
{/if}
{#if $stateStore !== null}
<!-- svelte-ignore a11y-click-events-have-key-events -->
<main class="h-screen w-screen overflow-y-hidden bg-transparent grid grid-rows-[80px_1fr_100px] relative z-10" on:click={handleClick} use:swipe={{ timeframe: 300, minSwipeDistance: 50, touchAction: 'none' }} on:swipe={handleSwipe}>
    <Topbar />
    {#if curView}
    {#key curView}
        <View view={data.configuration.views[curView]} on:editview={handleEditView} />
    {/key}
    {/if}
    <Menu {showMenu} {curView} views={data.configuration.views} on:addview={handleAddView} on:deleteview={handleDeleteView} on:sortviews={handleSortViews} on:navigateview={handleNavigateView} />
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