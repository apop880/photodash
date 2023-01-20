import { readable } from "svelte/store";
import { browser } from '$app/environment';
import { get } from "svelte/store";
import { page } from "$app/stores";

export const tokenStore = readable("", function start(set) {
    let interval: string | number | NodeJS.Timeout | undefined;
    if (browser) {
        const settings = get(page).data.baseSettings;
        if (settings.googleClientId) {
            fetch("https://www.googleapis.com/oauth2/v4/token",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "client_id": settings.googleClientId,
                    "client_secret": settings.googleClientSecret,
                    "refresh_token": settings.googleRefreshToken,
                    "grant_type": "refresh_token"
                })
            })
            .then(response => response.json())
            .then(data => {
                set(data["access_token"])
                interval = setInterval(() => {
                    
                    fetch("https://www.googleapis.com/oauth2/v4/token",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            "client_id": settings.googleClientId,
                            "client_secret": settings.googleClientSecret,
                            "refresh_token": settings.googleRefreshToken,
                            "grant_type": "refresh_token"
                        })
                    })


                }, 1000 * 60 * 2)
            })
        }
        return function stop() {
            clearInterval(interval);
        }
    }
    return function stop() {}
})