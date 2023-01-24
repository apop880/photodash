<script>
	import '../../app.postcss';
	import 'iconify-icon';
</script>
<div class="navbar bg-stone-500">
	<div class="flex-1">
	  <a href="/" class="btn btn-ghost normal-case text-xl text-gray-100">Photodash</a>
	</div>
	<div class="flex-none">
	  <a href="/settings" class="btn btn-square btn-ghost text-gray-100">
		<iconify-icon icon="ion:settings-outline" height="36"></iconify-icon>
	  </a>
	</div>
  </div>
<div class="container mx-auto mt-2">
  <slot />
</div>
