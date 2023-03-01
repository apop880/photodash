<script lang="ts">
    import { stateStore, action } from "$lib/apistore";
	import type { SensorTileConfig } from "$lib/types";

    export let config: SensorTileConfig;
</script>

<div class="btn btn-secondary h-full w-full grid auto-rows-max content-center text-lg normal-case">
    <div>{config.text !== '' ? config.text : $stateStore[config.entity].attributes.friendly_name}</div>
    <div class="text-7xl">{$stateStore[config.entity].state}{$stateStore[config.entity].attributes.unit_of_measurement ?? ''}</div>
</div>