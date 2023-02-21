<script lang="ts">
    import { editMode } from '$lib/editorstore';
    import { createEventDispatcher } from "svelte";
    import { spring } from 'svelte/motion';
    import { fly } from 'svelte/transition';
    import { elasticInOut } from 'svelte/easing'
	  import { press } from 'svelte-gestures';
    import Sortable from 'svelte-sortable';
	  import Icon from '$lib/components/Icon.svelte';
    export let showMenu;
    export let views;
    export let curView;

    let sortableViews = views.slice(1);
    $: sortableViews = views.slice(1);

    let itemToEdit: string | null = null;
    let curIcon: string | null = null;
    let itemIdx = 0;

    let modals = {
        add: false,
        edit: false,
        sort: false,
        delete: false
    }
    let size = spring(1);

    const dispatch = createEventDispatcher();

    const confirmAdd = (e) => {
        const formData = new FormData(e.target);

        dispatch("addview", {
            newView: formData.get('icon')
        })
        e.target.reset();
        modals.add = false;
    }

    const cancelAdd = () => {
        modals.add = false;
        const form: HTMLFormElement | null = document.getElementById('addView') as HTMLFormElement
        if (form) {
            form.reset();
        }
    }

    const openEdit = (uid: string, icon: string, index: number) => {
        itemToEdit = uid;
        itemIdx = index + 1;
        curIcon = icon;
        modals.edit = true;
    }

    const confirmEdit = (e) => {
        modals.edit = false;
        const formData = new FormData(e.target);

        dispatch("editview", {
            newIcon: formData.get('icon'),
            uid: itemToEdit,
            index: itemIdx
        })
        itemToEdit = null;
    }

    const cancelEdit = () => {
        modals.edit = false;
        itemToEdit = null;
    }

    const openDelete = () => {
        modals.delete = true;
        modals.edit = false;
    }

    const confirmDelete = () => {
        modals.delete = false;
        dispatch("deleteview", {
            uid: itemToEdit
        })
        itemToEdit = null;
    }

    const cancelDelete = () => {
        modals.delete = false;
        itemToEdit = null;
    }

    const confirmSort = () => {
        modals.sort = false;
        dispatch("sortviews", {
            sortableViews
        })
    }

    const cancelSort = () => {
        sortableViews = views.slice(1);
        modals.sort = false;
    }

    const menuClick = (view) => {
        dispatch("navigateview", {
            newView: view+1,
        });
    }
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
            use:press={{ timeframe: 300, triggerBeforeFinished: false }} on:press={() => { if ($editMode) openEdit(item.uid, item.icon, index)}}
            style="transform: scale({$size})">
            <Icon icon="{item.icon}" height="36"></Icon>
        </button>
    {/each}
    {#if $editMode}
    <button class="btn btn-circle btn-lg btn-success border-base-200" on:click={() => modals.add = true}><Icon icon="material-symbols:add-box-outline-rounded" height="36"></Icon></button>
    <button class="btn btn-circle btn-lg btn-info border-base-200" on:click={() => modals.sort = true}><Icon icon="material-symbols:compare-arrows" height="36"></Icon></button>
    {/if}
</div>
{/if}

<!--Add modal-->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div id="outside-add" class="modal" class:modal-open={modals.add} on:click={cancelAdd}>
    <div class="modal-box" on:click|stopPropagation>
      <h3 class="font-bold text-lg">Add a View</h3>
      <form id="addView" on:submit|preventDefault={confirmAdd}>
      <div class="form-control w-full">
        <label class="label" for="icon">
          <span class="label-text">Enter an Iconify icon name<br>(example: <code>material-symbols:lightbulb-rounded</code>)</span>
        </label>
        <input name="icon" type="text" id="icon" class="input input-bordered w-full" />
        <label class="label" for="icon">
            <span class="label-text-alt"><a target="_blank" href="https://icon-sets.iconify.design/" rel="noreferrer" class="link link-primary">Click here to search the Iconify library</a></span>
        </label>
      </div>
      <div class="modal-action">
        <button type="reset" class="btn btn-error" on:click={()=>modals.add = false}>Cancel</button>
        <button type="submit" class="btn btn-success">Save</button>
      </div>
      </form>
    </div>
  </div>

<!--Edit modal-->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div id="outside-edit" class="modal" class:modal-open={modals.edit} on:click={cancelEdit}>
  <div class="modal-box" on:click|stopPropagation>
    <h3 class="font-bold text-lg">Add a View</h3>
    <form id="addView" on:submit|preventDefault={confirmEdit}>
    <div class="form-control w-full">
      <label class="label" for="icon">
        <span class="label-text">Enter an Iconify icon name<br>(example: <code>material-symbols:lightbulb-rounded</code>)</span>
      </label>
      <input name="icon" type="text" id="icon" class="input input-bordered w-full" value={curIcon} />
      <label class="label" for="icon">
          <span class="label-text-alt"><a target="_blank" href="https://icon-sets.iconify.design/" rel="noreferrer" class="link link-primary">Click here to search the Iconify library</a></span>
      </label>
    </div>
    <div class="modal-action">
      <button class="btn btn-error" on:click|preventDefault={openDelete}>Delete View</button>
      <button type="reset" class="btn btn-error" on:click={()=>modals.edit = false}>Cancel</button>
      <button type="submit" class="btn btn-success">Save</button>
    </div>
    </form>
  </div>
</div>

<!--Delete modal-->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div id="outside-delete" class="modal" class:modal-open={modals.delete} on:click={cancelDelete}>
    <div class="modal-box" on:click|stopPropagation>
      <h3 class="font-bold text-lg">Delete View</h3>
      <form id="deleteView" on:submit|preventDefault={confirmDelete}>
      <div class="form-control w-full">
        <p>Are you sure you want to delete this view? <strong>This can not be undone.</strong></p>
      </div>
      <div class="modal-action">
        <button type="reset" class="btn btn-error" on:click={cancelDelete}>Cancel</button>
        <button type="submit" class="btn btn-success">Confirm</button>
      </div>
      </form>
    </div>
  </div>

<!--Sort modal-->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div id="outside-sort" class="modal" class:modal-open={modals.sort} on:click={cancelSort}>
    <div class="modal-box" on:click|stopPropagation>
      <h3 class="font-bold text-lg">Hold and Drag Views to Reorder</h3>
      <form id="deleteView" on:submit|preventDefault={confirmSort}>
      <div class="form-control w-full items-center">
        <Sortable items={sortableViews} let:item>
              <div class="btn btn-circle btn-lg m-4"><Icon icon="{item.icon}" height="36"></Icon></div>
        </Sortable>
      </div>
      <div class="modal-action">
        <button type="reset" class="btn btn-error" on:click={cancelSort}>Cancel</button>
        <button type="submit" class="btn btn-success">Confirm</button>
      </div>
      </form>
    </div>
  </div>