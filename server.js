// How NodeJS differs from Vanilla JS
// 1) Node runs on a server - not in a browser (backend not frontend)
// 2) The console is the terminal window
// 3) To run the file, we use Node and then the name of the file
console.log("Hello World");

// 3) Global object instead of Window object - Window object are like the browser attribute normally used in JS traditionally
// console.log(global);

// 4) Has Common Core modules that we will explore
// 5) CommonJS modules instead of ES6 modules
// 6) NodeJs is still missing some JS APIs like fetch

// To import os
const os = require('os');

// To import path
const path = require('path');

// To import the modules that we had created
const math = require('./math');

// Then to call the module
console.log(math.add(2,3));

// To make use of the module more specifically
//const { add } = require('./math');
// console.log(add(4,6))

// We can also add add all the methods in the module at once

const { add, subtract, multiply, divide } = require('./math');

console.log(add(4,5));
console.log(subtract(6,5));
console.log(multiply(4,5));
console.log(divide(4,5));

/*
console.log(os.type()); // This shows the OS type
console.log(os.version()); // This shows the OS version
console.log(os.homedir()); // This shows the home directory on our laptop

console.log(__dirname); // This shows the directory name 
console.log(__filename); // This shows the file name 

console.log(path.dirname(__filename)); // This gives us the directory name just like above
console.log(path.basename(__filename)); // This gives us the directory of the file
console.log(path.extname(__filename)); // This concatenates the path and file name together

console.log(path.parse(__filename)); // We get an object containing the root, directory, ext, filename, and all.
*/







