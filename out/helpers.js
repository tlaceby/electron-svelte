"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate_help_options = exports.ErrorOut = void 0;
function ErrorOut(arg, arg2) {
    console.log("\nERROR:");
    console.log(...arguments);
    process.exit();
}
exports.ErrorOut = ErrorOut;
function generate_help_options() {
    const optionsList = [
        {
            commands: ["default", "--default", "-typescript", "typescript", "-ts", "ts"],
            description: "Template for modern typescript, svelte & electron applications.",
            name: "Typescript & Svelte/Electron"
        },
        {
            commands: ["-javascript", "javascript", "-js", "js"],
            description: "Template for modern javascript, svelte & electron applications.",
            name: "Javascript - Svelte/Electron"
        },
        {
            commands: ["-help", "--help", "help", "info", "-options", "options"],
            description: "Provides a list of usable commands.",
            name: "Help"
        }
    ];
    let outputHelpString = `Electron/Svelte \n`;
    for (const option of optionsList) {
        outputHelpString += `\n${option.name}  -  ${option.description}\n`;
        for (const command of option.commands)
            outputHelpString += `${command}, `;
    }
    return outputHelpString;
}
exports.generate_help_options = generate_help_options;
