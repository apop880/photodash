<script lang="ts">
    import type { PageData, ActionData } from './$types'
    import { AppShell, Stack, Button, Group, Text } from '@svelteuidev/core'
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
    <label for="hassBaseUrl">For Initial Setup, Please Provide the Base URL, including port, of your Home Assistant instance:</label>
    <input type="text" id="hassBaseUrl" name="hassBaseUrl" value={data.hassBaseUrl} placeholder="e.g. http://192.168.1.1:8123" required><br>
    <label for="token">Optionally provide a long-lived token to use for auth:</label>
    <input type="text" id="token" name="token" value={data.token}><br>
    <Button>Save</Button>
    <a href="/">Home</a>
</form>
</Stack>
</slot></AppShell>