const { app, ipcMain, BrowserWindow} = require("electron");
const  { join } =  require("path")

const IS_DEV = !app.isPackaged;
let win;

app.whenReady().then(main);


async function main () {
    win = new BrowserWindow({
        width: 800, height: 600,
        show: false,
        autoHideMenuBar: false,
        frame: true,
        webPreferences: {
            devtools: IS_DEV,
            preload: join(__dirname, "preload.js")
        }
    });

    win.loadFile(join(__dirname, "../public/index.html"));
    win.on("ready-to-show", win.show);
}


ipcMain.handle("GET/version", async () => app.getVersion());