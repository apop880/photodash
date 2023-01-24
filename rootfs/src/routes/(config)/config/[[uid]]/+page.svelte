<script lang="ts">
    import type { PageData } from './$types';
    export let data: PageData;
    let newDisableRows = 0;
</script>

    {#if "error" in data}{data.error}
    {:else if data.entities?.length === 0}Loading...
    {:else}
        <form method="POST">
            <label for="name">Configuration Name</label>
            <input type="text" id="name" name="name" value={data.configuration?.name} required>
            <label for="weather-entity">Weather Entity</label>
            <select name="weatherEntity" id="weather-entity">
                <option value="" selected={data.configuration?.weatherEntity === null}>None</option>
                {#each data.entities as entity}
                    {#if entity.startsWith('weather')}
                        <option value={entity} selected={data.configuration?.weatherEntity === entity}>{entity}</option>
                    {/if}
                {/each}
            </select><br>
            <label for="music-entity">Background Music Entity</label>
            <select name="backgroundMusicEntity" id="music-entity">
                <option value="" selected={data.configuration?.backgroundMusicEntity === null}>None</option>
                {#each data.entities as entity}
                    {#if entity.startsWith('input_boolean')}
                        <option value={entity} selected={data.configuration?.backgroundMusicEntity === entity}>{entity}</option>
                    {/if}
                {/each}
            </select><br>
            <label for="music-file">Background Music File</label>
            <input type="text" id="music-file" name="backgroundMusicFile" value={data.configuration?.backgroundMusicFile}><br>
            {#if !(data.baseSettings.googleClientId)}
                Google Photos not configured. Go to <a href="/settings">settings</a> to configure.
            {:else if data.albums.length > 0}
                <label for="google-album">Google Photo Album</label>
                <select name="googleAlbumId" id="google-album">
                    <option value="" selected={data.configuration?.googleAlbumId === null}>None</option>
                    {#each data.albums as album}
                        <option value={album.id} selected={data.configuration?.googleAlbumId === album.id}>{album.title}</option>
                    {/each}
                </select><br>
            {:else}
                Error loading photo albums from Google, or no albums associated with your account.
            {/if}
            <input type="checkbox" id="local-photos" name="useLocalPhotos" checked={data.configuration?.useLocalPhotos}>
            <label for="local-photos">Use local photos. Photodash will look in /share/photodash/{data.configuration?.name.length > 0 ? data.configuration?.name : "configurationName"} and display the files in that folder as your background slideshow.</label><br>
            <h3>Disable Slideshow on Entity State:</h3>
            {#each data.configuration?.disableSlideShow as d, idx}
                <input type="checkbox" id={"delete_"+d.uid} name={"delete_"+d.uid}>
                <label for={"entity_"+d.uid}>Entity</label>
                <select name={"entity_"+d.uid} id={"entity_"+d.uid}>
                    {#each data.entities as entity}
                        <option value={entity} selected={d.entity === entity}>{entity}</option>
                    {/each}
                </select><br>
                <label for={"state"+d.uid}>State to Match</label>
                <input type="text" id={"state"+d.uid} name={"state"+d.uid} value={d.state}><br>
            {/each}
            <button on:click|preventDefault={() => newDisableRows++}>Add</button>
            {#each Array(newDisableRows) as _, idx}
                <label for={"new_entity_"+ idx}>Entity</label>
                <select name={"new_entity_"+idx} id={"new_entity_"+idx}>
                    <option value=""></option>
                    {#each data.entities as entity}
                        <option value={entity}>{entity}</option>
                    {/each}
                </select><br>
                <label for={"new_state_"+idx}>State to Match</label>
                <input type="text" id={"new_state_"+idx} name={"new_state_"+idx}><br>
            {/each}
            <button>Save</button>
        </form>
    {/if}