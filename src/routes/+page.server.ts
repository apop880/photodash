import prisma from "$lib/prisma";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
    //let body = await prisma.configuration.findMany();
    let body = await prisma.configuration.findMany({select: { uid: true, name: true }})
    
    return { configurations: body }
}) satisfies PageServerLoad