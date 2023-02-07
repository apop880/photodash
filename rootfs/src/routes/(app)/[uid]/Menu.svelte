<script lang="ts">
    import { editMode } from '$lib/editorstore';
    import { createEventDispatcher } from "svelte";
    import { spring } from 'svelte/motion';
    import { fly } from 'svelte/transition';
    import { elasticInOut } from 'svelte/easing'
	  import { press } from 'svelte-gestures';
    import Sortable from 'svelte-sortable';
    export let showMenu;
    export let views;
    export let curView;

    let sortableViews = views.slice(1);
    $: sortableViews = views.slice(1);

    let itemToDelete: string | null = null;

    let modals = {
        add: false,
        sort: false,
        delete: false
    }
    let newIcon = "";
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

    const openDelete = (uid: string) => {
        itemToDelete = uid;
        modals.delete = true;
    }

    const confirmDelete = () => {
        modals.delete = false;
        dispatch("deleteview", {
            uid: itemToDelete
        })
        itemToDelete = null;
    }

    const cancelDelete = () => {
        modals.delete = false;
        itemToDelete = null;
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
            use:press={{ timeframe: 300, triggerBeforeFinished: false }} on:press={() => { if ($editMode) openDelete(item.uid)}}
            style="transform: scale({$size})">
            <iconify-icon icon="{item.icon}" height="36"></iconify-icon>
        </button>
    {/each}
    {#if $editMode}
    <button class="btn btn-circle btn-lg btn-success border-base-200" on:click={() => modals.add = true}><iconify-icon icon="material-symbols:add-box-outline-rounded" height="36"></iconify-icon></button>
    <button class="btn btn-circle btn-lg btn-info border-base-200" on:click={() => modals.sort = true}><iconify-icon icon="material-symbols:compare-arrows" height="36"></iconify-icon></button>
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
        <input name="icon" type="text" id="icon" class="input input-bordered w-full" on:input={() => newIcon} />
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
              <iconify-icon icon="{item.icon}" height="36" class="btn btn-circle btn-lg m-4"></iconify-icon>
        </Sortable>
      </div>
      <div class="modal-action">
        <button type="reset" class="btn btn-error" on:click={cancelSort}>Cancel</button>
        <button type="submit" class="btn btn-success">Confirm</button>
      </div>
      </form>
    </div>
  </div>