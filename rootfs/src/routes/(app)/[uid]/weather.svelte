<script>
    import { stateStore } from '$lib/apistore';
    import { flip } from 'svelte/animate';
    import { backIn } from 'svelte/easing';
    import CurrentWeather from './currentweather.svelte';
    import Forecast from './forecast.svelte';

    const CONDITION_PICTURES = {
        "clear-night": "wi:night-clear",
        "cloudy": "wi:cloudy",
        "exceptional": "wi:day-sunny",
        "fog": "wi:fog",
        "hail": "wi:hail",
        "lightning": "wi:lightning",
        "lightning-rainy": "wi:night-lightning",
        "partlycloudy": "wi:day-cloudy",
        "pouring": "wi:rain",
        "rainy": "wi:showers",
        "snowy": "wi:snow",
        "snowy-rainy": "wi:rain-mix",
        "sunny": "wi:day-sunny",
        "windy": "wi:cloudy-windy",
        "windy-variant": "wi:windy"
    }

    let componentArray = [
        CurrentWeather
    ]

    let timer;

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
<div animate:flip="{{duration: 400, easing: backIn}}" style="justify-self:end;">
<svelte:component this={component} on:click="{() => toggleForecast()}" {CONDITION_PICTURES} />
</div>
{/each}
{/if}