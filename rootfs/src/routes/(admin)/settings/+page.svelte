<script lang="ts">
    import type { PageData, ActionData } from './$types'
	import { invalidate } from '$app/navigation';
	import { browser } from '$app/environment';
	import Toast from '$lib/components/Toast.svelte';
    export let data: PageData;
    export let form: ActionData;
    if (form?.success && browser) {
        invalidate("/")
    }
</script>

{#if form?.success}
<Toast autoClose>
    Settings saved successfully.
</Toast>
{/if}
<div class="container mx-auto">
<h1 class="text-xl font-bold">Global Settings</h1>
<form method="POST">
    <input type="hidden" id="insert" name="insert" value={data.baseSettings === null}>
    <label for="hassBaseUrl">For Initial Setup, Please Provide the Base URL, including port, of your Home Assistant instance:</label>
    <input type="text" id="hassBaseUrl" name="hassBaseUrl" value={data.baseSettings?.hassBaseUrl ?? null} placeholder="e.g. http://192.168.1.1:8123" required>
    <label for="token">Optionally provide a long-lived token to use for auth:</label>
    <input type="text" id="token" name="token" value={data.baseSettings?.token ?? null}>
    <hr class="col-span-6 h-1 bg-gray-400 border-0 my-4">
    <h2 class="text-lg font-bold">Google Photos</h2>
    <label for="googleClientId">Google API Client Id:</label>
    <input type="text" id="googleClientId" name="googleClientId" value={data.baseSettings?.googleClientId ?? null}>
    <label for="googleClientSecret">Google API Client Secret:</label>
    <input type="text" id="googleClientSecret" name="googleClientSecret" value={data.baseSettings?.googleClientSecret ?? null}>
    <label for="googleRefreshToken">Google API Refresh Token:</label>
    <input type="text" id="googleRefreshToken" name="googleRefreshToken" value={data.baseSettings?.googleRefreshToken ?? null}>
    <hr class="col-span-6 h-1 bg-gray-400 border-0 my-4">
    <div class="mt-2"><button class="btn btn-primary">Save</button></div>
</form>
</div>

<style lang="postcss">
    label {
        @apply label;
    }
    input {
        @apply input input-bordered w-full bg-secondary-focus;
    }
</style>