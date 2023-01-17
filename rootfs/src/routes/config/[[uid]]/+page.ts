import { browser } from "$app/environment"
import { getHassAuth } from "$lib/apistore"
import type { PageLoad } from "./$types"

type Entity = {
    attributes: Object
    entity_id: string
    last_changed: Date
    state: string
}

export const load = (async ({ data, fetch }) => {
    if (browser) {
        const settingsRes = await fetch("/api/baseSettings");
        const settings = await settingsRes.json();
        let token = settings.token;
        if (!token) {
            const auth = await getHassAuth(settings.hassBaseUrl);
            token = auth.accessToken;
        }
        const statesRes = await fetch(
            `${settings.hassBaseUrl}/api/states`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        )
        const json: Array<Entity> = await statesRes.json();
        const entities = json.map(e => e.entity_id).sort();
        return { ...data, entities }
    }
    return { ...data, entities: [] }
}) satisfies PageLoad