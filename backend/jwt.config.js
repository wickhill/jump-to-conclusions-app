require('dotenv').config();

module.exports = {
    jwtSecret: process.env.SECRETKEY,
    jwtSession: {
        session: false,
        expiresIn: '1h' // Token expires in 1 hour
    }
};
