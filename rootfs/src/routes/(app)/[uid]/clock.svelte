<script lang="ts">
    import { onMount, onDestroy } from 'svelte';

    let time = new Array(2);
    let date;
    let timer;

    onMount(() => {
        const timer = setInterval(
            () => {
                let dateObj = new Date();
                time = dateObj.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }).split(/\s+/);
                date = dateObj.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });
            }, 1000);
        });

    onDestroy(() => {
        clearInterval(timer);
    });
</script>

<div class="clock">
    {#if date}
    {time[0]}<span class="am-pm">{time[1]}</span><br />
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
        text-transform: lowercase;
    }

    .date {
        font-size: 28px;
    }

</style>