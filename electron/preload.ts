import { contextBridge, ipcRenderer } from "electron";

export const CONTEXT_BRIDGE = {
  /**
   * Returns the version from process.versions of the supplied target.
   */
  getVersion: async (opt: "electron" | "node"): Promise<string> => {
    return await ipcRenderer.invoke(`get-version`, opt);
  },
};

contextBridge.exposeInMainWorld("bridge", CONTEXT_BRIDGE);
