/// <reference types="svelte" />

import APP_BRIDGE from '../electron/src/preload';

// allows us auto-types for IPC Handlers
declare global {
	interface Window {
		bridge: typeof APP_BRIDGE;
	}
}
