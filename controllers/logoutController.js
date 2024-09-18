const User = require('../model/User');

// Note that logging out clears the refresh token from the collection

const handleLogout = async (req, res) =>{

    // Note that after the access token had been stored in the http-only cookie, then invoking this refresh controller generates a new access token everytime
    const cookies = req.cookies;
    if(!cookies?.jwt){
        return res.sendStatus(204); // No content; that is, the request was successful but there is nothing to return
    }
    const refreshToken = cookies.jwt;

    // Is refreshToken in db?
    const foundUser = await User.findOne({refreshToken}).exec();

    if(!foundUser){
        res.clearCookie('jwt',{httpOnly : true});
        return res.sendStatus(204); // This means that the request was successful but there was no content to return
    }

    // To get to this point, it means that we have found the required refresh token in the database
    // Delete refreshToken in DB
    foundUser.refreshToken = ''; // We can just delete by setting it to an empty string
    const result = await foundUser.save(); // Save here is used to update the document
    console.log(result);

    res.clearCookie('jwt', { httpOnly: true, sameSite :'None', secure : true}); // Note that we do not add the secure connection for https here because we are not in production
    // If we were in production, then we can add the option (secure : true)

    res.sendStatus(204);
}

module.exports = {handleLogout};