#! /usr/bin/env node

const { join } = require("path");
const { copySync } = require("fs-extra");
const { execSync } = require("child_process");
const { existsSync } = require("fs");
const { cwd } = require("process");

const TS_PROJ_LOCATION = join(__dirname, "../templates/ts-elec-svelte");

async function main() {
	if (process.argv.length !== 3)
		throwError(
			"Invalid argument. Expected the name of the project to be specified.",
			`Example:\n npx electron-svelte project-name-goes-here`
		);
	const projectName = process.argv[2];

	// verify the dir is not there
	const projectDir = join(cwd(), projectName);
	if (existsSync(projectDir))
		throwError(
			"Directory already exists: " + projectDir,
			"Please specifiy a dir that is not yet created or delete that one."
		);

	// if dir is there then copy the files to that dir.
	try {
		console.log("* Creating Project Structure!");
		copySync(TS_PROJ_LOCATION, projectDir);
		console.log("* Installing Dependecies");
		execSync(`cd ${projectDir} && npm install"`);
		console.log("* All Completed!");
		console.log(
			`* run the following commands to start project with hot reloading.: \n-  cd ${projectName} \n-  npm run watch \n" `
		);
	} catch (err) {
		throwError(err);
	}
}

main();

function throwError(...args) {
	args.forEach((a) => console.log(a));
	process.exit(1);
}
