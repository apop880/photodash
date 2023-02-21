<script lang="ts">
	import { onMount } from "svelte";

    export let height: string | number;
    export let icon: string;
    let html: string;
    let viewBox: string;

    onMount(async () => {
        const res = await fetch(`/api/iconify/${icon}`);
        const json = await res.json();
        html = json.body;
        viewBox = `${json.left} ${json.top} ${json.width} ${json.height}`;
    })
</script>

{#if html}
<svg {height} {viewBox}>
    {@html html}
</svg>
{/if}