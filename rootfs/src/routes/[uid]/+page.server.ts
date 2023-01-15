import prisma from "$lib/prisma";
import type { PageServerLoad, Actions } from "./$types"

export const load = (async ({ params }) => {
    let body = await prisma.configuration.findFirst({where: {uid: params.uid}})
    
    return { configuration: body }
}) satisfies PageServerLoad