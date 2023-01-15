import prisma from "$lib/prisma";
import { env } from "$env/dynamic/public";
import type { PageServerLoad, Actions } from "./$types"

type Entity = {
    attributes: Object
    entity_id: string
    last_changed: Date
    state: string
}

export const load = (async ({ params, fetch }) => {
    const configuration = await prisma.configuration.findFirst({where: {uid: params.uid}});
    const res = await fetch(
        `${env.SUPERVISOR_URL}/api/states`,
        {
            headers: {
                "Authorization": `Bearer ${env.SUPERVISOR_TOKEN}`,
                "Content-Type": "application/json"
            }
        }
    )
    const json: Array<Entity> = await res.json();
    const entities = json.map(e => e.entity_id).sort();
    return { configuration, entities }
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