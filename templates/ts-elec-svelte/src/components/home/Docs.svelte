<script lang="ts">
  import api from "../../api";
</script>


<section class="docs-links container">
  <h1>Documentation</h1>
  <div class="links">
    <hr>
    <button on:click={() => api.openExternal("https://www.youtube.com/c/JSimplified")}>Youtube      <span class="special">https://www.youtube.com/c/JSimplified</span></button>
    <hr>
    <button on:click={() => api.openExternal("https://www.electronjs.org/docs/latest")}>Electron    <span class="special">https://www.electronjs.org/docs/latest</span></button>
    <hr>
    <button on:click={() => api.openExternal("https://svelte.dev/")}>Svelte       <span class="special">https://svelte.dev/</span></button>
    <hr>
  </div>
</section>


<style>

.docs-links {
  margin-top: 40px;
}

h1 {
  color: dodgerblue;
}

button {
  border: none;
  text-decoration: none;
  color: black;
  background-color: transparent;
  font-weight: 800;
  font-size: 1.25em;
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