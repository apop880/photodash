import prisma from "$lib/prisma";
import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load = (async ({ route }) => {
    const baseSettings = await prisma.baseSettings.findFirst();
    if (!baseSettings && route.id !== "/settings") {
        throw redirect(302, "/settings")
    }
    
    return { baseSettings }
}) satisfies LayoutServerLoad