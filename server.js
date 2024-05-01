// To import Express.JS
const express = require('express');

// Note that "app" is a typical name and when could have used "server"
const app = express();


const path = require('path');

// In order to define the port for hosting
const PORT = process.env.PORT || 3500;

// To specify our router
// Note that a simple '/' means home of default.
// '^/$|index.html' -> "^" means begin with "/" and "$" means end with "/" 
// This then means if the request begins with a slash or ends with a slash OR ("|") if the the request is "index.html" then offer the same response
// So when we give a simple slash or type "index.html" then we can get the return value
// Note that unlike before when we had to manually specify the status code and the conteny 
// Then to make the the ".html" optional in the , we can use regular expression by doing index(.html)?
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



// To put a default
// That is a GET ALL
// Note that since this is the last one that we have, if we try to make use of something that doesn't exist then we get a 404 error.
app.get('/*', (req, res) => {
     // In order to send in our custom 404.html file
     // Then we can also state the status code for this 
     res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));

});



// Then to add a listener to the server(app)
// Note that we have to include the PORT and then an ANONYMOUS FUNCTION
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



/**
 * Note that emitter could be used with web servers to emit the type of request that came in and all
 */
