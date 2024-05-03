// To import Express.JS
const express = require('express');

/**
 * Note that app.use is used for middle wares
 */

// Note that "app" is a typical name and when could have used "server"
const app = express();

const path = require('path');

// In order to import cors -> This is a third party middle ware
const cors = require('cors');

// In order to import our logEvents from the Middleware (Custom)
const { logger } = require('./middleware/logEvents');

// To import the error Handler
// Note that if the module that if we are trying to import just one method from a module, then  we do not need the braces
const errorHandler  = require('./middleware/errorHandler');

// In order to define the port for hosting
const PORT = process.env.PORT || 3500;

// Custom Middleware Logger
app.use(logger);

// For the websites or web applications that we will to allow access our backend or server
// Note that "http://127.0.0.1:5500" -> This is used to specify the address of the computer and then 5500 is the port on which it is run!
// https://localhost:3500 -> This is our local host that can access our backend since we have added it.
// Note that it is only our domain / web application that we want to allow access our backend that will be added to the list in real life.
// This is used to specify the domains that can access our route. Otherwise, they are rejected.
const whitelist = ['https://www.yoursite.com','http://127.0.0.1:5500', 'https://localhost:3500']

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



// Then to make use of cors
// CORS stands for Cross Origin Resource Sharing
// Then if we go back to google browser console to make the same request of "fetch('https://localhost:3500')" -> Then we get to see that we get no error for cors -> That is it allows multi platform access
// Now, we allowed to make a request from the CORS domain without it giving us a CORS error
// Then we can pass in the core options which includes a function and a success code
app.use(cors(corsOptions));

/**
 * Note 
 * After adding 'https://www.google.com' to the white list, then we can be sure that it can allow access to using www.google.com domain!
 * Now if we try to fetch, we get no error const whitelist = ['https://www.google.com','http://127.0.0.1:5500', 'https://localhost:3500']
 */

// To specify the MIDDLEWARE
// Built-In Middleware to handle urlencoded data
// in other words, form data: -. That is, this is used to pull data from a form.
// 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({extended:false}));

// Built in middleware for JSON
// that is if an input in form of a JSON file is passed in, then we can use this to convert it to normal text
// This will be applied to all route as they come in
app.use(express.json());

// In order to server static files (This is also part of the middle ware)
// This makes it possible to apply css changes to our file
app.use(express.static(path.join(__dirname, '/public'))); // Note that we will have to create a public folder for this -> Then we put in our css folder and image folder in it, and also create a new folder "text" in it.

/**
 * Since we have made our css file in a public folder then we we try to access "http://localhost:3500/css/style.css" -> Then we get the entire CSS code written to the browser
 * That is the public has made it available to the public
 */

// Move "data.text" from the data folder to the text folder
/**
 * Note that when we run this, the page appears with the css code that has been applied in the public folder
 */


// To specify our router
// Note that a simple '/' means home of default.
// '^/$|index.html' -> "^" means begin with "/" and "$" means end with "/" 
// This then means if the request begins with a slash or ends with a slash OR ("|") if the the request is "index.html" then offer the same response
// So when we give a simple slash or type "index.html" then we can get the return value
// Note that unlike before when we had to manually specify the status code and the conteny 
// Then to make the the ".html" optional in the , we can use regular expression by doing index(.html)?
/**
 * Note that functions of app like get(), put() and the rest all work as a water fall.
 */
app.get('^/$|index(.html)?', (req, res) => {
     
     //res.send('Hello World!'); // Then run "npm run dev" // This sends a simple text

     // Then to render a file 
     // This is used to render the file, doing that, then we specify the root to start from to tell that it should start from a particular point
     //res.sendFile('./views/index.html', {root:__dirname});

     // For simpler way of doing the same thing but with minimal code
     res.sendFile(path.join(__dirname, 'views', 'index.html'));

})

// In order to specify upon the request to get a particular page
app.get('/new-page(.html)?', (req, res) => {
     // This is used to send the new page as visited
     res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
})


// In order to specify a redirect on request to access an old page
app.get('/old-page(.html)?', (req, res) => {
     // This is used to redirect to the new page.
     res.redirect(301,'new-page.html'); // This sends a 302 by default - This is because a "302" doesn't necessarily get the search engine to change to a permanent redirect
     // What we have to do is to specify it as a 301
})

// ROUTE HANDLERS
app.get('/hello(.html)?', (req, res, next) => {
     console.log('attempted to load hello.html');
     next() // Note that is used to move to the next expression that we have that is, another (req, res)
     // Note that what next() does is that it goes on to call the next function in the chain
}, (req, res) => {
     res.send('Hello World!');
})

// Chaining ROUTE HANDLERS
const one = (req, res, next) => {
     console.log('one');
     next();
}

const two = (req, res, next) => {
     console.log('two');
     next();
}

const three = (req, res) => {
     console.log('three');
     res.send('Finished!');
}

// Then in order to apply the sequential chaining
// We can put all in an array
app.get('/chain(.html)?', [one, two, three]); // So when we type '/chain(.html)?' then we go from one -> two -> three



/*
// To put a default
// That is a GET ALL
// Note that since this is the last one that we have, if we try to make use of something that doesn't exist then we get a 404 error.
app.get('/*', (req, res) => {
     // In order to send in our custom 404.html file
     // Then we can also state the status code for this 
     res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));

});
*/

// Since this is at the bottom of the code that is, to make sure that every other option that had not been accepted previosly get accepted
// app.all accepts all https methods at once
app.all('*', (req, res) => {
     // Then we can also state the status code for this 
     res.status(404);

     /*
      Then to check what type of route the request accepts, note that our request here only accepts 'html' based on the browser
      We could make use of POSTMAN to test the other options
     */
    // To check if the request accepts HTML file
     if(req.accepts('html')){
          // In order to send in our custom 404.html file
          res.sendFile(path.join(__dirname, 'views', '404.html'));
     }
     // To check if the request accepts JSON file
     else if(req.accepts('json')){
          res.json({error : "404 Not Found"});
     }
     else{
          // Then to respond with a simple text
          res.type('txt').send("404 Not Found");
     }


     
     
     

});



// To create our custom error
// Note that it has an anonymous function in it
/**
 * Then when we run this using our local host, we get "Not allowed by CORS" to show that it isn't allowed by CORS
 * To solve this we have to add the option to allow undefined domain in the CORS options checker
 */

// Using Anonymous function
/*
app.use(function (err, req, res, next){
     console.error(err.stack)
     res.status(500).send(err.message);
}
)
*/

// To make use of the simple error Handler that we created
app.use(errorHandler);




// Then to add a listener to the server(app)
// Note that we have to include the PORT and then an ANONYMOUS FUNCTION
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



/**
 * Note that emitter could be used with web servers to emit the type of request that came in and all
 */
