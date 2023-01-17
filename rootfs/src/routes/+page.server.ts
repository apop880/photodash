import prisma from "$lib/prisma";
import type { PageServerLoad, Actions } from "./$types";

export const load = (async () => {
    let hassBaseUrl = await prisma.baseSettings.findFirst({where: {param: 'hassBaseUrl'}})
    let token = await prisma.baseSettings.findFirst({where: {param: 'token'}})
    let configurations = await prisma.configuration.findMany({select: { uid: true, name: true }})
    
    return { configurations, hassBaseUrl: hassBaseUrl?.value ?? null, token: token?.value ?? null }
}) satisfies PageServerLoad

export const actions: Actions = {
    default: async ({ request, params }) => {
        
        const data = await request.formData();
        const hassBaseUrl = data.get('hassBaseUrl') as string;
        const baseUrlResult = await prisma.baseSettings.upsert({
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
        });
        const token = data.get('token') as string;
        const tokenResult = await prisma.baseSettings.upsert({
            create: {
                param: "token",
                value: token
            },
            where: {
               param : "token"
            },
            update: {
                value: token
            }
        });
    }
}