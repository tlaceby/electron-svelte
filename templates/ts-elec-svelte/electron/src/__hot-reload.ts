import { join } from 'path';
import { app } from 'electron';

// enable hot reloading for typescript inside electron
const setupHotReloading = (DEV_MODE: boolean = false ) => {
  if (DEV_MODE) {
    // only reload if flag is gone. 
    // the npm run dev command has this flag to avoid reloading
    if (process.argv[2] !== '--no-watch') {
      import('electron-reload').then((electronReload) => {
        electronReload.default(join(__dirname, '../../'), {
          hardResetMethod: 'exit',
          // change this to quit if you want a hard reload.
          // note: this is alot slower for svelte related changes.
          electron: app.getPath('exe'),
        });
        console.log('Hot Reloading Enabled!');
      });
    }
  }
}


export default setupHotReloading