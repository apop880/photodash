<script lang="ts">
    import { editMode } from '$lib/editorstore';
    import { createEventDispatcher } from "svelte";
    import { spring } from 'svelte/motion';
    import { fly } from 'svelte/transition';
    import { elasticInOut } from 'svelte/easing'
    export let showMenu;
    export let views;
    export let curView;

    let isModalOpen = false;
    let newIcon = "";
    let size = spring(1);

    const dispatch = createEventDispatcher();

    function onSubmit(e) {
        const formData = new FormData(e.target);

        dispatch("addview", {
            newView: formData.get('icon')
        })
        e.target.reset();
        isModalOpen = false;
    }

    function menuClick(view) {
        dispatch("message", {
            newView: view+1,
        });
    }

    $: console.log(curView)
</script>

{#if ($editMode || showMenu)}
<div class="z-10 h-16 absolute bottom-3 w-screen flex justify-center gap-1">
    {#each views.slice(1) as item, index}
        <button
            class="btn btn-circle btn-lg border-base-200 {curView === index+1 ? "btn-primary" : "btn-secondary"}"
            transition:fly="{{ y: 80, duration: 700, delay: 150*index, easing: elasticInOut }}"
            on:click={() => menuClick(index)}
            on:touchstart="{() => size.set(1.1)}"
            on:touchend="{() => size.set(1)}"
            style="transform: scale({$size})">
            <iconify-icon icon="{item.icon}" height="36"></iconify-icon>
        </button>
    {/each}
    {#if $editMode}
    <button class="btn btn-circle btn-lg btn-success border-base-200" on:click={() => isModalOpen = true}><iconify-icon icon="material-symbols:add-box-outline-rounded" height="36"></iconify-icon></button>
    {/if}
</div>
{/if}

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div id="outside" class="modal" class:modal-open={isModalOpen} on:click={()=>isModalOpen = false}>
    <div class="modal-box" on:click|stopPropagation>
      <h3 class="font-bold text-lg">Add a View</h3>
      <form on:submit|preventDefault={onSubmit}>
      <div class="form-control w-full">
        <label class="label" for="icon">
          <span class="label-text">Enter an Iconify icon name<br>(example: <code>material-symbols:lightbulb-rounded</code>)</span>
        </label>
        <input name="icon" type="text" id="icon" class="input input-bordered w-full" on:input={() => newIcon} />
        <label class="label" for="icon">
            <span class="label-text-alt"><a target="_blank" href="https://icon-sets.iconify.design/" rel="noreferrer" class="link link-primary">Click here to search the Iconify library</a></span>
        </label>
      </div>
      <div class="modal-action">
        <button type="reset" class="btn btn-error" on:click={()=>isModalOpen = false}>Cancel</button>
        <button type="submit" class="btn btn-success">Save</button>
      </div>
      </form>
    </div>
  </div>

<style>
    .menu {
        color: white;
        height: 60px;
        position: absolute;
        bottom: 10px;
        width: 400px;
        left: 50%;
        transform: translate(-50%, -50%);
        margin: 0 auto;
        text-align: center;
    }

    .button {
        background-color: rgba(158, 153, 153, 0.825);
        border-radius: 50%;
        padding: 10px;
        margin-top: 10px;
        margin-left: 10px;
        margin-right: 10px;
        width: 60px;
        height: 60px;
        border: 1px solid #414040;
        font-size: 1em;
        outline-style: none;
    }

    .active {
        background-color: rgba(22, 88, 149, 0.825);
    }
</style>