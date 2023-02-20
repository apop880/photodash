<script lang="ts">
    import { stateStore, action } from "$lib/apistore";
	import type { ServiceTileConfig } from "$lib/types";

    export let config: ServiceTileConfig; 

    const handleClick = () => {
        action(config.serviceType, config.target)
    }
</script>

<button class="btn btn-secondary h-full w-full grid text-lg normal-case" class:grid-cols-button={config.icon} on:click={handleClick}>
    {#if config?.icon}<div class:row-span-2={config.secondaryText}><iconify-icon icon={config.icon} height="{config.iconHeight ?? 65}"></iconify-icon></div>{/if}
    <div>{config.text}</div>
    {#if config?.secondaryText}<div>{config.secondaryText}</div>{/if}
</button>