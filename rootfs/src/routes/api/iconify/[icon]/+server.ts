import { json } from "@sveltejs/kit";
import type { RequestHandler } from './$types';
import { loadIcon } from "iconify-icon";

export const GET = (async ({ params, setHeaders }) => {
    const data = await loadIcon(params.icon);

    setHeaders({
      "cache-control": "max-age=60000",
    });
    
    return json(data)
  }) satisfies RequestHandler