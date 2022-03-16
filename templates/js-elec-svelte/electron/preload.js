const { ipcRenderer, contextBridge } = require("electron");

const API = {
    getVersion : () => ipcRenderer.invoke("GET/version")
}


contextBridge.exposeInMainWorld("api", API)