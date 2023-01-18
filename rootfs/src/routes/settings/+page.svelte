<script lang="ts">
    import type { PageData, ActionData } from './$types'
    import { AppShell, Stack, Button } from '@svelteuidev/core'
	import { invalidate } from '$app/navigation';
	import { browser } from '$app/environment';
    export let data: PageData;
    export let form: ActionData;
    if (form?.success && browser) {
        invalidate("/")
    }
</script>

<AppShell><slot>
<Stack>
<h1>Global Settings</h1>
<form method="POST">
    <input type="hidden" id="insert" name="insert" value={data.baseSettings === null}>
    <label for="hassBaseUrl">For Initial Setup, Please Provide the Base URL, including port, of your Home Assistant instance:</label>
    <input type="text" id="hassBaseUrl" name="hassBaseUrl" value={data.baseSettings?.hassBaseUrl ?? null} placeholder="e.g. http://192.168.1.1:8123" required><br>
    <label for="token">Optionally provide a long-lived token to use for auth:</label>
    <input type="text" id="token" name="token" value={data.baseSettings?.token ?? null}><br>
    <h2>Google Photos</h2>
    <label for="googleClientId">Google API Client Id:</label>
    <input type="text" id="googleClientId" name="googleClientId" value={data.baseSettings?.googleClientId ?? null}><br>
    <label for="googleClientSecret">Google API Client Secret:</label>
    <input type="text" id="googleClientSecret" name="googleClientSecret" value={data.baseSettings?.googleClientSecret ?? null}><br>
    <label for="googleRefreshToken">Google API Refresh Token:</label>
    <input type="text" id="googleRefreshToken" name="googleRefreshToken" value={data.baseSettings?.googleRefreshToken ?? null}><br>
    <Button>Save</Button>
    <a href="/">Home</a>
</form>
</Stack>
</slot></AppShell>