#!/usr/bin/env node
const path = require('path');
const fs = require('fs');

console.log("current directory", process.cwd())
// console.log("package directory", process.argv[1])

const rootDir = path.join(__dirname, '..');
const packagesDir = path.join(rootDir, 'packages');
const currentDir = process.cwd();
console.log("package dir", packagesDir);

const sourceDir = path.join(packagesDir, 'testfile.txt');
const destinationDir = path.join(currentDir, 'packages/testfile.txt');

let dir = `./packages`;
if(!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

fs.copyFileSync(sourceDir, destinationDir);
// fs.writeFileSync(sourceDir, 'Hey there!');