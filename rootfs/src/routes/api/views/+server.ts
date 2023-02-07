import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import prisma from '$lib/prisma';
 
//Create a view
export const POST = (async ({ request }) => {
    const { configId, icon } = await request.json();
    const agg = await prisma.view.aggregate({
        _max: {
            sortOrder: true
        },
        where: {
            configId
        }
    })
    const view = await prisma.view.create({
        data: {
            configId,
            icon,
            sortOrder: agg['_max'].sortOrder! + 1
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

//Sort views or update view icon
export const PUT = (async ({ request }) => {
    const data = await request.json();

    if ("views" in data) {
        const sortedViews = await prisma.$transaction(
            data.views.map((v, idx) => 
                prisma.view.update({
                    where: {
                        uid: v.uid
                    },
                    data: {
                        sortOrder: idx + 1
                    }
                })
            )
        )
        return json(sortedViews);
    }

    const updatedView = await prisma.view.update({
        where: {
            uid: data.uid
        },
        data: {
            icon: data.icon
        }
    });
    return json(updatedView);
}) satisfies RequestHandler;