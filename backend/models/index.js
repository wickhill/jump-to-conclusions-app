require('dotenv').config()
const mongoose = require('mongoose');
const userSchema = require('./User');


// console.log("userSchema:", userSchema); // debug log to check the schema

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const User = require('./User');

module.exports = {
    User
};
