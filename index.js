// In order to import the dependency "date-fns"
const { format } = require('date-fns');

// In order to import the dependency "uuid" - And then the "v4" with it that is, we want to use it to get the code for each output
const {v4: uuid} = require('uuid')




// Note that new Date() is a built in function fo
//console.log(new Date());

// To make use of the format
console.log(format(new Date(), 'yyyyMMdd\tHH:mm:ss'))

//console.log('hello')


console.log(uuid()); // This is used to print out a form of code for every code written

/**
 * If we ever decide to add anything else to the console, then we can see a change in the code
 */
console.log("Usman");



