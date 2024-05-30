const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config()
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");
const methodOverride = require("method-override");


// const db = require('./models')
// const userCtrl = require("./controllers/userController")

// Middleware
app.use(cors());
//Promise based HTTP client for making requests to external API... even though I don't anticipate using one...
const axios = require("axios") 
// Middleware to parse JSON bodies
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
//HTTP request logger middleware for node.js
const morgan = require("morgan")
app.use(morgan("tiny"))
app.use(connectLiveReload());
app.use(methodOverride("_method"));

// app.use(
//     session({
//     secret: process.env.SECRET_KEY,
//     resave: false,
//     saveUninitialized: false,
//     })
//     );

// app.use("/user", userCtrl)

// I.N.D.U.C.E.S.
// Index route:
app.get("/", (req, res) => {
    res.send("Jump! To Conclusions!");
});

// Server initialization:
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));