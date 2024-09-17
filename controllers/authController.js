const usersDB = {
    users : require('../model/users.json'),
    setUsers : function (data) {this.users = data}
}

const bcrypt = require('bcrypt');

// In order to install the JWT packages that we need 
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Since we have not started integrating databases like MongoDB, we will stick to making use of fsPromises
const fsPromises = require('fs').promises;
const path = require('path');


const handleLogin = async (req, res) =>{
    const {user, pwd} = req.body;
    if(!user || !pwd){
        return res.status(400).json({'message':'Username and password are required.'});
    }
    const foundUser = usersDB.users.find(person => person.username === user);

    if(!foundUser){
        return res.sendStatus(401); // Unauthorized
    }

    // Evaluate password (using bcrypt) // This is used to compare the password of the user found and the password that we had input
    const match = await bcrypt.compare(pwd, foundUser.password);

    if(match){
        // create JWTs
        // Also note that to access the ".env" file, we need to add ".process"
        // We also set the time that the access token can expire and the normal time that could be used in production is usually about 5 minutes
        const accessToken = jwt.sign(
            {"username": foundUser.username},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn : '30s'}
        );

        // Note that the refresh token needs to last a bit longer than the "ACCESS_TOKEN"
        const refreshToken = jwt.sign(
            {"username": foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn : '1d'}
        );

        // We want to save our refresh token in the database which will allow us to invalidate it in the future

        // Saving refresh Token with current user
        
        // To create an array of the users that aren't the user that we found/logged in
        const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username);

        // We are storing the refresh token in the json; that is, the refresh token will co-exist with the password
        // That is the current user will have a new field called the "refreshToken"
        const currentUser = { ...foundUser, refreshToken};

        usersDB.setUsers([...otherUsers, currentUser]);

        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users)

        )

        // We want to set the refreshToken to the cookie, but since the cookie can be accessed with JavaScript, then we can make it encrypted by using "https"
        // Note that the maxAge is in milliseconds meaning that it is 24 hours
        // We make the cookie httpOnly so that it is not accessible by JavaScript
        // Cookies are often used to store tokens like refreshToken because they allow the server to send data to the client that can be sent back automatically with future requests.
        /*

            The cookie stores the refreshToken and is set to be HTTP-only, meaning it’s not accessible via client-side JavaScript for security reasons.
            The comment also notes that using HTTPS (secure connections) can encrypt the cookie transmission, and the token is valid for 24 hours (maxAge).

        */
       // Note that we set "sameSite" to none so as to avoid an error message when the front end is not on the same site as the API
        res.cookie('jwt',refreshToken,{httpOnly : true, sameSite:'None', secure: true,
         maxAge : 24 * 60 * 60 * 1000});


        res.json({ accessToken }) // Note that the accessToken should be stored in memory 
    } else{
        res.sendStatus(401);
    }
}

module.exports = {handleLogin};