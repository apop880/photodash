<script lang="ts">
    import { stateStore } from '$lib/apistore';
    import { flip } from 'svelte/animate';
    import CurrentWeather from './currentweather.svelte';
    import Forecast from './forecast.svelte';

    let componentArray = [
        CurrentWeather
    ]

    let timer: string | number | NodeJS.Timeout | undefined;

    function toggleForecast() {
        clearTimeout(timer);
        if (componentArray.length === 2) {
            componentArray = componentArray.filter(c => c === CurrentWeather);
        }
        else {
            componentArray = [...componentArray, Forecast];
            timer = setTimeout(() => {
                toggleForecast();
            }, 30000)
        }
    }
</script>

{#if $stateStore !== null}
{#each componentArray as component, key(component)}
<div animate:flip="{{duration: 400}}" style="justify-self:end;">
<svelte:component this={component} on:click="{() => toggleForecast()}" />
</div>
{/each}
{/if}