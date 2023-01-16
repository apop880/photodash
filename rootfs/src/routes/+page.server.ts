import prisma from "$lib/prisma";
import type { PageServerLoad, Actions } from "./$types";

export const load = (async () => {
    let hassBaseUrl = await prisma.baseSettings.findFirst({where: {param: 'hassBaseUrl'}})
    let configurations = await prisma.configuration.findMany({select: { uid: true, name: true }})
    
    return { configurations, hassBaseUrl: hassBaseUrl?.value ?? null }
}) satisfies PageServerLoad

export const actions: Actions = {
    default: async ({ request, params }) => {
        
        const data = await request.formData();
        const hassBaseUrl = data.get('hassBaseUrl') as string;
        const result = await prisma.baseSettings.upsert({
            create: {
                param: "hassBaseUrl",
                value: hassBaseUrl
            },
            where: {
               param : "hassBaseUrl"
            },
            update: {
                value: hassBaseUrl
            }
        })
    }
}