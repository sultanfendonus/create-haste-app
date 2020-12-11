#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
var fse = require('fs-extra');

console.log("current directory", process.cwd())
// console.log("package directory", process.argv[1])

const rootDir = path.join(__dirname, '..');
const packagesDir = path.join(rootDir, 'packages');
const currentDir = process.cwd();
console.log("package dir", packagesDir);
//
// const sourceDir = path.join(packagesDir, 'testfile.txt');
// const destinationDir = path.join(currentDir, 'packages/testfile.txt');




// let dir = `./packages`;
let dir = process.argv[2];
if(!dir){
    console.log("Please specify a project name.")
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
        console.log("Project created successfully!");
        console.log(`cd ${dir} && yarn install`);
    }
});

// fs.copyFileSync(sourceDir, destinationDir);
// fs.writeFileSync(sourceDir, 'Hey there!');