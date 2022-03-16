import { ipcRenderer, contextBridge } from "electron"; 


const APP_BRIDGE = {
    // Create a method that calls to electron for the version.
    // Also set type declaration inline.
    getVersion: (): Promise<string> => ipcRenderer.invoke("GET/version"),
}


export default APP_BRIDGE;
contextBridge.exposeInMainWorld("bridge", APP_BRIDGE);