<script lang="ts">
    import { editMode } from '$lib/editorstore';
	import { createEventDispatcher } from 'svelte';
    import Grid from 'svelte-grid-extended';
    import ServiceCard from './cards/ServiceCard.svelte';
    let components = {ServiceCard};
    export let view;
    let itemSize = {height: 70};
    let items = view?.items ?? [];
    $: items = view?.items ?? [];
    let isModalOpen = false;

    const onSubmit = () => {
        items = [...items, { id: items.length, x: 0, y: 0, w: 1, h: 1, component: "ServiceCard", config: {text: "Kitchen Can Lights", serviceType: "homeassistant.toggle", target: "light.kitchen_can_lights"} }]
    }

    const handleChange = (e) => {
        items[e.detail.item.id] = e.detail.item
    }

    const dispatch = createEventDispatcher();

    const onSave = () => {
        dispatch("editview", {
            items
        })
    }
</script>

{#if items}
<Grid class="relative z-30" cols={10} rows={8} {items} {itemSize} let:item on:change={handleChange}>
    <div class="h-full">
        <svelte:component this={components[item.component]} config={item.config} />
    </div>
</Grid>
{/if}

{#if $editMode}
<div class="z-20 h-16 absolute bottom-3 left-3 flex items-center gap-2">
    <button class="btn btn-success" on:click={()=>isModalOpen = true}>Add Card</button>
    {#if view?.items !== items && items.length > 0}<button class="btn btn-success" on:click={onSave}>Save Changes</button>{/if}
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