<script lang="ts">
  import ipc from "./ipc";

  let electronVersion: string = $state("");
  let nodeVersion: string = $state("");

  let nodeVersionTxt = $derived(nodeVersion ? `Node: ${nodeVersion}` : "Node Version");
  let electronVersionTxt = $derived(electronVersion ? `Electron: ${electronVersion}` : "Electron Version");

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
    <button class="btn" onclick={() => getVersion("node")}>{nodeVersionTxt}</button>
    <button class="btn" onclick={() => getVersion("electron")}>{electronVersionTxt}</button>
  </div>
</main>
