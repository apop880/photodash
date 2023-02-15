import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import prisma from '$lib/prisma';
 
export const POST = (async ({ request }) => {
    const { uid, views } = await request.json();
    await prisma.configuration.update({
        where: {
            uid
        },
        data: {
            views: JSON.stringify(views)
        }
    })
    return json({ success: true})
}) satisfies RequestHandler;