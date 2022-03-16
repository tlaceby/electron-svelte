<script lang='ts'>
	import { onMount } from "svelte";
	import api from "./api";

	let appVersion = "";

	onMount(async () => appVersion = await api.getVersion());
	
</script>


<main>
	<h1>Electron/Svelte/Typescript Template</h1>
	<h1>App Version: {appVersion}</h1>
</main>