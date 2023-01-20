<script lang="ts">
    import type { PageData } from './$types';
    import { AppShell, Button } from '@svelteuidev/core'
    export let data: PageData;
</script>

<AppShell><slot>
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
            {#if typeof(data.albums) === 'string'}
                {data.albums}
            {:else if data.albums.length > 0}
                <label for="google-album">Google Photo Album</label>
                <select name="googleAlbumId" id="google-album">
                    <option value="" selected={data.configuration?.googleAlbumId === null}>None</option>
                    {#each data.albums as album}
                        <option value={album.id} selected={data.configuration?.googleAlbumId === album.id}>{album.title}</option>
                    {/each}
                </select><br>
            {:else}
                Error Loading Photo Albums, or no albums associated with your account.
            {/if}
            <input type="checkbox" id="local-photos" name="useLocalPhotos" checked={data.configuration?.useLocalPhotos}>
            <label for="local-photos">(Home Assistant Add-On Only) Use local photos. Photodash will look in /share/photodash/{data.configuration?.name.length > 0 ? data.configuration?.name : "configurationName"} and display the files in that folder as your background slideshow.</label><br>
            <Button>Save</Button>
        </form>
    {/if}
</slot></AppShell>