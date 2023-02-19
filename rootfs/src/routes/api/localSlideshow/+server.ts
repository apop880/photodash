import { json } from "@sveltejs/kit";
import type { RequestHandler } from './$types';
import { dev } from "$app/environment";
import fs from 'fs'

export const GET = (({ url }) => {
    const folder = url.searchParams.get('name');
    const path = dev ? "static" : "build/client";
    const files = fs.readdirSync(`${path}/share/photodash/${folder}`).map(file => `/api/localSlideshow/share/photodash/${folder}/${file}`);
    
    return json(files)
  }) satisfies RequestHandler