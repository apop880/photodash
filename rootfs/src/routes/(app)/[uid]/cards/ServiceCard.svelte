<script lang="ts">
    import { stateStore, action } from "$lib/apistore";

    export let config;

    const handleClick = () => {
        action(config.serviceType, config.target)
    }
</script>

<button class="btn btn-primary h-full w-full" on:click={handleClick}>{config.text}</button>