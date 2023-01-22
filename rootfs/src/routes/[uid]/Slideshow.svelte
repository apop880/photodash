<script lang="ts">
    import { fade } from 'svelte/transition'
    import { onDestroy } from 'svelte';
    import { getGoogleImages } from '$lib/googlePhotos';
    export let name: string;
    export let googleAlbumId: string | null;
    let x = 2; //index positions 0 and 1 are hardcoded for the initial component load, so we just start at 2 for additional photos
    let images: Array<string> = [];
    let nextImages: Array<string> = [];
    let imgA = ''
    let imgB = ''
    let showA = true;
    let rotator: string | number | NodeJS.Timer | undefined;
    const swapImages = () => {
        if(showA) {
            showA = !showA;
            setTimeout(() => { imgA = images[x]; }, 5000)
        }
        else {
            showA = !showA;
            setTimeout(() => { imgB = images[x]; }, 5000)
        }
        x++;
        if(x > images.length-1) {
            x = 0;
            if (nextImages.length > 0) {
                images = [...nextImages];
                getGoogleImages(googleAlbumId!).then(res => images = res);
            }
        }
    }
    const getImages = async () => {
        if (!googleAlbumId || googleAlbumId.length === 0) {
            const res = await fetch(`/api/localSlideshow?name=${name}`);
            images = await res.json();
        }
        else {
            images = await getGoogleImages(googleAlbumId);
            nextImages = await getGoogleImages(googleAlbumId);
        }
        imgA = images[0];
        imgB = images[1];
        rotator = setInterval(swapImages, 30000);
    }
    onDestroy(() => {
        clearInterval(rotator);
    })
</script>

<style>
    #backgroundSlider {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
        color: transparent;
        z-index: -1;
    }
    .image {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
    }
</style>

<div id="backgroundSlider">
    {#await getImages() then}
    {#if showA && imgA !== ''}
    <div transition:fade|local="{{delay: 2000, duration: 1000}}"  class="image" style="background-image: url({imgA})"></div>
    {:else if imgB !== ''}
    <div transition:fade|local="{{delay: 2000, duration: 1000}}" class="image" style="background-image: url({imgB})"></div>
    {/if}
    {/await}
</div>