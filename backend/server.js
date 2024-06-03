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
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(connectLiveReload());
app.use(methodOverride("_method"));

// Import the userController
const userController = require('./controllers/userController');

// Use the userController routes
app.use('/user', userController);

const corsOptions = {
    origin: 'http://localhost:5173/', // frontend URL
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));


// I.N.D.U.C.E.S
//
// Index   /user             GET
// New     /user/new         GET
// Delete  /user/:id         DELETE
// Update  /user/:id         PUT/PATCH
// Create  /user             POST
// Edit    /user/:id/edit    GET
// Show    /user/:id         GET

/* modules
--------------------------------------------------------------- */

// Index Route:
app.get("/", (req, res) => {
    res.send("Jump! To Conclusions!");
});

// Create Route:
// app.get("/:id/achievements", (req, res) => {
//     res.send("User Achievements!")
// })

// Show Route:
app.get("/:id/history/", (req, res) => {
    res.send("User History!");
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err.message);
    });

// Server initialization:
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
