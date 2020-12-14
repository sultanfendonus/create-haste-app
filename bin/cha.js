#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
var fse = require('fs-extra');
const shell = require('shelljs')
const chalk = require('chalk');

console.log("current directory", process.cwd())
// console.log("package directory", process.argv[1])

const rootDir = path.join(__dirname, '..');
const packagesDir = path.join(rootDir, 'packages');
const currentDir = process.cwd();
console.log("package dir", packagesDir);


let dir = process.argv[2];
if(!dir){
    console.log(chalk.red("Please specify a project name."));
    console.log(chalk.blue("Example:"));
    console.log(chalk.blue(`npx create-haste-app myapp`));
    return;
}
if(!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}
const sourceDir = path.join(packagesDir);
const destinationDir = path.join(currentDir, dir);

//copy directory content including subfolders
fse.copy(sourceDir, destinationDir, function (err) {
    if (err) {
        console.error(err);
    } else {
        const packageJonFile = path.join(destinationDir, 'package.json');
        shell.sed('-i', 'packageName', process.argv[2], packageJonFile);
        shell.cd(process.argv[2]);
        shell.exec('npm install', function(code, stdout, stderr) {
            console.log("HasteJs Project created successfully!");
            console.log(chalk.blue(`cd ${dir}`));
            console.log(chalk.blue('npm run develop'));
        });
    }
});


