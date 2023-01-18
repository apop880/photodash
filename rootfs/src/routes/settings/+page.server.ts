import prisma from "$lib/prisma";
import type { PageServerLoad, Actions } from "./$types";

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
        return { success: true }
    }
}