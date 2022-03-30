export function ErrorOut (arg: any, arg2?: any) {
    console.log("\nERROR:")
    console.log(...arguments);
    process.exit();
}

type HelpOption = {
    commands: ["-help" , "--help", "help", "info", "-options", "options"],
    description: "Provides a list of usable commands.",
    name: "Help"
}

type JavascriptSvelteOption = {
    commands: ["-javascript", "javascript", "-js", "js"],
    description: "Template for modern javascript, svelte & electron applications.",
    name: "Javascript - Svelte/Electron"
}

type TypescriptSvelteOption = {
    commands: ["default" , "--default", "-typescript", "typescript", "-ts", "ts"],
    description: "Template for modern typescript, svelte & electron applications.",
    name: "Typescript & Svelte/Electron"
}


type Option = HelpOption | TypescriptSvelteOption | JavascriptSvelteOption


export function generate_help_options () {
    const optionsList: [TypescriptSvelteOption, JavascriptSvelteOption, HelpOption] = [
        {
            commands: ["default" , "--default", "-typescript", "typescript", "-ts", "ts"],
            description: "Template for modern typescript, svelte & electron applications.",
            name: "Typescript & Svelte/Electron"
        },  

        {
            commands: ["-javascript", "javascript", "-js", "js"],
            description: "Template for modern javascript, svelte & electron applications.",
            name: "Javascript - Svelte/Electron"
        }, 

        {
            commands: ["-help" , "--help", "help", "info", "-options", "options"],
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