import { app, BrowserWindow } from "electron";
import { join } from "path";

let mainWindow: BrowserWindow;

app.once("ready", main);

async function main() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 650,
    show: false,
    webPreferences: {
      devTools: !app.isPackaged,
      preload: join(__dirname, "preload.js"),
    },
  });

  if (app.isPackaged) {
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
  } else {
    let conn = false;

    while (!conn) {
      try {
        await mainWindow.loadURL(`http://localhost:5173/`);
        conn = true;
      } catch (_) {
        await new Promise((res) => setTimeout(res, 100));
      }
    }

    mainWindow.webContents.openDevTools({ mode: "detach" });
  }

  mainWindow.once("ready-to-show", mainWindow.show);
}
