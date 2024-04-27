// To import the module that we had created
const logEvents = require('./logEvents.js');

// To import htttp
const http = require('http');

const fs = require('fs');
const path = require('path');
const fsPromises = require('fs').promises;

const EventEmitter = require('events');

// To create the class
class MyEmitter extends EventEmitter { };

// Then to initialize the object
const myEmitter = new MyEmitter();

// In order to specify the emitter
myEmitter.on('log', (msg, fileName) => logEvents(msg, fileName));

// In order to define the port for hosting
const PORT = process.env.PORT || 3500;

// In order to create a serve file that will be in form of a function
// Note that is going to be an async function
const serveFile = async (filePath, contentType, response) => {
     try{
          // To get the data from the file
          const rawData = await fsPromises.readFile(
               filePath,
               !contentType.includes('image') ? 'utf8' : ''); // Note that we check if the content type doesn't include the word "image"- Then it will be utf8
               // Else then we are using an empty string that is, to let it go through and then return the image instead of it processing it in form of utf8

          // Based on the raw data that we are getting from here, we need to refactor the type of data it is!
          // This is a conditional statement that is used to check what to set the data as based on the type of data it is.
          // This is a tenary statement
          const data = contentType === 'application/json' ? JSON.parse(rawData) : rawData;

          // Specify the Head to a given content type
          response.writeHead(
               // In order to differentiate the status code
               filePath.includes('404.html') ? 404 : 200,
               {'Content-Type': contentType});

          // If the content type is an application.json file then we want to return a json file that has been converted to a String
          // After doing this then we can be able to view the json file in a better way
          response.end(contentType === 'application/json' ? JSON.stringify(data) : data); // This is used to send the data back

     }catch(err){
          console.log(err);
          myEmitter.emit('log', `${err.name}\t${err.message}`, 'errorLog.txt');
          // Then we set the status code to "500" - Meaning that the server could not be reached
          response.statusCode = 500;
          response.end();
     }
}

// Then to create the server, this will be in form of a method that takes in a request and a response
const server = http.createServer((req, res) => {
     console.log(req.url, req.method);

     // This can be used to emit and then send the result back to a file
     myEmitter.emit('log', `${req.url}\t${req.method}`, 'reqLog.txt');


     // In order to set an extension based on the request url
     const extension = path.extname(req.url);

     // Declare the content type based on the url of the request
     let contentType;

     // Then based on the request url we want to set the kind of content type to expect
     switch (extension) {
          // Note all these cases please
          case '.css':
               contentType = 'text/css';
               break;
          case '.js':
               contentType = 'text/javascript';
               break;
          case '.json':
               contentType = 'application/json';
               break;
          case '.jpg':
               contentType = 'image/jpeg';
               break;
          case '.PNG':
               contentType = 'image/png';
               break;
          case '.txt':
               contentType = 'text/plain';
               break;
          default:
               contentType = 'text/html';
     } 

     // To set the path name based on a conditional statement
     let filePath =
          contentType === 'text/html' && req.url === '/'
               ? path.join(__dirname, 'views', 'index.html') // If the content type is "text/html" 
               : contentType === 'text/html' && req.url.slice(-1) === '/'
                    ? path.join(__dirname, 'views', req.url, 'index.html') // If the content type is "text/html" and the last character in the request url is "/"
                    : contentType === 'text/html'
                         ? path.join(__dirname, 'views', req.url) // If the content type is simply "text/html"
                         : path.join(__dirname, req.url); // This is the default 


     // To check if there is no extension that is it was simply a "/"
     // This will make the request work regardless of what is being requested
     // This makes ".html" extension not required in the browser
     if (!extension && req.url.slice(-1) !== '/')
          filePath += '.html';

     // Then to check if the file we intend to get exists
     // This returns a boolean value specifying if the file exists
     const fileExists = fs.existsSync(filePath);

     if (fileExists) {
          // serve the file
          serveFile(filePath, contentType, res);


     } else {
          // if the file doesn't exist then the error could be 
          // 404
          // 301 - Redirect[[[[]]]]
          //console.log(path.parse(filePath)); // This is used to check the different parts of the path in order to see which doesn't exist!!
          // Then we run the server again
          switch(path.parse(filePath).base){
               // This is the instance which we are in our old page and then we want to redirect 
               case `old-page.html` :
                    // Then we reset the location (Using the response)
                    res.writeHead(301, {'Location' : '/new-page.html'});

                    // Then to end tvhe 
                    res.end();
                    break;

               case `www-page.html` :
                    res.writeHead(301, {'Location': '/'}) // This is used to redirect to the home page
                    res.end();
                    break;
               default:
                    // The default will be to serve a 404 error
                    // Note that we serve the 404.html file that we have and then we can do everything else manually
                    serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);
          }
     }
}
);

// Then to add a listener to the server
// Note that we have to include the PORT and then an ANONYMOUS FUNCTION
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));



/**
 * Note that emitter could be used with web servers to emit the type of request that came in and all
 */
