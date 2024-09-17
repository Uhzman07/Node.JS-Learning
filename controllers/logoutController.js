const usersDB = {
    users : require('../model/users.json'),
    setUsers : function (data) {this.users = data}
}

const fsPromises = require('fs').promises;
const path = require('path');



const handleLogout = async (req, res) =>{

    // Note that after the access token had been stored in the http-only cookie, then invoking this refresh controller generates a new access token everytime
    const cookies = req.cookies;
    if(!cookies?.jwt){
        return res.sendStatus(204); // No content; that is, the request was successful but there is nothing to return
    }
    const refreshToken = cookies.jwt;

    // Is refreshToken in db?
    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);

    if(!foundUser){
        res.clearCookie('jwt',{httpOnly : true});
        return res.sendStatus(204); // This means that the request was successful but there was no content to return
    }

    // To get to this point, it means that we have found the required refresh token in the database
    // Delete refreshToken in DB
    const otherUsers = usersDB.users.filter(person=> person.refreshToken !== foundUser.refreshToken)

    // Then to then re add the current user found but this time, we want to add an empty refresh token
    const currentUser = {...foundUser, refreshToken:''};
    usersDB.setUsers([...otherUsers,currentUser]);

    await fsPromises.writeFile(
        path.join(__dirname, '..','model','users.json'),
        JSON.stringify(usersDB.users)
    );
    
    res.clearCookie('jwt', { httpOnly: true, sameSite :'None', secure : true}); // Note that we do not add the secure connection for https here because we are not in production
    // If we were in production, then we can add the option (secure : true)

    res.sendStatus(204);
}

module.exports = {handleLogout};