import { app, BrowserWindow, ipcMain, shell } from 'electron';
import { join } from 'path';
import setupHotReloading from './__hot-reload';

const DEV_MODE = !app.isPackaged
let win: BrowserWindow;

setupHotReloading(DEV_MODE);
app.whenReady().then(main);

// Create window and load svelte app
async function main() {
	win = new BrowserWindow({
		autoHideMenuBar: true, // disable to have default behavior
		frame: false, // disable to have default behavior and remove the custom-navigation bar
		// Disables the frame with the os-specific buttons and title.
		width: 800,
		height: 650,
		webPreferences: {
			// make sure this is enabled for safer preloading.
			contextIsolation: true,
			devTools: true, // Dissable devtools if not packaged.
			preload: join(__dirname, 'preload.js'),
		},
		show: false, // hide by default as to avoid flickering bug
	});

	//////////////////////////////////////
	// *************** EVENTS ************
	//////////////////////////////////////

	win.loadFile(join(__dirname, '../../public/index.html'));
	win.on('ready-to-show', win.show);

	// Common Window Events From Custom Title Bar
	ipcMain.on('window/exit', () => app.quit());
	ipcMain.on('window/minimize', () => win.minimize());
	ipcMain.on('window/show', () => win.show());
}

	///////////////////////////////////
	// ****** Inter Process Handlers **
	///////////////////////////////////

// handle external links
ipcMain.on('open/url', (_, url: string) => shell.openExternal(url));

// Handle VERSION REQUESTS
ipcMain.handle('versions/app', async () => app.getVersion());
ipcMain.handle('versions/nodejs', async () => process.versions.node);
ipcMain.handle('versions/chrome', async () => process.versions.chrome);
ipcMain.handle('versions/electron', async () => process.versions.electron);


/********************************************************************************************
*********************************************************************************************
*****
*****   IF YOU LIKE THIS TEMPLATE AND WOULD LIKE TO SHOW SOME LOVE CONSIDER FOLLOWING ME  ***
*****   ON YOUTUBE AND CHECKING OUT MY OTHER ELECTRON/SVELTE/DENO CONTENT.								***
*****
*********************************************************************************************
********************************************************************************************/