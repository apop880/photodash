<script lang="ts">
	import { onMount } from "svelte";
    import { fade } from "svelte/transition";
    export let autoClose = false;
    let display = true;

    onMount(() => {
        if (autoClose) {
            setTimeout(() => display = false, 3000);
        }
    })
</script>

{#if display}
<div class="toast" transition:fade>
    <div class="alert alert-success">
        <div>
        <slot></slot>
        </div>
    </div>
</div>
{/if}