<script lang="ts">
    import { stateStore, action } from '$lib/apistore';
	import type { HassEntity } from 'home-assistant-js-websocket';

    export let entity: string;
    export let url: string;
    let entityObj: HassEntity;

    $: {
        if($stateStore !== null) {
            entityObj = Object.values($stateStore).filter(value => (value.entity_id === entity))[0];
        }
    }

    let audioFile = new Audio(url);
    audioFile.onended = () => action("homeassistant.toggle", entity);

    $: {
        if (entityObj.state === "on") {
            audioFile.play();        
        }
        else if (entityObj.state === "off") {
            audioFile.pause();
            audioFile.currentTime = 0;
        }
    }
</script>