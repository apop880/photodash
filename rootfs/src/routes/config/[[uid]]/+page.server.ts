import prisma from "$lib/prisma";
import type { PageServerLoad, Actions} from "./$types"
import type { Configuration } from "@prisma/client";
import { getAlbums } from "$lib/googlePhotos";

export const load = (async ({ params, parent, fetch }) => {
    const configuration: Configuration = await prisma.configuration.findFirst({where: {uid: params.uid ?? "new"}})
        ?? {name: "", backgroundMusicFile: ""} as Configuration
    const baseSettings = (await parent()).baseSettings!;
    let albums: Object[] | string = "Google Photos Not Configured";
    if (baseSettings.googleClientId && baseSettings.googleClientSecret && baseSettings.googleRefreshToken) {
        albums = await getAlbums(fetch);
    }
    return { configuration, hassBaseUrl: baseSettings.hassBaseUrl, token: baseSettings.token, albums }
}) satisfies PageServerLoad

export const actions: Actions = {
    default: async ({ request, params }) => {
        
        const data = await request.formData();
        const name = data.get('name') as string;
        const weatherEntity = data.get('weatherEntity');
        const backgroundMusicEntity = data.get('backgroundMusicEntity');
        const backgroundMusicFile = data.get('backgroundMusicFile');
        const googleAlbumId = data.get('googleAlbumId');
        const useLocalPhotos = data.get('useLocalPhotos') === "on";
        const result = await prisma.configuration.upsert({
            create: {
                name,
                weatherEntity: weatherEntity as string ?? null,
                backgroundMusicEntity: backgroundMusicEntity as string ?? null,
                backgroundMusicFile: backgroundMusicFile as string ?? null,
                googleAlbumId: googleAlbumId as string ?? null,
                useLocalPhotos
            },
            where: {
                uid: params.uid ?? "new"
            },
            update: {
                name,
                weatherEntity: weatherEntity as string ?? null,
                backgroundMusicEntity: backgroundMusicEntity as string ?? null,
                backgroundMusicFile: backgroundMusicFile as string ?? null,
                googleAlbumId: googleAlbumId as string ?? null,
                useLocalPhotos
            }
        })
    }
}