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
        let { hassBaseUrl, token } = data.baseSettings;
        if (!token) {
            const auth = await getHassAuth(hassBaseUrl);
            token = auth.accessToken;
        }
        let statesRes;
        try {
            statesRes = await fetch(
                `${hassBaseUrl}/api/states`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            )
        }
        catch (err) {
            return { ...data, entities: [], error: 
                `Error fetching entities from Home Assistant<br>
                Please ensure that you've configured Photodash as an allowed
                CORS origin in Home Assistant
                (follow instructions at <a href="https://photodash.apop.tech/docs/installation" class="link" target="_blank" rel="noreferrer">
                https://photodash.apop.tech/docs/installation</a>)` 
            }
        }
        const json: Array<Entity> = await statesRes.json();
        const entities = json.map(e => e.entity_id).sort();
        return { ...data, entities }
    }
    return { ...data, entities: [] }
}) satisfies PageLoad