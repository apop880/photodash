<script lang="ts">
    import { stateStore, action } from "$lib/apistore";
	import type { ServiceCardConfig } from "$lib/types";

    export let config: ServiceCardConfig;
    export let height: number;   

    const handleClick = () => {
        action(config.serviceType, config.target)
    }
</script>

<button class="btn btn-secondary h-full w-full grid text-lg normal-case" class:grid-cols-button={config.icon} on:click={handleClick}>
    {#if config?.icon}<div class:row-span-2={config.secondaryText}><iconify-icon icon={config.icon} height="{65 * height}"></iconify-icon></div>{/if}
    <div>{config.text}</div>
    {#if config?.secondaryText}<div>{config.secondaryText}</div>{/if}
</button>