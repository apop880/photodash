<script>
	import '../../app.postcss';
	import 'iconify-icon';
</script>
<div class="navbar bg-primary">
	<div class="flex-1">
	  <a href="/" class="btn btn-ghost normal-case text-xl text-primary-content">Photodash</a>
	</div>
	<div class="flex-none">
	  <a href="/settings" class="btn btn-square btn-ghost text-primary-content">
		<iconify-icon icon="ion:settings-outline" height="36"></iconify-icon>
	  </a>
	</div>
  </div>
<div class="container mx-auto mt-2 px-4">
  <slot />
</div>
