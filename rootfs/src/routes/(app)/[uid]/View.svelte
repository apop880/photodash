<script lang="ts">
    import { editMode } from '$lib/editorstore';
    import { press } from 'svelte-gestures';
	import { createEventDispatcher, SvelteComponent } from 'svelte';
    import Grid, { type LayoutItem } from 'svelte-grid-extended';
    import ServiceTile from './tiles/ServiceTile/ServiceTile.svelte';
    import ServiceTileConfig from './tiles/ServiceTile/ServiceTileConfig.svelte';
	import type { ExtendedView } from '$lib/types';
	import { fly } from 'svelte/transition';
    export let view: ExtendedView;
    type CustomItem = LayoutItem & {component: string, config: Object};
    let incrementor = 0; //generates temporary unique ID for new tiles
    let items = view.tiles ?? [];
    let itemsToDelete: string[] = [];
    const components = {ServiceTile};
    const componentMap = {
        "ServiceTile": ServiceTileConfig
    }
    let rows = Math.floor((window.screen.height - 180) / 80);
    let itemSize = {height: 70};
    let modals = {
        addEdit: false,
        delete: false
    }
    let itemToEdit: null | CustomItem = null;
    let component: null | string = null;

    const dispatch = createEventDispatcher();

    const onSave = () => {
        dispatch("editview", {
            items,
            itemsToDelete
        })
    }

    const openAdd = () => {
        modals.addEdit = true;
        component = null;
    }

    const confirmAdd = (e) => {
        incrementor++;
        const formData = new FormData(e.target);
        let json = Object.fromEntries(formData.entries());
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
        modals.addEdit = false;
    }

    const cancelAdd = () => {
        modals.addEdit = false;
        const form: HTMLFormElement | null = document.getElementById('addTile') as HTMLFormElement
        if (form) {
            form.reset();
        }
    }

    const openEdit = (item: CustomItem) => {
        itemToEdit = item;
        component = item.component;
        modals.addEdit = true;
    }

    const confirmEdit = (e) => {
        const formData = new FormData(e.target);
        let json = Object.fromEntries(formData.entries());
        const idx = items.findIndex(i => i.id === itemToEdit?.id)
        const component = json.component as string;
        delete json["component"];
        items[idx].component = component;
        items[idx].config = json;
        modals.addEdit = false;
        itemToEdit = null;
    }

    const cancelEdit = () => {
        modals.addEdit = false;
        itemToEdit = null;
    }

    const openDelete = (id: string) => {
        modals.addEdit = false;
        modals.delete = true;
    }

    const confirmDelete = () => {
        if (!itemToEdit!.id.startsWith("new")) {
            itemsToDelete = [...itemsToDelete, itemToEdit!.id]
        }
        modals.delete = false;
        let newItems = [...items]
        newItems.splice(newItems.findIndex(i => i.id === itemToEdit!.id), 1);
        items = [...newItems];
        itemToEdit = null;
    }

    const cancelDelete = () => {
        modals.delete = false;
        itemToEdit = null;
    }
</script>

{#if items.length > 0}
<Grid class="relative z-30" cols={8} {rows} bind:items={items} {itemSize} let:item readOnly={!$editMode}>
    <div class="h-full" use:press={{ timeframe: 300, triggerBeforeFinished: false }} on:press={() => { if ($editMode) openEdit(item)}} transition:fly="{{ y: 100, duration: 1000 }}">
        {#key item}
            <svelte:component this={components[item.component]} config={item.config} height={item.h} />
        {/key}   
    </div>
</Grid>
{/if}

{#if $editMode}
<div class="z-20 h-16 absolute bottom-3 left-3 flex items-center gap-2">
    <button class="btn btn-success" on:click={openAdd}>Add Tile</button>
    {#if view?.tiles !== items && items.length > 0}<button class="btn btn-success" on:click={onSave}>Save Changes</button>{/if}
</div>
{/if}

<!--Add/Edit modal-->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div id="outside-add" class="modal" class:modal-open={modals.addEdit} on:click={cancelAdd}>
    <div class="modal-box" on:click|stopPropagation>
      <h3 class="font-bold text-lg">{itemToEdit ? `Edit` : `Add`} a Tile</h3>
      <form id="addTile" on:submit|preventDefault={itemToEdit ? confirmEdit : confirmAdd}>
      <div class="form-control w-full">
        <select class="select select-bordered w-full max-w-xs mt-1" name="component" bind:value={component}>
            <option disabled value={null}>Tile Type</option>
            <option value="ServiceTile">Service Tile</option>
        </select>
        {#key itemToEdit}
            <svelte:component this={componentMap[component]} data={itemToEdit?.config} />
        {/key}
      </div>
      <div class="modal-action">
        {#if itemToEdit}<button class="btn btn-error" on:click|preventDefault={openDelete}>Delete Tile</button>{/if}
        <button type="reset" class="btn btn-error" on:click={()=>modals.addEdit = false}>Cancel</button>
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