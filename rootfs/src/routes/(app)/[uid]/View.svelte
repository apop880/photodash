<script lang="ts">
    import { editMode } from '$lib/editorstore';
    import { press } from 'svelte-gestures';
	import { createEventDispatcher } from 'svelte';
    import Grid from 'svelte-grid-extended';
    import ServiceTile from './tiles/ServiceTile.svelte';
	import type { ExtendedView } from '$lib/types';
	import { fly } from 'svelte/transition';
    export let view: ExtendedView;
    let incrementor = 0; //generates temporary unique ID for new tiles
    let items = view.tiles ?? [];
    let itemsToDelete: string[] = [];
    let components = {ServiceTile};
    let rows = Math.floor((window.screen.height - 180) / 80);
    let itemSize = {height: 70};
    let modals = {
        add: false,
        edit: false,
        delete: false
    }
    let itemToDelete: null | string = null;

    const dispatch = createEventDispatcher();

    const onSave = () => {
        dispatch("editview", {
            items,
            itemsToDelete
        })
    }

    const confirmAdd = (e) => {
        incrementor++;
        const formData = new FormData(e.target);
        let json = Object.fromEntries(formData.entries());
        console.log(json);
        const component = json.component as string;
        delete json["component"]
        const gridMatrix = Array(rows);
        let coords = {x: -1, y: -1}
        gridMatrix.fill([false, false, false, false, false, false, false, false], 0, rows);
        items.forEach(i => {
            gridMatrix[i.y].fill(true, i.x, i.x+i.w);
            for (let z=1; z < i.h; z++) {
                gridMatrix[i.y+z].fill(true, i.x, i.x+i.w);
            }
        })
        gridMatrix.every((r, idx) => {
            const openX: number = r.findIndex((x: Boolean) => x === false)
            if (openX > -1) {
                coords.x = openX;
                coords.y = idx;
                items = [...items, {id: `new_${incrementor}`, viewId: "new", x: coords.x, y: coords.y, w: 1, h: 1, component, config: json }]
                return false;
            }
            return true;
        })
        modals.add = false;
    }

    const cancelAdd = () => {
        modals.add = false;
        const form: HTMLFormElement | null = document.getElementById('addTile') as HTMLFormElement
        if (form) {
            form.reset();
        }
    }

    const openDelete = (id: string) => {
        itemToDelete = id;
        modals.delete = true;
    }

    const confirmDelete = () => {
        if (!itemToDelete!.startsWith("new")) {
            itemsToDelete = [...itemsToDelete, itemToDelete!]
        }
        modals.delete = false;
        let newItems = [...items]
        newItems.splice(newItems.findIndex(i => i.id === itemToDelete!), 1);
        items = [...newItems];
        itemToDelete = null;
    }

    const cancelDelete = () => {
        modals.delete = false;
        itemToDelete = null;
    }
</script>

{#if items.length > 0}
<Grid class="relative z-30" cols={8} {rows} bind:items={items} {itemSize} let:item readOnly={!$editMode}>
    <div class="h-full" use:press={{ timeframe: 300, triggerBeforeFinished: false }} on:press={() => { if ($editMode) openDelete(item.id)}} transition:fly="{{ y: 100, duration: 1000 }}">
        {#key item}
            <svelte:component this={components[item.component]} config={item.config} height={item.h} />
        {/key}   
    </div>
</Grid>
{/if}

{#if $editMode}
<div class="z-20 h-16 absolute bottom-3 left-3 flex items-center gap-2">
    <button class="btn btn-success" on:click={()=>modals.add = true}>Add Tile</button>
    {#if view?.tiles !== items && items.length > 0}<button class="btn btn-success" on:click={onSave}>Save Changes</button>{/if}
</div>
{/if}

<!--Add modal-->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div id="outside-add" class="modal" class:modal-open={modals.add} on:click={cancelAdd}>
    <div class="modal-box" on:click|stopPropagation>
      <h3 class="font-bold text-lg">Add a Tile</h3>
      <form id="addTile" on:submit|preventDefault={confirmAdd}>
      <div class="form-control w-full">
        <select class="select w-full max-w-xs" name="component">
            <option disabled selected>Tile Type</option>
            <option value="ServiceTile">Service Tile</option>
        </select>
        <label class="label" for="icon">
          <span class="label-text">Enter an Iconify icon name<br>(example: <code>material-symbols:lightbulb-rounded</code>)</span>
        </label>
        <input name="icon" type="text" id="icon" class="input input-bordered w-full" />
        <label class="label" for="icon">
            <span class="label-text-alt"><a target="_blank" href="https://icon-sets.iconify.design/" rel="noreferrer" class="link link-primary">Click here to search the Iconify library</a></span>
        </label>
        <label class="label" for="serviceType">
            <span class="label-text">Service Type</span>
        </label>
        <input name="serviceType" type="text" id="serviceType" class="input input-bordered w-full" />
        <label class="label" for="target">
            <span class="label-text">Target</span>
        </label>
        <input name="target" type="text" id="target" class="input input-bordered w-full" />
        <label class="label" for="text">
            <span class="label-text">Tile Text</span>
        </label>
        <input name="text" type="text" id="text" class="input input-bordered w-full" />
      </div>
      <div class="modal-action">
        <button type="reset" class="btn btn-error" on:click={()=>modals.add = false}>Cancel</button>
        <button type="submit" class="btn btn-success">Save</button>
      </div>
      </form>
    </div>
  </div>

<!--Delete modal-->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div id="outside-delete" class="modal" class:modal-open={modals.delete} on:click={cancelDelete}>
    <div class="modal-box" on:click|stopPropagation>
      <h3 class="font-bold text-lg">Delete Tile</h3>
      <form id="deleteTile" on:submit|preventDefault={confirmDelete}>
      <div class="form-control w-full">
        <p>Are you sure you want to delete this tile?</p>
      </div>
      <div class="modal-action">
        <button type="reset" class="btn btn-error" on:click={cancelDelete}>Cancel</button>
        <button type="submit" class="btn btn-success">Confirm</button>
      </div>
      </form>
    </div>
  </div>