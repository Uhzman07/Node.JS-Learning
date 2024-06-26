const usersDB = {
    users : require('../model/users.json'),
    setUsers : function (data) {this.users = data}
}

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
    const duplicate = usersDB.users.find(person => person.username === user);

    if(duplicate) return res.sendStatus(409); // This means a conflict

    try{
        // encrypt the password
        // Hashing alone might not be enough sometimes we have to add a salt should in case an hacker hacks into our DB and then getting one hash code will allow getting others
        const hashedPwd = await bcrypt.hash(pwd, 10);

        // store the new user
        const newUser = {"username":user, "password": hashedPwd};

        // Then to add to the DB
        usersDB.setUsers([...usersDB.users, newUser]); // This is inform of a mutable way of copying

        await fsPromises.writeFile(
            path.join(__dirname,'..', 'model','users.json'),
            JSON.stringify(usersDB.users)
        )
        console.log(usersDB.users);
        res.status(201).json({'success': `New user ${user} created!`});


    } catch(err){
        console.log(err);
        res.status(500).json({'message':err.message})
    }
}

module.exports = {handleNewUser};