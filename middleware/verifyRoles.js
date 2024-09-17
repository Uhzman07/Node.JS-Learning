/*
    Note that the spread parameter "...allowedRoles" allows us to accept as many parameters as we need
*/
const verifyRoles = (...allowedRoles)  => {
    // This allows us to pass in the parameters and also allow the app to check the req, res automatically
    // To be able to pass in the allowed roles, we need to return an anonymous function
    // This allows our app to recognize both functions
    return (req, res, next) =>{
        if(!req?.roles){
            return res.sendStatus(401);
        }
        const rolesArray = [...allowedRoles];
        console.log(rolesArray);
        console.log(req.roles); // These are the roles coming from the JWT
        // Note that we are trying to compare an array of roles here
        // We can map out the roles array to compare if each of them is included in the roles array
        // Then we can chain this mapping with "find()" to see if true is returned at any point
        // The ".find()" chain here is used to find the first "true"
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);

        // Then to check if we did not find any result that is, we got not "true"
        if(!result){
            return res.sendStatus(401);
        }
        next();

    }
}

module.exports = verifyRoles;