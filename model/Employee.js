const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required : true
    }
});

// Note that Mongoose automatically looks for the plural, lowercased version of your model name ; for example the model "Employee" is for the "employess" collection in the database

module.exports = mongoose.model('Employee', employeeSchema);