const express = require('express');
const router = express.Router();
const path = require('path');
const data = {};
data.employees = require('../../data/employees.json');

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
    .get((req, res) => {
        res.json(data.employees);
    })
    .post((req, res) =>{
        res.json({
            "firstname": req.body.firstname,
            "lastname": req.body.lastname
        });
    })
    .put((req, res) =>{
        res.json({
            "firstname": req.body.firstname,
            "lastname": req.body.lastname
        });
    })
    .delete((req, res) => {
        res.json({"id": req.body.id})
    })

// This is because we are passing in a parameter instead
/**
 * Then the request will be in the form "http://localhost:3500/employees/1" ":id" means data type of id
 */
router.route('/:id')
    .get((req, res) => {
        res.json({"id": req.params.id}); // This is because we have made use of the parameter directly
    })
    // params is used because it is contained in the request body


// Then to export the router
module.exports = router;

/**
 * Note that in order to test our route we have to make use of a Third party application
 * We can make use of Thunder Client but we used to make use of POSTMAN 
 */