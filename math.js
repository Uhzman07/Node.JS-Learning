/*
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const divide = (a, b) => a / b;
const multiply = (a, b) => a * b;

// Then to create a module based on the functions that we have 
module.exports = {add, subtract, multiply, divide};
*/

// To export in a better way

exports.add = (a, b) => a + b;
exports.multiply = (a, b) => a * b;
exports.divide = (a, b) => a / b;
exports.subtract = (a, b) => a - b;