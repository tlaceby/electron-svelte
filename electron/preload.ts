import { contextBridge } from "electron";

export const CONTEXT_BRIDGE = {
  foo: 45,
};

contextBridge.exposeInMainWorld("bridge", CONTEXT_BRIDGE);
