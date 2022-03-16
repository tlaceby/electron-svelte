#! /usr/bin/env node

const { join } = require("path");
const { copySync } = require("fs-extra");
const { execSync, exec } = require("child_process");
const { existsSync, readdirSync } = require("fs");
const { cwd } = require("process");

const Locations = {
    typescript: join (__dirname, "./templates/ts-elec-svelte"),
    javascript: join (__dirname, "./templates/js-elec-svelte"),
}

function ErrorOut () {
    console.log("\nERROR:")
    console.log(...arguments);
    process.exit();
}


async function validateParam () {
    const args = process.argv;
    let out = {out: "", src: ""};

    
    let folder = "";
    if (args.length != 4) 
        ErrorOut("Invalid project type was passed in. Expected either -js or -ts as a cli arg. Followed by a project name. ex:: npx electron-svelte-app -ts my-app");

    folder = args[3];
    
    const folderLoc = (folder == ".")? cwd() : join(cwd(), folder);
    
    if (existsSync(folderLoc) && folderLoc != cwd()) {
        const files = readdirSync(folderLoc);

        if (files.length > 0) {
            ErrorOut("Cannot create template inside non-empty folder: \n - " + folderLoc);
        }
    }

    if (args[2].toLowerCase().includes("ts") || args[2].toLowerCase().includes("type"))
        {
            console.log("Creating a typescript-electron-svelte project.");
            out = {out: folderLoc, src: Locations.typescript};
    } else if (args[2].toLowerCase().includes("js") || args[2].toLowerCase().includes("java")) {
            console.log("Creating a javascript-electron-svelte project.");
            out = {out: folderLoc, src: Locations.javascript};
    } else {
        ErrorOut("Invalid project type was passed in. Expected either -js or -ts as a cli arg.");
    }

    return out;
}

async function createTemplate (location_src = Locations.typescript, location_dest) {
    try {
        copySync(location_src, location_dest)
    } catch (err) {throw new Error(err) }

    try {
        console.log("* Created Template              [1/5]");
        console.log("* Installing dependecies         ");
        const worker = execSync(`cd ${location_dest} && npm i`);
        console.log("* Installed dependecies         [2/5]");
        setTimeout(() => {
            console.log("* Building Demo APP             [3/5]")
            const worker2 = execSync(`cd ${location_dest} && npm run build`);
            console.log("* Finished Building Template    [4/5]\n")
            console.log("* Running Demo                  [5/5]\n")
            const worker3 = execSync(`cd ${location_dest} && npm run start`);
        }, 700)
    } catch (err) {
        ErrorOut(err);
    }


}



async function main () {
    const {src, out } = await validateParam();
    const template = createTemplate(src, out); 
}

main();