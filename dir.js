const fs = require('fs');

const path = require('path');



// To check if the file does not exist
if(!fs.existsSync('./new')){
    // To make a directory
    const direct = fs.mkdir('./new', (err) => {
        if(err) throw err;
        console.log('Directory created');
    }
    );
}

// Note that in a weird way this functions do not occur one after the other when we do not add this log message
console.log('Usman');

// Then to remove the directory
if(fs.existsSync('./new')){
    // To make a directory
    fs.rmdir('./new', (err) => {
        if(err) throw err;
        console.log('Directory removed');
    }
    );
}
