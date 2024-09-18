const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
    Note that username, roles, password are all fields
    Note that this password here will be stored as an encrypted value
    Note that the field "roles" is also an object
*/
const userSchema = new Schema({
    username: {
        type: String, 
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Editor: Number,
        Admin : Number
    },
    password : {
        type : String,
        required : true
    },
    refreshToken : String
});

module.exports = mongoose.model('User', userSchema);