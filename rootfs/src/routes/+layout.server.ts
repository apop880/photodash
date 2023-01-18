import prisma from "$lib/prisma";
import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load = (async () => {
    let hassBaseUrl = await prisma.baseSettings.findFirst({where: {param: 'hassBaseUrl'}})
    let token = await prisma.baseSettings.findFirst({where: {param: 'token', value: {not: ''}}})

    if (!(hassBaseUrl?.value)) {
        throw redirect(302, "/settings")
    }
    
    return { hassBaseUrl: hassBaseUrl?.value ?? null, token: token?.value ?? null }
}) satisfies LayoutServerLoad