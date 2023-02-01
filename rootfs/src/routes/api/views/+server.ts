import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import prisma from '$lib/prisma';
 
//Create a view
export const POST = (async ({ request }) => {
    const { configId, icon, sortOrder } = await request.json();
    const view = await prisma.view.create({
        data: {
            configId,
            icon,
            sortOrder
        }
    })
    return json(view)
}) satisfies RequestHandler;

//Delete a view
export const DELETE = (async ({ request }) => {
    const { uid } = await request.json();
    const view = await prisma.view.delete({
        where: {
            uid
        }
    })
    return json(view)
}) satisfies RequestHandler;