/// <reference types="svelte" />

import APP_BRIDGE from "../electron/src/preload";

declare global {
    interface Window {bridge: typeof APP_BRIDGE}
}