import { ipcRenderer, contextBridge } from 'electron';

// Window functions for a custom top-bar.
const WindowAPIS = {
	minimize: () => ipcRenderer.send('window/minimize'),
	show: () => ipcRenderer.send('window/show'),
	exit: () => ipcRenderer.send('window/exit'),
};

const VersionAPIS = {
	app: (): Promise<string> => ipcRenderer.invoke('versions/app'), // gets read from package.json
	electron: (): Promise<string> => ipcRenderer.invoke('versions/electron'),
	nodejs: (): Promise<string> => ipcRenderer.invoke('versions/nodejs'),
	chrome: (): Promise<string> => ipcRenderer.invoke('versions/chrome'),
};

const APP_BRIDGE = {
	Window: WindowAPIS,
	Versions: VersionAPIS,
	openExternal: (url: string): void => ipcRenderer.send('open/url', url),
};

export default APP_BRIDGE;
contextBridge.exposeInMainWorld('bridge', APP_BRIDGE);
