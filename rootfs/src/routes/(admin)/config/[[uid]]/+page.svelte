<script lang="ts">
    import type { PageData } from './$types';
    import Select from 'svelte-select';
    export let data: PageData;
    data.entities = ['', ...data.entities];
    let newDisableRows = 0;
</script>

    {#if "error" in data}{data.error}
    {:else if data.entities?.length === 0}Loading...
    {:else}
        <form method="POST">
            <label for="name">Configuration Name</label>
            <input type="text" id="name" name="name" value={data.configuration?.name} required>
            <label for="clockFormat">Clock Format</label>
            <select name="clockFormat" id="clockFormat">
                <option value="NONE" selected={data.configuration?.clockFormat === "NONE" || data.configuration?.clockFormat === null}>None (Disable clock and date)</option>
                <option value="US" selected={data.configuration?.clockFormat === "US"}>12-hour</option>
                <option value="INTL" selected={data.configuration?.clockFormat === "INTL"}>24-hour</option>
            </select><br>
            <label for="weather-entity">Weather Entity</label>
            <select name="weatherEntity" id="weather-entity">
                <option value="" selected={data.configuration?.weatherEntity === null}>None (Disable weather)</option>
                {#each data.entities as entity}
                    {#if entity.startsWith('weather')}
                        <option value={entity} selected={data.configuration?.weatherEntity === entity}>{entity}</option>
                    {/if}
                {/each}
            </select><br>
            <label for="music-entity">Background Music Entity</label>
            <Select class="select select-bordered w-full bg-secondary-focus" name="backgroundMusicEntity" items={data.entities} value={data.configuration?.backgroundMusicEntity === null ? '' : data.configuration?.backgroundMusicEntity} />
            <label for="music-file">Background Music File</label>
            <input type="text" id="music-file" name="backgroundMusicFile" value={data.configuration?.backgroundMusicFile}><br>
            {#if !(data.baseSettings.googleClientId)}
                Google Photos not configured. Go to <a href="/settings">settings</a> to configure.
            {:else if data.albums.length > 0}
                <label for="google-album">Google Photo Album</label>
                <select name="googleAlbumId" id="google-album">
                    <option value="" selected={data.configuration?.googleAlbumId === null}>None (Disable Google Photos)</option>
                    {#each data.albums as album}
                        <option value={album.id} selected={data.configuration?.googleAlbumId === album.id}>{album.title}</option>
                    {/each}
                </select><br>
            {:else}
                Error loading photo albums from Google, or no albums associated with your account.
            {/if}
            <div class="flex my-2 gap-1">
                <input type="checkbox" id="local-photos" name="useLocalPhotos" checked={data.configuration?.useLocalPhotos}>
                <span class="label-text">Use local photos. Photodash will look in <code class="bg-primary-content">/share/photodash/{data.configuration?.name.length > 0 ? data.configuration?.name : "configurationName"}</code> and display the files in that folder as your background slideshow.</span> 
              </div>
            <h3>Disable Slideshow on Entity States:</h3>
            {#if data.configuration?.disableSlideShow}
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
            {/if}
            <button class="btn btn-primary" on:click|preventDefault={() => newDisableRows++}>Add State</button>
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
            <hr class="col-span-6 h-1 bg-gray-400 border-0 my-4">
            <button class="btn btn-primary my-2">Save Changes</button>
        </form>
    {/if}

    <style lang="postcss">
        label {
            @apply label;
        }
        input:not([type=checkbox]) {
            @apply input input-bordered w-full bg-secondary-focus;
        }
        select {
            @apply select select-bordered w-full bg-secondary-focus;
        }
        input[type=checkbox] {
            @apply checkbox;
        }
    </style>