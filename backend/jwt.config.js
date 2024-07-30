require('dotenv').config();

module.exports = {
    jwtSecret: process.env.SECRETKEY,
    jwtSession: {
        session: false,
        // expiresIn: '10hrs' // Token expires in 10 hours
    }
};
