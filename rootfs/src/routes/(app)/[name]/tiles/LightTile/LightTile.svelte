<script lang="ts">
    import { stateStore, action } from "$lib/apistore";
	import Icon from "$lib/components/Icon.svelte";
	import type { LightTileConfig } from "$lib/types";

    export let config: LightTileConfig;

    const handleClick = () => {
        action("homeassistant.toggle", config.entity)
    }

    let stateValue: string;

    $: {
        if ($stateStore[config.entity].state === "on" && "brightness" in $stateStore[config.entity].attributes) {
            stateValue = Math.round(($stateStore[config.entity].attributes.brightness / 255) * 100) + "%";
        }
        else {
            stateValue = $stateStore[config.entity].state;
        }
    }
</script>

<button class="btn btn-secondary h-full w-full grid text-lg normal-case grid-cols-button" on:click={handleClick}>
    <div class="row-span-2"><Icon icon={config.icon} height="{config.iconHeight ?? 65}"></Icon></div>
    <div>{$stateStore[config.entity].attributes.friendly_name}</div>
    <div class="capitalize">{stateValue}</div>
</button>