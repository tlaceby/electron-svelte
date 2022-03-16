<script>
	import { onMount } from "svelte"
	let appVersion = "";

	onMount (async () => appVersion = await api.getVersion());
</script>


<h1>Electron - Svelte Template</h1>
<h3>Version: {appVersion}</h3>