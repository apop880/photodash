<script>
    import { stateStore } from '$lib/apistore';
    import { page } from '$app/stores';
    import { CONDITION_PICTURES } from '$lib/const';
    import 'iconify-icon';
</script>

{#if $stateStore && $page.data.configuration.weatherEntity}
<div class="weather" on:click>
    <iconify-icon icon={CONDITION_PICTURES[$stateStore[$page.data.configuration.weatherEntity].state]}></iconify-icon>
    {$stateStore[$page.data.configuration.weatherEntity].attributes.temperature + $stateStore[$page.data.configuration.weatherEntity].attributes.temperature_unit}
</div>
{/if}

<style>
    .weather {
        justify-self: end;
        vertical-align: top;
        font-size: 35pt;
        margin: 10px;
        font-weight: 600;
        text-shadow: 2px 2px #020101;
        -webkit-text-stroke: 1px black;
        z-index: 10;
    }
</style>