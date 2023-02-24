<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { page } from '$app/stores';

    let hours: number | null;
    let minutes: number | null
    let amPm: string | null;
    let date: string | null;

    let timer;

    onMount(() => {
        if ($page.data.configuration?.clockFormat !== "NONE") {
            timer = setInterval(
                () => {
                    let dateObj = new Date();
                    hours = dateObj.getHours();
                    minutes = dateObj.getMinutes();
                    if ($page.data.configuration?.clockFormat === "US") {
                        amPm = hours < 12 ? "am" : "pm";
                        if (amPm === "pm" && hours > 12) hours -= 12;
                        else if (hours === 0) hours = 12;
                    }
                    date = dateObj.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });
                }, 1000);
        }
    });

    onDestroy(() => {
        clearInterval(timer);
    });
</script>

<div class="clock">
    {#if date}
    {#if amPm}{hours}{:else}{hours?.toString().padStart(2, '0')}{/if}:{minutes}{#if amPm}<span class="am-pm">{amPm}</span>{:else}<br />{/if}<br />
    <span class="date">{date}</span>
    {/if}
</div>

<style>
    .clock {
        justify-self: start;
        font-size: 40pt;
        margin: 10px;
        font-weight: 600;
        text-shadow: 2px 2px #020101;
        -webkit-text-stroke: 1px black;
        line-height: 20px;
    }
    .am-pm {
        font-size: 18pt;
    }

    .date {
        font-size: 28px;
    }

</style>