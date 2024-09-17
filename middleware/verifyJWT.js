const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if(!authHeader) return res.sendStatus(401);
    console.log(authHeader); // Bearer token -> That is the authHeader contains the Bearer and the token

    const token = authHeader.split(' ')[1]; // That is the second word is the required token

    // Note that the last function in this is the call back
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); // Invalid token
            req.user = decoded.username;
            next();
        }
    );


}

// Then to export our module
module.exports = verifyJWT;