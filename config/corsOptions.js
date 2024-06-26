// For the websites or web applications that we will to allow access our backend or server
// Note that "http://127.0.0.1:5500" -> This is used to specify the address of the computer and then 5500 is the port on which it is run!
// https://localhost:3500 -> This is our local host that can access our backend since we have added it.
// Note that it is only our domain / web application that we want to allow access our backend that will be added to the list in real life.
// This is used to specify the domains that can access our route. Otherwise, they are rejected.

const whitelist = [
    'https://www.yoursite.com',
    'http://127.0.0.1:5500',
     'https://localhost:3500'
];

/**
 * The origin is where the request is coming from
 */
const corsOptions = {
     // This is an inner function
     origin : (origin, callback) => {
          // To check if the origin passed in is actually present in the white list or to check if the origin is "Undefined"
          // After adding "!origin" then we will be able to access our backend using our local host -> !origin means undefined or false
          if(whitelist.indexOf(origin) !== -1 || !origin){
               callback(null, true); // This is used to send that it is true
          }
          else{
               // Note that Express throws a built in error by default
               callback(new Error('Not allowed by CORS'));
          }
     },
     // Then to set the success status 
     optionsSuccessStatus: 200
}

// Then to export the corsOptions
module.exports = corsOptions;