"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const APP_BRIDGE = {
    // Create a method that calls to electron for the version.
    // Also set type declaration inline.
    getVersion: () => electron_1.ipcRenderer.invoke("GET/version"),
};
exports.default = APP_BRIDGE;
electron_1.contextBridge.exposeInMainWorld("bridge", APP_BRIDGE);
