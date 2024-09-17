const express = require('express');
const router = express.Router();
const path = require('path');

// Then to import the exported module
// This will allow us to follow the MVC pattern i.e the Modal View Controller pattern
const employeesController = require('../../controllers/employessController');

const verifyJWT = require('../../middleware/verifyJWT');




/**
 * Then to perform a GET request based on the Route
 */
// Note that this method allows for a pos request
/**
 * In Node.js routing, a POST request is one of the HTTP request methods used to submit data to be processed by the server. 
 * Unlike a GET request, which typically retrieves data from the server, a POST request sends data to the server to be processed in some way. 
 * This data could be form submissions, JSON payloads, or any other type of data that needs to be handled by the server.
 * 
 * put() method is used when we are trying to update the already existing data
 * Note that get, post, put, and delete are all http method
 * Note that when we make use of this route method, then the http request can make use of the file name directly like "http://localhost:3500/employees"
 * Note that Thunder Client allows use to make use of PUT, POST, DELETE, and GET on any request
 * When trying a POST request, then we will have to specify the JSON line in the body before we send
  */
router.route('/')
    // Then to add the authentication to the router; we can insert this in the "get" i.e we pass it through the JWT middleware before it performs its actual function
    //.get(verifyJWT, employeesController.getAllEmployees) // Then we test this in thunder bolt
    .get(employeesController.getAllEmployees)
    .post(employeesController.createNewEmployee)
    .put(employeesController.updateEmployee)
    .delete(employeesController.deleteEmployee)

// This is because we are passing in a parameter instead
/**
 * Then the request will be in the form "http://localhost:3500/employees/1" ":id" means data type of id
 */
router.route('/:id')
    .get(employeesController.getEmployee);
    // params is used because it is contained in the request body


// Then to export the router
module.exports = router;

/**
 * Note that in order to test our route we have to make use of a Third party application
 * We can make use of Thunder Client but we used to make use of POSTMAN 
 */