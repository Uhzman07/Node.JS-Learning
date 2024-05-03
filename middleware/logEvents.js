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

const logEvents = async (message , logName) => {
    const dateTime =   `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;

    // To get the log id every time we make a change to the console.log 
    // We have to make use of uuid in order to be able to do this
    const logItem =   `${dateTime}\t${uuid()}\t${message}\n`;
    // Note that what is printed here in the console is what will be appended to the file
    console.log(logItem);

    try{
        // To check if the directory doesn't exist
        // Note that the two dots ".." is used to move two directories up
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))){
            // Then to create the 'logs' directory
            await fsPromises.mkdir(path.join(__dirname, '..','logs'));
        }
        await fsPromises.appendFile(path.join(__dirname, '..','logs', logName), logItem);

    }catch(err){
        console.log(err);
    }


}

// To define the logger function here
// Custom Middleware Logger
/**
 * This is used to make some alterations to our function of request and response
 */
const logger = (req, res, next) => {
    // To make use of the log Events, we pass in the required parameters
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
    // With above, we get the headers.origin as "undefined" -> When we simply run on Chrome -> This is because we are making use of our local host domain
    // Then we go online to Google -> Developer tools -> Console -> And then we call the fetch('http://localhost:3500');
    // We get -> GET	https://www.google.com	/
    console.log(`${req.method} ${req.path}`)
    next(); 
    /**
     * We get
     * GET /
       GET /css/style.css
     */
};

// To export the module
// This will allow us to be able to make use of this outside the file
module.exports = {logEvents, logger};



