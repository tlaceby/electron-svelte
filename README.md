## Electron-Svelte Template

This template provides a solid begining for a electron/typescript/svelte
application. To get started you will need to install dependecies in both the
root of the project and the `renderer/` folder where all of the svelte code is.

Folder structure:

- **/**
  - readme.md
  - package.json
  - **electron** `(Contains all the electron specific code of the application)`
    - app.ts
    - preload.ts
      `(Sets up comminication between renderer and main process in electron (IPC))`
    - tsconfig.json `(Electron specific tsconfig file.)`
    - ...
  - **renderer**
    `(Contains all code/configs which are required for the frontend of your app)`
    - **src**
    - vite.config.json
    - package.json
    - ...

### Commands

- `npm run dev` will begin watching the renderer folder for changes and run the
  electron app in development mode.

- `npm run package` will package the application according to the **build**
  section in the package.json file. This uses **electron-builder** for packaging
  the application for all major platforms.
