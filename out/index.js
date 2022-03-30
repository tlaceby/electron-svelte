#! /usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const process_1 = require("process");
const helpers_1 = require("./helpers");
const Locations = {
    typescript: (0, path_1.join)(__dirname, "./templates/ts-elec-svelte"),
    javascript: (0, path_1.join)(__dirname, "./templates/js-elec-svelte"),
};
function validate_parameters() {
    return __awaiter(this, void 0, void 0, function* () {
        const args = process.argv;
        const generate_options = (0, helpers_1.generate_help_options)();
        console.log(generate_options);
        if (args.length < 3)
            (0, helpers_1.ErrorOut)("Invalid arguments use the -help flag to see all possible options.");
    });
}
function validateParam() {
    return __awaiter(this, void 0, void 0, function* () {
        const args = process.argv;
        let out = { out: "", src: "" };
        let folder = "";
        if (args.length != 4)
            (0, helpers_1.ErrorOut)("Invalid project type was passed in. Expected either -js or -ts as a cli arg. Followed by a project name. ex:: npx electron-svelte-app -ts my-app");
        folder = args[3];
        const folderLoc = (folder == ".") ? (0, process_1.cwd)() : (0, path_1.join)((0, process_1.cwd)(), folder);
        if ((0, fs_1.existsSync)(folderLoc) && folderLoc != (0, process_1.cwd)()) {
            const files = (0, fs_1.readdirSync)(folderLoc);
            if (files.length > 0) {
                (0, helpers_1.ErrorOut)("Cannot create template inside non-empty folder: \n - " + folderLoc);
            }
        }
        if (args[2].toLowerCase().includes("ts") || args[2].toLowerCase().includes("type")) {
            console.log("Creating a typescript-electron-svelte project.");
            out = { out: folderLoc, src: Locations.typescript };
        }
        else if (args[2].toLowerCase().includes("js") || args[2].toLowerCase().includes("java")) {
            console.log("Creating a javascript-electron-svelte project.");
            out = { out: folderLoc, src: Locations.javascript };
        }
        else {
            (0, helpers_1.ErrorOut)("Invalid project type was passed in. Expected either -js or -ts as a cli arg.");
        }
        return out;
    });
}
function createTemplate(location_src = Locations.typescript, location_dest) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (0, fs_extra_1.copySync)(location_src, location_dest);
        }
        catch (err) {
            (0, helpers_1.ErrorOut)(err);
        }
        try {
            console.log("* Created Template              [1/5]");
            console.log("* Installing dependecies         ");
            (0, child_process_1.execSync)(`cd ${location_dest} && npm i`);
            console.log("* Installed dependecies         [2/5]");
            setTimeout(() => {
                console.log("* Building Demo APP             [3/5]");
                (0, child_process_1.execSync)(`cd ${location_dest} && npm run build`);
                console.log("* Finished Building Template    [4/5]\n");
                console.log("* Running Demo                  [5/5]\n");
                (0, child_process_1.execSync)(`cd ${location_dest} && npm run start`);
            }, 700);
        }
        catch (err) {
            (0, helpers_1.ErrorOut)(err);
        }
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const choice = yield validate_parameters();
        console.log("output: ", choice);
        process.exit();
        const { src, out } = yield validateParam();
        const template = createTemplate(src, out);
    });
}
main();
