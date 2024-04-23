// For the file
const fs = require('fs');
const path = require('path');

// To make use of files with the cloud system as well
const fsPromises = require('fs').promises;

// For Asynchronous programming
const fileOps = async() =>{
    try{
        // Note that we do not have to specify the callback here since the try and catch block is already handling that operation
        const data = await fsPromises.readFile(path.join(__dirname, 'files','starter.txt'), 'utf8');
        console.log(data);

        // In order to delete a file in the file structure
        // Note that this unlink function is also avaialable without promises as well.
        await fsPromises.unlink(path.join(__dirname, 'files','starter.txt'));

        await fsPromises.writeFile(path.join(__dirname, 'files', 'promiseWrite.txt'), data);
        await fsPromises.appendFile(path.join(__dirname, 'files', 'promiseWrite.txt'), '\n\nNice to meet you.');
        await fsPromises.rename(path.join(__dirname, 'files', 'promiseWrite.txt'),path.join(__dirname, 'files', 'promiseComplete.txt') );

        const newData = await fsPromises.readFile(path.join(__dirname, 'files','promiseComplete.txt'), 'utf8');
        console.log(newData);

    }catch(err){
        console.error(err);
    }
}

fileOps();


/*  -- Hardcoded
// TO read the file
fs.readFile('./files/starter.txt', (err,data) => {
    if (err) throw err;
    console.log(data.toString());
})
*/

/* -- Hardcoded
// To avoid using the toString() method
// We can add the utf8 
fs.readFile('./files/starter.txt', 'utf8', (err,data) => {
    if (err) throw err;
    console.log(data);
})
*/

// Using the path module
// We need to specify the file name
/*
fs.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8', (err,data) => {
    if (err) throw err;
    console.log(data);
})
*/


/*
// To add an error file - That is, a file that is not present
fs.readFile('./files/usman.txt', 'utf8', (err,data) => {
    if (err) throw err;
    console.log(data);
})
*/


// Due to asynchronous programming when we log a message directly into the console then it gets printed out before the file read
// After specifying the file using the path module then we can print out again then it should be fine,.
// console.log('Hello...')


/*

// To write into the file
// Note that the file we specify will be created if it is not present
// We do not have to specify utf8 because it will be by default
// Then the call back will only have an error since we are not trying to read any form of data
// Due to asynchrous programming, we cant predict the order that the read and write follows
// To be able to control this, then we can consider using the nested functions
fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'Nice to meet you', (err) => {
    if (err) throw err;
    console.log('Write complete');

    // Append file modifies an existing file and can append data to it
    fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), '\n\nYes it is.', (err) => {
        if (err) throw err;
        console.log('Append complete');

        // This is used to rename the file
        fs.rename(path.join(__dirname, 'files', 'reply.txt'), path.join(__dirname, 'files', 'reply.txt'), (err) => {
            if (err) throw err;
            console.log('Read complete');
        })
    })
})

*/




// To exit on uncaught errors
// Then we throw the error to the call back
process.on('uncaughtException', err => {
    // Note that the braces are left slanted
    console.error(`There was an uncaught error: ${err}`);
    process.exit(1);
})