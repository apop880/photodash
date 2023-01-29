<script>
	import '../../app.postcss';
	import 'iconify-icon';
	import Navbar from '$lib/components/Navbar.svelte';
</script>
<Navbar />
<div class="container mx-auto mt-6 px-4">
  <slot />
</div>