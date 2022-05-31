import { app, BrowserWindow, ipcMain, shell } from 'electron';
import { join } from 'path';
const DEV_MODE = !app.isPackaged;

// used for hot reloading of svelte and electron code.
if (DEV_MODE) {
	// only reload if flag is gone
	if (process.argv[2] !== '--no-watch') {
		import('electron-reload').then((electronReload) => {
			electronReload.default(join(__dirname, '../../'), {
				hardResetMethod: 'exit',
				// change this to quit if you wanta  hard reload.
				electron: app.getPath('exe'),
			});
			console.log('Hot Reloading Enabled!');
		});
	}
}

let win: BrowserWindow;

app.whenReady().then(main);

// Create window and load HTML file.
async function main() {
	win = new BrowserWindow({
		autoHideMenuBar: true, // disable to have default behavior
		frame: false, // disable to have default behavior and remove the custom-navigation bar
		// Disables the frame with the os-specific buttons and title.
		width: 800,
		height: 650,
		webPreferences: {
			contextIsolation: true,
			devTools: true, // Dissable devtools if not packaged.
			preload: join(__dirname, 'preload.js'),
		},
		show: false, // hide by default as to avoid slight flickering bug
	});

	// Load the svelte-app
	win.loadFile(join(__dirname, '../../public/index.html'));

	// show application when html is loaded.
	win.on('ready-to-show', win.show);

	// handle custom IPC Events created in the preload.ts
	ipcMain.on('window/exit', () => app.quit());
	ipcMain.on('window/minimize', () => win.minimize());
	ipcMain.on('window/show', () => win.show());
}

// handle external links
ipcMain.on('open/url', (_, url: string) => shell.openExternal(url));

// Handle VERSION REQUESTS
ipcMain.handle('versions/app', async () => app.getVersion());
ipcMain.handle('versions/nodejs', async () => process.versions.node);
ipcMain.handle('versions/chrome', async () => process.versions.chrome);
ipcMain.handle('versions/electron', async () => process.versions.electron);
