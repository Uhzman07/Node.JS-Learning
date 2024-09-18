
const User = require('../model/User');

// In order to install the JWT packages that we need 
const jwt = require('jsonwebtoken');
// require('dotenv').config();


const handleRefreshToken = async (req, res) =>{

    // Note that after the access token had been stored in the http-only cookie, then invoking this refresh controller generates a new access token everytime
    const cookies = req.cookies;
    if(!cookies?.jwt){
        return res.sendStatus(401); // Note that we have to use "sendStatus" because status() is chainable to a custom text
    }
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;

    // We do not have to make the refresh token to be a field to find because it comes in a field format
    const foundUser = await User.findOne({refreshToken}).exec();

    if(!foundUser){
        return res.sendStatus(403); // Forbidden
    }

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if(err || foundUser.username !== decoded.username ){
                return res.sendStatus(403);
            }
            // Then to get the roles stored in the request
            const roles = Object.values(foundUser.roles);

            const accessToken = jwt.sign(
                { "UserInfo" : {
                        "username": decoded.username,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '30s'}
            );
            res.json({accessToken})
        }
    );

    
}

module.exports = {handleRefreshToken};