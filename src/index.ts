#! /usr/bin/env node

import { join }  from "path"
import { copySync } from "fs-extra"
import { execSync } from "child_process"
import { existsSync, readdirSync } from "fs"
import { cwd } from "process"
import { ErrorOut, generate_help_options } from "./helpers"

const Locations = {
    typescript: join (__dirname, "./templates/ts-elec-svelte"),
    javascript: join (__dirname, "./templates/js-elec-svelte"),
}

async function validate_parameters () {
    const args = process.argv;

    const generate_options = generate_help_options();
    console.log(generate_options)
    if (args.length < 3)
        ErrorOut("Invalid arguments use the -help flag to see all possible options.")

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

async function createTemplate (location_src: string = Locations.typescript, location_dest: string) {
    try {
        copySync(location_src, location_dest)
    } catch (err) { ErrorOut(err) }

    try {
        console.log("* Created Template              [1/5]");
        console.log("* Installing dependecies         ");
        execSync(`cd ${location_dest} && npm i`);
        console.log("* Installed dependecies         [2/5]");
        setTimeout(() => {
            console.log("* Building Demo APP             [3/5]")
            execSync(`cd ${location_dest} && npm run build`);
            console.log("* Finished Building Template    [4/5]\n")
            console.log("* Running Demo                  [5/5]\n")
            execSync(`cd ${location_dest} && npm run start`);
        }, 700)
    } catch (err) {
        ErrorOut(err);
    }


}



async function main () {
    const choice = await validate_parameters();
    console.log("output: ", choice)
    process.exit()
    const {src, out } = await validateParam();
    const template = createTemplate(src, out); 
}

main();