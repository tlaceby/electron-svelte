import type { CONTEXT_BRIDGE } from "../../electron/preload";

declare global {
  interface Window {
    bridge: typeof CONTEXT_BRIDGE;
  }
}

const ipc = window.bridge;
export default ipc;
