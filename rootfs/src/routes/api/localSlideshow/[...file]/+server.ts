import { json } from "@sveltejs/kit";
import type { RequestHandler } from './$types';
import { dev } from "$app/environment";
import fs from 'fs'

export const GET = (({ params }) => {
    const file = params.file;
    const path = dev ? "static" : "build/client";
    const data = fs.readFileSync(`${path}/${file}`);
    return new Response(data);
  }) satisfies RequestHandler