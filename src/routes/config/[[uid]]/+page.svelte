<script lang="ts">
    import type { PageData } from './$types';
    import { stateStore } from '$lib/apistore'
    export let data: PageData;
</script>

{#if $stateStore !== null}
<form>
    <label for="weather-select">Weather Entity</label>
    <select name="weather" id="weather-select">
        <option value="" selected={data.configuration?.weatherEntity === null}> </option>
        {#each Object.keys($stateStore) as entity}
            {#if entity.startsWith('weather')}
                <option value={entity} selected={data.configuration?.weatherEntity === entity}>{entity}</option>
            {/if}
        {/each}
    </select>
</form>
{/if}