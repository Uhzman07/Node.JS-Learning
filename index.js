// To import the module that we had created
const logEvents = require('./logEvents.js');

const EventEmitter = require('events');

// To create the class
class MyEmitter extends EventEmitter {};

// Then to initialize the object
const myEmitter = new MyEmitter();

// add listener for the log event
// Then we want to add a listener to log event 
myEmitter.on('log', (msg) => logEvents(msg));

setTimeout(() =>{
     // Emit Event
     myEmitter.emit('log', 'Log event emitted!');
}, 2000 )


/**
 * Note that emitter could be used with web servers to emit the type of request that came in and all
 */
