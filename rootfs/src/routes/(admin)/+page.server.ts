import prisma from "$lib/prisma";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
    let configurations = await prisma.configuration.findMany({select: { uid: true, name: true }})
    
    return { configurations }
}) satisfies PageServerLoad