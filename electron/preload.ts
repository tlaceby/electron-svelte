import { contextBridge } from "electron";

const CONTEXT_BRIDGE = {
  foo: 45,
};

contextBridge.exposeInMainWorld("bridge", CONTEXT_BRIDGE);
