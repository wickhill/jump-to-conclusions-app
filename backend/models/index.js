// Load environment variables from .env file:
require("dotenv").config()
// Import mongoose to interact w/ MongoDB:
const mongoose = require("mongoose")
// Retrieve MongoDB connection URI from environment vars:
mongoose.connect(process.env.MONGODBURI);
const db = mongoose.connection

// Event listener for successful connections to MongoDB
db.on("connected", function() {
    console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`)
})

module.exports = {
    User: require("./User"),
}