import prisma from "$lib/prisma";
import type { PageServerLoad, Actions} from "./$types"
import type { ExtendedConfiguration } from "$lib/types";
import { getAlbums, type Album } from "$lib/googlePhotos";

export const load = (async ({ params, parent, fetch }) => {
    const configuration: ExtendedConfiguration = await prisma.configuration.findFirst({where: {uid: params.uid ?? "new"}, include: {disableSlideShow: true}})
        ?? {name: "", backgroundMusicFile: ""} as ExtendedConfiguration
    const baseSettings = (await parent()).baseSettings!;
    let albums: Array<Album> = [];
    if (baseSettings.googleClientId && baseSettings.googleClientSecret && baseSettings.googleRefreshToken) {
        albums = await getAlbums(fetch);
    }
    return { configuration, baseSettings, albums }
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
        let newDisableRows: Array<{configId: string, entity: string, state: string}> = [];
        let nextEntity = "";
        for (const [key, value] of data.entries()) {
            if (key.startsWith("new_entity")) {
                newDisableRows = [...newDisableRows, {configId: params.uid as string, entity: value as string, state: ''}]
            }
            else if (key.startsWith("new_state")) {
                newDisableRows[newDisableRows.length - 1].state = value as string;
            }
            else if (key.startsWith("delete") && value === "on") {
                await prisma.disableSlideShowConfig.delete({
                    where: {
                        uid: key.split("_")[1]
                    }
                })
            }
            else if (key.endsWith("entity")) {
                nextEntity = value as string;
            }
            else if (key.endsWith("state")) {
                await prisma.disableSlideShowConfig.update({
                    where: {
                        uid: key.split("_")[1]
                    },
                    data: {
                        entity: nextEntity,
                        state: value as string
                    }
                })
            }
        }
        await prisma.disableSlideShowConfig.createMany({
            data: newDisableRows
        })
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