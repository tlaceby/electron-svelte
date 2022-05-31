<script lang="ts">
	import { link, location } from 'svelte-spa-router';
	import { api } from '../api';
</script>

<nav class="drag">
	<div class="inline-nav left">
		<a class="link nodrag" href="#/" use:link>home</a>
		<a class="link nodrag" href="#/versions" use:link>versions</a>
	</div>
	<div class="inline-nav menu-btns">
		<a
			href={$location}
			use:link
			class="btn nodrag"
			on:click={api.Window.minimize}
		>
			-
		</a>
		<a href={$location} use:link class="btn nodrag" on:click={api.Window.exit}>
			x
		</a>
	</div>
</nav>

<style>
	nav {
		width: 100vw;
		display: flex;
		justify-content: space-between;
		background-color: var(--bg-color);
	}

	.inline-nav {
		display: flex;
		align-items: center;
	}

	.inline-nav a {
		color: var(--primary-color);
		text-transform: uppercase;
		padding: 15px 20px;
		font-weight: 400;
		cursor: pointer;
		transition: 0.4s;
		text-decoration: none;
	}

	.inline-nav a:hover {
		background-color: var(--primary-color);
		color: var(--bg-color);
	}
</style>
