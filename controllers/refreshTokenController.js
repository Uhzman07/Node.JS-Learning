const usersDB = {
    users : require('../model/users.json'),
    setUsers : function (data) {this.users = data}
}



// In order to install the JWT packages that we need 
const jwt = require('jsonwebtoken');
require('dotenv').config();


const handleRefreshToken = (req, res) =>{

    // Note that after the access token had been stored in the http-only cookie, then invoking this refresh controller generates a new access token everytime
    const cookies = req.cookies;
    if(!cookies?.jwt){
        return res.sendStatus(401); // Note that we have to use "sendStatus" because status() is chainable to a custom text
    }
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;

    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);

    if(!foundUser){
        return res.sendStatus(403); // Forbidden
    }

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if(err || foundUser.username !== decoded.username ){
            }
            const accessToken = jwt.sign(
                {"username": decoded.username},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '30s'}
            );
            res.json({accessToken})
        }
    );

    
}

module.exports = {handleRefreshToken};