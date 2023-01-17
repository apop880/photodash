import prisma from "$lib/prisma";
import type { PageServerLoad, Actions} from "./$types"
import type { Configuration } from "@prisma/client";

export const load = (async ({ params }) => {
    const configuration: Configuration = await prisma.configuration.findFirst({where: {uid: params.uid ?? "new"}})
        ?? {name: "", backgroundMusicFile: ""} as Configuration
    return { configuration }
}) satisfies PageServerLoad

export const actions: Actions = {
    default: async ({ request, params }) => {
        
        const data = await request.formData();
        const name = data.get('name') as string;
        const weatherEntity = data.get('weatherEntity');
        const backgroundMusicEntity = data.get('backgroundMusicEntity');
        const backgroundMusicFile = data.get('backgroundMusicFile');
        const result = await prisma.configuration.upsert({
            create: {
                name: name,
                weatherEntity: weatherEntity as string ?? null,
                backgroundMusicEntity: backgroundMusicEntity as string ?? null,
                backgroundMusicFile: backgroundMusicFile as string ?? null
            },
            where: {
                uid: params.uid ?? "new"
            },
            update: {
                name: name,
                weatherEntity: weatherEntity as string ?? null,
                backgroundMusicEntity: backgroundMusicEntity as string ?? null,
                backgroundMusicFile: backgroundMusicFile as string ?? null
            }
        })
    }
}