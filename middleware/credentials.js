const allowedOrigins = require('../config/allowedOrigins');

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if(allowedOrigins.includes(origin)){
        // Then to allow CORS to allow access for credentials
        res.header('Access-Control-Allow_Credentials',true);
    }
    next();
}

module.exports = credentials;