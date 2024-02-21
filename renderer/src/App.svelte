<script lang="ts">
  import ipc from "./ipc";

  let electronVersion: string;
  let nodeVersion: string;

  $: nodeVersionTxt = nodeVersion ? `Node: ${nodeVersion}` : "Node Version";
  $: electronVersionTxt = electronVersion ? `Electron: ${electronVersion}` : "Electron Version";

  async function getVersion(opt: "electron" | "node") {
    const version = await ipc.getVersion(opt);

    if (opt === "electron") {
      electronVersion = version;
    } else {
      nodeVersion = version;
    }
  }
</script>

<main>
  <h1>Electron + Svelte</h1>

  <div class="buttons">
    <button class="btn" on:click={() => getVersion("node")}>{nodeVersionTxt}</button>
    <button class="btn" on:click={() => getVersion("electron")}>{electronVersionTxt}</button>
  </div>
</main>
