<script>
    import { stateStore } from '$lib/apistore';
    import { page } from '$app/stores';
    import { CONDITION_PICTURES } from '$lib/const';
	import Icon from '$lib/components/Icon.svelte';
</script>

{#if $stateStore && $page.data.configuration.weatherEntity}
<button class="weather mx-2.5 mb-2.5 flex items-center" on:click|stopPropagation>
    <Icon icon={CONDITION_PICTURES[$stateStore[$page.data.configuration.weatherEntity].state]} height="56"></Icon>
    {$stateStore[$page.data.configuration.weatherEntity].attributes.temperature + $stateStore[$page.data.configuration.weatherEntity].attributes.temperature_unit}
</button>
{/if}

<style>
    .weather {
        justify-self: end;
        font-size: 35pt;
        font-weight: 600;
        text-shadow: 2px 2px #020101;
        -webkit-text-stroke: 1px black;
        z-index: 10;
    }
</style>