/*
const usersDB = {
    users : require('../model/users.json'),
    setUsers : function (data) {this.users = data}
}
*/
// To make use of the mongo DB database
const User = require('../model/User');


const fsPromises = require('fs').promises;
const path = require('path');

// To install the encryption package
// npm i bcrypt
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    // In order to signify the json content
    const {user, pwd} = req.body;
    if(!user || !pwd){
        return res.status(400).json({'message':'Username and password are required.'});
    }

    // Check for duplicate usernames in the db
    // This method below returns any user that matches the user passed in
    const duplicate = await User.findOne({username : user}).exec(); //  Note that we have to use the "exec()" with findOne because it could also make use of a call back

    if(duplicate) return res.sendStatus(409); // This means a conflict

    try{
        // encrypt the password
        // Hashing alone might not be enough sometimes we have to add a salt should in case an hacker hacks into our DB and then getting one hash code will allow getting others
        const hashedPwd = await bcrypt.hash(pwd, 10);

        // Create and store the new user // This is because mongoose allows us to directly store data
        // Note that we have not added the role and object id as fields here because it gets added to the database by DEFAULT
        const result =  await User.create({
            "username":user,
            "password": hashedPwd
        });
        
        
        console.log(result);
        res.status(201).json({'success': `New user ${user} created!`});


    } catch(err){
        console.log(err);
        res.status(500).json({'message':err.message})
    }
}

module.exports = {handleNewUser};