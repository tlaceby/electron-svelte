"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = require("path");
const DEV_MODE = !electron_1.app.isPackaged;
let win;
electron_1.app.whenReady().then(main);
// Create window and load HTML file.
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        win = new electron_1.BrowserWindow({
            autoHideMenuBar: false,
            frame: true,
            width: 800,
            height: 600,
            webPreferences: {
                devTools: DEV_MODE,
                preload: (0, path_1.join)(__dirname, "preload.js"),
            },
            show: false
        });
        // Load the svelte-app
        win.loadFile((0, path_1.join)(__dirname, "../../public/index.html"));
        win.on("ready-to-show", win.show);
    });
}
// Handle the invoke for getVersion
electron_1.ipcMain.handle("GET/version", () => __awaiter(void 0, void 0, void 0, function* () { return electron_1.app.getVersion(); }));
