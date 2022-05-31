<script lang="ts">
	import { onMount } from 'svelte/internal';
	import { api } from '../api';

	let electronVersion = '';
	let nodejsVersion = '';
	let projectVersion = '';
	let chromeVersion = '';

	// Get Versions Using IPC
	onMount(async () => {
		// Pool IPC Calls
		const resolved = await Promise.all([
			api.Versions.electron(),
			api.Versions.chrome(),
			api.Versions.nodejs(),
			api.Versions.app(),
		]);

		// Update UI
		electronVersion = resolved[0];
		chromeVersion = resolved[1];
		nodejsVersion = resolved[2];
		projectVersion = resolved[3];
	});
</script>

<section class="docs-links container">
	<h1>Versions</h1>
	<div class="links">
		<hr />
		<div class="version">
			ELECTRON: <span class="special">{electronVersion}</span>
		</div>
		<hr />
		<div class="version">
			NODEJS: <span class="special">{nodejsVersion}</span>
		</div>
		<hr />
		<div class="version">
			CHROME: <span class="special">{chromeVersion}</span>
		</div>
		<hr />
		<div class="version">
			PROJECT: <span class="special">{projectVersion}</span>
		</div>
		<hr />
	</div>
</section>

<!--
	Styles Are tied to a component level and will be bundled 
	in the bundle.css
-->
<style>
	.docs-links {
		margin-top: 40px;
	}

	h1 {
		color: dodgerblue;
	}

	.version {
		color: black;
		font-weight: 800;
		font-size: 1.25em;
		font-weight: bold;
	}

	.special {
		color: dodgerblue;
		font-weight: 400;
		cursor: pointer;
		text-decoration: underline;
	}

	hr {
		margin: 10px 0px;
		height: 1px;
		color: #444;
	}
</style>
