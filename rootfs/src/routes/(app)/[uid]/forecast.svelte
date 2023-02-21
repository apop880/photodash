<script>
    import { stateStore } from '$lib/apistore';
    import { page } from '$app/stores';
    import { fly, fade } from 'svelte/transition';
    import { CONDITION_PICTURES } from '$lib/const';
	import Icon from '$lib/components/Icon.svelte';
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    function getDay(key) {
        let day=new Date();
        return weekday[(day.getDay() + key) % 7].substring(0, 3);
    }

    function roundTemp(val) {
        return Math.round(val);
    }
</script>

{#if $stateStore && $page.data.configuration?.weatherEntity}
<button class="weather-extended" on:click|stopPropagation on:keydown in:fly="{{ y: -200, duration: 500, delay: 750 }}" out:fly="{{ y: -200, duration: 500 }}">
    {#each $stateStore[$page.data.configuration.weatherEntity].attributes.forecast.slice(0, 3) as forecast, idx}
        <div>{getDay(idx)}</div>
        <div ><Icon icon={CONDITION_PICTURES[forecast.condition]} height="36"></Icon></div>
        <div>{roundTemp(forecast.temperature)}&deg; / {roundTemp(forecast.templow)}&deg;</div>
    {/each}
</button>
{/if}

<style>
    .weather-extended {
        font-size: 20pt;
        margin-left: 10px;
        margin-top: 10px;
        font-weight: 600;
        text-shadow: 2px 2px #020101;
        -webkit-text-stroke: 1px black;
        display: grid;
        grid-template-rows: repeat(3, 1fr);
        grid-template-columns: repeat(3, 1fr);
        grid-auto-flow: column;
        grid-column-gap: 10px;
        grid-row-gap: 5px;
        justify-items: center;
        background-color: rgba(158, 153, 153, 0.825);
        border-radius: 20px;
        padding: 10px;
    }
</style>