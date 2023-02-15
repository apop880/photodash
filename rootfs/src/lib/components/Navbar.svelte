<script lang="ts">
    import { page } from '$app/stores';
    import { fly } from 'svelte/transition';
	import { editMode } from '$lib/editorstore';
    export let absolute = false;
    export let currentConfig: null | string = null;

    const toggleEditMode = () => {
        editMode.update(e => !e)
    }
</script>

<div class="navbar bg-primary shadow-lg shadow-primary-content z-50" class:absolute transition:fly={{ y: -200, duration: absolute ? 500 : 0}}>
    <div class:flex-1="{!absolute}">
    <a href="/" data-sveltekit-reload={absolute ? "" : "off"} class="btn btn-ghost normal-case text-xl text-primary-content">
    <img src="/logo.png" class="h-full" alt="Photodash Logo" />
    </a>
    </div>
    {#if currentConfig}
    <div class="flex-1 text-primary-content">Current Config: {currentConfig}</div>
    <div class="flex-1">
        <a href={`/config/${$page.params.uid}`} data-sveltekit-reload={absolute ? "" : "off"} class="text-primary-content flex items-center gap-2 btn btn-ghost">
                <iconify-icon icon="fluent:form-24-regular" height="36"></iconify-icon>Edit Config
            </a>
    </div>
    <div class="flex-1">
        <button class="text-primary-content flex items-center gap-2 btn btn-ghost"
        on:click={toggleEditMode}>
            <iconify-icon icon="material-symbols:grid-view-rounded" height="36"></iconify-icon>
            {#if !$editMode}Edit Views{:else}Done Editing{/if}
        </button>
    </div>
    {/if}
    <div class="flex-none">
    <a href="/settings" data-sveltekit-reload={absolute ? "" : "off"} class="text-primary-content flex items-center gap-2 btn btn-ghost">
        <iconify-icon icon="ion:settings-outline" height="36"></iconify-icon>Global Settings
    </a>
    </div>
</div>