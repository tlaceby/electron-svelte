import { app, BrowserWindow, ipcMain, shell } from "electron"
import { join } from "path"


const DEV_MODE = !app.isPackaged;

let win: BrowserWindow;

app.whenReady().then(main);


// Create window and load HTML file.
async function main () {
	
	win = new BrowserWindow({
		autoHideMenuBar: false, // Hides the default windowBar menu.
		frame: true, // Dissables the frame with the os-specific buttons and title.
		width: 800,
		height: 600,
		webPreferences: {
			devTools: DEV_MODE, // Dissable devtools if not packaged.
			preload: join(__dirname, "preload.js"),
		},
		show: false
	});

	
	// Load the svelte-app
	win.loadFile(join(__dirname, "../../public/index.html"));
	win.on("ready-to-show", win.show);

}


// Handle the invoke for getVersion

ipcMain.handle("GET/version", async () => app.getVersion());