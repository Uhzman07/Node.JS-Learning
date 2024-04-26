// In order to import the dependency "date-fns"
const { format } = require('date-fns');

// In order to import the dependency "uuid" - And then the "v4" with it that is, we want to use it to get the code for each output
const {v4: uuid} = require('uuid')




// Note that new Date() is a built in function fo
//console.log(new Date());

// To make use of the format
console.log(format(new Date(), 'yyyyMMdd\tHH:mm:ss'))

//console.log('hello')
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message) => {
    const dateTime =   `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;

    // To get the log id every time we make a change to the console.log 
    // We have to make use of uuid in order to be able to do this
    const logItem =   `${dateTime}\t${uuid()}\t${message}\n`;
    // Note that what is printed here in the console is what will be appended to the file
    console.log(logItem);

    try{
        // To check if the directory doesn't exis
        if(!fs.existsSync(path.join(__dirname,'logs'))){
            // Then to create the 'logs' directory
            await fsPromises.mkdir(path.join(__dirname, 'logs'));
        }
        await fsPromises.appendFile(path.join(__dirname, 'logs', 'eventLog.txt'), logItem);

    }catch(err){
        console.log(err);
    }


}

// To export the module
// This will allow us to be able to make use of this outside the file
module.exports = logEvents;



