<script lang="ts">
	import type { ServiceTileConfig } from "$lib/types";

    export let data: ServiceTileConfig;
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
  <label class="label" for="serviceType">
      <span class="label-text">Service Type</span>
  </label>
  <input required name="serviceType" type="text" id="serviceType" class="input input-bordered w-full" value={data?.serviceType ?? ''} />
  <label class="label" for="target">
      <span class="label-text">Target</span>
  </label>
  <input required name="target" type="text" id="target" class="input input-bordered w-full" value={data?.target ?? ''} />
  <label class="label" for="text">
      <span class="label-text">Tile Text</span>
  </label>
  <input required name="text" type="text" id="text" class="input input-bordered w-full" value={data?.text ?? ''} />
  <label class="label" for="secondaryText">
    <span class="label-text">Secondary Text</span>
  </label>
  <input name="secondaryText" type="text" id="secondaryText" class="input input-bordered w-full" value={data?.secondaryText ?? ''} />