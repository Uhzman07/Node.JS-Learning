/**
 * Note that this is the custom file that is used for handling errors
 */

// To import logEvents
const {logEvents} = require('./logEvents');

const errorHandler = (err, req, res, next) => {
    logEvents( `${err.name}: ${err.message}`, 'errLog.txt');
    console.error(err.stack)
    res.status(500).send(err.message);
}

// In other to export the error handler
module.exports = errorHandler;
   
