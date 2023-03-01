<script lang="ts">
	import type { SensorTileConfig } from "$lib/types";
    import { stateStore } from "$lib/apistore";
    import Select from 'svelecte/src/Svelecte.svelte';

    const entities = Object.keys($stateStore ?? {"Could not load entities": ''}).filter(e => e.startsWith("sensor")).sort();
    export let data: SensorTileConfig
</script>

<label class="label" for="text">
    <span class="label-text">Text to display on tile (leave blank to use entity friendly name)</span>
</label>
<input name="text" type="text" id="text" class="input input-bordered w-full" value={data?.text ?? ''} />
<label class="label" for="entity">
    <span class="label-text">Entity ID</span>
</label>
<Select name="entity" options={entities} labelAsValue={true} value={data?.entity ?? ''} />