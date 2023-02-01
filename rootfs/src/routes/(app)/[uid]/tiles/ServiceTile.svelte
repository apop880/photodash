<script lang="ts">
    import { stateStore, action } from "$lib/apistore";
	import type { ServiceCardConfig } from "$lib/types";

    export let config: ServiceCardConfig;
    export let height: number;   

    const handleClick = () => {
        action(config.serviceType, config.target)
    }
</script>

<button class="btn btn-primary h-full w-full grid grid-cols-{config?.icon ? 2 : 1} text-lg" on:click={handleClick}>
    {#if config?.icon}<div class="row-span-2"><iconify-icon icon={config.icon} height="{65 * height}"></iconify-icon></div>{/if}
    <div>{config.text}</div>
    {#if config?.secondaryText}<div>{config.secondaryText}</div>{/if}
</button>