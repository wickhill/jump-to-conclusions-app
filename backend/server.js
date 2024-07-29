require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");
const methodOverride = require("method-override");
const morgan = require("morgan");

const app = express();

// Middleware
const whitelist = ['http://localhost:5173', 'https://main--jump-to-conclusions.netlify.app'];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200,
    credentials: true // Allow credentials
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(connectLiveReload());
app.use(methodOverride("_method"));

// Import the userController
const userController = require('./controllers/userController');

// Use the userController routes
app.use('/user', userController);

// Index Route
app.get("/", (req, res) => {
    res.send("Jump! To Conclusions!");
});

// // Show Route
// app.get("/:id/history/", (req, res) => {
//     res.send("User History!");
// });

// app.get("/:id/conclusion", (req, res) => {
//     res.send("User Conclusions!");
// });

// app.get("/:id/achievements", (req, res) => {
//     res.send("User Achievements!");
// });


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err.message);
    });

// Server initialization
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
