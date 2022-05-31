<script lang='ts'>
	import Router from "svelte-spa-router";
	import Home from "./components/home/Home.svelte";
	import Navigation from "./components/Navigation.svelte";
	import Versions from "./components/Versions.svelte";


	const routes = {
		"/": Home,
		"/versions": Versions
	}

</script>


<main>
	<Navigation />
	<Router {routes} />
</main>

