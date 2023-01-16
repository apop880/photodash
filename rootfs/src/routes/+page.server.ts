import prisma from "$lib/prisma";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
    let hassBaseUrl = await prisma.baseSettings.findOne({})
    let configurations = await prisma.configuration.findMany({select: { uid: true, name: true }})
    
    return { configurations: configurations }
}) satisfies PageServerLoad