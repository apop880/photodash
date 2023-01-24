import prisma from "$lib/prisma";
import type { ExtendedConfiguration } from "$lib/types";
import type { PageServerLoad } from "./$types"

export const load = (async ({ params }) => {
    let body: ExtendedConfiguration = await prisma.configuration.findFirstOrThrow({where: {uid: params.uid}, include: {disableSlideShow: true}});
    
    return { configuration: body }
}) satisfies PageServerLoad