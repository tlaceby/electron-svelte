<script lang="ts">
  import { onMount } from "svelte/internal";
  import api from "../api";

  let electronVersion = "";
  let nodejsVersion= "";
  let projectVersion= "";
  let chromeVersion= "";
  
  onMount(async () => {
    const ipcCalls = [
      api.Versions.electron(),
      api.Versions.chrome(),
      api.Versions.nodejs(),
      api.Versions.app()
    ];

    // Make 4 ipc calls and get each version.
    const resolved = await Promise.all(ipcCalls);
    electronVersion = resolved[0];
    chromeVersion = resolved[1];
    nodejsVersion = resolved[2];
    projectVersion = resolved[3];
  });

</script>



<section class="docs-links container">
  <h1>Versions</h1>
  <div class="links">
    <hr>
    <div class="version">
      ELECTRON: <span class="special">{electronVersion}</span>
    </div>
    <hr>
    <div class="version">
      NODEJS: <span class="special">{nodejsVersion}</span>
    </div>
    <hr>
    <div class="version">
      CHROME: <span class="special">{chromeVersion}</span>
    </div>
    <hr>
    <div class="version">
      PROJECT: <span class="special">{projectVersion}</span>
    </div>
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