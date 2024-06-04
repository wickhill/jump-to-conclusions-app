require('dotenv').config()
const mongoose = require('mongoose');
const userSchema = require('./User');


console.log("userSchema:", userSchema); // Add this line to check the schema

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex is deprecated and should be removed
});

const User = require('./User');

module.exports = {
    User
};
