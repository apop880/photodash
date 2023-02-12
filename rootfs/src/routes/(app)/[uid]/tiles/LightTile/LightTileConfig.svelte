<script lang="ts">
	import type { LightTileConfig } from "$lib/types";

    export let data: LightTileConfig
</script>

<label class="label" for="icon">
    <span class="label-text">Enter an Iconify icon name<br>(example: <code>material-symbols:lightbulb-rounded</code>)</span>
  </label>
  <input name="icon" type="text" id="icon" class="input input-bordered w-full" value={data?.icon ?? ''} />
  <label class="label" for="icon">
      <span class="label-text-alt"><a target="_blank" href="https://icon-sets.iconify.design/" rel="noreferrer" class="link link-primary">Click here to search the Iconify library</a></span>
  </label>
  <label class="label" for="iconHeight">
    <span class="label-text">Specify a height (in pixels) of the icon</span>
  </label>
  <input name="iconHeight" type="number" id="iconHeight" class="input input-bordered w-full" value={data?.iconHeight ?? ''} />
  <label class="label" for="entity">
      <span class="label-text">Entity ID</span>
  </label>
  <input name="entity" type="text" id="entity" class="input input-bordered w-full" value={data?.entity ?? ''} />