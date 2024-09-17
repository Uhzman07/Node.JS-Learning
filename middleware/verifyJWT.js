/*
    Note that this middle ware is the one that make use of the given access token to generate the request body information
*/ 

const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if(!authHeader?.startsWith('Bearer')) return res.sendStatus(401);
    // console.log(authHeader); // Bearer token -> That is the authHeader contains the Bearer and the token

    const token = authHeader.split(' ')[1]; // That is the second word is the required token

    // Note that the last function in this is the call back
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); // Invalid token
            // Then to extract the user details from the decoded
            req.user = decoded.UserInfo.username;
            req.roles = decoded.UserInfo.roles;
            console.log(req.user);
            next();
        }
    );
    //console.log(req.user);


}

// Then to export our module
module.exports = verifyJWT;