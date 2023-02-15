import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import prisma from '$lib/prisma';
 
//Edit a view
export const POST = (async ({ request }) => {
    const { viewId, tiles, toDelete } = await request.json();
    await prisma.tile.deleteMany({
        where: {
            id: {
                in: toDelete
            }
        }
    })
    const newTiles = await prisma.$transaction(
        tiles.map(t => 
            prisma.tile.upsert({
                where: {
                    id: t.id
                },
                update: {
                    x: t.x,
                    y: t.y,
                    w: t.w,
                    h: t.h,
                    component: t.component,
                    config: t.config
                },
                create: {
                    viewId: viewId,
                    x: t.x,
                    y: t.y,
                    w: t.w,
                    h: t.h,
                    component: t.component,
                    config: t.config
                }
            })
        )
    )
    return json(newTiles);
}) satisfies RequestHandler;