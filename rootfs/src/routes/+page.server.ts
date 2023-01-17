import prisma from "$lib/prisma";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
    let hassBaseUrl = await prisma.baseSettings.findFirst({where: {param: 'hassBaseUrl'}})
    let token = await prisma.baseSettings.findFirst({where: {param: 'token'}})
    let configurations = await prisma.configuration.findMany({select: { uid: true, name: true }})

    if (!(hassBaseUrl?.value)) {
        throw redirect(302, "/settings")
    }
    
    return { configurations, hassBaseUrl: hassBaseUrl?.value ?? null, token: token?.value ?? null }
}) satisfies PageServerLoad