/**
 * This is the file that forms a connection between node.js and MongoDB
 */

const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DATABASE_URI, {
            useUnifiedTopology : true,
            useNewUrlParser : true
        });
    } catch (err){
        console.log(err);
    }
}

module.exports = connectDB;