## Electron-Svelte Template

Get started creatinbg modern Electron/Svelte/Typescript with this templatw which provides hotreloading, electron-builder, svelte, and typescript setup. This template is a great starting off point for building your next project. The frontend and backend code are seperated and can easily be worked on independently of one another. Furthermore, with hotreloading of not only the svelte but also all typescript this makes development a breeze.

To get started you will need to install dependecies in both the root of the project and the `renderer/` folder where all of the ftontend code is contained.

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
  electron app in development mode. The electron folder will also be watched for hotreloading changes using the **electron-reload** package.

- `npm run package` will package the application according to the **build**
  section in the package.json file. This uses **electron-builder** for packaging
  the application for all major platforms.
