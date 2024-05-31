const mongoose = require('mongoose');
const userSchema = require('./user');

console.log("userSchema:", userSchema); // Add this line to check the schema

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex is deprecated and should be removed
});

const db = {
    User: mongoose.model('User', userSchema)
};

module.exports = db;
