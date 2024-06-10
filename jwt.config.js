require('dotenv').config()

module.exports = {
    jwtSecret: process.env.SECRETKEY,
    jwtSession: {
        session: false
    }
}
