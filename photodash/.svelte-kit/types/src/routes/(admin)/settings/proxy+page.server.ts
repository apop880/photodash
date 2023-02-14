// @ts-nocheck
import prisma from "$lib/prisma";
import type { PageServerLoad, Actions } from "./$types";

export const actions = {
    default: async ({ request, params }: import('./$types').RequestEvent) => {
        const data = await request.formData();
        const insert = data.get('insert') as string;
        const hassBaseUrl = data.get('hassBaseUrl') as string;
        const token = data.get('token') as string;
        const googleClientId = data.get('googleClientId') as string;
        const googleClientSecret = data.get('googleClientSecret') as string;
        const googleRefreshToken = data.get('googleRefreshToken') as string;

        if (insert === "true") {
            await prisma.baseSettings.create({
                data: {
                    hassBaseUrl: hassBaseUrl,
                    token: (token.length > 0) ? token : null,
                    googleClientId: (googleClientId.length > 0) ? googleClientId : null,
                    googleClientSecret: (googleClientSecret.length > 0) ? googleClientSecret : null,
                    googleRefreshToken: (googleRefreshToken.length > 0) ? googleRefreshToken : null
                }
            })
            return { success: true }
        }

        await prisma.baseSettings.updateMany({
            where: {
                hassBaseUrl: {
                    not: undefined
                }
            },
            data: {
                hassBaseUrl: hassBaseUrl,
                token: (token.length > 0) ? token : null,
                googleClientId: (googleClientId.length > 0) ? googleClientId : null,
                googleClientSecret: (googleClientSecret.length > 0) ? googleClientSecret : null,
                googleRefreshToken: (googleRefreshToken.length > 0) ? googleRefreshToken : null
            }
        })
        return { success: true }
    }
};null as any as Actions;